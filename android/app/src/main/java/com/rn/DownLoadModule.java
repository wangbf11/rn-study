package com.rn;

import android.os.Handler;
import android.os.Message;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.hpplay.sdk.source.browse.api.ILelinkServiceManager;
import com.hpplay.sdk.source.browse.api.LelinkServiceInfo;
import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.data.ShiPinDownloadInfo;
import com.paddy.pegasus.db.DatabaseManager;
import com.paddy.pegasus.executors.DownloadTaskRunnable;
import com.paddy.pegasus.executors.PegasusExecutors;
import com.paddy.pegasus.util.FileUtil;
import com.paddy.pegasus.util.M3U8DownLoad;
import com.paddy.pegasus.util.NetworkUtils;
import com.paddy.pegasus.util.ObjUtil;
import com.paddy.pegasus.util.StringUtil;
import com.paddy.pegasus.util.UrlUtil;
import com.paddy.pegasus.webservice.WebServerManager;
import com.rn.toupin.AllCast;
import com.rn.toupin.IUIUpdateListener;
import com.rn.toupin.LelinkHelper;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Future;

public class DownLoadModule extends ReactContextBaseJavaModule {
    private Map<String,Future<?>> runMap = new HashMap<>();
    private Map<String, DownloadTaskRunnable> threadMap = new HashMap<>(); //最大值3
    private PegasusExecutors executors;
    private LelinkHelper mLelinkHelper;
    private boolean isPause = false;//是否暂停播放
    private WebServerManager mWebServerManager;
    private int mIndex; //乐播当前连接设备的索引
    private String mUrl; //乐播当前播放连接

    class MyHandler extends Handler {

        @Override
        public void handleMessage(Message msg) {
            if (msg == null)
                return;
            if (msg.what == 10){
                //线程结束了  开始下一个任务
                openWifiAutoDownload();
            }else {
                int progress = msg.arg1;  // 下载的百分比  暂未用到
            }

        }
    }

    public DownLoadModule(ReactApplicationContext reactContext) {
        super(reactContext);
        executors = new PegasusExecutors();
        executors.allowCoreThreadTimeOut(true);
        mLelinkHelper = MainApplication.getMyApplication().getLelinkHelper();
        DatabaseManager.registerDataChangeCallBack(new DatabaseManager.OnDataChangeCallbacks() {
            @Override
            public void onDataChange(int state) {
                WritableMap map = Arguments.createMap();
                map.putInt("state",state);
                getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("state", map);
            }
        });
    }

    @Override
    public String getName() {
        // 暴露给js调用的模块名
        return "RNModule";
    }


    // 暴露给js调用的方法
    @ReactMethod
    public void testCallback(String name, Callback callback){
        String result = "Android返回: " + name;
        callback.invoke(null, result);
    }

    @ReactMethod
    public void openWifiAutoDownload(){
        if (NetworkUtils.isWifiConnected()){
            ArrayList<DownloadInfo> allInfo = DatabaseManager.getInstance().getAllInfo();
            if (null == allInfo){
                return;
            }
            for (DownloadInfo info :allInfo){
                if (!info.isDownloaded()){
                    //未下载完的自动下载
                    if(executors.getActiveCount() == PegasusExecutors.DEFAULT_THREAD_COUNT){
                        break;
                    }
                    String local_url = info.getLocal_url();
                    if (!StringUtil.isBlank(local_url)){
                        String[] split = local_url.split("/");
                        if (split.length >1){
                            addDownloadMission(split[split.length - 1],info.getDid(),info.getUrl());
                        }
                    }
                }
            }
        }
    }


    @ReactMethod
    public void addDownloadMission(String format,String did,String url) {
        synchronized (DownLoadModule.class){
            if (StringUtil.isBlank(url)&& StringUtil.isBlank(did)){
                return;
            }
            String fileName = format;
            if (!StringUtil.isBlank(format)){
                if (!format.contains(".")){
                    if (url.contains(".")){
                        String[] split = url.split("\\.");
                        fileName = format + "." + split[split.length-1];
                    }
                }
            }
            //替换m3u8文件名

            DownloadInfo Info = DatabaseManager.getInstance().getInfoById(UrlUtil.keyFromUrl(url));
            if (null == Info ){
                //插入数据库
                File file = new File(FileUtil.getExternalCacheDir(),fileName);
                DownloadInfo downloadInfo = new DownloadInfo();
                downloadInfo.setUrl(url);
                downloadInfo.setDid(did);
                downloadInfo.setLocal_url(file.getAbsolutePath());
                downloadInfo.setDownloading(false);
                downloadInfo.setWait(true);
                try {
                    DatabaseManager.getInstance().insertDownloadInfo(DatabaseManager
                        .getInstance().getWritableDatabase(),downloadInfo);
                }catch (Exception e){
                    e.printStackTrace();
                    return;
                }

            }
            //did 是视频传过来的id 由文件名称和 封面icon名称组成
            //最多应许同时下载3个
            if (executors.getActiveCount() == 3){
                return;
            }
            DownloadTaskRunnable downloadTaskRunnable = threadMap.get(UrlUtil.keyFromUrl(url));
            if (null == downloadTaskRunnable || downloadTaskRunnable.stop){
                downloadTaskRunnable = new DownloadTaskRunnable(url, did, new MyHandler(), fileName);
                threadMap.put(UrlUtil.keyFromUrl(url),downloadTaskRunnable);
                runMap.put(UrlUtil.keyFromUrl(url),
                    executors.submit(downloadTaskRunnable));
            }

        }
    }

    @ReactMethod
    public void pauseDownloadMissionWith(String url) {
//        Future<?> future =runMap.remove(UrlUtil.keyFromUrl(url));
//        if (future != null)
//            future.cancel(true);

        for (Map.Entry eny :threadMap.entrySet()){
            if (eny.getKey().equals(UrlUtil.keyFromUrl(url))){
                DownloadTaskRunnable downloadTaskRunnable = threadMap.get(UrlUtil.keyFromUrl(url));
                downloadTaskRunnable.stop = true;
            }
        }
    }

    @ReactMethod
    public void canelDownLoadMissionWith(String url) {
        //删除任务 同事删除数据库和下载的文件
//        Future<?> future =runMap.remove(UrlUtil.keyFromUrl(url));
//        if (future != null){
//            future.cancel(true);
//        }
        synchronized (DownLoadModule.class){
            try{
                for (Map.Entry eny :threadMap.entrySet()){
                    if (eny.getKey().equals(UrlUtil.keyFromUrl(url))){
                        DownloadTaskRunnable downloadTaskRunnable = threadMap.get(UrlUtil.keyFromUrl(url));
                        downloadTaskRunnable.stop = true;
                    }
                }
                threadMap.remove(UrlUtil.keyFromUrl(url));
                runMap.remove(UrlUtil.keyFromUrl(url));
            }catch (Exception e){
                e.printStackTrace();
            }
            String key = DatabaseManager.getInstance().getKey(url);
            DownloadInfo Info = DatabaseManager.getInstance().getInfoById(key);
            //删除 缓存文件
            try{
                String local_url = Info.getLocal_url();
                if (local_url.endsWith(".m3u8")){
                    String[] split = local_url.split("/");
                    String fileName = split[split.length - 1];
                    String filepath = local_url.replace(fileName, "");
                    M3U8DownLoad.deleteFile(filepath);
                }
            }catch (Exception e){
                e.printStackTrace();
            }
            if (null != Info){
                File file = new File(Info.getLocal_url());
                file.delete();
                DatabaseManager.getInstance().deleteOneDownloadInfo(key);
            }
        }

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                openWifiAutoDownload(); //删除任务后重新开始下载任务
            }
        },1000);

    }

    @ReactMethod
    public void deleteAllDownload(boolean state) {
        //删除任务 同事删除数据库和下载的文件
//        runMap.clear();
//        BlockingQueue<Runnable> q = executors.getQueue();
//        try {
//            Iterator<Runnable> it = q.iterator();
//            while (it.hasNext()) {
//                Runnable r = it.next();
//                if (r instanceof Future<?>){
//                    ((Future)r).cancel(true);
//                    q.remove(r);
//                }
//            }
//        } catch (ConcurrentModificationException fallThrough) {
//            for (Object r : q.toArray())
//                if (r instanceof Future<?>){
//                    ((Future)r).cancel(true);
//                    q.remove(r);
//                }
//        }
        //不能删除的文件集合 state取反
        List<DownloadInfo> allInfoSave = DatabaseManager.getInstance().getAllInfo(state?0:1);
        List<DownloadInfo> allInfoDelete = DatabaseManager.getInstance().getAllInfo(state?1:0);
        //停止所有需要删除的线程
        if (null != allInfoDelete){
            for (DownloadInfo dInfo :allInfoDelete){
                try{
                    String url = dInfo.getUrl();
                    for (Map.Entry eny :threadMap.entrySet()){
                        if (eny.getKey().equals(UrlUtil.keyFromUrl(url))){
                            DownloadTaskRunnable downloadTaskRunnable = threadMap.get(UrlUtil.keyFromUrl(url));
                            downloadTaskRunnable.stop = true;
                        }
                    }
                }catch (Exception e){
                    e.printStackTrace();
                }
            }
        }
        //删除所有除不能删除的缓存文件"/storage/emulated/0/Android/data/com.rnvideo/cache/file/"
        if (null != allInfoSave){
            for (DownloadInfo sInfo :allInfoSave){
                File file = new File(FileUtil.getExternalCacheDir());
                if (file.exists()) {
                    if (file.isDirectory()) {
                        for(File sub : file.listFiles()){
                            String local_url = sInfo.getLocal_url();
                            if (!StringUtil.isBlank(local_url) && local_url.endsWith(".m3u8")){
                                String[] split = local_url.split("/");
                                String fileName = split[split.length - 1];
                                local_url = local_url.replace("/" +fileName, "");
                            }
                            if (!StringUtil.isBlank(local_url) && !local_url.equals(sub.getAbsolutePath())){
                                M3U8DownLoad.deleteFile(sub);
                            }
                        }
                    }
                }
            }
        }else {
            M3U8DownLoad.deleteFile(FileUtil.getExternalCacheDir());
        }
        //清除需要清除的数据库
        DatabaseManager.getInstance().deleteAllDownloadInfo(state?1:0);
    }

    @ReactMethod
    public void getAllMissioncallBlock(Callback result) {
        List<DownloadInfo> allInfo = DatabaseManager.getInstance().getAllInfo();
        if (null != allInfo){
            WritableArray writableArray = new WritableNativeArray();
            for (DownloadInfo dInfo :allInfo){
                if (StringUtil.isBlank(dInfo.getDid()) || StringUtil.isBlank(dInfo.getUrl())){
                    continue;
                }
                ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(dInfo);
                Gson gson = new Gson();
                String json = gson.toJson(shiPinDownloadInfo);
                Map map = gson.fromJson(json, Map.class);
                WritableMap data = Arguments.createMap();
                for (Object k:map.keySet()){
                    if (map.get(k)instanceof String){
                        data.putString( (String)k,(String)map.get(k));
                    }else if (map.get(k)instanceof Integer){
                        data.putInt( (String)k,(int)map.get(k));
                    }else if (map.get(k)instanceof Float){
                        data.putInt( (String)k,new Float((Float)map.get(k)).intValue());
                    }else if (map.get(k)instanceof Double){
                        data.putInt((String)k,new Double((Double)map.get(k)).intValue());
                    }else if (map.get(k)instanceof Boolean){
                        data.putBoolean( (String)k,(boolean)map.get(k));
                    }
                }
                writableArray.pushMap(data);
            }

            result.invoke(writableArray);
        }else {
            result.invoke("0");
        }
    }

    @ReactMethod
    public void getAllPrivateMissionWith(boolean state, Callback result) {
        List<DownloadInfo> allInfo = DatabaseManager.getInstance().getAllInfo(state? 1:0);
        WritableArray writableArray = new WritableNativeArray();
        if (null != allInfo){
            for (DownloadInfo dInfo :allInfo){
                if (StringUtil.isBlank(dInfo.getDid()) || StringUtil.isBlank(dInfo.getUrl())){
                    continue;
                }
                ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(dInfo);
                if (shiPinDownloadInfo.isSecret() == state){
                    Gson gson = new Gson();
                    String json = gson.toJson(shiPinDownloadInfo);
                    Map map = gson.fromJson(json, Map.class);
                    WritableMap data = Arguments.createMap();
                    for (Object k:map.keySet()){
                        if (map.get(k)instanceof String){
                            data.putString( (String)k,(String)map.get(k));
                        }else if (map.get(k)instanceof Integer){
                            data.putInt( (String)k,(int)map.get(k));
                        }else if (map.get(k)instanceof Float){
                            data.putInt( (String)k,new Float((Float)map.get(k)).intValue());
                        }else if (map.get(k)instanceof Double){
                            data.putInt((String)k,new Double((Double)map.get(k)).intValue());
                        }else if (map.get(k)instanceof Boolean){
                            data.putBoolean( (String)k,(boolean)map.get(k));
                        }
                    }
                    writableArray.pushMap(data);
                }
            }

            result.invoke(writableArray);
        }else {
            result.invoke(writableArray);
        }
    }

    @ReactMethod
    public void getMissionWithDownloadURL(String url, Promise promise) {
        String key = DatabaseManager.getInstance().getKey(url);
        DownloadInfo Info = DatabaseManager.getInstance().getInfoById(key);
        if (null != Info){
            String[] split = Info.getLocal_url().split("/");
            Info.setLocal_url("http://localhost:8080/" + split[split.length - 1].replace(".m3u8","").replace(".ts","")  + "temp/" + split[split.length - 1]);
            ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(Info);
            Gson gson = new Gson();
            String json = gson.toJson(shiPinDownloadInfo);
            Map map = gson.fromJson(json, Map.class);
            WritableMap data = Arguments.createMap();
            for (Object k:map.keySet()){
                if (map.get(k)instanceof String){
                    data.putString( (String)k,(String)map.get(k));
                }else if (map.get(k)instanceof Integer){
                    data.putInt( (String)k,(int)map.get(k));
                }else if (map.get(k)instanceof Float){
                    data.putInt( (String)k,new Float((Float)map.get(k)).intValue());
                }else if (map.get(k)instanceof Double){
                    data.putInt((String)k,new Double((Double)map.get(k)).intValue());
                }else if (map.get(k)instanceof Boolean){
                    data.putBoolean( (String)k,(boolean)map.get(k));
                }
            }
            promise.resolve(data);
        }else {
            promise.resolve("0");
        }
    }

    @ReactMethod
    public void getMissionDataSize(String url, Promise promise) {
        String key = DatabaseManager.getInstance().getKey(url);
        DownloadInfo Info = DatabaseManager.getInstance().getInfoById(key);
        if (null != Info){
            WritableMap data = Arguments.createMap();
            data.putInt("Size",Info.getContentSize());
            promise.resolve(data);
        }else {
            promise.resolve("");
        }
    }

    /**
     * 设置私密
     */
    @ReactMethod
    public void setMissionPrivateWith(boolean state,String url) {
        try {
            DatabaseManager.getInstance().updatePrivate(url,state);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    /**
     * 乐播投屏 查询可以链接的设备信息
     */
    @ReactMethod
    public void startSearchLink(){
        mLelinkHelper.browse(ILelinkServiceManager.TYPE_ALL);
        mLelinkHelper.setUIUpdateListener(new IUIUpdateListener() {
            @Override
            public void onUpdateState(int state, Object object) {
                if (IUIUpdateListener.STATE_SEARCH_SUCCESS == state){
                    List<LelinkServiceInfo> infos = mLelinkHelper.getInfos();
                    WritableArray array = Arguments.createArray();
                    if (null != infos){
                        for (LelinkServiceInfo info: infos){
                            WritableMap map = Arguments.createMap();
                            map.putString("title",info.getName());
                            array.pushMap(map);
                        }
                    }
                    getReactApplicationContext()
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("deviceChanged", array);
                }
            }

            @Override
            public void onUpdateText(String msg) {

            }
        });
    }

    /**
     * 乐播投屏 停止搜索
     */
    @ReactMethod
    public void stopBrowse(){
        mLelinkHelper.stopBrowse();
    }

    /**
     * 乐播投屏 连接
     */
    @ReactMethod
    public void linkDeviceWith(int index, final String videoUrl){
        mIndex = index;
        List<LelinkServiceInfo> infos = mLelinkHelper.getInfos();
        if (null != infos){
            mLelinkHelper.connect(infos.get(index));
            mLelinkHelper.setUIUpdateListener(new IUIUpdateListener() {
                @Override
                public void onUpdateState(int state, Object object) {
                    //连接成功 开始播放
                    if (state == IUIUpdateListener.STATE_CONNECT_SUCCESS){
                        changedVideoPaly(videoUrl);
                    }
                }

                @Override
                public void onUpdateText(String msg) {
                    //连接信息
                }
            });
        }
    }

    /**
     * 乐播投屏 断开连接
     */
    @ReactMethod
    public void cutDownDevice(){
        List<LelinkServiceInfo> infos = mLelinkHelper.getInfos();
        if (null != infos){
            mLelinkHelper.disConnect(infos.get(mIndex));
        }
    }

    /**
     * 乐播投屏切换连接
     */
    @ReactMethod
    public void changedVideoPaly(String url){
        mUrl = url;
        if (null == mLelinkHelper) {
            return;
        }
        List<LelinkServiceInfo> connectInfos = mLelinkHelper.getConnectInfos();

        if (null == connectInfos || connectInfos.isEmpty()) {
            return;
        }
        if (isPause) {
            isPause = false;
            // 暂停中
            mLelinkHelper.resume();
            return;
        }
        mLelinkHelper.playNetMedia(url, AllCast.MEDIA_TYPE_VIDEO, null);
    }
    /**
     * 乐播投屏 开始或者恢复播放
     */
    @ReactMethod
    public void play(String url,int mediaType,boolean isLocalFile){
        mUrl = url;
        if (null == mLelinkHelper) {
            return;
        }
        List<LelinkServiceInfo> connectInfos = mLelinkHelper.getConnectInfos();

        if (null == connectInfos || connectInfos.isEmpty()) {
            return;
        }
        if (isPause) {
            isPause = false;
            // 暂停中
            mLelinkHelper.resume();
            return;
        } else {

        }
        if (isLocalFile) {
            // 本地media
            mLelinkHelper.playLocalMedia(url, mediaType, null);
        } else {
            // 网络media
            mLelinkHelper.playNetMedia(url, mediaType, null);
        }
    }

    /**
     * 乐播投屏 暂停播放
     */
    @ReactMethod
    public void controlPlay(int state,int progress) {
        // 0 播放 1 暂停 2 跳时间 3 停止播放
       if (state == 0){
           if (!StringUtil.isBlank(mUrl)){
               changedVideoPaly(mUrl);
           }
       }else if (state == 1){
           pause();
       }else if (state == 2){
           seekTo(progress);
       }else if (state == 3){
           stop();
       }
    }
    /**
     * 乐播投屏 暂停播放
     */
    @ReactMethod
    public void pause() {
        if (null == mLelinkHelper) {
            return;
        }
        isPause = true;
        mLelinkHelper.pause();
    }
    /**
     * 乐播投屏 停止播放
     */
    @ReactMethod
    public void stop() {
        if (null == mLelinkHelper) {
            return;
        }
        mLelinkHelper.stop();
    }
    /**
     * 乐播投屏 控制播放进度
     */
    @ReactMethod
    public void seekTo(int progress) {
        if (null == mLelinkHelper) {
            return;
        }
        mLelinkHelper.seekTo(progress);
    }
    /**
     * 乐播投屏 增加音量
     */
    @ReactMethod
    public void addVolume(int progress) {
        if (null == mLelinkHelper) {
            return;
        }
        mLelinkHelper.voulumeUp();
    }
    /**
     * 乐播投屏 减少音量
     */
    @ReactMethod
    public void subVolume(int progress) {
        if (null == mLelinkHelper) {
            return;
        }
        mLelinkHelper.voulumeDown();
    }
    /**
     * m3u8本地服务开启
     */
    @ReactMethod
    public void startServerOpenWithFileName(String fileName) {
        mWebServerManager = new WebServerManager();
        mWebServerManager.startServer(8080,"/storage/emulated/0/Android/data/com.rnvideo/cache/file/");
    }
    /**
     * 动态请求权限
     */
    @ReactMethod
    public void requestPermissions(String fileName, final Callback call) {
        MainActivity reactActivity = MainApplication.getMyApplication().reactActivity;

        if (null != reactActivity){
            boolean hava = false;
            if ("storage".equals(fileName)){
                hava = PermissionUtil.verifyStoragePermissions(MainApplication.getMyApplication().reactActivity, true);
            }else if ("phone".equals(fileName)){
                hava = PermissionUtil.verifyPhoneStatePermission(MainApplication.getMyApplication().reactActivity, true);
            }else if ("camera".equals(fileName)){
                hava = PermissionUtil.verifyCameraPermission(MainApplication.getMyApplication().reactActivity);
            }else if ("location".equals(fileName)){
                hava = PermissionUtil.verifyLocationPermissions(MainApplication.getMyApplication().reactActivity);
            }

            if (hava){
                call.invoke("1");
            }

            PermissionUtil.registerPermissionsCallBack(new PermissionUtil.onRequestPermissionsResultCallbacks() {
                @Override
                public void onPermissionsGranted(int requestCode, List<String> permissions, boolean isAllGranted) {
                    call.invoke("1");
                }

                @Override
                public void onPermissionsDenied(int requestCode, List<String> permissions, boolean isAllDenied) {
                    call.invoke("0");
                }
            });
        }
    }
}

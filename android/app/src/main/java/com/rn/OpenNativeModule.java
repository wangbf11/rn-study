package com.rn;

import android.content.Intent;
import android.os.Handler;
import android.os.Message;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.paddy.pegasus.DownLoadActivity;
import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.data.ShiPinDownloadInfo;
import com.paddy.pegasus.db.DatabaseManager;
import com.paddy.pegasus.executors.DownloadTaskRunnable;
import com.paddy.pegasus.executors.PegasusExecutors;
import com.paddy.pegasus.util.FileUtil;
import com.paddy.pegasus.util.ObjUtil;
import com.paddy.pegasus.util.StringUtil;
import com.paddy.pegasus.util.UrlUtil;

import java.io.File;
import java.util.ArrayList;
import java.util.ConcurrentModificationException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Future;

public class OpenNativeModule extends ReactContextBaseJavaModule {

    private ReactContext mReactContext;
    private Map<String,Future<?>> runMap = new HashMap<>();
    private PegasusExecutors executors;
    public OpenNativeModule(ReactApplicationContext context) {
        super(context);
        this.mReactContext = context;
        executors = new PegasusExecutors();
    }

    @Override
    public String getName() {
        return "OpenNativeModule";
    }

    @ReactMethod
    public void openNativeVC() {
        Intent intent = new Intent();
        intent.setClass(mReactContext, DownLoadActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        mReactContext.startActivity(intent);

//        mReactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
//                .emit("left","原生掉Rn");
    }

    @ReactMethod
    public void resumeDownLoad(String format,String did,String url) {
        String fileName = format;
        if (!StringUtil.isBlank(format)){
            if (!format.contains(".")){
                fileName = UrlUtil.keyFromUrl(url) + "." + format;
            }
        }else {
            if (url.contains(".")){
                fileName = FileUtil.getNameFromUrl(url);
            }else {
                fileName = FileUtil.getNameFromUrl(url)+ ".mp4"; //默认存储MP4格式视频
            }
        }
        //did 是视频传过来的id 由文件名称和 封面icon名称组成
        runMap.put(UrlUtil.keyFromUrl(url),
                executors.submit(new DownloadTaskRunnable(url, did,new MyHandler()
                        ,fileName)));
    }

    @ReactMethod
    public void stopDownload(String url) {
        Future<?> future =runMap.remove(UrlUtil.keyFromUrl(url));
        if (future != null)
            future.cancel(true);
    }

    @ReactMethod
    public void deleteOneDownload(String url,Callback result) {
        //删除任务 同事删除数据库和下载的文件
        Future<?> future =runMap.remove(UrlUtil.keyFromUrl(url));
        if (future != null){
            future.cancel(true);
        }

        String key = DatabaseManager.getInstance().getKey(url);
        DownloadInfo Info = DatabaseManager.getInstance().getInfoById(key);
        if (null != Info){
            File file = new File(Info.getLocal_url());
            file.delete();
            DatabaseManager.getInstance().deleteOneDownloadInfo(key);
        }
        result.invoke("1");
    }

    @ReactMethod
    public void deleteAllDownload(Callback result) {
        //删除任务 同事删除数据库和下载的文件
        runMap.clear();
        BlockingQueue<Runnable> q = executors.getQueue();
        try {
            Iterator<Runnable> it = q.iterator();
            while (it.hasNext()) {
                Runnable r = it.next();
                if (r instanceof Future<?>){
                    ((Future)r).cancel(true);
                    q.remove(r);
                }
            }
        } catch (ConcurrentModificationException fallThrough) {
            for (Object r : q.toArray())
                if (r instanceof Future<?>){
                    ((Future)r).cancel(true);
                    q.remove(r);
                }
        }

        List<DownloadInfo> allInfo = DatabaseManager.getInstance().getAllInfo();
        if (null != allInfo){
            for (DownloadInfo dInfo :allInfo){
                File file = new File(dInfo.getLocal_url());
                file.delete();
            }
            DatabaseManager.getInstance().deleteAllDownloadInfo();
        }
        result.invoke("1");
    }

    @ReactMethod
    public void getAllDownloadInfo(Promise promise) {
        List<DownloadInfo> allInfo = DatabaseManager.getInstance().getAllInfo();
        if (null != allInfo){
            ArrayList<ShiPinDownloadInfo> allsInfo = new ArrayList<>();
            for (DownloadInfo dInfo :allInfo){
                ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(dInfo);
                allsInfo.add(shiPinDownloadInfo);
            }
            promise.resolve(new Gson().toJson(allsInfo));
        }else {
            promise.resolve("0");
        }

    }

    @ReactMethod
    public void getDownloadInfoByUrl(String url,Callback result) {
        String key = DatabaseManager.getInstance().getKey(url);
        DownloadInfo Info = DatabaseManager.getInstance().getInfoById(key);
        if (null != Info){
            ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(Info);
            result.invoke(new Gson().toJson(shiPinDownloadInfo));
        }else {
            result.invoke("");
        }
    }

    @ReactMethod
    public void getDownloadInfoById(String id,Callback result) {
        DownloadInfo Info = DatabaseManager.getInstance().getInfoById(id);
        if (null != Info){
            ShiPinDownloadInfo shiPinDownloadInfo = ObjUtil.convertDInfoToSInfo(Info);
            result.invoke(new Gson().toJson(shiPinDownloadInfo));
        }else {
            result.invoke("");
        }
    }

    static class MyHandler extends Handler {

        @Override
        public void handleMessage(Message msg) {
            if (msg == null)
                return;
//
//            ProgressBar pb = (ProgressBar) msg.obj;
//            pb.setProgress(msg.arg1);

//            if (msg.arg1 == 100)
//                pb = null;
        }
    }
}

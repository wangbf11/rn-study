package com.paddy.pegasus.executors;

import android.os.Handler;
import android.os.Message;
import android.text.TextUtils;
import android.util.Log;
import android.widget.ProgressBar;

import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.data.M3U8;
import com.paddy.pegasus.db.DatabaseManager;
import com.paddy.pegasus.util.FileUtil;
import com.paddy.pegasus.util.IOCloseUtil;
import com.paddy.pegasus.util.M3U8DownLoad;
import com.paddy.pegasus.util.UrlUtil;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

/**
 * Created by wbf on 2018/12/27.
 */

public class DownloadTaskRunnable implements Runnable {
    protected final String LOG_TAG = DownloadTaskRunnable.class.getSimpleName();
    public static final int CONNECT_TIME = 15000;
    public static final int BUFFER_SIZE = 3 * 1024;
    public String TEMP_DIR;
    private String url;
    private String did;
    private Handler handler;
    private int currentLength;
    private int currentCount; //m3u8已下载数量
    private String fileName;
    // 注意在使用range属性时，总长度不要用getContentLength
    private float totalLength;
    private ProgressBar progressBar;
    public boolean stop = false;
    public DownloadTaskRunnable(String url,Handler handler,ProgressBar progressBar) {
        this.url = url;
        this.progressBar = progressBar;
        this.handler = handler;
        fileName = FileUtil.getNameFromUrl(url).replace(".apk","") + ".apk";
    }

    public DownloadTaskRunnable(String url,String did,Handler handler,String fileName) {
        this.url = url;
        this.did = did;
        this.handler = handler;
        this.fileName = fileName;
        String replace = fileName.replace(".m3u8", "");
        String replace1 = replace.replace(".ts", "");
        this.TEMP_DIR  = FileUtil.getExternalCacheDir() + replace1+ "temp";
    }

    @Override
    public void run() {
        Log.d("zp_test","url: " + url);
        if (TextUtils.isEmpty(url))
            return;
        if (url.endsWith(".m3u8")){
            downLoadM3U8();
        }else {
            resumeDownload();
        }
    }

    private void resumeDownload(){
        RandomAccessFile mAccessFile = null;
        InputStream mStream = null;

        try {
            HttpURLConnection urlConnection = createConnection(url);
            File file = new File(FileUtil.getExternalCacheDir(),fileName);

            if (file != null && file.length() > 0) {
                DownloadInfo info = DatabaseManager.getInstance().getInfoById(DatabaseManager.getInstance().getKey(url));
                if (info != null) {
                    totalLength = info.getContentSize();
                    Log.d("zp_test","start: " + info.getStart() + " end: " + info.getContentSize());
                    urlConnection.setRequestProperty("Range","bytes=" + info.getStart() + "-" + info.getContentSize());
                    // 设置range后，content length的值会发生变化，变成没有下载的内容长度
                    // setRequestProperty这个方法必须在连接发生前进行调用
                    // if (info.getContentSize() == urlConnection.getContentLength()){
                    mAccessFile = new RandomAccessFile(file,"rwd");
                    mAccessFile.seek(info.getStart());
                    currentLength = info.getStart();

                    info.setDownloading(true);
                    info.setWait(false);
                    DatabaseManager.getInstance().updateDownloadInfo(url,info);
                    if (info.getContentSize() == currentLength)
                        return;
                } else {
                    Log.w("zp_test",LOG_TAG + "info is null......");
                }
            } else {
                file = createFile(FileUtil.getExternalCacheDir(),fileName);
                totalLength = urlConnection.getContentLength();
                mAccessFile = new RandomAccessFile(file,"rwd");
                DownloadInfo downloadInfo = new DownloadInfo();
                downloadInfo.setUrl(url);
                downloadInfo.setDid(did);
                downloadInfo.setLocal_url(file.getAbsolutePath());
                downloadInfo.setDownloading(true);
                downloadInfo.setWait(false);
                downloadInfo.setContentSize(urlConnection.getContentLength());
                DatabaseManager.getInstance().updateDownloadInfo(url,downloadInfo);
            }

            int contentSize = urlConnection.getContentLength();
            Log.d("zp_test",LOG_TAG + " currentLength......" + currentLength + " contentSize " + contentSize);
            mStream = urlConnection.getInputStream();

            DatabaseManager.getInstance().updateLoading(url,true);

            while (!Thread.interrupted() || !stop){
                byte[] buffer = new byte[BUFFER_SIZE];
                int length;
                if ((length = mStream.read(buffer)) != -1){
                    mAccessFile.write(buffer,0,length);
                    currentLength += length;
                    Message message = Message.obtain();
                    Log.d("zp_test","currentLength: " + currentLength);
                    Log.d("zp_test","totalLength: " + totalLength);

                    message.arg1 = (int) (currentLength / totalLength * 100);
                    message.obj = progressBar;
                    handler.sendMessage(message);
                    Log.d("zp_test","rate: " + message.arg1);
                    if (message.arg1 == 100) {
                        DatabaseManager.getInstance().updateStart(url,currentLength,currentLength == totalLength);
                        break;
                    }

                }
            }
            DatabaseManager.getInstance().updateLoading(url,false);
            DatabaseManager.getInstance().updateStart(url,currentLength,currentLength == totalLength);
            if (!(currentLength == totalLength)){
                // 未下载完 时 暂停后 等待中
                DatabaseManager.getInstance().updateWait(url,true);
            }
            Log.d("zp_test","interrupt: " + currentLength);

        } catch (IOException e) {
            e.printStackTrace();
            Log.d("zp_test",LOG_TAG + e.toString());
            DatabaseManager.getInstance().updateError(url,true);
        }finally {
            IOCloseUtil.inputClose(mStream);
            IOCloseUtil.randomClose(mAccessFile);
            if (!stop){
                Message message = Message.obtain();
                message.what = 10;
                handler.sendMessage(message);
            }
        }

    }

    private File createFile(String fileDir, String fileName){
        File dir = new File(fileDir);
        if (!dir.exists())
            dir.mkdirs();

        File file = new File(dir,fileName);
        if (!file.exists()){
            try {
                file.createNewFile();
            } catch (IOException e) {
                Log.e("zp_test","文件创建失败！");
            }
        }
        return file;
    }


    /**
     * M3U8视频下载
     */
    public void downLoadM3U8() {
        File file2 = new File(TEMP_DIR + File.separator+fileName);
        File tfile = new File(TEMP_DIR);  //分片缓存文件
        if (!tfile.exists()) {
            tfile.mkdirs();
        }

        M3U8 m3u8ByURL = null;
        try {
            m3u8ByURL = M3U8DownLoad.getM3U8ByURL(url,file2);
        } catch (Exception e) {
            e.printStackTrace();
            DatabaseManager.getInstance().updateError(url,true);
            return;
        }
        if (null == m3u8ByURL || null == m3u8ByURL.getTsList() || m3u8ByURL.getTsList().size() == 0){
            //如果获取分片地址失败返回信息
            DatabaseManager.getInstance().updateError(url,true);
            return;
        }

        String basePath = m3u8ByURL.getBasepath();
        List<M3U8.Ts> tsList = m3u8ByURL.getTsList();

        DownloadInfo infoById = DatabaseManager.getInstance().getInfoById(UrlUtil.keyFromUrl(url));
        if (null == infoById){
            infoById = new DownloadInfo();
        }
        infoById.setUrl(url);
        infoById.setDid(did);
        infoById.setWait(false);
        infoById.setDownloading(true);
        infoById.setLocal_url(file2.getAbsolutePath());
        infoById.setTsCount(tsList.size());
        DatabaseManager.getInstance().updateDownloadInfo(url,infoById);

        for (M3U8.Ts m3U8Ts :  tsList){
            currentCount ++;
            File file = new File(TEMP_DIR + File.separator + m3U8Ts.getFile());
            if (!file.exists()) {// 下载过的就不管了
                FileOutputStream fos = null;
                InputStream inputStream = null;
                try {
                    HttpURLConnection conn = createConnection(basePath + m3U8Ts.getFile());
                    totalLength = conn.getContentLength();
                    if (conn.getResponseCode() == 200) {
                        inputStream = conn.getInputStream();
                        fos = new FileOutputStream(file);// 会自动创建文件
                        int len = 0;
                        byte[] buf = new byte[1024];
                        while ((len = inputStream.read(buf)) != -1) {
                            currentLength += len;
                            fos.write(buf, 0, len);// 写入流中
                            if (Thread.interrupted() || stop){
                                break;
                            }
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    DatabaseManager.getInstance().updateError(url,true);
                } finally {// 关流
                    try {
                        if (inputStream != null) {
                            inputStream.close();
                        }
                        if (fos != null) {
                            fos.close();
                        }
                    } catch (IOException e) {e.printStackTrace();}
                    if (Thread.interrupted() || stop){
                        //为打断或暂停所以不能加入这次次数 删除这次未完成文件
                        file.delete();
                        break;
                    }else {
                        DatabaseManager.getInstance().updateStart(url,currentLength,currentCount == tsList.size(),currentCount,currentLength,true);
                    }
                }
            }
        }

        try {
            DatabaseManager.getInstance().updateLoading(url,false);
            if (stop){
                DatabaseManager.getInstance().updateWait(url,true);
            }
            Log.e("m3u8","m3u8分片文件下载完毕!");
            if (currentCount == tsList.size()){
                //M3U8DownLoad.mergeFiles(tfile.listFiles(), FileUtil.getExternalCacheDir() + File.separator + fileName);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            //线程结束
            if (!stop){
                Message message = Message.obtain();
                message.what = 10;
                handler.sendMessage(message);
            }
        }
    }


    /**
     * 创建下载链接
     */
    private HttpURLConnection createConnection(String Url) throws IOException {
        HttpURLConnection urlConnection = (HttpURLConnection) new URL(Url).openConnection();
        urlConnection.setConnectTimeout(CONNECT_TIME);
        urlConnection.setReadTimeout(CONNECT_TIME);
        return  urlConnection;
    }

    /**
     * 普通下载
     */
    private void normalDownload(){
        InputStream is = null;
        OutputStream os = null;
        try {
            HttpURLConnection urlConnection = createConnection(url);

            is = urlConnection.getInputStream();
            Log.d("zp_test","file: " + FileUtil.getExternalCacheDir() + " name: " + fileName);
            os = new FileOutputStream(
                    createFile(FileUtil.getExternalCacheDir(),fileName));
            int contentSize = urlConnection.getContentLength();
            Log.d("zp_test","content size: " + contentSize);

            byte[] buffer = new byte[BUFFER_SIZE];
            int length;
            while ((length = is.read(buffer)) != -1){
                os.write(buffer,0,length);
                currentLength += length;
                os.flush();

                Message message = Message.obtain();
                message.arg1 = currentLength * 100 / contentSize;
                handler.sendMessage(message);

            }

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            IOCloseUtil.inputClose(is);
            IOCloseUtil.outputClose(os);
        }
    }
}

package com.paddy.pegasus.util;

import android.util.Log;

import com.paddy.pegasus.data.M3U8;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.channels.FileChannel;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;


public class M3U8DownLoad {
    public static String TEMP_DIR = FileUtil.getExternalCacheDir() + "temp";
    public static int connTimeout = 30 * 60 * 1000;
    public static int readTimeout = 30 * 60 * 1000;
    public static String url = "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8";


    /**
     * test下载
     */
    public static void downLoadM3U8() {
        File tfile2 = new File(FileUtil.getExternalCacheDir() + "temptest.ts");
        if (tfile2.exists()) {// 下载过的就不管了
            return;
        }
        File tfile = new File(TEMP_DIR);
        if (!tfile.exists()) {
            tfile.mkdirs();
        }

        M3U8 m3u8ByURL = getM3U8ByURL(url);
        String basePath = m3u8ByURL.getBasepath();
        List<M3U8.Ts> tsList = m3u8ByURL.getTsList();
        for (M3U8.Ts m3U8Ts :  tsList){
            File file = new File(TEMP_DIR + File.separator + m3U8Ts.getFile());
            if (!file.exists()) {// 下载过的就不管了
                FileOutputStream fos = null;
                InputStream inputStream = null;
                try {
                    URL url = new URL(basePath + m3U8Ts.getFile());
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setConnectTimeout(connTimeout);
                    conn.setReadTimeout(readTimeout);
                    if (conn.getResponseCode() == 200) {
                        inputStream = conn.getInputStream();
                        fos = new FileOutputStream(file);// 会自动创建文件
                        int len = 0;
                        byte[] buf = new byte[1024];
                        while ((len = inputStream.read(buf)) != -1) {
                            fos.write(buf, 0, len);// 写入流中
                        }
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {// 关流
                    try {
                        if (inputStream != null) {
                            inputStream.close();
                        }
                        if (fos != null) {
                            fos.close();
                        }
                    } catch (IOException e) {e.printStackTrace();}
                }
            }
        }
        Log.e("m3u8","m3u8分片文件下载完毕!");
        boolean b = mergeFiles(tfile.listFiles(), TEMP_DIR + "test.ts");
        if (b){
            //m3u8融合成功删除所有片段
//            for (M3U8.Ts m3U8Ts :  tsList) {
//                File file = new File(TEMP_DIR + File.separator + m3U8Ts.getFile());
//                file.delete();
//            }
            Log.e("m3u8","m3u8融合成功");
        }
    }
    /**
     *  获取m3u8分片文件地址
     */
    public static M3U8 getM3U8ByURL(String m3u8URL) {
        try {
            return getM3U8ByURL(m3u8URL, null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     *  获取m3u8分片文件地址
     */
    public static M3U8 getM3U8ByURL(String m3u8URL,File filepath) throws Exception{
        try {
            FileOutputStream fos = new FileOutputStream(filepath);// 索引文件地址
            BufferedWriter bufferedWriter = new BufferedWriter(new OutputStreamWriter(fos));
            HttpURLConnection conn = (HttpURLConnection) new URL(m3u8URL).openConnection();
            if (conn.getResponseCode() == 200) {
                String realUrl = conn.getURL().toString();
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                String basepath = realUrl.substring(0, realUrl.lastIndexOf("/") + 1);
                M3U8 ret = new M3U8();
                ret.setBasepath(basepath);

                String line;
                float seconds = 0;
                int mIndex;
                while ((line = reader.readLine()) != null) {
                    bufferedWriter.write(line+"\r\n");// 写入流中并换行
                    if (line.startsWith("#")) {
                        if (line.startsWith("#EXTINF:")) {
                            line = line.substring(8);
                            if ((mIndex = line.indexOf(",")) != -1) {
                                line = line.substring(0, mIndex + 1);
                            }
                            try {
                                seconds = Float.parseFloat(line);
                            } catch (Exception e) {
                                seconds = 0;
                            }
                        }
                        continue;
                    }
                    if (line.endsWith("m3u8")) {
                        return getM3U8ByURL(basepath + line);
                    }
                    ret.addTs(new M3U8.Ts(line, seconds));
                    seconds = 0;
                }
                reader.close();
                bufferedWriter.close();
                return ret;
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new Exception();
        }
        return null;
    }
    //linux 下需要对文件排序
    public static void orderByDate(File[] files) {
        Arrays.sort(files, new Comparator<File>() {
            public int compare(File f1, File f2) {
                long diff = f1.lastModified() - f2.lastModified();
                if (diff > 0)
                    return 1;
                else if (diff == 0)
                    return 0;
                else
                    return -1;//如果 if 中修改为 返回-1 同时此处修改为返回 1  排序就会是递减
            }

            public boolean equals(Object obj) {
                return true;
            }
        });
    }
    /**
     *  融合 m3u8文件
     */
    public static boolean mergeFiles(File[] fpaths, String resultPath) {
        if (fpaths == null || fpaths.length < 1) {
            return false;
        }

        if (fpaths.length == 1) {
            return fpaths[0].renameTo(new File(resultPath));
        }
        for (int i = 0; i < fpaths.length; i++) {
            if (!fpaths[i].exists() || !fpaths[i].isFile()) {
                return false;
            }
        }
        orderByDate(fpaths);

        File resultFile = new File(resultPath);

        try {
            FileOutputStream fs = new FileOutputStream(resultFile, true);
            FileChannel resultFileChannel = fs.getChannel();
            FileInputStream tfs;
            for (int i = 0; i < fpaths.length; i++) {
                tfs = new FileInputStream(fpaths[i]);
                FileChannel blk = tfs.getChannel();
                resultFileChannel.transferFrom(blk, resultFileChannel.size(), blk.size());
                tfs.close();
                blk.close();
            }
            fs.close();
            resultFileChannel.close();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        //删除缓存文件
        for (int i = 0; i < fpaths.length; i ++) {
            fpaths[i].delete();
        }
        return true;
    }

    /***
     * 删除文件夹下所有文件
     * @param filePath
     */
    public static boolean deleteFile(String filePath) {
        return deleteFile(new File(filePath));
    }
    /***
     * 删除文件夹下所有文件
     * @param file
     */
    public static boolean deleteFile(File file) {
        if (file.exists()) {
            if (file.isDirectory()) {
                for(File sub : file.listFiles()){
                    if(deleteFile(sub) == false)
                        return false;
                }
            }
            return file.delete();
        }
        return true;
    }
}

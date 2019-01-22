package com.paddy.pegasus.db;

/**
 * Created by wbf on 2018/12/27.
 */

public class DatabaseConstants {
    public static final int DATABASE_VERSION = 1;
    public static final String DATABASE_NAME = "down.db";

    public static class DownloadTable{
        public static final String TABLE_NAME= "download_info";

        public static final String URL = "url";
        public static final String LOCAL_URL = "local_url";
        public static final String ID = "id";
        public static final String EXTRA = "extra"; //额外扩展字段
        public static final String IS_DOWNLOADED = "is_downloaded"; //已经下载完成
        public static final String DOWNLOADING = "downloading";
        public static final String CONTENT_SIZE = "content_size";
        public static final String TS_COUNT_DOWNED = "ts_count_downed";  //m3u8已经下载数量
        public static final String TS_COUNT_TOTAL = "ts_count_total";  //m3u8总数量
        public static final String SECRET = "secret";  //是否是私密文件
        public static final String ERROR = "error";  //是否下载错误
        public static final String DID = "did";  //文件名和图片的字符串
        public static final String WAIT = "wait";  //是否等待中
        // 开始下载的点
        public static final String START = "start";
    }
}

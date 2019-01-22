package com.paddy.pegasus.db;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.paddy.pegasus.AppApplication;
import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.util.UrlUtil;

import java.util.ArrayList;

/**
 * Created by wbf on 2018/12/27.
 */

public class DatabaseManager extends SQLiteOpenHelper {
    protected static final String LOG_TAG = DatabaseManager.class.getSimpleName();
    private static DatabaseManager instance;

    private DatabaseManager(Context context, String name) {
        super(context, name, null, DatabaseConstants.DATABASE_VERSION);
    }

    public static DatabaseManager getInstance() {
        if (instance == null) {
            synchronized (LOG_TAG) {
                if (instance == null) {
                    instance = new DatabaseManager(AppApplication.getApp(), DatabaseConstants.DATABASE_NAME);
                }
            }
        }
        return instance;
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        createDownloadTable(db);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {

    }

    private void createDownloadTable(SQLiteDatabase db) {
        String sql = "CREATE TABLE " + DatabaseConstants.DownloadTable.TABLE_NAME
                + "("
                + DatabaseConstants.DownloadTable.ID + " text PRIMARY KEY,"
                + DatabaseConstants.DownloadTable.URL + " text ,"
                + DatabaseConstants.DownloadTable.EXTRA + " text ,"
                + DatabaseConstants.DownloadTable.LOCAL_URL + " text ,"
                + DatabaseConstants.DownloadTable.IS_DOWNLOADED + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.CONTENT_SIZE + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.DOWNLOADING + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.START + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.TS_COUNT_DOWNED + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.TS_COUNT_TOTAL + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.SECRET + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.ERROR + " integer DEFAULT 0,"
                + DatabaseConstants.DownloadTable.DID + " text ,"
                + DatabaseConstants.DownloadTable.WAIT + " integer DEFAULT 0"
                + ");";
        db.execSQL(sql);
    }
//  批量插入暂时注释
//    public void insertDownloadInfoList(List<DownloadInfo> info) {
//        if (info == null || info.size() <= 0)
//            return;
//
//        SQLiteDatabase db = getWritableDatabase();
//        if (db == null) {
//            Log.e("zp_test", LOG_TAG + " db is null");
//            return;
//        }
//
//        for (int i = 0; i < info.size(); i++) {
//            insertDownloadInfo(db, info.get(i));
//        }
//    }

    public void insertDownloadInfo(SQLiteDatabase db, DownloadInfo info) {
        if (info == null || db == null)
            return;
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.ID,UrlUtil.keyFromUrl(info.getUrl()));
        cv.put(DatabaseConstants.DownloadTable.URL,info.getUrl());
        cv.put(DatabaseConstants.DownloadTable.EXTRA,info.getExtra());
        cv.put(DatabaseConstants.DownloadTable.LOCAL_URL,info.getLocal_url());
        cv.put(DatabaseConstants.DownloadTable.IS_DOWNLOADED, info.isDownloaded()?1:0);
        cv.put(DatabaseConstants.DownloadTable.CONTENT_SIZE, info.getContentSize());
        cv.put(DatabaseConstants.DownloadTable.DOWNLOADING, info.isDownloading()?1:0);
        cv.put(DatabaseConstants.DownloadTable.START, info.getStart());
        cv.put(DatabaseConstants.DownloadTable.TS_COUNT_DOWNED, info.getDownIndex());
        cv.put(DatabaseConstants.DownloadTable.TS_COUNT_TOTAL, info.getTsCount());
        cv.put(DatabaseConstants.DownloadTable.SECRET, info.isSecret()?1:0);
        cv.put(DatabaseConstants.DownloadTable.ERROR, info.isError()?1:0);
        cv.put(DatabaseConstants.DownloadTable.DID, info.getDid());
        cv.put(DatabaseConstants.DownloadTable.WAIT, info.isWait()?1:0);
        db.insert(DatabaseConstants.DownloadTable.TABLE_NAME, null, cv);
    }

    public void updateStart(String url, int start,boolean isDownloaded) {
        updateStart(url,start,isDownloaded,0,-1,false);
    }

    public void updateStart(String url, int start,boolean isDownloaded,int M3U8count,int totalSize,boolean downloading) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.TS_COUNT_DOWNED, M3U8count);
        cv.put(DatabaseConstants.DownloadTable.START, start);
        cv.put(DatabaseConstants.DownloadTable.DOWNLOADING, downloading?1:0);
        cv.put(DatabaseConstants.DownloadTable.IS_DOWNLOADED, isDownloaded?1:0);
        if (totalSize != -1){
            cv.put(DatabaseConstants.DownloadTable.CONTENT_SIZE, totalSize);
        }
        getWritableDatabase()
                .update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                        DatabaseConstants.DownloadTable.ID + " = ?",
                        new String[]{key});

        if (isDownloaded){
            onDataChange(4);
        }
    }

    public void updateLoading(String url,boolean downloading) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.DOWNLOADING, downloading?1:0);
        getWritableDatabase()
            .update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                DatabaseConstants.DownloadTable.ID + " = ?",
                new String[]{key});
        onDataChange(1);
    }

    public void updateDownloadInfo(String url,DownloadInfo info) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.URL,info.getUrl());
        cv.put(DatabaseConstants.DownloadTable.EXTRA,info.getExtra());
        cv.put(DatabaseConstants.DownloadTable.LOCAL_URL,info.getLocal_url());
        cv.put(DatabaseConstants.DownloadTable.IS_DOWNLOADED, info.isDownloaded()?1:0);
        cv.put(DatabaseConstants.DownloadTable.CONTENT_SIZE, info.getContentSize());
        cv.put(DatabaseConstants.DownloadTable.DOWNLOADING, info.isDownloading()?1:0);
        cv.put(DatabaseConstants.DownloadTable.START, info.getStart());
        cv.put(DatabaseConstants.DownloadTable.TS_COUNT_DOWNED, info.getDownIndex());
        cv.put(DatabaseConstants.DownloadTable.TS_COUNT_TOTAL, info.getTsCount());
        cv.put(DatabaseConstants.DownloadTable.SECRET, info.isSecret()?1:0);
        cv.put(DatabaseConstants.DownloadTable.ERROR, info.isError()?1:0);
        cv.put(DatabaseConstants.DownloadTable.DID, info.getDid());
        cv.put(DatabaseConstants.DownloadTable.WAIT, info.isWait()?1:0);
        getWritableDatabase().update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                DatabaseConstants.DownloadTable.ID + " = ?",
                new String[]{key});
        onDataChange(1);
    }

    //更新暂停
    public void updateWait(String url,boolean wait) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.WAIT, wait?1:0);
        getWritableDatabase()
            .update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                DatabaseConstants.DownloadTable.ID + " = ?",
                new String[]{key});
        onDataChange(3);
    }

    //更新私密信息
    public void updatePrivate(String url,boolean secret) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.SECRET, secret?1:0);
        getWritableDatabase()
            .update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                DatabaseConstants.DownloadTable.ID + " = ?",
                new String[]{key});
        onDataChange(7);
    }

    //更新error信息
    public void updateError(String url,boolean error) {
        String key = getKey(url);
        ContentValues cv = new ContentValues();
        cv.put(DatabaseConstants.DownloadTable.ERROR, error?1:0);
        cv.put(DatabaseConstants.DownloadTable.DOWNLOADING, 0);
        getWritableDatabase()
            .update(DatabaseConstants.DownloadTable.TABLE_NAME, cv,
                DatabaseConstants.DownloadTable.ID + " = ?",
                new String[]{key});
        onDataChange(5);
    }

    public int deleteOneDownloadInfo(String id) {
        SQLiteDatabase db = getReadableDatabase();
        if (id == null || db == null){
            return -1;
        }
        int count = 0;
        if (db.isOpen()) {
            count = db.delete(DatabaseConstants.DownloadTable.TABLE_NAME, "id = ? ", new String[] {id});
        }
        onDataChange(6);
        return count;
    }

    public int deleteAllDownloadInfo() {
        SQLiteDatabase db = getReadableDatabase();
        if ( db == null){
            return -1;
        }
        int count = 0;
        if (db.isOpen()) {
            count = db.delete(DatabaseConstants.DownloadTable.TABLE_NAME, "1=1", new String[] {});
        }
        onDataChange(6);
        return count;
    }
    public int deleteAllDownloadInfo(int Private) {
        SQLiteDatabase db = getReadableDatabase();
        if ( db == null){
            return -1;
        }
        int count = 0;
        if (db.isOpen()) {
            count = db.delete(DatabaseConstants.DownloadTable.TABLE_NAME, "secret=?",
                new String[] {Private+""});
        }
        onDataChange(6);
        return count;
    }

    public ArrayList<DownloadInfo> getAllInfo() {
        ArrayList<DownloadInfo> list = new ArrayList<>();
        String sql = "select * from " + DatabaseConstants.DownloadTable.TABLE_NAME;
        Cursor cursor = doQueryAction(sql, null);
        if (cursor != null && cursor.moveToFirst()) {
            do {
                DownloadInfo info = getInfoFromCursor(cursor);
                list.add(info);
            } while (cursor.moveToNext());

            if (cursor != null)
                cursor.close();
            return list;
        }
        return null;
    }

    /**
     * @param Private 是否是私密的
     * @return
     */

    public ArrayList<DownloadInfo> getAllInfo(int Private) {
        ArrayList<DownloadInfo> list = new ArrayList<>();
        String sql = "select * from " + DatabaseConstants.DownloadTable.TABLE_NAME
            + " where "
            + DatabaseConstants.DownloadTable.SECRET
            + " = '"
            + Private
            + "'";;
        Cursor cursor = doQueryAction(sql, null);
        if (cursor != null && cursor.moveToFirst()) {
            do {
                DownloadInfo info = getInfoFromCursor(cursor);
                list.add(info);
            } while (cursor.moveToNext());

            if (cursor != null)
                cursor.close();
            return list;
        }
        return null;
    }

    public DownloadInfo getInfoById(String key) {
        String sql = "select * from " + DatabaseConstants.DownloadTable.TABLE_NAME
                + " where "
                + DatabaseConstants.DownloadTable.ID
                + " = '"
                + key
                + "'";
        Cursor cursor = doQueryAction(sql, null);
        if (cursor != null && cursor.moveToFirst()) {
            do {
                DownloadInfo info = getInfoFromCursor(cursor);
                if (cursor != null)
                    cursor.close();
                return info;
            } while (cursor.moveToNext());
        }
        return null;
    }

    private Cursor doQueryAction(String sql, String[] selectionArgs) {
        return getReadableDatabase().rawQuery(sql, selectionArgs);
    }

    private DownloadInfo getInfoFromCursor(Cursor cursor) {
        DownloadInfo info = new DownloadInfo();
        info.setId(cursor.getString(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.ID)));
        info.setUrl(cursor.getString(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.URL)));
        info.setLocal_url(cursor.getString(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.LOCAL_URL)));
        info.setExtra(cursor.getString(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.EXTRA)));
        info.setDownloaded(cursor.getInt(cursor.getColumnIndex(DatabaseConstants
                .DownloadTable.IS_DOWNLOADED)) == 1 ? true : false);
        info.setContentSize(cursor.getInt(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.CONTENT_SIZE)));
        info.setDownloading(cursor.getInt(cursor.getColumnIndex(DatabaseConstants
                .DownloadTable.DOWNLOADING)) == 1 ? true : false);
        info.setStart(cursor.getInt(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.START)));
        info.setDownIndex(cursor.getInt(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.TS_COUNT_DOWNED)));
        info.setTsCount(cursor.getInt(cursor
                .getColumnIndex(DatabaseConstants.DownloadTable.TS_COUNT_TOTAL)));
        info.setSecret(cursor.getInt(cursor.getColumnIndex(DatabaseConstants
            .DownloadTable.SECRET)) == 1 ? true : false);
        info.setError(cursor.getInt(cursor.getColumnIndex(DatabaseConstants
            .DownloadTable.ERROR)) == 1 ? true : false);
        info.setDid(cursor.getString(cursor
            .getColumnIndex(DatabaseConstants.DownloadTable.DID)));
        info.setWait(cursor.getInt(cursor.getColumnIndex(DatabaseConstants
            .DownloadTable.WAIT)) == 1 ? true : false);
        return info;
    }

    public String getKey(String url) {
        if (url == null) {
            Log.e("zp_test", LOG_TAG + " url is null......");
            return null;
        }
        return UrlUtil.keyFromUrl(url);
    }

    public static OnDataChangeCallbacks callBack = null;

    public void onDataChange(int state) {
        // 1 2,3 更新下载 等待 暂停状态 4,下载完成 5,下载错误回调 6,删除回调 7更新私密
        //内容变化时 调用
        if (null != callBack){
            callBack.onDataChange(state);
        }
    }

    public interface OnDataChangeCallbacks {
        void onDataChange(int state);
    }

    /**
     * 注册权限回调监听
     */
    public static void registerDataChangeCallBack(OnDataChangeCallbacks CallBack){
        callBack = CallBack;
    }
}

package com.rn;

import android.content.Context;

/**
 * @author wbf
 * 全局app级别的缓存 只有用代码清除
 */
public class CacheAppData extends CacheDataBase {

	private CacheAppData() {
	}

	private static CacheAppData cache = null;
	public static CacheAppData getInstance(){
		if(cache == null){
			cache = new CacheAppData();
		}
		return cache;
	}

	@Override
	public String getSpName() {
		return BaseConstant.CACHE_APP_DATA;
	}

	public static boolean contains(Context context, String key) {
		return getInstance().contains(key);
	}
	public static void keep(Context context, String key , String value) {
		getInstance().keep(key, value);
	}

	public static  String read(Context context,String key) {
		return getInstance().read(key, null);
	}
	public static String read(Context context,String key,String value) {
		return getInstance().read(key, value);
	}

	public static void keepInt(Context context, String key , int value) {
		getInstance().keepInt(key, value);
	}
	public static int readInt(Context context,String key,int value) {
		return getInstance().readInt(key, value);
	}

	public static void keepLong(Context context, String key , long value) {
		getInstance().keepLong(key, value);
	}
	public static long readLong(Context context,String key,long value) {
		return getInstance().readLong(key, value);
	}

	public static void keepBoolean(Context context, String key , boolean value) {
		getInstance().keepBoolean(key, value);
	}
	public static boolean readBoolean(Context context,String key,boolean value) {
		return getInstance().readBoolean(key, value);
	}

	public static boolean remove(Context context,String key){
		return getInstance().remove(key);
	}
}

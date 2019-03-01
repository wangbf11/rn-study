package com.rn;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.util.Log;


/**
 * @author wbf
 */
public abstract class CacheDataBase {
	protected SharedPreferences sp = null;

	public CacheDataBase() {
		sp = MainApplication.getMyApplication().getSharedPreferences(getSpName(), Context.MODE_PRIVATE);
	}
	public abstract String getSpName();
	/**
	 * 判断缓存的key是否存在
	 * @param key
	 * @return
	 */
	public boolean contains(String key) {
		try {
			return sp.contains(key);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return false;
	}
	/**
	 * 缓存字符串
	 * @param key
	 * @param value
	 */
	public void keep(String key , String value) {
		try {
			Editor editor = sp.edit();
			editor.putString(key, value);
			editor.commit();
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存存储失败",e);
		}
	}
	/**
	 * 获取缓存的字符串 ，空以null返回
	 * @param key
	 * @return
	 */
	public String read(String key) {
		try {
			return sp.getString(key,null);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return null;
	}
	public String read(String key,String defValue) {
		try {
			return sp.getString(key, defValue);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return defValue;
	}

	public void keepInt(String key , int value) {
		try {
			Editor editor = sp.edit();
			editor.putInt(key, value);
			editor.commit();
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存存储失败",e);
		}
	}
	public int readInt(String key,int defValue) {
		try {
			return sp.getInt(key, defValue);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return defValue;
	}

	public void keepLong(String key , long value) {
		try {
			Editor editor = sp.edit();
			editor.putLong(key, value);
			editor.commit();
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存存储失败",e);
		}
	}

	public long readLong(String key,long defValue) {
		try {
			return sp.getLong(key, defValue);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return defValue;
	}

	public void keepBoolean(String key , boolean value) {
		try {
			Editor editor = sp.edit();
			editor.putBoolean(key, value);
			editor.commit();
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存存储失败",e);
		}
	}

	public boolean readBoolean(String key,boolean defValue) {
		try {
			return sp.getBoolean(key, defValue);
		} catch (Exception e) {
			Log.e(this.toString(), key+"缓存读取失败",e);
		}
		return defValue;
	}

	public boolean remove(String key){
		return sp.edit().remove(key).commit();
	}

	public boolean clear() {
		return sp.edit().clear().commit();
	}

	public boolean clear(String spName) {
		return MainApplication.getMyApplication().getSharedPreferences(spName, Context.MODE_PRIVATE).edit().clear().commit();
	}


	public enum ClearType {
		ClearTypeApp,
		ClearTypeUser
	}
	/**
	 * 清理本地缓存
	 * @param clearType
	 * 1 全部  2 清理当前
	 * @return
	 */
	public static boolean clear(ClearType clearType){
		switch (clearType) {
			case ClearTypeApp:
				CacheUserData.getInstance().clear();
				break;
			case ClearTypeUser:
				CacheAppData.getInstance().clear();
				break;
			default:
				break;
		}
		return true;
	}
}

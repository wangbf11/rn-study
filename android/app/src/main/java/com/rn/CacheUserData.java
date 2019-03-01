package com.rn;

/**
 * @author wbf
 * 用户退出登录就会清除这个sp中的缓存
 */
public class CacheUserData  extends CacheDataBase{
	public static CacheUserData cacheUserData;
	private static String spName = BaseConstant.CACHE_USER_DATA;
	//Token相关
	public static final String ACCESS_TOKEN = "access_token";


	//用户ID
	private static final String PERSON_ID = "personId";
	//用户姓名
	public static final String PERSON_NAME = "personName";
	// 登录名
	public static final String LOGIN_NAME = "loginName";

	public CacheUserData() {
	}

	@Override
	public String getSpName() {
		return spName;
	}

	public static void setSpName(String spName) {
		CacheUserData.spName = spName;
	}

	public static CacheUserData getInstance(){
		if (cacheUserData == null) {
			cacheUserData = new CacheUserData();
		}
		return cacheUserData;
	}

	public String readToken() {
		return read(ACCESS_TOKEN);
	}
	public void keepToken(String token) {
		keep(ACCESS_TOKEN,token);
	}

	public void keepPersonID(String personID) {
		keep(PERSON_ID, personID);
	}

	public String readPersonID() {
		return read(PERSON_ID);
	}



}

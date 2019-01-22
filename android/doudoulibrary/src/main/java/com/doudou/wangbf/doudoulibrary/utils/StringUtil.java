package com.doudou.wangbf.doudoulibrary.utils;

public class StringUtil {

    public static boolean isEmpty(String str) {
        return str == null || str.length() == 0 || "null".equalsIgnoreCase(str);
    }

    public static boolean isBlank(String str) {
        if (isEmpty(str)) {
            return true;
        } else {
            for(int i = 0; i < str.length(); ++i) {
                if (!Character.isWhitespace(str.charAt(i))) {
                    return false;
                }
            }

            return true;
        }
    }


    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }
}

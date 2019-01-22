import React, {Component} from 'react';
import store from 'react-native-simple-store';
/**
 * Created by wbf
 */
export default class StoreUtil {

    static saveToken(token) {
        store.save('Token', token);
    }

    static getToken() {
        return store.get('Token');
    }

    static saveUserInfo(userInfo) {
        store.save('UserInfo', token);
    }

    static getUserInfo() {
        return store.get('UserInfo');
    }
}

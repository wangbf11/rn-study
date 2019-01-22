import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
/**
 * Created by wbf 
 */
export default class ToastUtil {

    static show(hint) {
        ToastAndroid.show(hint, ToastAndroid.SHORT);
    }

}

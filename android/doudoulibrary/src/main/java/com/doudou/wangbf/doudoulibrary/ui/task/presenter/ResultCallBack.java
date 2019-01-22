package com.doudou.wangbf.doudoulibrary.ui.task.presenter;

/**
 * Created by wbf
 * Function：结果回调
 */
public interface ResultCallBack<T> {
    void success(T bean);

    void error(int errorCode, String msg);
}

package com.paddy.pegasus.base;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Bundle;
import android.os.IBinder;
import android.support.annotation.ColorRes;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.LinearLayout;

import com.gyf.barlibrary.ImmersionBar;
import com.paddy.pegasus.R;


/**
 * Created by wbf on on 2018/9/25.
 */
public abstract class BaseMvcActivity extends AppCompatActivity {

    private boolean mEnabled = false;
    private ImmersionBar mImmersionBar;
    private LinearLayout topBar;
    public Activity mContext;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(getLayoutId());
        mContext = this;
        mImmersionBar = ImmersionBar.with(this);
        topBar = (LinearLayout)findViewById(R.id.ll_topBar);
        setTopBarBackgroundColor(R.color.white);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
            //如果当前为横屏,变竖屏生命周期重走 销毁的横屏不能让activity走下面方法
            //默认情况强制竖屏
            if (!mEnabled){
                setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
                return;
            }
        }
        initData();
        initView();
        initListener();
        loadData();
    }

    public void setTopBarBackgroundColor(@ColorRes int topBarColor) {
        if (null != topBar){
            topBar.setBackgroundColor(getResources().getColor(topBarColor));
        }
        mImmersionBar.statusBarColor(topBarColor)
                .statusBarDarkFont(true)
                .fitsSystemWindows(true)
                .init();
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        if (mImmersionBar != null)
            mImmersionBar.destroy();
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    @Override
    public void onPause() {
        super.onPause();
    }

    /**
     * 视图id
     */
    public abstract int getLayoutId();

    /**
     * 上下文对象
     *
     * @return 当前子类
     */
    public Activity getActivity() {
        return this;
    }

    /**
     * 初始化数据
     */
    public abstract void initData();

    /**
     * 初始化视图
     */
    public abstract void initView();

    /**
     * 初始化监听事件
     */
    public abstract void initListener();

    /**
     * 剩余的逻辑代码，加载数据都放在这里处理
     */
    public abstract void loadData();

    /**
     * 防止Fragment崩溃后重置Activity导致的Fragment重叠问题
     */
    @SuppressLint("MissingSuperCall")
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        //super.onSaveInstanceState(outState);
    }

    /**
     * 暴露设置横竖屏切换的接口
     *
     * @param enabled 是否可以横竖屏的切换
     */
    public void setOrientationEnabled(boolean enabled) {
        mEnabled = enabled;
    }

    //--------------------------------------隐藏软键盘方案---------------------------------------------//
    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        if (ev.getAction() == MotionEvent.ACTION_DOWN) {
            View v = getCurrentFocus();
            if (isShouldHideKeyboard(v, ev)) {
                hideKeyboard(v.getWindowToken());
            }
        }
        return super.dispatchTouchEvent(ev);
    }

    /**
     * 根据EditText所在坐标和用户点击的坐标相对比，来判断是否隐藏键盘，因为当用户点击EditText时则不能隐藏
     */
    private boolean isShouldHideKeyboard(View v, MotionEvent event) {
        if (v != null && (v instanceof EditText)) {
            int[] l = {0, 0};
            v.getLocationInWindow(l);
            int left = l[0],
                    top = l[1],
                    bottom = top + v.getHeight(),
                    right = left + v.getWidth();
            return !(event.getX() > left && event.getX() < right
                    && event.getY() > top && event.getY() < bottom);
        }
        // 如果焦点不是EditText则忽略，这个发生在视图刚绘制完，第一个焦点不在EditText上，和用户用轨迹球选择其他的焦点
        return false;
    }

    /**
     * 获取InputMethodManager，隐藏软键盘
     */
    private void hideKeyboard(IBinder token) {
        if (token != null) {
            InputMethodManager im = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            if (im != null) {
                im.hideSoftInputFromWindow(token, InputMethodManager.HIDE_NOT_ALWAYS);
            }
        }
    }

    @Override
    public Resources getResources() {
        Resources resources = super.getResources();
        Configuration configuration = new Configuration();
        configuration.setToDefaults();
        resources.updateConfiguration(configuration, resources.getDisplayMetrics());
        return resources;
    }
}

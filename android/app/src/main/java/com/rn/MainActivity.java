package com.rn;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.NonNull;

import com.facebook.react.ReactActivity;
import com.umeng.socialize.UMShareAPI;

import org.devio.rn.splashscreen.SplashScreen;

import fdg.ewa.wda.AdManager;
import fdg.ewa.wda.os.df.DiyOfferWallManager;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rn";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
        UMShareModule.initSocialSDK(this);
        MainApplication.getMyApplication().reactActivity = this;
        // 初始化接口，应用启动的时候调用，参数：appId, appSecret, isEnableYoumiLog
        AdManager.getInstance(this).init("0ea38b9e22ce5ad7", "628cf20c72c11050", true);
        // 请务必调用以下代码，告诉积分墙源数据SDK应用启动，可以让SDK进行一些初始化操作。该接口务必在SDK的初始化接口之后调用。
        DiyOfferWallManager.getInstance(this).onAppLaunch();

    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 请务必在应用退出的时候调用以下代码，告诉SDK应用已经关闭，可以让SDK进行一些资源的释放和清理。
        DiyOfferWallManager.getInstance(this).onAppExit();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        PermissionUtil.onRequestPermissionsResult(requestCode,permissions,grantResults);
    }

}

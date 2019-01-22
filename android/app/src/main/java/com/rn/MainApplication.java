package com.rn;

import android.support.multidex.MultiDexApplication;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.lmy.smartrefreshlayout.SmartRefreshLayoutPackage;
import com.microsoft.codepush.react.CodePush;
import com.paddy.pegasus.AppApplication;
import com.rn.toupin.LelinkHelper;
import com.rnfs.RNFSPackage;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.PlatformConfig;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {
  private static MainApplication sMyApplication;
  public MainActivity reactActivity;
  private LelinkHelper mLelinkHelper;

  public static MainApplication getMyApplication() {
    return sMyApplication;
  }
  public LelinkHelper getLelinkHelper() {
    return mLelinkHelper;
  }


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
        return CodePush.getJSBundleFile();
        }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }



    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new SplashScreenReactPackage(),
            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),
            getApplicationContext(), BuildConfig.DEBUG,getResources().getString(R.string.reactNativeCodePush_androidDeploymentServer)),
            new LinearGradientPackage(),
            new SmartRefreshLayoutPackage(),
            new TestReactPackage(),
            new DplusReactPackage()
      );
    }
    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    sMyApplication = this;
    SoLoader.init(this, /* native exopackage */ false);
    initUmeng();
    AppApplication.setApp(this);
    mLelinkHelper = LelinkHelper.getInstance(getApplicationContext());
  }

  private void initUmeng() {
    //日志和日志加密
//        UMConfigure.setEncryptEnabled(true);
    UMConfigure.setLogEnabled(true);
    //初始化组件化基础库, 统计SDK/推送SDK/分享SDK都必须调用此初始化接口
    RNUMConfigure.init(this, "59892f08310c9307b60023d0", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            "669c30a9584623e70e8cd01b0381dcb4");
  }

  {

    PlatformConfig.setWeixin("wxdc1e388c3822c80b", "3baf1193c85774b3fd9d18447d76cab0");
    //豆瓣RENREN平台目前只能在服务器端配置
    PlatformConfig.setSinaWeibo("3921700954", "04b48b094faeb16683c32669824ebdad", "http://sns.whalecloud.com");
    PlatformConfig.setQQZone("100424468", "c7394704798a158208a74ab60104f0ba");

  }
}

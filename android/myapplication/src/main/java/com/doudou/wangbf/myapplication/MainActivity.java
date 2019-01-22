package com.doudou.wangbf.myapplication;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.TextView;

import com.paddy.pegasus.AppApplication;
import com.paddy.pegasus.executors.DownloadTaskRunnable;
import com.paddy.pegasus.executors.PegasusExecutors;
import com.paddy.pegasus.util.UrlUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Future;

import fdg.ewa.wda.AdManager;
import fdg.ewa.wda.os.df.DiyOfferWallManager;

public class MainActivity extends AppCompatActivity {
    private Map<String,Future<?>> runMap = new HashMap<>();
    private PegasusExecutors executors = new PegasusExecutors();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        AppApplication.setApp(this);
        // 初始化接口，应用启动的时候调用，参数：appId, appSecret, isEnableYoumiLog
        AdManager.getInstance(this).init("0ea38b9e22ce5ad7", "628cf20c72c11050", true);
        // 请务必调用以下代码，告诉积分墙源数据SDK应用启动，可以让SDK进行一些初始化操作。该接口务必在SDK的初始化接口之后调用。
        DiyOfferWallManager.getInstance(this).onAppLaunch();
        TextView text = (TextView)findViewById(R.id.text);
        verifyStoragePermissions(this,true);
        text.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
//                Intent intent = new Intent();
//                intent.setClass(MainActivity.this, SelectedTaskActivity.class);
//                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//                startActivity(intent);


                String url = "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8";
                runMap.put(UrlUtil.keyFromUrl(url),
                        executors.submit(new DownloadTaskRunnable(url, "m3u8RN125",new MyHandler()
                                ,"prog_index.m3u8")));
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 请务必在应用退出的时候调用以下代码，告诉SDK应用已经关闭，可以让SDK进行一些资源的释放和清理。
        DiyOfferWallManager.getInstance(this).onAppExit();
    }

    private final static boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M;
    //读写SD卡的权限
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE };
    public static final int REQUEST_EXTERNAL_STORAGE = 1;
    /**
     * 动态获取读写SD卡的权限
     */
    public static boolean verifyStoragePermissions(Activity activity , boolean needRequest) {
        if (isKitKat) {
            try {
                //检测是否有写的权限
                int writePermission = ActivityCompat.checkSelfPermission(activity,Manifest.permission.WRITE_EXTERNAL_STORAGE);
                //检查是否有读的权限
                int readPermission = ActivityCompat.checkSelfPermission(activity,Manifest.permission.READ_EXTERNAL_STORAGE);
                if ( writePermission != PackageManager.PERMISSION_GRANTED || readPermission != PackageManager.PERMISSION_GRANTED) {
                    // 没有读或写的权限，去申请写的权限，会弹出对话框
                    if (needRequest){
                        ActivityCompat.requestPermissions(activity, PERMISSIONS_STORAGE, REQUEST_EXTERNAL_STORAGE);
                    }
                    return false;
                }else {
                    return true;
                }
            } catch (Exception e) {
                return false;
            }
        }else {
            return true;  //6.0以下不需要动态权限
        }
    }

    static class MyHandler extends Handler {

        @Override
        public void handleMessage(Message msg) {
            if (msg == null)
                return;
//
//            ProgressBar pb = (ProgressBar) msg.obj;
//            pb.setProgress(msg.arg1);

//            if (msg.arg1 == 100)
//                pb = null;
        }
    }
}

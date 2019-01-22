package com.rn;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wbf on 2018/3/26.
 */
public class PermissionUtil {
    public static final int REQUEST_EXTERNAL_STORAGE = 1;
    public static final int REQUEST_CAMERA = 2;
    public static final int REQUEST_PHONE_STATE = 3;
    public static final int REQUEST_RECORD_AUDIO = 4;
    public static final int CODE_MULTI_PERMISSION = 5; //多个权限
    public static final int REQUEST_LOCATION = 6;
    public static final int REQUEST_CALL_PHONE = 7;
    public static onRequestPermissionsResultCallbacks callBack = null;

    private final static boolean isKitKat = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M;

    //打电话权限
    private static String[] PERMISSIONS_CALL_PHONE = {
            Manifest.permission.CALL_PHONE
    };
    //使用相机的权限
    private static String[] PERMISSIONS_CAMERA = {
            Manifest.permission.CAMERA
    };
    //录音的权限
    private static String[] PERMISSION_RECORD_AUDIO = {
            Manifest.permission.RECORD_AUDIO
    };

    //包含了 下面3种 定位,手机设备信息,Sd卡 这3种dajia必须要有才能进入app
    private static  String[] requestPermissions = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_PHONE_STATE,
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION,
//            Manifest.permission.GET_ACCOUNTS,
//            Manifest.permission.READ_CONTACTS
    };
    private static  String[] PERMISSION_LOCATION = {
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.ACCESS_FINE_LOCATION,
    };
    //获取手机状态的权限
    private static String[] PERMISSION_PHONE_STATE = {
            Manifest.permission.READ_PHONE_STATE
    };
    //读写SD卡的权限
    private static String[] PERMISSIONS_STORAGE = {
            Manifest.permission.READ_EXTERNAL_STORAGE,
            Manifest.permission.WRITE_EXTERNAL_STORAGE };
    /**
     * 动态获取定位的权限
     */
    public static boolean verifyLocationPermissions(Activity activity) {
        if (isKitKat) {
            try {
                //检测是否允许通过网络定位
                int coarsePermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_COARSE_LOCATION);
                //检查是否允许通过GPS定位
                int finePermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION);
                if (coarsePermission != PackageManager.PERMISSION_GRANTED || finePermission != PackageManager.PERMISSION_GRANTED) {
                    // 没有读或写的权限，去申请写的权限，会弹出对话框
                    ActivityCompat.requestPermissions(activity, PERMISSION_LOCATION, REQUEST_LOCATION);
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
    /**
     * 动态获取读写SD卡的权限
     */
    public static boolean verifyStoragePermissions(Activity activity , boolean needRequest) {
        if (isKitKat) {
            try {
                //检测是否有写的权限
                int writePermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.WRITE_EXTERNAL_STORAGE);
                //检查是否有读的权限
                int readPermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.READ_EXTERNAL_STORAGE);
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

    /**
     * 动态获取使用相机的权限
     */
    public static boolean verifyCameraPermission(Activity activity) {
        if (isKitKat) {
            try {
                //检查是否有使用相机的权限
                int cameraPermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.CAMERA);
                if (cameraPermission != PackageManager.PERMISSION_GRANTED){
                    //没有使用相机的权限，去申请
                    ActivityCompat.requestPermissions(activity,PERMISSIONS_CAMERA,REQUEST_CAMERA);
                    return false;
                }else {
                    return true;
                }
            }catch (Exception e){
                return false;  //6.0以下不需要动态权限
            }
        }else {
            return true;  //6.0以下不需要动态权限
        }
    }

    /**\
     * 动态申请获取手机状态的权限  获取手机唯一id用到
     */
    public static boolean verifyPhoneStatePermission(Context mContext , boolean needRequest){
        if (isKitKat){
            //检查是否有获取手机状态的权限
            int phoneStatePermission = ActivityCompat.checkSelfPermission(mContext, Manifest.permission.READ_PHONE_STATE);
            if (phoneStatePermission != PackageManager.PERMISSION_GRANTED ){
                //没有获取手机状态的权限，去申请
                if (needRequest){
                    ActivityCompat.requestPermissions((Activity) mContext,PERMISSION_PHONE_STATE,REQUEST_PHONE_STATE);
                }
                return false;
            }else {
                return true; //已经获取到权限
            }
        } else {
            return true;   //安卓6.0以下不需动态申请权限
        }
    }

    /**
     * 动态获取打电话的权限
     */
    public static boolean verifyCallPhonePermission(Activity activity) {
        if (isKitKat) {
            try {
                //检查是否有使用相机的权限
                int cameraPermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.CALL_PHONE);
                if (cameraPermission != PackageManager.PERMISSION_GRANTED){
                    //没有使用相机的权限，去申请
                    ActivityCompat.requestPermissions(activity,PERMISSIONS_CALL_PHONE,REQUEST_CALL_PHONE);
                    return false;
                }else {
                    return true;
                }
            }catch (Exception e){
                return false;  //6.0以下不需要动态权限
            }
        }else {
            return true;  //6.0以下不需要动态权限
        }
    }

    /**
     * 动态获取录音的权限
     */
    public static boolean verifyRecordAudioPermission(Activity activity){
        if (isKitKat) {
            //检查是否有录音的权限
            int recordAudioPermission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.RECORD_AUDIO);
            if (recordAudioPermission != PackageManager.PERMISSION_GRANTED) {
                //没有录音的权限，去申请
                ActivityCompat.requestPermissions(activity, PERMISSION_RECORD_AUDIO, REQUEST_RECORD_AUDIO);
                return false;
            }else {
                return true;
            }
        }else {
            return true;
        }
    }

    /**
     * 一次申请多个权限
     */
    public static boolean verifyMultiPermissions(Activity activity) {
        if (isKitKat) {
            final List<String> permissionsList = getNoGrantedPermission(activity);
            if (permissionsList == null) {
                return true;
            }
            if (permissionsList.size() > 0) {
                ActivityCompat.requestPermissions(activity, permissionsList.toArray(new String[permissionsList.size()]),
                        CODE_MULTI_PERMISSION);
                return false;
            }else {
                return true;
            }
        }else {
            return true;
        }
    }

    /**
     * 没有权限的列表
     */
    public static ArrayList<String> getNoGrantedPermission(Activity activity) {
        ArrayList<String> permissions = new ArrayList<>();
        for (int i = 0; i < requestPermissions.length; i++) {
            String requestPermission = requestPermissions[i];
            int checkSelfPermission = -1;
            try {
                checkSelfPermission = ActivityCompat.checkSelfPermission(activity, requestPermission);
            } catch (RuntimeException e) {
                return null;
            }
            if (checkSelfPermission != PackageManager.PERMISSION_GRANTED) {

                if (ActivityCompat.shouldShowRequestPermissionRationale(activity, requestPermission)) {
                    permissions.add(requestPermission);   //当用户之前已经请求过该权限并且拒绝了授权这个方法返回true 目前我们还是去请求
                } else {
                    permissions.add(requestPermission);
                }
            }
        }
        return permissions;
    }



    /**
     * 申请权限返回方法
     */
    public static void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                                  @NonNull int[] grantResults) {
        List<String> granted = new ArrayList<>();
        List<String> denied = new ArrayList<>();
        for (int i = 0; i < permissions.length; i++) {
            String perm = permissions[i];
            if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                granted.add(perm);
            } else {
                denied.add(perm);
            }
        }

        if (null != callBack) {
            if (!granted.isEmpty()) {
                callBack.onPermissionsGranted(requestCode, granted, denied.isEmpty());
            }
            if (!denied.isEmpty()) {
                callBack.onPermissionsDenied(requestCode, denied, granted.isEmpty());
            }
        }
    }
    /**
     * 申请权限返回
     */
    public interface onRequestPermissionsResultCallbacks {
        /**
         * @param isAllGranted 是否全部同意
         * @param permissions 已经同意的同意
         */
        void onPermissionsGranted(int requestCode, List<String> permissions, boolean isAllGranted);

        /**
         * @param isAllDenied 是否全部拒绝
         * @param permissions 被拒绝的
         */
        void onPermissionsDenied(int requestCode, List<String> permissions, boolean isAllDenied);

    }

    /**
     * 注册权限回调监听
     */
    public static void registerPermissionsCallBack(onRequestPermissionsResultCallbacks permissionsCallBack){
        callBack = permissionsCallBack;
    }
}

package com.paddy.pegasus.util;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

import com.paddy.pegasus.AppApplication;

public class NetworkUtils {
    public static boolean isWifiConnected() {
        if (AppApplication.getApp() != null) {
            ConnectivityManager mConnectivityManager = (ConnectivityManager) AppApplication.getApp()
                .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo mWiFiNetworkInfo = mConnectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
            if (mWiFiNetworkInfo != null) {
                return mWiFiNetworkInfo.isAvailable();
            }
        }
        return false;
    }
}

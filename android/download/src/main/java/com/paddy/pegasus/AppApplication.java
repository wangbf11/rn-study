package com.paddy.pegasus;

import android.content.Context;

public class AppApplication {
    private static Context app;

    public static void setApp(Context app) {
        AppApplication.app = app;
    }

    public static Context getApp(){ return app;}
}

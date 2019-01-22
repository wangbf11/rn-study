package com.rn;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;

import com.rn.R;

public class TestActivity extends Activity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test);
    }
}

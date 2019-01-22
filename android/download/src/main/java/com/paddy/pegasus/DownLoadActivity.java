package com.paddy.pegasus;

import android.view.View;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import com.paddy.pegasus.base.BaseMvcActivity;
import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.executors.PegasusExecutors;

import java.util.ArrayList;

public class DownLoadActivity extends BaseMvcActivity implements View.OnClickListener {
    private DownLoadActivity activity;
    private ListView mList;
    private PegasusExecutors executors;
    private ImageView mIv_left;
    private ListViewAdapter mAdapter;
    private ArrayList<DownloadInfo> downloadList;
    private String[] urlList = {"http://app.mi.com/download/18076",
            "http://app.mi.com/download/113"};


    @Override
    public int getLayoutId() {
        return R.layout.activity_download;
    }

    @Override
    public void initData() {
        activity = this;
        downloadList = new ArrayList<>();
        for (int i = 0; i < urlList.length; i++) {
            DownloadInfo info = new DownloadInfo();
            info.setUrl(urlList[i]);
            downloadList.add(info);
        }
    }

    public void initView() {
        TextView tv_title = (TextView)findViewById(R.id.tv_title);
        mIv_left = (ImageView)findViewById(R.id.iv_left);
        tv_title.setText("下载页面");

        mList = (ListView) findViewById(R.id.main_list);
        executors = new PegasusExecutors();
        mAdapter = new ListViewAdapter(activity, downloadList, executors);
        mList.setAdapter(mAdapter);
    }

    @Override
    public void initListener() {
        mIv_left.setOnClickListener(this);
    }

    @Override
    public void loadData() {

    }


    @Override
    public void onDestroy() {
        super.onDestroy();
        executors.shutdown();
    }


    @Override
    public void onClick(View view) {
        int i = view.getId();
        if (i == R.id.iv_left) {
            finish();
        }
    }

}

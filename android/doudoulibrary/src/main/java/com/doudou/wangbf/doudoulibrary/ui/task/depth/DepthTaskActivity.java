package com.doudou.wangbf.doudoulibrary.ui.task.depth;

import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.doudou.wangbf.doudoulibrary.R;
import com.doudou.wangbf.doudoulibrary.base.BaseMvcActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.adpter.SelectTaskAdapter;
import com.doudou.wangbf.doudoulibrary.ui.task.model.InfoModel;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskBean;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskModel;
import com.doudou.wangbf.doudoulibrary.ui.task.presenter.TaskPresenter;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;

import java.util.ArrayList;
import java.util.List;

import fdg.ewa.wda.os.df.DiyOfferWallManager;

public class DepthTaskActivity extends BaseMvcActivity implements View.OnClickListener {
    private List<TaskBean> mCustomObjectList;
    private SelectTaskAdapter mAdapter;
    private ImageView mIv_left;
    private SmartRefreshLayout mRefresh_content;
    private RecyclerView mRv_content;
    /**
     * 分页
     */
    private int mPageIndex = 1;
    /**
     * 每页请求数量
     */
    private final static int AD_PER_NUMBER = 10;
    /**
     * 请求广告类型
     * <li>{@link DiyOfferWallManager#ym_param_REQUEST_ALL} : 请求所有，游戏先于应用展示</li>
     * <li>{@link DiyOfferWallManager#ym_param_REQUEST_SPECIAL_SORT} : 请求所有，应用先于游戏展示</li>
     * <li>{@link DiyOfferWallManager#ym_param_REQUEST_APP} : 只请求应用广告</li>
     * <li>{@link DiyOfferWallManager#ym_param_REQUEST_GAME} : 只请求游戏广告</li>
     * <li>{@link DiyOfferWallManager#ym_param_REQUEST_EXTRA_TASK} : 请求追加任务列表</li>
     */
    private int mRequestType;
    private TaskPresenter mTaskPresenter;

    @Override
    public int getLayoutId() {
            return R.layout.activity_selected_task;
    }

    @Override
    public void initData() {
        mCustomObjectList = new ArrayList<>();
        mAdapter = new SelectTaskAdapter(mCustomObjectList);
        // 获取广告的类型，由MainActivity传入值
        // 深度任务列表ym_param_REQUEST_EXTRA_TASK
        mRequestType = getIntent().getIntExtra("requestType", DiyOfferWallManager.ym_param_REQUEST_EXTRA_TASK);
        mTaskPresenter = new TaskPresenter(this);
    }

    @Override
    public void initView() {
        TextView tv_title = (TextView)findViewById(R.id.tv_title);
        mIv_left = (ImageView)findViewById(R.id.iv_left);
        mRefresh_content = (SmartRefreshLayout)findViewById(R.id.refresh_content);
        mRv_content = (RecyclerView)findViewById(R.id.rv_content);
        tv_title.setText("深度任务");
        mRv_content.setHasFixedSize(true);
        mRv_content.setLayoutManager(new LinearLayoutManager(this));
        mRv_content.setAdapter(mAdapter);
    }


    @Override
    public void initListener() {
        mIv_left.setOnClickListener(this);
    }

    @Override
    public void loadData() {
        mTaskPresenter.requestTaskList(DiyOfferWallManager.ym_param_REQUEST_EXTRA_TASK,mPageIndex,AD_PER_NUMBER);
    }



    @Override
    public void onLoadDataSuccess(InfoModel data) {
        if (null!= data.getData() && data.getData()  instanceof TaskModel){
            TaskModel model = (TaskModel)data.getData();
            mAdapter.addData(model.getDataBean());
            finishRefresh(mRefresh_content);
            mAdapter.notifyDataSetChanged();
        }

    }

    @Override
    public void onLoadDataFailed(int code) {

    }

    @Override
    public void onClick(View view) {
        int i = view.getId();
        if (i == R.id.iv_left) {
            finish();
        }
    }
}

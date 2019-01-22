package com.doudou.wangbf.doudoulibrary.ui.task.selected;

import android.content.Intent;
import android.graphics.drawable.GradientDrawable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.listener.OnItemClickListener;
import com.doudou.wangbf.doudoulibrary.R;
import com.doudou.wangbf.doudoulibrary.base.BaseMvcActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.adpter.SelectTaskAdapter;
import com.doudou.wangbf.doudoulibrary.ui.task.depth.DepthTaskActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.detail.TaskDetailActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.model.InfoModel;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskBean;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskModel;
import com.doudou.wangbf.doudoulibrary.ui.task.presenter.ResultCallBack;
import com.doudou.wangbf.doudoulibrary.ui.task.presenter.TaskPresenter;
import com.doudou.wangbf.doudoulibrary.utils.HMAC_SHA1;
import com.doudou.wangbf.doudoulibrary.utils.PhoneUtil;
import com.google.gson.Gson;
import com.scwang.smartrefresh.layout.SmartRefreshLayout;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import fdg.ewa.wda.os.df.DiyOfferWallManager;

public class SelectedTaskActivity extends BaseMvcActivity implements View.OnClickListener {
    private List<TaskBean> mCustomObjectList;
    private SelectTaskAdapter mAdapter;
    private TextView mTv_right;
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
    private TextView mTask_num;
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
        // 所有任务列表ym_param_REQUEST_ALL

        mRequestType = getIntent().getIntExtra("requestType", DiyOfferWallManager.ym_param_REQUEST_ALL);
        mTaskPresenter = new TaskPresenter(this);
        Map<Object, Object> objectObjectHashMap = new HashMap<>();
//        objectObjectHashMap.put("device_id","00000000-7501-f67b-ffff-ffff8304d313");
        objectObjectHashMap.put("platform_id","1");
//        objectObjectHashMap.put("app_id","5G3b0CTprvrBwlyx5rLDOnRWlmTsDEW9");
//        objectObjectHashMap.put("timestamp","1544599222");
        String s = new Gson().toJson(objectObjectHashMap);
        HMAC_SHA1.genHMAC( "platform_id=1&timestamp=1544599222","1hmYRp6dmmJTZI5GOEUiaapbQbMSyfMgbGvQh90ZJuoPJMOM3nZXfU67CCBbnVWG");
    }

    @Override
    public void initView() {
        TextView tv_title = (TextView)findViewById(R.id.tv_title);
        mTv_right = (TextView)findViewById(R.id.tv_right);
        mIv_left = (ImageView)findViewById(R.id.iv_left);
        mRefresh_content = (SmartRefreshLayout)findViewById(R.id.refresh_content);
        mRv_content = (RecyclerView)findViewById(R.id.rv_content);

        tv_title.setText("精选任务");
        mTv_right.setText("任务进度");
        mTv_right.setVisibility(View.VISIBLE);
        mTv_right.setTextColor(getResources().getColor(R.color.Orange));
        GradientDrawable gd = new GradientDrawable();
        gd.setShape(GradientDrawable.RECTANGLE);//设置为矩形
        gd.setColor(getResources().getColor(R.color.white));
        gd.setCornerRadius(PhoneUtil.dip2px(mContext,8));
        gd.setStroke(PhoneUtil.dip2px(mContext,1),getResources().getColor(R.color.Orange));
        mTv_right.setBackground(gd);


        mRv_content.setHasFixedSize(true);
        mRv_content.setLayoutManager(new LinearLayoutManager(this));
        mRv_content.setAdapter(mAdapter);
        initHeader();
    }

    private void initHeader() {
        LinearLayout headerView = (LinearLayout) LayoutInflater.from(mContext).inflate(R.layout.layout_select_task_header, null);
        mTask_num = (TextView)headerView.findViewById(R.id.task_num);

        headerView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setClass(SelectedTaskActivity.this, DepthTaskActivity.class);
                startActivity(intent);
            }
        });
        mAdapter.addHeaderView(headerView);
    }

    @Override
    public void initListener() {
        mTv_right.setOnClickListener(this);
        mIv_left.setOnClickListener(this);

        mRv_content.addOnItemTouchListener(new OnItemClickListener() {
            @Override
            public void onSimpleItemClick(BaseQuickAdapter adapter, View view, int position) {
                Intent intent = new Intent();
                intent.setClass(SelectedTaskActivity.this, TaskDetailActivity.class);
                intent.putExtra("TaskBean",mCustomObjectList.get(position));
                startActivity(intent);
            }
        });
    }

    @Override
    public void loadData() {
        mTaskPresenter.requestTaskList(DiyOfferWallManager.ym_param_REQUEST_ALL,mPageIndex,AD_PER_NUMBER);
    }



    @Override
    public void onLoadDataSuccess(InfoModel data) {
        if (null!= data.getData() && data.getData()  instanceof TaskModel){
            TaskModel model = (TaskModel)data.getData();
            mAdapter.addData(model.getDataBean());
            finishRefresh(mRefresh_content);
            mAdapter.notifyDataSetChanged();
            updateLimitInfo(); //更新用户深度任务数量
        }

    }

    @Override
    public void onLoadDataFailed(int code) {

    }

    //更新用户深度任务数量
    private void updateLimitInfo() {
        mTaskPresenter.requestDepthTaskNum(new ResultCallBack<Integer>() {
            @Override
            public void success(Integer bean) {
                mTask_num.setText("您有" +bean +"个深度任务待执行");
            }

            @Override
            public void error(int errorCode, String msg) {

            }
        });

    }

    @Override
    public void onClick(View view) {
        int i = view.getId();
        if (i == R.id.iv_left) {
            finish();
        } else if (i == R.id.tv_right) {
            Intent intent = new Intent();
            intent.setClass(SelectedTaskActivity.this, TaskProgressActivity.class);
            startActivity(intent);
        }
    }
}

package com.doudou.wangbf.doudoulibrary.ui.task.detail;

import android.content.DialogInterface;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.doudou.wangbf.doudoulibrary.R;
import com.doudou.wangbf.doudoulibrary.base.BaseMvcActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.model.InfoModel;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskBean;
import com.doudou.wangbf.doudoulibrary.ui.task.presenter.TaskPresenter;
import com.doudou.wangbf.doudoulibrary.utils.DialogUtil;
import com.doudou.wangbf.doudoulibrary.utils.GlideUtils;

public class TaskDetailActivity extends BaseMvcActivity implements View.OnClickListener {
    private ImageView mIv_left;
    private TaskPresenter mTaskPresenter;
    private TaskBean mBean;
    private TextView mDown_app;
    private TextView mTry_play_app;
    private TextView mGet_award;

    @Override
    public int getLayoutId() {
            return R.layout.activity_task_detail;
    }

    @Override
    public void initData() {
        Object obj = getIntent().getSerializableExtra("TaskBean");
        if (obj == null || !(obj instanceof TaskBean)) {
            this.finish();
            return;
        }
        mBean = (TaskBean) obj;
        mTaskPresenter = new TaskPresenter(this);
    }

    @Override
    public void initView() {
        TextView tv_title = (TextView)findViewById(R.id.tv_title);
        tv_title.setText(mBean.getAppName());

        mIv_left = (ImageView)findViewById(R.id.iv_left);
        ImageView task_image = (ImageView) findViewById(R.id.task_image);
        GlideUtils.loadRoundTransform(mContext, mBean.getIconUrl(), task_image,4);
        TextView task_name = (TextView) findViewById(R.id.task_name);
        task_name.setText(mBean.getAppName());

        mDown_app = (TextView) findViewById(R.id.down_app);
        mTry_play_app = (TextView) findViewById(R.id.try_play_app);
        mGet_award = (TextView) findViewById(R.id.get_award);
        LinearLayout ll_apply_task = (LinearLayout) findViewById(R.id.ll_apply_task); //提交任务模块

    }


    @Override
    public void initListener() {
        mIv_left.setOnClickListener(this);
        mDown_app.setOnClickListener(this);
        mTry_play_app.setOnClickListener(this);
        mGet_award.setOnClickListener(this);
    }

    @Override
    public void loadData() {

    }

    @Override
    public void onLoadDataSuccess(InfoModel data) {

    }

    @Override
    public void onLoadDataFailed(int code) {

    }

    @Override
    public void onClick(View view) {
        int i = view.getId();
        if (i == R.id.iv_left) {
            finish();
        }else if (i== R.id.down_app){
            //下载app
            DialogUtil.showAlert(mContext,"提示",
                    "请按照要求填写内容并按照示例截图提 交截图。","检查提交内容",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            dialogInterface.dismiss();
                        }
                    },  null, null, false);
        }else if (i== R.id.try_play_app){
            //试玩app
            DialogUtil.showAlert(mContext,"获得奖励","+1.5元",
                    getResources().getDrawable(R.drawable.reward),
                    "恭喜完成精选任务xxxxx，再接再厉！","继续赚钱",
                    new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialogInterface, int i) {
                            dialogInterface.dismiss();

                        }
                    },  null, null, false);
        }else if (i== R.id.get_award){
            //领取奖励
        }
    }
}

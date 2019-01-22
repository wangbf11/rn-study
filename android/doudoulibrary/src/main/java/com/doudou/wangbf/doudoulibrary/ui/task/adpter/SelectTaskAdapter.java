package com.doudou.wangbf.doudoulibrary.ui.task.adpter;

import android.support.annotation.Nullable;
import android.widget.ImageView;

import com.chad.library.adapter.base.BaseQuickAdapter;
import com.chad.library.adapter.base.BaseViewHolder;
import com.doudou.wangbf.doudoulibrary.R;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskBean;
import com.doudou.wangbf.doudoulibrary.utils.GlideUtils;

import java.util.List;

/**
 * Created by wbf.
 */
public class SelectTaskAdapter extends BaseQuickAdapter<TaskBean, BaseViewHolder> {

    public SelectTaskAdapter(@Nullable List<TaskBean> data) {
        super(R.layout.item_select_task, data);
    }

    @Override
    protected void convert(BaseViewHolder helper, TaskBean item) {
        ImageView view = helper.getView(R.id.task_image);
        GlideUtils.loadRoundTransform(mContext, item.getIconUrl(), view,4);
        String money = Integer.valueOf(item.getMoney()) / 100 + "."+ Integer.valueOf(item.getMoney()) % 100;

        helper.setText(R.id.task_name, item.getAppName())
                .setText(R.id.task_count, "剩余"+item.getDes() +"份")
                .setText(R.id.task_money, "+" + money + "元");
    }
}

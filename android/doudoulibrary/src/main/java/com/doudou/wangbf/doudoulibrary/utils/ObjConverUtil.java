package com.doudou.wangbf.doudoulibrary.utils;

import com.doudou.wangbf.doudoulibrary.ui.task.model.CustomObject;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskBean;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskModel;

import java.util.ArrayList;
import java.util.List;

public class ObjConverUtil {

    public static TaskModel YouMiModelConverTaskModel(ArrayList<CustomObject> obj) {
        TaskModel taskModel = new TaskModel();
        List<TaskBean> beans = new ArrayList<>();
        CustomObject customObject = obj.get(0);
        customObject.getAppSummaryObject().getIconUrl();

        for (int i=1;i<obj.size();i++){
            TaskBean taskBean = new TaskBean();
            taskBean.setAppName(obj.get(i).getAppSummaryObject().getAppName());
            taskBean.setDes(obj.get(i).getAppSummaryObject().getRewardsCount()+ "");
            taskBean.setIconUrl(obj.get(i).getAppSummaryObject().getIconUrl());
            taskBean.setMoney(obj.get(i).getAppSummaryObject().getPoints() + "");
            taskBean.setStatus(obj.get(i).getAppSummaryObject().getAdDownloadStatus());
            beans.add(taskBean);
        }
        taskModel.setDataBean(beans);
        return taskModel;
    }
}

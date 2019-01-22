package com.doudou.wangbf.doudoulibrary.ui.task.model;

import java.io.Serializable;
import java.util.List;

public class TaskModel implements Serializable {

    protected List<TaskBean> dataBean;
    protected int installTimes;
    protected int installLimit;
    protected int depthTaskNum;

    public int getDepthTaskNum() {
        return depthTaskNum;
    }

    public void setDepthTaskNum(int depthTaskNum) {
        this.depthTaskNum = depthTaskNum;
    }

    public int getInstallTimes() {
        return installTimes;
    }

    public void setInstallTimes(int installTimes) {
        this.installTimes = installTimes;
    }

    public int getInstallLimit() {
        return installLimit;
    }

    public void setInstallLimit(int installLimit) {
        this.installLimit = installLimit;
    }

    public List<TaskBean> getDataBean() {
        return dataBean;
    }

    public void setDataBean(List<TaskBean> dataBean) {
        this.dataBean = dataBean;
    }


}

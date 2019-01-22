package com.doudou.wangbf.doudoulibrary.ui.task.model;

import java.io.Serializable;

public class TaskBean implements Serializable {

    protected String appName;      //app名称
    protected String money;     //任务赏金
    protected String iconUrl; //logo图标
    protected String des;   //任务描述
    protected int status; //任务状态
    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

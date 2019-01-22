package com.paddy.pegasus.data;

/**
 * Created by wbf on 2018/12/27.
 */

public class ShiPinDownloadInfo {
    private String did;   //每个下载视频的唯一id
    private String fileName;   //视频名称
    private String downLoadUrl;   //每个下载视频的url
    private String locationPath;    //每个视频 下载到的手机路径
    private int state;       //下载状态
    private int downLoadTotalSize;          //已经下载的文件大小kb
    private int totalFileSize;   //下载文件的总大小
    private int tsCount;   ////m3u8视频ts文件个数 0
    private int downIndex;//m3u8视频当前下载ts文件索引 0
    private int lastUpdataTime;//下载中最后一次更新数据的时间戳 0
    private boolean secret;//是否是私密的
    private boolean wait;  //是否等待中

    public boolean isWait() {
        return wait;
    }

    public void setWait(boolean wait) {
        this.wait = wait;
    }

    public boolean isSecret() {
        return secret;
    }

    public void setSecret(boolean secret) {
        this.secret = secret;
    }

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getDownLoadUrl() {
        return downLoadUrl;
    }

    public void setDownLoadUrl(String downLoadUrl) {
        this.downLoadUrl = downLoadUrl;
    }

    public String getLocationPath() {
        return locationPath;
    }

    public void setLocationPath(String locationPath) {
        this.locationPath = locationPath;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

    public int getDownLoadTotalSize() {
        return downLoadTotalSize;
    }

    public void setDownLoadTotalSize(int downLoadTotalSize) {
        this.downLoadTotalSize = downLoadTotalSize;
    }

    public int getTotalFileSize() {
        return totalFileSize;
    }

    public void setTotalFileSize(int totalFileSize) {
        this.totalFileSize = totalFileSize;
    }

    public int getTsCount() {
        return tsCount;
    }

    public void setTsCount(int tsCount) {
        this.tsCount = tsCount;
    }

    public int getDownIndex() {
        return downIndex;
    }

    public void setDownIndex(int downIndex) {
        this.downIndex = downIndex;
    }

    public int getLastUpdataTime() {
        return lastUpdataTime;
    }

    public void setLastUpdataTime(int lastUpdataTime) {
        this.lastUpdataTime = lastUpdataTime;
    }
}

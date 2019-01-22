package com.paddy.pegasus.data;

/**
 * Created by wbf on 2018/12/27.
 */

public class DownloadInfo {
    private String id;   //每个下载视频的唯一id
    private String url;   //每个下载视频的url
    private String local_url;    //每个视频 下载到的手机路径
    private String extra;       //额为扩展字段 目前未用
    private int start;          //已经下载的文件大小kb
    private boolean isDownloaded;  //是否已经下载完成
    private int contentSize;   //下载文件的总大小
    private boolean downloading;  //是否正在下载中
    private int tsCount;   ////m3u8视频总文件个数
    private int downIndex;//m3u8视频已经下载ts文件个数
    private boolean secret;//是否是私密的
    private boolean error;//下载错误
    private String did;//文件名和图片的字符串
    private boolean wait;  //是否等待中

    public String getDid() {
        return did;
    }

    public void setDid(String did) {
        this.did = did;
    }

    public boolean isWait() {
        return wait;
    }

    public void setWait(boolean wait) {
        this.wait = wait;
    }

    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    public boolean isSecret() {
        return secret;
    }

    public void setSecret(boolean secret) {
        this.secret = secret;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public int getContentSize() {
        return contentSize;
    }

    public void setContentSize(int contentSize) {
        this.contentSize = contentSize;
    }

    public boolean isDownloading() {
        return downloading;
    }

    public void setDownloading(boolean downloading) {
        this.downloading = downloading;
    }

    public String getExtra() {
        return extra;
    }

    public void setExtra(String extra) {
        this.extra = extra;
    }

    public boolean isDownloaded() {
        return isDownloaded;
    }

    public void setDownloaded(boolean downloaded) {
        isDownloaded = downloaded;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocal_url() {
        return local_url;
    }

    public void setLocal_url(String local_url) {
        this.local_url = local_url;
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
}

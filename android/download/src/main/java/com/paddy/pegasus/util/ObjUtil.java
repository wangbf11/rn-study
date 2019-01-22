package com.paddy.pegasus.util;

import com.paddy.pegasus.data.DownloadInfo;
import com.paddy.pegasus.data.ShiPinDownloadInfo;

public class ObjUtil {

	public static DownloadInfo convertSInfoToDInfo(ShiPinDownloadInfo sBean) {
		return null;
	}

	public static ShiPinDownloadInfo convertDInfoToSInfo(DownloadInfo dBean) {
        ShiPinDownloadInfo shiPinDownloadInfo = new ShiPinDownloadInfo();
        shiPinDownloadInfo.setDid(dBean.getDid());   //did 是视频传过来的id 由文件名称和 封面icon名称组成
        if (!StringUtil.isBlank(dBean.getLocal_url())){
            String[] split = dBean.getLocal_url().split("/");
            shiPinDownloadInfo.setFileName(split[split.length -1]);  //文件名称
        }
        shiPinDownloadInfo.setDownLoadUrl(dBean.getUrl());  //下载地址
        shiPinDownloadInfo.setLocationPath(dBean.getLocal_url()); //本地路径
        shiPinDownloadInfo.setWait(dBean.isWait());
        int state = 0;  //未下载
        if (dBean.isDownloading()){
            state = 1;   //下载中
        }else if (dBean.isDownloaded()){
            state = 4;  //下载完成
        }else if (dBean.getStart() > 0){
            state = 3;   //暂停下载
        }else if (dBean.isError()){
            state = 5;   //下载错误
        }else if (dBean.isWait()){
            state = 2;   //是否等待
        }
        shiPinDownloadInfo.setState(state);
        shiPinDownloadInfo.setDownLoadTotalSize(dBean.getStart()); //已下载长度
        shiPinDownloadInfo.setTotalFileSize(dBean.getContentSize()); //总长度
        shiPinDownloadInfo.setDownIndex(dBean.getDownIndex()); //已经下载的m3u8
        shiPinDownloadInfo.setTsCount(dBean.getTsCount()); //m3u8总个数
        shiPinDownloadInfo.setSecret(dBean.isSecret()); //是否是私密文件
        return shiPinDownloadInfo;

	}
}

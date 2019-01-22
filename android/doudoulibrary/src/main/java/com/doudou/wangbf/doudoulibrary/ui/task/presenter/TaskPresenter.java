package com.doudou.wangbf.doudoulibrary.ui.task.presenter;

import android.content.Context;

import com.doudou.wangbf.doudoulibrary.base.BaseMvcActivity;
import com.doudou.wangbf.doudoulibrary.ui.task.model.CustomObject;
import com.doudou.wangbf.doudoulibrary.ui.task.model.InfoModel;
import com.doudou.wangbf.doudoulibrary.ui.task.model.TaskModel;
import com.doudou.wangbf.doudoulibrary.utils.ObjConverUtil;

import java.util.ArrayList;

import fdg.ewa.wda.os.df.AdExtraTaskStatus;
import fdg.ewa.wda.os.df.AppExtraTaskObject;
import fdg.ewa.wda.os.df.AppExtraTaskObjectList;
import fdg.ewa.wda.os.df.AppSummaryDataInterface;
import fdg.ewa.wda.os.df.AppSummaryObject;
import fdg.ewa.wda.os.df.AppSummaryObjectList;
import fdg.ewa.wda.os.df.DiyOfferWallManager;

public class TaskPresenter {
    private BaseMvcActivity mContext;

    public TaskPresenter(BaseMvcActivity context) {
        this.mContext = context;
    }

    public void requestTaskList(final int type, int mPageIndex, int AD_PER_NUMBER) {

        // 获取指定类型 的广告，并更新listview，下面展示两种加载方式，开发者可选择适合自己的方式

        // 异步加载方式
        // 请求类型，页码，请求数量，回调接口
        DiyOfferWallManager.getInstance(mContext)
                .loadOfferWallAdList(type, mPageIndex, AD_PER_NUMBER, new AppSummaryDataInterface() {

                    /**
                     * 当成功获取到积分墙列表数据的时候，会回调这个方法（注意:本接口不在UI线程中执行， 所以请不要在本接口中进行UI线程方面的操作）
                     * 注意：列表数据有可能为空（比如：没有广告的时候），开发者处理之前，请先判断列表是否为空，大小是否大与0
                     */
                    @Override
                    public void onLoadAppSumDataSuccess(Context context, AppSummaryObjectList adList) {
                        // 如果是请求第一页的时候，在更新ListView之前清空数据
                        update(adList,type);
                    }

                    /**
                     * 因为网络问题而导致请求失败时，会回调这个接口（注意:本接口不在UI线程中执行， 所以请不要在本接口中进行UI线程方面的操作）
                     */
                    @Override
                    public void onLoadAppSumDataFailed() {
                        mContext.onLoadDataFailed(-1);
                    }

                    /**
                     * 请求成功，但是返回有米错误代码时候，会回调这个接口（注意:本接口不在UI线程中执行， 所以请不要在本接口中进行UI线程方面的操作）
                     */
                    @Override
                    public void onLoadAppSumDataFailedWithErrorCode(final int code) {
                        mContext.onLoadDataFailed(code);
                    }
                });
    }


    public void requestDepthTaskNum(final ResultCallBack<Integer> callBack) {
        DiyOfferWallManager.getInstance(mContext)
                .loadOfferWallAdList(DiyOfferWallManager.ym_param_REQUEST_EXTRA_TASK, 1, 50, new AppSummaryDataInterface() {

                    @Override
                    public void onLoadAppSumDataSuccess(Context context, AppSummaryObjectList adList) {
                        int size = adList.size();
                        callBack.success(size);
                    }

                    @Override
                    public void onLoadAppSumDataFailed() {
                        callBack.error(-1,"");
                    }

                    @Override
                    public void onLoadAppSumDataFailedWithErrorCode(final int code) {
                        callBack.error(code,"");
                    }
                });
    }

    /**
     * 更新data
     *
     */
    private void update(final AppSummaryObjectList adList,int mRequestType) {
        if (adList == null || adList.isEmpty()) {

        } else {
            ArrayList<CustomObject> customObjectArrayList = new ArrayList<CustomObject>();
            for (int k = 0; k < adList.size(); ++k) {
                // 如果请求的是追加任务的列表，demo将会把所有的追加任务独立为一个item项，因此需要把同一个appSummaryObject多次加入到列表中
                if (mRequestType == DiyOfferWallManager.ym_param_REQUEST_EXTRA_TASK) {
                    // 下面是判断是否追加任务，如果是的话就会在写入一次列表
                    AppSummaryObject appSummaryObject = adList.get(k);
                    AppExtraTaskObjectList extraTaskObjectList = appSummaryObject.getExtraTaskList();
                    for (int j = 0; j < extraTaskObjectList.size(); ++j) {
                        AppExtraTaskObject extraTaskObject = extraTaskObjectList.get(j);
                        if (extraTaskObject.getStatus() == AdExtraTaskStatus.NOT_START ||
                                extraTaskObject.getStatus() == AdExtraTaskStatus.IN_PROGRESS) {
                            CustomObject customObject = new CustomObject();
                            customObject.setAppSummaryObject(adList.get(k));
                            customObject.setAppicon(null);
                            customObject.setShowMultSameAd(true);
                            customObject.setShowExtraTaskIndex(j);
                            customObjectArrayList.add(customObject);
                        }
                    }
                } else {
                    CustomObject customObject = new CustomObject();
                    customObject.setAppSummaryObject(adList.get(k));
                    customObject.setAppicon(null);
                    customObjectArrayList.add(customObject);
                }
            }
            //转换类型
            TaskModel taskModel = ObjConverUtil.YouMiModelConverTaskModel(customObjectArrayList);
            taskModel.setDepthTaskNum(adList.size());
            InfoModel<TaskModel> objectInfoModel = new InfoModel<>();
            objectInfoModel.setData(taskModel);
            mContext.onLoadDataSuccess(objectInfoModel);
        }
    }


}

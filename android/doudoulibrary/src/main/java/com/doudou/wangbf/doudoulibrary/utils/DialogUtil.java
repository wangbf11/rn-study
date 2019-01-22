package com.doudou.wangbf.doudoulibrary.utils;


import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.drawable.Drawable;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.Window;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.doudou.wangbf.doudoulibrary.R;

public class DialogUtil {

    public static Dialog showAlert(Context context,  String title,String message, String negStr, final DialogInterface.OnClickListener negLis, String posStr, final DialogInterface.OnClickListener posLis, boolean isCancel) {
        return showAlert(context, title, null,null,message, negStr, negLis, posStr, posLis, isCancel);
    }

    public static Dialog showAlert(Context context, String title, String money, Drawable drawable,String message, String negStr, final DialogInterface.OnClickListener negLis, String posStr, final DialogInterface.OnClickListener posLis, boolean isCancel) {
        final Dialog dlg = new Dialog(context, R.style.Dialog);
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        LinearLayout layout = (LinearLayout) inflater.inflate(R.layout.dialog_confirm, null);
        TextView dialog_title = (TextView) layout.findViewById(R.id.dialog_title);
        TextView dialog_message = (TextView) layout.findViewById(R.id.dialog_message);
        TextView dialog_reward_money = (TextView) layout.findViewById(R.id.dialog_reward_money);
        ImageView dialog_image = (ImageView) layout.findViewById(R.id.dialog_image);
        Button button_pos = (Button) layout.findViewById(R.id.button_pos);
        Button button_neg = (Button) layout.findViewById(R.id.button_neg);
        if (StringUtil.isEmpty(title)) {
            dialog_title.setVisibility(View.GONE);
        } else {
            dialog_title.setVisibility(View.VISIBLE);
            dialog_title.setText(title);
        }

        if (StringUtil.isEmpty(money)) {
            dialog_reward_money.setVisibility(View.GONE);
        } else {
            dialog_reward_money.setVisibility(View.VISIBLE);
            dialog_reward_money.setText(money);
        }

        if (null == drawable) {
            dialog_image.setVisibility(View.GONE);
        } else {
            dialog_image.setVisibility(View.VISIBLE);
            dialog_image.setImageDrawable(drawable);
        }

        if (!StringUtil.isEmpty(message)) {
            dialog_message.setText(message);
        }
        if (StringUtil.isEmpty(negStr)) {
            button_neg.setVisibility(View.GONE);
        } else {
            button_neg.setText(negStr);
            button_neg.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (negLis != null) {
                        negLis.onClick(dlg, 0);
                    }
                }
            });
        }
        if (StringUtil.isEmpty(posStr)) {
            button_pos.setVisibility(View.GONE);
        } else {
            button_pos.setText(posStr);
            button_pos.setOnClickListener(new OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (posLis != null) {
                        posLis.onClick(dlg, 0);
                    }
                }
            });
        }
        // set a large value put it in bottom
        dlg.setContentView(layout);
        Window w = dlg.getWindow();
        WindowManager.LayoutParams lp = w.getAttributes();
//		lp.x = 0;
//		final int cMakeBottom = -1000;
//		lp.y = cMakeBottom;
        lp.gravity = Gravity.CENTER;
//		lp.horizontalMargin = 20;
//		lp.x = 100; // 新位置X坐标
//        lp.y = 100; // 新位置Y坐标
        lp.width = PhoneUtil.dip2px(context, 267); // 宽度
        lp.height = WindowManager.LayoutParams.WRAP_CONTENT; // 高度
//        lp.alpha = 0.7f; // 透明度
        // 当Window的Attributes改变时系统会调用此函数,可以直接调用以应用上面对窗口参数的更改,也可以用setAttributes
        // dialog.onWindowAttributesChanged(lp);
        dlg.onWindowAttributesChanged(lp);
//		dlg.setCanceledOnTouchOutside(true);
        dlg.setCancelable(isCancel);
        dlg.show();
        return dlg;
    }
}


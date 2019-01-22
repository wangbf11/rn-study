package com.doudou.wangbf.doudoulibrary.utils;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapShader;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.bumptech.glide.load.engine.bitmap_recycle.BitmapPool;
import com.bumptech.glide.load.resource.bitmap.BitmapTransformation;

/**
 * Created by wbf on on 2018/12/12.
 */
public class GlideUtils {
    //占位图

    //加载图片
    public static void load(Context context, String url,ImageView view) {
        Glide.with(context)
                .load(url)
                .placeholder(null)
                .error(null)
                .into(view);

    }

    //加载本地
    public static void load(Context context, int url, ImageView view) {
        Glide.with(context)
                .load(url)
                .placeholder(null)
                .error(null)
                .into(view);
    }

    //加载本地圆角图片
    public static void loadRoundTransform(Context context, int url, ImageView view,int roundDp) {
        Glide.with(context).load(url).centerCrop().transform(new GlideRoundTransform(context, roundDp)).into(view);
    }

    //加载圆角图片
    public static void loadRoundTransform(Context context, String url, ImageView view,int roundDp) {
        Glide.with(context).load(url).centerCrop().transform(new GlideRoundTransform(context, roundDp)).into(view);
    }

    public static class GlideRoundTransform extends BitmapTransformation {

        private static float radius = 0f;

        public GlideRoundTransform(Context context) {
            this(context, 4);
        }

        public GlideRoundTransform(Context context, int dp) {
            super(context);
            this.radius = Resources.getSystem().getDisplayMetrics().density * dp;
        }

        @Override protected Bitmap transform(BitmapPool pool, Bitmap toTransform, int outWidth, int outHeight) {
            return roundCrop(pool, toTransform);
        }

        private static Bitmap roundCrop(BitmapPool pool, Bitmap source) {
            if (source == null) return null;

            Bitmap result = pool.get(source.getWidth(), source.getHeight(), Bitmap.Config.ARGB_8888);
            if (result == null) {
                result = Bitmap.createBitmap(source.getWidth(), source.getHeight(), Bitmap.Config.ARGB_8888);
            }

            Canvas canvas = new Canvas(result);
            Paint paint = new Paint();
            paint.setShader(new BitmapShader(source, BitmapShader.TileMode.CLAMP, BitmapShader.TileMode.CLAMP));
            paint.setAntiAlias(true);
            RectF rectF = new RectF(0f, 0f, source.getWidth(), source.getHeight());
            canvas.drawRoundRect(rectF, radius, radius, paint);
            return result;
        }

        @Override public String getId() {
            return getClass().getName() + Math.round(radius);
        }
    }

}

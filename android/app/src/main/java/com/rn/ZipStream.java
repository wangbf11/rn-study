package com.rn;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.support.v4.app.ActivityCompat;
import android.telephony.TelephonyManager;

import java.io.File;
import java.io.RandomAccessFile;

public class ZipStream {

    private RandomAccessFile mZipFile;
    private static final long LOCSIG = 0x4034b50, ENDSIG = 0x6054b50;
    private static final int ENDHDR = 22;


    /**
     * ZipStream construct
     *
     * @param file
     */
    public ZipStream(RandomAccessFile file) {
        mZipFile = file;
    }

    /**
     * Get zip comment
     *
     * @return String comment
     * @throws Exception
     */
    public String getComment() throws Exception {
        long scanOffset = mZipFile.length() - ENDHDR;
        if (scanOffset < 0) {
            throw new Exception("File too short to be a zip file: " + mZipFile.length());
        }

        mZipFile.seek(0);
        final int headerMagic = Integer.reverseBytes(mZipFile.readInt());
        if (headerMagic == ENDSIG) {
            throw new Exception("Empty zip archive not supported");
        }
        if (headerMagic != LOCSIG) {
            throw new Exception("Not a zip archive");
        }

        long stopOffset = scanOffset - 65536;
        if (stopOffset < 0) {
            stopOffset = 0;
        }

        while (true) {
            mZipFile.seek(scanOffset);
            if (Integer.reverseBytes(mZipFile.readInt()) == ENDSIG) {
                break;
            }

            scanOffset--;
            if (scanOffset < stopOffset) {
                throw new Exception("End Of Central Directory signature not found");
            }
        }

        mZipFile.seek(mZipFile.getFilePointer() + ENDHDR - 6);
        byte[] commentLengthByte = new byte[2];
        mZipFile.read(commentLengthByte);
        int commentLength = byte2int(commentLengthByte);

        if (commentLength > 0) {
            byte[] commentBytes = new byte[commentLength];
            mZipFile.read(commentBytes);
            String comment = new String(commentBytes);

            return comment.trim();
        }

        return "";
    }

    /**
     * byte to int
     *
     * @param bytes byte[]
     * @return int
     */
    private static int byte2int(byte[] bytes) {
        return (bytes[0] & 0xff) | ((bytes[1] << 8) & 0xff00);
    }

    public static void bindDownloadCode(final Context context) {
        boolean isFirst = CacheAppData.getInstance().readBoolean("firstInstall", true);
        if (isFirst) {
            CacheAppData.getInstance().keepBoolean("firstInstall", false);
            new AsyncTask<Object, Object, String>() {
                @Override
                protected String doInBackground(Object[] objects) {
                    String comment = getComment(context);
                    return comment;
                }

                @Override
                protected void onPostExecute(String comment) {
                    super.onPostExecute(comment);
                }
            }.execute();
        }
    }


    public static String getComment(Context context) {
        //find apk position
        String path = context.getApplicationContext().getPackageResourcePath();
        //red apk comment
        try {
            File file = new File(path);
            RandomAccessFile apkFile = new RandomAccessFile(file, "r");
            ZipStream zipStream = new ZipStream(apkFile);
            String sComment = zipStream.getComment();
            if (!StringUtils.isEmpty(sComment)) {
                return sComment;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }

    /*
     * 获取手机IMEI
     */
    public static String getImei(Context context){
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.READ_PHONE_STATE) != PackageManager.PERMISSION_GRANTED) {
            return "";
        }
        return ((TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE)).getDeviceId();
    }
}

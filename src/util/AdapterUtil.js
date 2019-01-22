import {Dimensions, StatusBar, Platform, PixelRatio} from 'react-native'

//UI设计图的宽度
const designWidth = 750
//UI设计图的高度
const designHeight = 1334

//手机屏幕的宽度
export const width = Dimensions.get('window').width;
//手机屏幕的高度
export const height = Dimensions.get('window').height;
//计算手机屏幕宽度对应设计图宽度的单位宽度
export const unitWidth = width / designWidth
//计算手机屏幕高度对应设计图高度的单位高度
export const unitHeight = height / designHeight

export const statusBarHeight = getStatusBarHeight();
export const safeAreaViewHeight = isIphoneX() ? 34 : 0
//标题栏的高度
export const titleHeight = unitWidth * 100 + statusBarHeight;

//字体缩放比例，一般情况下不用考虑。
// 当应用中的字体需要根据手机设置中字体大小改变的话需要用到缩放比例
export const fontscale = PixelRatio.getFontScale()

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    if (Platform.OS == 'ios') {
        if (height == 812 && width == 375) {
            return true
        }
        else if (height == 896 && width == 414) {
            return true
        }
        return false
    }
    return false
}

//状态栏的高度
export function getStatusBarHeight() {
    if (Platform.OS == 'android') return StatusBar.currentHeight;
    if (isIphoneX()) {
        return 40
    }
    return 20
}

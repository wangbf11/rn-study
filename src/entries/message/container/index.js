import React, { PureComponent } from "react";
import {
    View,
    Text,
    TouchableHighlight,
    NativeModules,
    TouchableNativeFeedback,
    TouchableOpacity, Platform,
    ProgressBarAndroid,
    DeviceEventEmitter, BackHandler, ToastAndroid
} from "react-native";
import Confirm from "../../../components/confirm";
import styles from "./style";
import { NavigationActions, StackActions } from "react-navigation";
import TopBar from "../../../components/topbar";
import MyCustomView from "../../../components/customView";
import * as Progress from "react-native-progress";
// import RNFS from 'react-native-fs';
const RNFS = require('react-native-fs');
const nativeModule = NativeModules.OpenNativeModule;
import store from 'react-native-simple-store';
let jobId = -1;
class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            modalTitle: "提示",
            modalContent: "你是一个大傻逼吗？",
            isVisible: false,
            progressNum: 0,
            user: null
        };
    }

    componentDidMount() {
        // let user = global.realm.objects("User").filtered('id = 1');
        let user = [{id:1,name:"大的"},{id:2,name:"小的"}];
        this.setState({
            user: user[0].name
        });
        //注册返回键监听
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);

        // DeviceEventEmitter.addListener("DownloadProgress-1",(res)=>{
        //     let pro = res.bytesWritten / res.contentLength;
        //     this.setState({
        //         progressNum: pro,
        //     });
        // })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }

    cancelDetailModal() {
        this.setState({
            isVisible: false
        });
    }

    sureDetailModal() {
        this.setState({
            isVisible: false
        });
    }

    openConfirm() {
        this.setState({
            isVisible: true
        });
    }

    openNative() {
        //跳转原生页面
        nativeModule.openNativeVC();
    }

    openDouDou() {
        this.props.navigation.dispatch(StackActions.popToTop());
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'DouDou',
            })
        );

        // nativeModule.deleteAllDownload((res)=>{
        //     console.log(res);
        //     alert(res);
        // });
    }

    sendEvent() {
        // DeviceEventEmitter.emit('left', '发送了个通知');
        // RNFS.downloadFile({ fromUrl: url, toFile: downloadDest, begin, progress, background, progressDivider });
        // console.log('MainBundlePath=' + RNFS.MainBundlePath)
        // console.log('CachesDirectoryPath=' + RNFS.CachesDirectoryPath)
        // console.log('DocumentDirectoryPath=' + RNFS.DocumentDirectoryPath)
        // console.log('TemporaryDirectoryPath=' + RNFS.TemporaryDirectoryPath)
        // console.log('LibraryDirectoryPath=' + RNFS.LibraryDirectoryPath)
        // console.log('ExternalDirectoryPath=' + RNFS.ExternalDirectoryPath)
        // console.log('ExternalStorageDirectoryPath=' + RNFS.ExternalStorageDirectoryPath)

            // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

            // 图片
            // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.jpg`;
            // const formUrl = 'http://img.kaiyanapp.com/c7b46c492261a7c19fa880802afe93b3.png?imageMogr2/quality/60/format/jpg';

            // 文件
            // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.zip`;
            // const formUrl = 'http://files.cnblogs.com/zhuqil/UIWebViewDemo.zip';

            // 视频
            // const downloadDest = `${RNFS.MainBundlePath}/${((Math.random() * 1000) | 0)}.mp4`;
            // http://gslb.miaopai.com/stream/SnY~bbkqbi2uLEBMXHxGqnNKqyiG9ub8.mp4?vend=miaopai&
            // https://gslb.miaopai.com/stream/BNaEYOL-tEwSrAiYBnPDR03dDlFavoWD.mp4?vend=miaopai&
            // const formUrl = 'https://gslb.miaopai.com/stream/9Q5ADAp2v5NHtQIeQT7t461VkNPxvC2T.mp4?vend=miaopai&';

            // 音频
            const downloadDest = `${RNFS.ExternalDirectoryPath}/${((Math.random() * 1000) | 0)}.mp3`;
            // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
            const formUrl = 'http://wvoice.spriteapp.cn/voice/2015/0818/55d2248309b09.mp3';
            const options = {
                fromUrl: formUrl,
                toFile: downloadDest,
                progressDivider:1,
                background: true,
                begin: (res) => {
                    console.log('begin', res);
                    console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
                },
                progress: (res) => {
                    let pro = res.bytesWritten / res.contentLength;
                    pro = pro.toFixed(2);
                    // this.setState({ progressNum: pro});
                    console.log('pro', pro);
                }
            };
            try {
                const ret = RNFS.downloadFile(options);
                ret.promise.then(res => {
                    console.log('success', res);
                    //alert("成功");
                    store.save('progress', 1);
                    console.log('file://' + downloadDest)
                    // 例如保存图片
                    // CameraRoll.saveToCameraRoll(downloadDest)
                    //     .then(()=>{
                    //         Toast.showShortCenter('图片已保存到相册')
                    //     }).catch(()=>{
                    //     Toast.showShortCenter('图片保存失败')
                    // })

                }).catch(err => {
                    console.log('err', err);
                });
                jobId = ret.jobId;
            }
            catch (e) {
                console.log(error);
            }
    }

    startDownLoad() {
        nativeModule.resumeDownLoad("www.apk","www.apkRNIcon",'http://app.mi.com/download/18076');
    }
    pauseDownLoad() {
        nativeModule.stopDownload('http://app.mi.com/download/18076');
    }
    getAllDownInfo() {
        nativeModule.getAllDownloadInfo().then(data => {
            alert(JSON.stringify(data));
        });
        // nativeModule.getDownloadInfoByUrl('http://app.mi.com/download/18076',(res)=>{
        //     let s = JSON.stringify(res);
        //     console.log(s);
        //     alert(s);
        // });
    }

    render() {
        return (
            <View style={styles.pageBox}>
                <TopBar title = "消息"
                        leftIsVisible = {false}></TopBar>
                <View>
                    <View style={{width:260,height:40, marginLeft:10,marginTop:10,
                        marginBottom: 30,backgroundColor:'gray'}}>
                        <TouchableHighlight onPress={this.openConfirm.bind(this)} underlayColor="red">
                            <View style={[styles.button,{marginLeft:0,marginBottom: 0}]}>
                                <Text style={styles.fontStyleRed}>对话框</Text>
                            </View>
                        </TouchableHighlight>
                     </View>

                    <TouchableOpacity onPress={this.openDouDou.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>点击跳转豆豆赚钱</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.sendEvent.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>事件传递</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableNativeFeedback onPress={this.openNative.bind(this)}
                                             background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>点击跳转原生页面</Text>
                        </View>
                    </TouchableNativeFeedback>

                    <TouchableOpacity onPress={this.startDownLoad.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>开始或者继续下载</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.pauseDownLoad.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>暂停下载</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.getAllDownInfo.bind(this)}>
                        <View style={styles.button}>
                            <Text style={styles.fontStyleRed}>获取所以下载详情</Text>
                        </View>
                    </TouchableOpacity>

                    <Progress.Circle
                        style={{ marginLeft: 10 }}
                        unfilledColor="#E5E5E5"
                        color="#22AC38"
                        animated={true}
                        thickness={3}
                        size={39}
                        borderWidth={0}
                        progress={this.state.progressNum}
                        showsText={true}
                        formatText={() => `${1}%`}
                        textStyle={{ fontSize: 10 }} />
                </View>

                <MyCustomView
                    color='#00ff00'
                    onChangeColor = {()=>{
                        alert("你好");
                    }}
                    style={{width:300, height:30}}
                />
                <Confirm
                    cancelClick={this.cancelDetailModal.bind(this)}
                    sureClick={this.sureDetailModal.bind(this)}
                    isVisible={this.state.isVisible}
                    title={this.state.modalTitle}
                    content={this.state.modalContent}
                />
            </View>
        );
    }
}
export default Index;

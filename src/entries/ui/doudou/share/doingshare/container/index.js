import React, { PureComponent } from "react";

import {
    View,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    ScrollView,
    ImageBackground,
    StatusBar
} from "react-native";

import { StackActions } from "react-navigation";

import TopBar from "../../../../../../components/topbar";

import { width, statusBarHeight, safeAreaViewHeight } from '../../../../../../util/AdapterUtil'

import headImage from "../../../../../../assets/images/007_head.png"
import backImage from "../../../../../../assets/images/005_back.png"
import linkImage from "../../../../../../assets/images/007_link.png"
import pengyouquanImage from "../../../../../../assets/images/007_pengyouquan.png"
import QQImage from "../../../../../../assets/images/007_QQ.png"
import QQkongjianImage from "../../../../../../assets/images/007_QQkongjian.png"
import QRcodeImage from "../../../../../../assets/images/007_QRcode.png"
import weiboImage from "../../../../../../assets/images/007_weibo.png"
import weixinImage from "../../../../../../assets/images/007_weixin.png"
import styles from "./style"
import ShareUtile from '../../../../../../util/ShareUtil'

export default class DoingShareScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [{ key: '微信好友', details: "分享给微信好友", image: weixinImage },
            { key: '朋友圈', details: "分享到朋友圈", image: pengyouquanImage },
            { key: 'QQ好友', details: "分享给QQ好友", image: QQImage },
            { key: 'QQ空间', details: "分享到QQ空间", image: QQkongjianImage },
            { key: '微博', details: "分享到微博", image: weiboImage },
            { key: '收徒二维码', details: "扫描二维码收徒", image: QRcodeImage },
            { key: '收徒链接', details: "分享收徒链接", image: linkImage }]
        }
    }
    componentDidMount() {
        //分享回调
        // ShareUtile.auth(0,(code,result,message) =>{
        //     this.setState({result:message});
        //     if (code == 0){
        //         this.setState({result:result.uid});
        //     }
        // });
    }
    render() {

        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar barStyle={'light-content'} />
                <ImageBackground source={headImage} style={{ width: width, height: width * 333 / 375 }}>
                    <View style={{ height: statusBarHeight + 44, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{ width: 44, marginLeft: 17, justifyContent: "center", paddingTop: statusBarHeight, }}
                            onPress={this.goBack.bind(this)} >
                            <Image
                                style={{ height: 16, width: 16 }}
                                source={backImage} />
                        </TouchableOpacity>
                        <View style={{ width: width - 130, paddingTop: statusBarHeight }} />
                        <TouchableOpacity
                            style={{ width: 70, justifyContent: "center", paddingTop: statusBarHeight }}
                            onPress={this.shareList.bind(this)} >
                            <View style={{ height: 24, width: 60, alignItems: "center", justifyContent: "center", borderColor: "#fff", borderRadius: 5, borderWidth: 1 }}>
                                <Text style={{ color: "#fff", fontSize: 12 }}>收徒记录
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ScrollView style={{ marginTop: -50 }}>
                    <View style={[styles.shadowView, { flexDirection: "row" }]}>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.showMoney}>2</Text>
                            <Text style={styles.titleShowMoney}>我的徒弟（人）</Text>
                        </View>
                        <View style={{ width: 1, backgroundColor: "#eee", marginTop: 24, marginBottom: 52 }}>
                        </View>
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={styles.showMoney}>14.00</Text>
                            <Text style={styles.titleShowMoney}>收徒收入（元）</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: -20, alignItems: "center" }}>
                        <TouchableOpacity style={{ backgroundColor: "#F98141", width: 193, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>立即收徒</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={[styles.title, { marginTop: 40, marginBottom: 10 }]}>收徒规则说明</Text>
                        <FlatList scrollEnabled={false} data={[
                            { num: "1：", key: 'iOS徒弟每做一个任务，师傅获得徒弟所做任务价格相等奖励（100%提成）；' },
                            { num: "2：", key: 'Android徒弟每做一个任务，师傅获得徒弟所做任务价格的20%的奖励（20%提成）；' },
                            { num: "3：", key: '提成不影响徒弟的收入，由豆豆赚钱另行发放；' },
                            { num: "4：", key: '每个徒弟最多给师傅贡献10元，多收徒多得；' },
                            { num: "5：", key: '豆豆赚钱保留对活动的最终解释权。' },
                        ]}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: "row", marginTop: 13, paddingLeft: 17, paddingRight: 34 }}>
                                    <Text style={{ color: "#808080", fontSize: 14, fontFamily: "Helvetica" }}>{item.num}</Text>
                                    <Text style={{ color: "#505050", fontSize: 14 }}>{item.key}</Text>
                                </View>} />
                    </View>
                    <View style={[{ marginTop: 54, marginBottom: 40 }, styles.shadowView]}>
                        <Text style={[styles.title, { marginTop: 20 }]}>立即收徒</Text>
                        <FlatList style={{ marginTop: 21, paddingBottom: 35 }} scrollEnabled={false} data={this.state.data}
                            numColumns={2}
                            renderItem={this.renderItem} />
                    </View>
                </ScrollView>
                <View style={{ height: safeAreaViewHeight }} />
            </View>
        );
    }

    renderItem = ({ item, index }) => (
        <View style={{ width: (width - 20) / 2, flexDirection: "row" }}>
            <View >
                <View style={{ height: index == 0 || index == 1 ? 1 : 0, backgroundColor: "#eee" }} />
                <TouchableOpacity style={{ width: (width - 20) / 2 }}
                    onPress={() => {
                        this.clickShare(item);
                    }}>
                    <View style={styles.cellStyle}>
                        <Image
                            source={item.image}
                            style={{ width: 41, height: 41 }} />
                        <Text style={styles.cellTitle}>{item.key}</Text>
                        <Text style={styles.details}>{item.details}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ height: 1, backgroundColor: "#eee" }} />
            </View>
            <View style={{ width: index % 2 == 0 ? 1 : 0, backgroundColor: "#eee", transform: [{ scaleY: 0.8 }] }} ></View>
        </View>
    )

    shareList() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'ShareList',
            })
        );
    }
    clickShare(item) {
        if (item.key == "微信好友") {
            ShareUtile.share("你好", "https://facebook.github.io/react/logo-og.png", "https://facebook.github.io/react/logo-og.png", "你好", 0, (code, message) => {
                this.setState({ result: message });
            });
        }
    }

    goBack() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
}


import React, { PureComponent } from "react";
import {
    View,
    FlatList,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from "react-native";
import {
    width,
    statusBarHeight,
    safeAreaViewHeight
} from '../../../../../util/AdapterUtil'
import styles from "./style"
import headImage from "../../../../../assets/images/005_head.png"
import backImage from "../../../../../assets/images/005_back.png"
import dayBackImage from "../../../../../assets/images/005_daybackview.png"

import { StackActions } from "react-navigation";
import buttonImage from "../../../../../assets/images/001_login.png"
import oneImage from "../../../../../assets/images/005_1.png"
import twoImage from "../../../../../assets/images/005_2.png"
import threeImage from "../../../../../assets/images/005_3.png"
import goldenColorImage from "../../../../../assets/images/005_golden_color.png"
import goldenGrayImage from "../../../../../assets/images/005_golden_gray.png"

import AlertView from "../../../../../components/alert"

export default class SignCenterScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [{ id: 1, day: '第1天', isSelect: true, golden: "500" },
            { id: 2, day: '第2天', isSelect: false, golden: "300" },
            { id: 3, day: '第3天', isSelect: false, golden: "200" },
            { id: 4, day: '第4天', isSelect: false, golden: "100" },
            { id: 5, day: '第5天', isSelect: false, golden: "500" },
            { id: 6, day: '第6天', isSelect: false, golden: "500" },
            { id: 7, day: '第7天', isSelect: false, golden: "300" },
            { id: 8, day: '第8天', isSelect: false, golden: "200" },
            { id: 9, day: '第9天', isSelect: false, golden: "100" },
            { id: 10, day: '第10天', isSelect: false, golden: "500" }],
            isShow: false
        }
        // this.state = {
        //     isShow: false
        // };
    }
    componentDidMount() {

    }

    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBar barStyle={'light-content'} />
                <ImageBackground source={headImage} style={{ width: width, height: width * 200 / 375 }} >
                    <View style={{ height: statusBarHeight + 44, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={{ width: 44, marginLeft: 17, justifyContent: "center", paddingTop: statusBarHeight }}
                            onPress={this.goBack.bind(this)} >
                            <Image
                                style={{ height: 16, width: 16 }}
                                source={backImage} />
                        </TouchableOpacity>
                        <View style={{ width: width - 122, justifyContent: "center", alignItems: "center", paddingTop: statusBarHeight }}>
                            <Text style={{ color: "#fff" }}>当前连续签到</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 195, flexDirection: "row", marginTop: -20, alignItems: "flex-end" }}>
                            <ImageBackground source={dayBackImage} style={styles.borderBackImage}>
                                <Text style={styles.dayStyle}>0</Text>
                            </ImageBackground>
                            <ImageBackground source={dayBackImage} style={styles.borderBackImage}>
                                <Text style={styles.dayStyle}>0</Text>
                            </ImageBackground>
                            <ImageBackground source={dayBackImage} style={styles.borderBackImage}>
                                <Text style={styles.dayStyle}>1</Text>
                            </ImageBackground>
                            <Text style={{ color: "#fff", height: 30 }}>天</Text>
                        </View>
                    </View>
                </ImageBackground>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginLeft: 7, marginRight: 7, marginTop: -30, borderRadius: 10 }}>

                    <View style={[styles.shadowView, { marginLeft: 10, marginTop: 10, marginRight: 10 }]}>
                        <Text style={styles.titleStyle}>每日金豆  任你拿！</Text>
                        <FlatList
                            scrollEnabled={false}
                            style={{ backgroundColor: "#fff" }}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            numColumns={5}
                            horizontal={false}
                            renderItem={({ item }) =>
                                <View style={{ width: (width - 42) / 5, alignItems: "center", marginTop: 29, marginBottom: 11 }}>
                                    <View style={{ width: 17, height: 17, borderRadius: 8.5, backgroundColor: item.isSelect ? "#FE6042" : "#DCDCDC", alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ color: "#fff", fontSize: 12, fontFamily: "Helvetica" }}>{item.id}</Text>
                                    </View>
                                    <Image source={item.isSelect ? goldenColorImage : goldenGrayImage} style={{ width: 28, height: 36, marginTop: 10 }} />
                                    <Text style={{ marginTop: 5, fontSize: 14, color: "#202020", fontFamily: "Helvetica" }}>{item.day}</Text>
                                    <Text style={{ marginTop: 5, fontSize: 12, color: "#808080" }}>金豆</Text>
                                </View>
                            } />
                        <TouchableOpacity onPress={this.signAction.bind(this)}>
                            <ImageBackground source={buttonImage}
                                style={styles.button}
                                imageStyle={{ borderRadius: 5 }}>
                                <Text style={styles.buttonText}>签到</Text>
                            </ImageBackground>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.shadowView, { marginLeft: 10, marginTop: 15, marginRight: 10, paddingBottom: 38 }]}>

                        <Text style={styles.titleStyle}>签到规则</Text>
                        <FlatList
                            data={[
                                { key: "完成每天的签到要求后可以进行签到；", image: oneImage },
                                { key: "连续签到10天，共可以获得2000金豆；", image: twoImage },
                                { key: "漏签或者签满一个周期，则累计签到天数将清零，重新计算。", image: threeImage },
                            ]}
                            renderItem={({ item }) => <View style={{ flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                                <Image source={item.image} style={styles.imageStyle}></Image>
                                <Text style={[styles.detailsStyle, { lineHeight: 22, marginLeft: 10 }]}>{item.key}</Text>
                            </View>}
                        />
                    </View>
                    <View style={[styles.shadowView, { marginLeft: 10, marginTop: 15, marginRight: 10, paddingLeft: 15, paddingRight: 15, paddingBottom: 50 }]}>
                        <Text style={styles.titleStyle}>签到要求</Text>
                        <FlatList
                            data={[
                                { key: '第1天：', details: "无要求；" },
                                { key: '第2天：', details: "阅读1篇咨讯并获取奖励；" },
                                { key: '第3天：', details: "完成一个精选任务；" },
                                { key: '第4天：', details: "完成一个精选任务；" },
                                { key: '第5天：', details: "阅读1篇咨讯并获取奖励；" },
                                { key: '第6天：', details: "收1位徒弟；" },
                                { key: '第7天：', details: "完成一个精选任务；" },
                                { key: '第8天：', details: "阅读1篇咨讯并获取奖励；" },
                                { key: '第9天：', details: "完成一个精选任务；" },
                                { key: '第10天：', details: "完成一个精选任务。" },
                            ]}
                            renderItem={({ item }) => <View style={{ flexDirection: "row" }}>
                                <Text style={styles.numStlye}>{item.key}
                                    <Text style={styles.detailsStyle}>{item.details}</Text></Text>
                            </View>}
                        />
                    </View>
                    <Text style={[styles.titleStyle, { marginTop: 38, fontSize: 12, color: "#808080", marginBottom: 29 }]}>豆豆赚钱保留对活动的最终解释权</Text>
                </ScrollView>
                <View style={{ height: safeAreaViewHeight }} />

                <AlertView isShow={this.state.isShow} title="签到成功" goldenNum="200" tomorrow="500" isSuccess={true} sureClick={this.sureDetailModal.bind(this)}></AlertView>

                {/* <AlertView isShow={this.state.isShow} title="签到失败" isSuccess={false} failedMessage="请先完成今天的签到要求再来签到。" request="今日签到要求：完成1个精选任务。" sureClick={this.sureDetailModal.bind(this)} ></AlertView> */}
            </View>
        );
    }

    sureDetailModal() {
        this.setState({
            isShow: false
        });
    }

    signAction() {
        this.setState({
            isShow: true
        });
    }

    goBack() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
}

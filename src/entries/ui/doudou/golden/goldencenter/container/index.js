import React, { PureComponent } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Alert,
    FlatList,
    ImageBackground, ProgressBarAndroid
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import styles from "./style";
import buttonImage from "../../../../../../assets/images/001_login.png"
import { width, safeAreaViewHeight } from "../../../../../../util/AdapterUtil"
import * as Progress from 'react-native-progress';

export default class GoldenCenterScreen extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <TopBar navigation={this.props.navigation} title="金豆中心"
                    leftIsVisible={true} ></TopBar>
                <View style={{ flex: 1 }}>

                    {this.renderFirstContent()}

                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20, }}>
                        <Text style={{
                            marginLeft: 37,
                            fontSize: 20,
                            color: "#202020", fontWeight: "bold"
                        }}>金豆说明</Text>
                        <View style={{ flex: 1, height: 1, backgroundColor: "#DCDCDC", marginLeft: 14, marginRight: 16, transform: [{ scaleY: 0.5 }] }} />
                    </View>
                    <Text style={{
                        marginLeft: 37,
                        marginTop: 18,
                        fontSize: 16,
                        color: "#F98141"
                    }}>如何使用金豆？</Text>
                    <View style={{ height: 65 }}>
                        <FlatList scrollEnabled={false}
                            data={[
                                { key: '1. 可以将金豆直接兑换成零钱，用于提现；' },
                                { key: '2. 更多金豆玩法敬请期待。' },
                            ]}
                            renderItem={({ item }) => <Text style={styles.detailsStyle}>{item.key}</Text>}
                        />
                    </View>
                    <Text style={{
                        marginLeft: 37,
                        marginTop: 10,
                        fontSize: 16,
                        color: "#F98141"
                    }}>如何获取金豆？</Text>
                    <FlatList scrollEnabled={false}
                        data={[
                            { key: '1. 每天签到可以获取金豆；' },
                            { key: '2. 阅读资讯可以获取金豆。' },
                        ]}
                        renderItem={({ item }) => <Text style={styles.detailsStyle}>{item.key}</Text>}
                    />
                </View>
                <TouchableOpacity style={{ marginBottom: 30 + safeAreaViewHeight, borderRadius: 5 }} onPress={this.toExchangeCenter.bind(this)}>
                    <ImageBackground source={buttonImage}
                        style={styles.button}
                        imageStyle={{ borderRadius: 5 }}>
                        <Text style={styles.buttonText}>立刻兑换</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    //第一行渲染
    renderFirstContent() {
        return <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1, marginLeft: 9, marginTop: 9, marginRight: 9 }}>
                <View style={[styles.shadowView, { backgroundColor: "#F98141", alignItems: "center", justifyContent: "center" }]}>
                    <Text style={{ fontSize: 14, color: '#fff', marginTop: 20 }}>金豆余额</Text>
                    <Text style={{
                        marginTop: 5,
                        fontSize: 33,
                        color: '#fff', fontFamily: "Helvetica",
                        fontWeight: 'bold', marginBottom: 15
                    }}>2754</Text>
                </View>
            </View>
            <View style={{
                flex: 1, alignItems: "center",
                flexDirection: "row"
            }}>
                <Progress.Circle
                    style={{ marginLeft: 10 }}
                    unfilledColor="#E5E5E5"
                    color="#22AC38"
                    animated={true}
                    thickness={3}
                    size={39}
                    borderWidth={0}
                    progress={0.8}
                    showsText={true}
                    formatText={() => `${Math.round(0.8 * 100)}%`}
                    textStyle={{ fontSize: 10 }} />
                <View style={{ marginLeft: 14 }}>
                    <Text style={{
                        fontSize: 14,
                        color: '#808080'
                    }}>累计金豆</Text>
                    <Text style={{
                        marginTop: 11,
                        fontSize: 24,
                        color: '#202020', fontFamily: "Helvetica"
                    }}>23019</Text>
                </View>
            </View>
        </View>
    }


    //点击事件
    toExchangeCenter() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'ExchangeCenter',
            })
        );
    }
}

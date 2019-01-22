import React, { PureComponent } from "react";

import { View, Alert, TouchableOpacity, Image, Text, ProgressBarAndroid } from "react-native";

import TopBar from "../../../../../../components/topbar";

import styles from "./style"
import myIcon from "../../../../../../assets/images/my.png";
import { width } from '../../../../../../util/AdapterUtil'
import closeIcon from "../../../../../../assets/images/close.png";
import RefreshableFlatList from "react-native-refreshable-flatlist";
import { StackActions } from "react-navigation";

export default class ShareListScreen extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <TopBar navigation={this.props.navigation} title="余额"
                    leftIsVisible={true}
                    rightIsVisible={true}
                    rightImage={myIcon}
                    _rightOnPress={this.collectionAction.bind(this)}></TopBar>

                <View style={{ alignItems: 'center', zIndex: 1000, backgroundColor: "#fff" }}>
                    <View style={{
                        marginTop: 20,
                        width: width / 2,
                        height: width / 2 - 50,
                        borderRadius: 3,
                        marginLeft: 0,
                        justifyContent: "center",
                        alignItems: 'center',
                        borderColor: '#ccc',
                        borderWidth: 1,
                        backgroundColor: '#f1f1f1'
                    }}>
                        <Text>余额[元]</Text>
                        <Text style={styles.fontStyle}>200.00</Text>
                    </View>
                </View>
                {this.renderTiXianContent()}
                {this.renderTiXianHistory()}
            </View>
        )
    }

    renderTiXianContent() {
        return <View style={{ zIndex: 1000, backgroundColor: "#fff" }}>
            <View >
                <Text style={[styles.fontStyle, { color: '#ccc', marginLeft: 10, marginTop: 20, marginBottom: 10 }]}>提现方式</Text>
            </View>

            <TouchableOpacity
                style={{ width: "100%", marginTop: 5 }}
                onPress={this.onAliPay.bind(this)}>
                <View style={styles.line} />
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <Image
                        source={closeIcon}
                        style={{ width: 18, height: 18, marginLeft: 20, marginTop: 10, marginBottom: 10 }} />
                    <Text style={{ flex: 1, color: '#222', fontSize: 15, marginLeft: 20, marginTop: 10, marginBottom: 10 }}>支付宝提现</Text>
                    <Image
                        source={closeIcon}
                        style={{ width: 18, height: 18, marginRight: 20, marginTop: 10, marginBottom: 10 }} />
                </View>
                <View style={styles.line} />
            </TouchableOpacity>

            <TouchableOpacity
                style={{ width: "100%", marginTop: 5 }}
                onPress={this.onPhonePay.bind(this)}>
                <View style={styles.line} />
                <View style={{ width: "100%", flexDirection: "row", }}>
                    <Image
                        source={closeIcon}
                        style={{ width: 18, height: 18, marginLeft: 20, marginTop: 10, marginBottom: 10 }} />
                    <Text style={{ flex: 1, color: '#222', fontSize: 15, marginLeft: 20, marginTop: 10, marginBottom: 10 }}>手机充值</Text>
                    <Image
                        source={closeIcon}
                        style={{ width: 18, height: 18, marginRight: 20, marginTop: 10, marginBottom: 10 }} />
                </View>
                <View style={styles.line} />
            </TouchableOpacity>
        </View>
    }
    renderTiXianHistory() {
        return <View style={{ flex: 1 }}>
            <View style={{ zIndex: 1000, backgroundColor: "#fff" }}>
                <Text style={[styles.fontStyle, { color: '#ccc', marginLeft: 10, marginTop: 20, marginBottom: 10 }]}>提现记录</Text>
            </View>
            <RefreshableFlatList
                data={[{ id: '1', name: '小明' }, { id: '2', name: '小德' }, { id: '3', name: '小发' }]}
                renderItem={this._renderItem}
                topIndicatorComponent={() => <ProgressBarAndroid color='red' />}
                bottomIndicatorComponent={() => <ProgressBarAndroid color='red' />}
                // ref={(ref) => { this.flatList = ref}}
                topPullingPrompt="下拉刷新"
                topRefreshingPrompt="刷新中..."
                topHoldingPrompt="下拉刷新"
                bottomPullingPrompt="上拉加载"
                bottomRefreshingPrompt="加载中..."
                bottomHoldingPrompt="上拉加载"
                onRefreshing={this._onRefresh}
                onLoadMore={this._onLoadMore}
                keyExtractor={item => item.id}
                styles={{ prompt: { color: 'gray' } }}
            />
        </View>
    }

    //右上角按钮事件
    collectionAction() {
        Alert.alert("你点击了按钮！");
    }
    //支付宝提现
    onAliPay() {
        this.props.navigation.navigate('AliPay');
    }
    //手机提现
    onPhonePay() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'PhonePay',
            })
        );
    }
    _renderItem = ({ item }) => (
        <MyListItem
            id={item.id}
            onPressItem={this._onPressItem.bind(this)}
            title={item.name}
        />
    )
    _keyExtractor = (item, index) => item.id;
    // _onPressItem (id: string) {
    _onPressItem() {

    }
    _onRefresh() {
        return new Promise((r) => {
            setTimeout(() => {
                r();
            }, 1000)
        })
    }
    _onLoadMore() {
        return new Promise((r) => {
            setTimeout(() => {
                r();
            }, 1000)
        });
    }
}

class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{ width: "100%", marginTop: 5 }}
                    onPress={this._onPress.bind(this)}>
                    <View style={styles.line} />
                    <View style={{
                        width: "100%", flexDirection: "row", alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <Text style={{ flex: 1, color: '#222', fontSize: 15, marginLeft: 20, marginTop: 5, marginBottom: 5 }}>
                            {this.props.title}
                            {'\r\n'}
                            <Text style={{ color: '#ccc' }}>
                                2018/10/03 20:00:00
                            </Text>
                        </Text>

                        <Text style={{ fontSize: 15, color: '#ccc', marginRight: 15 }}>
                            审核中
                        </Text>
                        <Image
                            source={closeIcon}
                            style={{ width: 18, height: 18, marginRight: 20, justifyContent: "center" }} />
                    </View>
                    <View style={styles.line} />
                </TouchableOpacity>
            </View>
        )
    }
}

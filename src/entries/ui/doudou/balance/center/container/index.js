import React, { PureComponent } from "react";

import {
    View,
    Alert,
    TouchableOpacity,
    Image,
    Text,
    FlatList,
    ScrollView,
    Platform, RefreshControl
} from "react-native";

import TopBar from "../../../../../../components/topbar";

import styles from "./style"
import myIcon from "../../../../../../assets/images/my.png";
import { width } from '../../../../../../util/AdapterUtil'
import rightImage from "../../../../../../assets/images/mine_indicator.png"
import zhifubao from "../../../../../../assets/images/zhifubao.png";
import shouji from "../../../../../../assets/images/shouji.png";
import { StackActions } from "react-navigation";
import { DefaultHeader, SmartRefreshControl } from "react-native-smartrefreshlayout";

export default class ShareListScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            refreshing: false
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <TopBar navigation={this.props.navigation} title="余额"
                    leftIsVisible={true}></TopBar>
                <ScrollView
                    style={{ flex: 1 }}
                    alwaysBounceVertical={true}
                    refreshControl={
                        Platform.OS == 'ios' ?
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}>
                            </RefreshControl>
                            :
                            <SmartRefreshControl
                                ref={ref => this.rc = ref}
                                HeaderComponent={<DefaultHeader />}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                    }>
                    <View style={{ alignItems: 'center', backgroundColor: "#fff" }}>
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ marginTop: 27, color: "#505050", fontSize: 12 }}>余额（元）</Text>
                            <Text style={{
                                fontSize: 33, color: "#202020", marginTop: 15,
                                fontWeight: 'bold',
                                alignItems: "center",
                                justifyContent: "center", fontFamily: "Helvetica"
                            }}>200.00</Text>
                        </View>
                    </View>
                    {this.renderTiXianContent()}
                    {this.renderTiXianHistory()}
                </ScrollView>
            </View>
        )
    }

    renderTiXianContent() {
        return <View style={{ backgroundColor: "#fff" }}>
            <View >
                <Text style={[styles.fontStyle, { color: '#202020', fontWeight: "bold", marginLeft: 17, marginTop: 25 }]}>提现方式</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 9, marginRight: 9 }}>
                <View style={[styles.shadowView, { flex: 1 }]}>
                    <TouchableOpacity
                        onPress={this.onAliPay.bind(this)}>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={zhifubao}
                                style={{ width: 47, height: 47, marginLeft: 12, marginTop: 10, marginBottom: 10 }} />
                            <Text style={{ flex: 1, color: '#505050', fontSize: 16, marginLeft: 13 }}>支付宝提现</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.shadowView, { flex: 1 }]}>
                    <TouchableOpacity
                        onPress={this.onPhonePay.bind(this)}>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                            <Image
                                source={shouji}
                                style={{ width: 27, height: 45, marginLeft: 20, marginTop: 11, marginBottom: 11 }} />
                            <Text style={{ flex: 1, color: '#505050', fontSize: 16, marginLeft: 20, marginTop: 10, marginBottom: 10 }}>手机充值</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    }
    renderTiXianHistory() {
        return <View style={{ flex: 1, marginTop: 9 }}>

            <View style={{ zIndex: 1000, backgroundColor: "#fff" }}>
                <Text style={[styles.fontStyle, { color: '#202020', fontWeight: "bold", marginLeft: 17, marginTop: 15, marginBottom: 15 }]}>提现记录</Text>
            </View>
            <FlatList
                data={[{ id: '1', name: '小明' }, { id: '2', name: '小德' }, { id: '3', name: '小发' }]}
                renderItem={this._renderItem}
                keyExtractor={item => item.id} />
        </View>
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
    _onPressItem(id) {

    }
    _onRefresh() {
        setTimeout(() => {
            Platform.OS == 'ios' ? this.setState({ refreshing: false }) : this.rc && this.rc.finishRefresh();
        }, 1000);
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
                    style={{ width: "100%" }}
                    onPress={this._onPress.bind(this)}>
                    <View style={{
                        width: "100%", flexDirection: "row", alignItems: "center",
                        justifyContent: "center"
                    }}>

                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <Text style={{ flex: 1, color: '#505050', fontSize: 16, marginTop: 16, marginLeft: 18 }}>
                                {this.props.title}
                            </Text>
                            <Text style={{ flex: 1, color: '#808080', fontSize: 12, marginTop: 10, marginLeft: 18, marginBottom: 16, fontFamily: "Helvetica" }}>
                                {this.getDateFormat(1543908499245)}
                            </Text>
                        </View>
                        <Text style={[{ fontSize: 16, color: '#ccc', marginRight: 10 }, this.getObserverColor(1)]}>
                            {this.getObserverText(2)}
                        </Text>
                        <Image
                            source={rightImage}
                            style={{ width: 6, height: 11, marginRight: 17, justifyContent: "center" }} />
                    </View>
                    <View style={styles.line} />
                </TouchableOpacity>
            </View>
        )
    }

    getObserverColor(isObserver) {
        if (isObserver === 0) {
            //审核通过
            return { color: '#808080' };
        } else if (isObserver === 1) {
            //审核中
            return { color: '#F98141' };
        } else if (isObserver === 2) {
            //审核未通过
            return { color: '#22AC38' };
        }
    }

    getObserverText(isObserver) {
        if (isObserver === 0) {
            //审核通过
            return "审核通过";
        } else if (isObserver === 1) {
            //审核中
            return "审核中";
        } else if (isObserver === 2) {
            //审核未通过
            return "审核未通过";
        }
    }

    getDateFormat(time) {
        var date = new Date(time);
        var year = date.getFullYear().toString();
        var month = (date.getMonth() + 1).toString();
        var day = date.getDate().toString();
        var hour = date.getHours().toString();
        var minute = date.getMinutes().toString();
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    };
}

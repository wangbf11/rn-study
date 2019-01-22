import React, { PureComponent } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    ScrollView,
    Platform,
    RefreshControl, FlatList, TouchableOpacity, Image
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import { DefaultHeader, SmartRefreshControl } from "react-native-smartrefreshlayout";
import ic_yes from "../../../../../../assets/images/ic_yes.png";
import ic_error from "../../../../../../assets/images/ic_error.png";
import styles from "./style"

export default class AccountSetController extends PureComponent {
    constructor() {
        super();
        this.state = {
            refreshing: false,
        };
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
                <TopBar navigation={this.props.navigation} title="消息中心" _rightOnPress={this.handleBackPress.bind(this)}
                    leftIsVisible={true}></TopBar>
                <ScrollView
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
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={[{ id: '1', des: '支付宝提现20元已通过审核，请留意相关账 户余额变化。', isPass: 1, time: 1543908499245 },
                        { id: '2', des: '支付宝提现20元审核不通过，请在提现记录 中查看未通过原因。', isPass: 0, time: 1543908499245 },
                        { id: '3', des: '支付宝提现20元已通过审核，请留意相关账 户余额变化。', isPass: 1, time: 1543908499245 }]}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.id} />
                </ScrollView>
            </View>
        );
    }

    _onRefresh() {
        setTimeout(() => {
            Platform.OS == 'ios' ? this.setState({ refreshing: false }) : this.rc && this.rc.finishRefresh();
        }, 1000);
    }

    _renderItem = ({ item }) => (
        <MyListItem
            onPressItem={this._onPressItem.bind(this)}
            item={item}
        />
    )

    _onPressItem(id) {

    }
}

class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item.id);
    };

    render() {
        return (
            <View style={{ marginLeft: 10, marginTop: 2, marginRight: 10, marginBottom: 2 }}>
                <View style={styles.shadowView}>
                    <TouchableOpacity
                        onPress={this._onPress.bind(this)}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ flex: 1, fontSize: 16, color: '#202020', marginTop: 21, marginLeft: 13, fontWeight: "bold" }}>
                                {this.getObserverText(this.props.item.isPass)}
                            </Text>
                            <Image
                                source={this.props.item.isPass === 0 ? ic_error : ic_yes}
                                style={{ width: 32, height: 32, marginRight: 7, marginTop: 14 }} />
                        </View>
                        <Text style={{ marginTop: 15, marginLeft: 13, marginRight: 13, color: '#505050', fontSize: 16, lineHeight: 25 }}>
                            {this.props.item.des}
                        </Text>
                        <Text style={{ color: '#808080', fontSize: 12, marginRight: 13, marginTop: 15, marginBottom: 15, textAlign: "right", fontFamily: "Helvetica" }}>
                            {this.getDateFormat(this.props.item.time)}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getObserverText(isObserver) {
        if (isObserver === 0) {
            //审核未通过
            return "提现审核不通过";
        } else if (isObserver === 1) {
            //审核中
            return "提现审核通过";
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

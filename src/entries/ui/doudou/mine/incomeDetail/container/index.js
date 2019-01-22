import React, { PureComponent } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    Platform,
    RefreshControl, ScrollView, TouchableOpacity, Image
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import { DefaultHeader, SmartRefreshControl } from "react-native-smartrefreshlayout";
import ic_golden from "../../../../../../assets/images/ic_golden.png";
import ic_sign from "../../../../../../assets/images/ic_sign.png";
import ic_alipay from "../../../../../../assets/images/ic_alipay.png";
import ic_read from "../../../../../../assets/images/ic_read.png";
import ic_task from "../../../../../../assets/images/ic_task.png";
import ic_income from "../../../../../../assets/images/ic_income.png";
import styles from "./style";

export default class AccountSetController extends PureComponent {
    constructor() {
        super();
        this.state = {
            refreshing: false
        }
    }
    componentDidMount() {

    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
                <TopBar navigation={this.props.navigation} title="收支明细" _rightOnPress={this.handleBackPress.bind(this)}
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
                    style={{marginTop: 5}}
                        data={[{ id: '0', name: '金币税换', income: "-2000金币" },
                        { id: '1', name: '签到奖励', income: "+200金币" },
                        { id: '2', name: '支付宝提现', income: "-10.00元" },
                        { id: '3', name: '阅读资讯', income: "+50金币" },
                        { id: '4', name: '任务名称', income: "+1.50元" },
                        { id: '5', name: '收徒提成', income: "+1.50元" }]}
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
        let iconArray = [];
        iconArray.push(ic_golden);
        iconArray.push(ic_sign);
        iconArray.push(ic_alipay);
        iconArray.push(ic_read);
        iconArray.push(ic_task);
        iconArray.push(ic_income);
        return (
            <View style={{ marginLeft: 10, marginTop: 2, marginRight: 10, marginBottom: 2 }}>
                <TouchableOpacity onPress={this._onPress.bind(this)}>
                    <View style={[styles.shadowView, { flexDirection: "row" }]}>
                        <Image
                            source={iconArray[this.props.item.id]}
                            style={{ width: 60, height: 53, marginLeft: 7, marginTop: 10, marginBottom: 10 }} />
                        <View style={{ flex: 1, justifyContent: "center", marginLeft: 15 }}>
                            <Text style={{ fontSize: 16 }}>
                                {this.props.item.name}
                            </Text>
                            <Text style={{ color: '#808080', fontSize: 12, marginTop: 5, fontFamily: "Helvetica" }}>
                                {this.getDateFormat(1543908499245)}
                            </Text>
                        </View>
                        <View style={{ justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, color: '#202020', fontWeight: "bold", marginRight: 15 }}>
                                {this.props.item.income}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
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

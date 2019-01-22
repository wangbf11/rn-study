import React, { PureComponent } from "react";
import {
    View,
    Image,
    Text,
    NativeModules,
    ScrollView,
    TouchableOpacity,
    Platform,
    RefreshControl, StatusBar, ImageBackground,
    BackHandler,
    ToastAndroid
} from "react-native";
import { StackActions } from "react-navigation"
import { ScrollableTabBar } from "react-native-scrollable-tab-view";
import ScrollableTabView from "react-native-scrollable-tab-view";
import styles from "./style";
import { SmartRefreshControl, DefaultHeader } from 'react-native-smartrefreshlayout';
import { width, statusBarHeight } from '../../../../../util/AdapterUtil'
import StoreUtil from "../../../../../util/StoreUtil";
import Confirm from "../../../../../components/confirm";
import topLogoImage from "../../../../../assets/images/home_top.png";
import signLvImage from "../../../../../assets/images/sign_lv.png";
import rightArrowImage from "../../../../../assets/images/right_arrow.png";
import taskImage from "../../../../../assets/images/003_task.png"
import newbietaskImage from "../../../../../assets/images/003_newbietask.png"
import shareImage from "../../../../../assets/images/003_share.png"

var pushNativeModule = NativeModules.PushNative;

var nativeModule = NativeModules.OpenNativeModule;

class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            user: null,
            isVisible: false,
            modalTitle: "填写邀请码",
            modalContent: "可以从推荐您使用本app的用户那里获得",
            modalSure: "确认",
            modalLeftIsHide: false,
            modalInputIsVisible: true,
            warnIsVisible: false,
            refreshing: false,
        };
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    componentDidMount() {
        // let user = global.realm.objects("User").filtered('id = 1');
        let user = [{ id: 1, name: "大的" }, { id: 2, name: "小的" }];
        this.setState({
            user: user[0].name,
        });
        this.Verification();
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

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                {this.renderTopContent()}
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
                    {this.renderFirstContent()}
                    {this.renderSignContent()}
                    {this.renderTaskContent()}

                    <Text style={{
                        fontSize: 20,
                        color: '#202020',
                        fontWeight: 'bold',
                        marginLeft: 17
                    }}>赚钱专区</Text>

                    {this.renderZuanContent()}
                    {this.renderScrollableContent()}
                </ScrollView>

                <Confirm
                    cancelClick={this.cancelDetailModal.bind(this)}
                    sureClick={this.sureDetailModal.bind(this)}
                    isVisible={this.state.isVisible}
                    title={this.state.modalTitle}
                    canceText="稍后填写"
                    sureText={this.state.modalSure}
                    hideLeftBtn={this.state.modalLeftIsHide}
                    inputIsVisible={this.state.modalInputIsVisible}
                    warnIsVisible={this.state.warnIsVisible}
                    content={this.state.modalContent} />
            </View>
        );
    }

    renderTopContent() {
        return <View style={{ height: 50 + statusBarHeight, backgroundColor: "#fff", zIndex: 1000, }}>
            <View style={{ height: "100%", flexDirection: "row" }}>
                <StatusBar
                    backgroundColor={'#00000000'}
                    barStyle={this.props.barStyle || 'dark-content'}
                    translucent={true} />
                <View style={{
                    flex: 1, height: 50 + statusBarHeight, flexDirection: "row",
                    backgroundColor: "#fff"
                }}>
                    <Image
                        style={{
                            height: 31, width: 130, resizeMode: 'contain',
                            position: 'absolute', left: 16, bottom: 14
                        }}
                        source={topLogoImage} />

                </View>

                <TouchableOpacity
                    style={{
                        width: 40, height: "100%",
                    }}
                    onPress={this.onPortraitPress.bind(this)}>
                    <Image
                        source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                        style={{ width: 43, height: 43, borderRadius: 22, position: 'absolute', right: 17, bottom: 5 }} />
                    <Image
                        source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                        style={{ width: 14, height: 14, position: 'absolute', right: 17, bottom: 6, borderRadius: 7 }} />
                </TouchableOpacity>
            </View>

            <View style={{
                height: 1,
                backgroundColor: "#ccc",
                transform: [{ scaleY: 0.5 }]
            }}>
            </View>
        </View>
    }

    renderFirstContent() {
        return <View style={{ marginTop: 12, flexDirection: "row", marginLeft: 9, marginRight: 9 }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={this.goldenCenter.bind(this)}>
                <View style={[{ flexDirection: "row", alignItems: "center" }, styles.shadowView]}>

                    <View style={{ flex: 1, paddingBottom: 12, paddingTop: 17 }}>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{ marginLeft: 10, color: "#202020", fontSize: 16 }}>金豆</Text>
                            <Text style={{ marginLeft: 5, color: "#808080", fontSize: 10 }}>[使用]</Text>
                        </View>
                        <Text style={{ marginLeft: 10, marginTop: 10, color: "#202020", fontSize: 27, fontWeight: "bold", fontFamily: "Helvetica" }}>2000</Text>
                    </View>
                    <Image
                        source={rightArrowImage}
                        style={{ width: 5, height: 10, marginRight: 10 }} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={this.onBalancePress.bind(this)}>
                <View style={[{ flexDirection: "row", alignItems: "center" }, styles.shadowView]}>
                    <View style={{ flex: 1, paddingBottom: 12, paddingTop: 17 }}>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{ marginLeft: 10, color: "#202020", fontSize: 16 }}>余额</Text>
                            <Text style={{ marginLeft: 5, color: "#808080", fontSize: 10 }}>[提现]</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{ marginLeft: 10, marginTop: 10, color: "#202020", fontSize: 27, fontWeight: "bold", fontFamily: "Helvetica" }}>198.5
                        <Text style={{ color: "#505050", fontSize: 10 }}>{" "}元</Text>
                            </Text>

                        </View>
                    </View>
                    <Image
                        source={rightArrowImage}
                        style={{ width: 5, height: 10, marginRight: 10 }} />
                </View>
            </TouchableOpacity>
        </View>
    }

    renderSignContent() {
        return <View style={{ marginTop: 5, flexDirection: "row", marginLeft: 9, marginRight: 9 }}>
            <View style={[styles.firstLayout, styles.shadowView, { flex: 1, alignItems: "center" }]}>
                <ImageBackground
                    source={signLvImage}
                    style={{ width: 76, height: 64, marginLeft: 13, marginBottom: 13, marginTop: 13, justifyContent: "center", alignItems: "center" }}>
                    <Text>13</Text>
                </ImageBackground>

                <View style={{ flex: 1, marginLeft: 13 }}>
                    <Text style={{ color: "#202020", fontSize: 12 }}>今日可领</Text>

                    <Text style={{ color: "#F98240", fontSize: 23, fontWeight: 'bold', marginTop: 5, fontFamily: "Helvetica" }}>
                        200
                   <Text style={{ color: "#F98240", fontSize: 10 }}>
                            {" "}金豆
                    </Text>
                    </Text>
                    <Text style={{ color: "#505050", fontSize: 10, marginTop: 4, fontFamily: "Helvetica" }}>连续签到10天可领2000金豆</Text>
                </View>

                <View style={{
                    borderColor: '#F98141',
                    width: 43,
                    height: 43,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: '#F98141',
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderWidth: 1,
                    marginRight: 13
                }}>
                    <TouchableOpacity
                        style={{
                            width: "100%", height: "100%", justifyContent: "center",
                            alignItems: 'center'
                        }}
                        onPress={this.sign.bind(this)}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 12 }}>签到</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    }

    renderTaskContent() {
        return <ImageBackground
            style={{
                height: width * 121 / 373,
                justifyContent: "center",
                alignItems: 'center',
                marginTop: -5,
            }}>
            <TouchableOpacity onPress={this.newbieTask.bind(this)} style={{ flexDirection: "row" }}>
                <Image source={newbietaskImage}
                    style={{ width: width, height: width * 121 / 373 }} />
            </TouchableOpacity>
        </ImageBackground>
    }

    renderZuanContent() {
        let widths = (width - 34 - 15) / 2
        let widthi = widths - 19
        return <View style={[styles.firstLayout, { height: widths * 110 / 163 + 20 }]}>
            <View style={[styles.portraitLayout, {
                flex: 1,
                marginLeft: 17,
                marginRight: 8,
                backgroundColor: '#FFD22A'
            }]}>
                <TouchableOpacity onPress={() => this.openNatives()}>
                    <Image source={taskImage}
                        style={{ width: widthi, height: widthi * 103 / 145, marginLeft: 6 }} />
                </TouchableOpacity>
            </View>

            <View style={[styles.portraitLayout, {
                flex: 1,
                marginLeft: 8,
                marginRight: 17,
                backgroundColor: '#F98141'
            }]}>
                <TouchableOpacity onPress={this.doingShare.bind(this)} style={{ flex: 1 }}>
                    <Image source={shareImage}
                        style={{ width: widthi, height: widthi * 103 / 145, marginLeft: 6 }} />
                </TouchableOpacity>
            </View>
        </View>
    }

    renderScrollableContent() {
        return <ScrollableTabView
            style={[{
                marginLeft: 10,
                marginRight: 10,
                height: 200
            },
            Platform.OS == 'ios' ? { alignItems: "center", } : null
            ]}
            renderTabBar={() =>
                <ScrollableTabBar style={[{
                    height: 40,
                    borderWidth: 0,
                    alignItems: "center",
                }, Platform.OS == 'ios' ? { width: width - 100, } : null]}
                    tabStyle={{ height: 40, paddingLeft: 0, paddingRight: 0 }}
                    tabsContainerStyle={{ width: width - 100 }}
                    activeTextColor="#202020"
                    textStyle={{
                        fontSize: 16,
                        color: '#505050'
                    }} />}
            tabBarUnderlineStyle={{ backgroundColor: '#FFCF1B', height: 3 }}>
            <Text tabLabel='综合'>Tab 1</Text>
            <Text tabLabel='科技'>Tab 2</Text>
            <Text tabLabel='军事'>Tab 3</Text>
            <Text tabLabel='财经'>Tab 4</Text>
            <Text tabLabel='社会'>Tab 5</Text>
            <Text tabLabel='体育'>Tab 6</Text>
        </ScrollableTabView>
    }

    sign() {
        //签到
        // this.props.navigation.dispatch(StackActions.popToTop());
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'SignCenter',
            })
        );
    }

    goldenCenter() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'GoldenCenter',
            })
        );
    }

    doingShare() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "DoingShare"
            })
        )
    }

    newbieTask() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "NewbieTask"
            })
        )
    }

    onBalancePress() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'Balance',
            })
        );
        // this.props.navigation.navigate('Balance');
    }

    onPortraitPress() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "Mine"
            })
        );
    }

    openNative() {
        //跳转原生页面
        nativeModule.openNativeVC();
    }

    openNatives() {
        if (Platform.OS == "ios") {
            pushNativeModule.RNOpenOneVC()
        }
        else {
            nativeModule.openNativeVC();
        }
    }


    Verification() {
        StoreUtil.getToken().then((token) => {
            if (token !== null) {
                this.openLoginConfirm();
            } else {
                //this.openInvitationCodeConfirm();
            }
        });
    }

    //首页邀请码填写弹框
    openInvitationCodeConfirm() {
        this.setState({
            isVisible: true,
            modalTitle: "填写邀请码",
            modalContent: "可以从推荐您使用本app的用户那里获得",
            modalSure: "确认",
            modalLeftIsHide: false,
            warnIsVisible: false,
            modalInputIsVisible: true
        });
    }

    //首页未登陆
    openLoginConfirm() {
        this.setState({
            isVisible: true,
            modalTitle: "警告",
            modalContent: "您处于未登录状态，奖励将无法发放到您的余额，请登录后继续使用。",
            modalSure: "立即登录",
            modalLeftIsHide: true,
            modalInputIsVisible: false,
            warnIsVisible: true,
        });
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


    _onRefresh() {
        this.setState({ refreshing: true });
        setTimeout(() => {
            Platform.OS == 'ios' ? this.setState({ refreshing: false }) : this.rc && this.rc.finishRefresh();
        }, 1000);
    }

}
export default Index;

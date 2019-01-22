import React, { Component } from "react";

import {
    createStackNavigator
} from "react-navigation";
import {
    View,
    Platform,
    StatusBar
} from "react-native";
import welcomScreen from "./entries/welcome";
import DouDouScreen from "./entries/ui/doudou/homepage";
import LogInScreen from "./entries/ui/doudou/loginpage";
import SignCenterScreen from "./entries/ui/doudou/signcenter";
import ExchangeCenterScreen from "./entries/ui/doudou/golden/exchangecenter";
import GoldenCenterScreen from "./entries/ui/doudou/golden/goldencenter";
import DoingShareScreen from "./entries/ui/doudou/share/doingshare";
import ShareListScreen from "./entries/ui/doudou/share/sharelist";
import NewbieTaskScreen from "./entries/ui/doudou/newbietask"
import Balance from "./entries/ui/doudou/balance/center";
import AliPay from "./entries/ui/doudou/balance/alipay";
import PhonePay from "./entries/ui/doudou/balance/phonepay";
import MineScreen from "./entries/ui/doudou/mine"
import AboutScreen from "./entries/ui/doudou/mine/about"
import AccountSetScreen from "./entries/ui/doudou/mine/accountSet"
import IncomeDetailScreen from "./entries/ui/doudou/mine/incomeDetail"
import MessageCenterScreen from "./entries/ui/doudou/mine/messageCenter"
import HelpCenterScreen from "./entries/ui/doudou/mine/helpCenter"
import ModifyPhoneCenterScreen from "./entries/ui/doudou/mine/accountSet/modifyPhone"
import ModifyPhoneDetailScreen from  "./entries/ui/doudou/mine/accountSet/modifyPhone/detail"
import CodePush from 'react-native-code-push'
import {MyDrawer} from './entries/drawer'

const RootRouter = createStackNavigator(
    {
        Welcom: {
            screen: welcomScreen
        },
        Drawer: {
            screen: MyDrawer
        },
        DouDou: {
            screen: DouDouScreen
        },
        LogIn: {
            screen: LogInScreen
        },
        SignCenter: {
            screen: SignCenterScreen
        },
        GoldenCenter: {
            screen: GoldenCenterScreen
        },
        ExchangeCenter: {
            screen: ExchangeCenterScreen
        },
        DoingShare: {
            screen: DoingShareScreen
        },
        ShareList: {
            screen: ShareListScreen
        },
        NewbieTask: {
            screen: NewbieTaskScreen
        },
        Balance: {
            screen: Balance
        },
        AliPay: {
            screen: AliPay
        },
        PhonePay: {
            screen: PhonePay
        },
        Mine: {
            screen: MineScreen
        },
        About: {
            screen: AboutScreen
        },
        AccountSet: {
            screen: AccountSetScreen
        },
        Income: {
            screen: IncomeDetailScreen
        },
        MessageCenter: {
            screen: MessageCenterScreen
        },
        HelpCenter: {
            screen: HelpCenterScreen
        },
        ModifyPhone: {
            screen: ModifyPhoneCenterScreen
        },
        ModifyPhoneDetail: {
            screen:  ModifyPhoneDetailScreen
        }
    },
    {
        navigationOptions: () => {
            return {
                header: null
            };
        }
    }
);

class Route extends Component {
    codePushStatusDidChange(syncStatus) {
        switch (syncStatus) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("检查更新");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("下载安装包");
                break;
            case CodePush.SyncStatus.AWAITING_USER_ACTION:
                console.log("等待用户协作");
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log("安装中");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log("已经是最新版本了");
                break;
            case CodePush.SyncStatus.UPDATE_IGNORED:
                console.log("取消更新");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log("更新完成");
                break;
            case CodePush.SyncStatus.UNKNOWN_ERROR:
                console.log("未知错误");
                break;
        }
    }
    componentDidMount() {
        CodePush.sync(
            {
                installMode: CodePush.InstallMode.IMMEDIATE,
                updateDialog: {
                    optionalIgnoreButtonLabel: '稍后',
                    optionalInstallButtonLabel: '立即更新',
                    optionalUpdateMessage: '有新版本了，是否更新？',
                    title: '更新提示'
                }
            },
            this.codePushStatusDidChange.bind(this),
        )
    }

    render() {
        return Platform.OS == "ios" ?
            <RootRouter /> :
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || '#F1F1F1'}
                    barStyle={this.props.barStyle || 'dark-content'} />
                <RootRouter />
            </View>;
    }
}

let codePushOptions = {
    //设置检查更新的频率
    //ON_APP_RESUME APP恢复到前台的时候
    //ON_APP_START APP开启的时候
    //MANUAL 手动检查
    checkFrequency : CodePush.CheckFrequency.ON_APP_RESUME
};
//这一行是必须的
export default CodePush( codePushOptions )( Route );

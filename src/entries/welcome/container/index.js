import React, { PureComponent } from "react";
import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    Image,
    BackHandler,
    ImageBackground,
    StatusBar,
    Platform,
} from "react-native";
import { StackActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import { width,height, safeAreaViewHeight } from "../../../util/AdapterUtil";
import logoImage from "../../../assets/images/001_logo.png"
import welcomeImage from "../../../assets/images/001_welcome.png"
import loginImage from "../../../assets/images/001_login.png"
import SplashScreen from 'react-native-splash-screen'

export default class Welcome extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {
        SplashScreen.hide();
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <StatusBar
                    backgroundColor={'#00000000'}
                    barStyle={(Platform.OS == "ios") ? "light-content" :this.props.barStyle || 'dark-content' }
                    translucent={true}/>
                <LinearGradient colors={['#FDA10E', '#FE4445']} style={{flex: 1,justifyContent: "center",
                    alignItems: "center"}}>
                    <View style={{flex: 1}}/>
                    <Image source={welcomeImage} style={{ marginTop: 30,width: width, height: height - 170 - safeAreaViewHeight - 70,
                        resizeMode: 'contain',}} />
                    <Text style={{ color: "#fff", fontSize: 18,  marginTop: 10, marginBottom: 30,
                        justifyContent: "center",
                        alignItems: "center"}}>一个靠谱儿的赚钱服务平台</Text>
                </LinearGradient>


                <View style={{ height:150,  marginBottom: 20 + safeAreaViewHeight }}>
                    <View style={{
                        alignItems: "center",
                        justifyContent: "center", marginTop: 10
                    }}>
                        <Image
                            source={logoImage} //206x58
                            style={{ width: 137, height: 39 }}></Image>
                    </View>
                    <View style={{ flexDirection: "row", flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this._onPress.bind(this)} style={{ marginLeft: 23, marginRight: 15, flex: 1, justifyContent: "center" }}>
                                <View style={{
                                    borderColor: '#dcdcdc',
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 47,
                                    backgroundColor: '#fff',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                }}>

                                    <Text style={{ fontSize: 20, color: '#202020' }}>暂不登录</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={this._onLogInPress.bind(this)} style={{ marginLeft: 15, marginRight: 23, flex: 1, justifyContent: "center" }}>
                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    height: 47,
                                }}>
                                    <ImageBackground
                                        source={loginImage} //758x928
                                        style={{
                                            width: (width - 76) / 2, height: 47, alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 20, color: '#fff' }}>立即登录</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    //
    _onLogInPress() {
        //跳转登陆页面
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: 'LogIn',
            })
        )
    }

    _onPress() {
        //关闭app
        BackHandler.exitApp();
    }
}

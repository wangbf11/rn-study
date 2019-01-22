import React, { PureComponent } from "react";
import {
    View,
    TextInput, Picker, TouchableOpacity, Text, BackHandler,
    ImageBackground, Image, StatusBar
} from "react-native";
import TopBar from "../../../../../components/topbar";
import { NavigationActions, StackActions } from "react-navigation";
import StoreUtil from "../../../../../util/StoreUtil";
import loginheadImage from "../../../../../assets/images/002_loginhead.png"
import backIcon from "../../../../../assets/images/back_16x16.png"
import { width, statusBarHeight } from "../../../../../util/AdapterUtil";
import logoImage from "../../../../../assets/images/002_logo.png"
import loginImage from "../../../../../assets/images/bt_login.png";

class login extends PureComponent {
    constructor() {
        super();
        this.state = {
            areaCode: "+86",
            time: 0
        };
    }


    componentDidMount() {
        this.setState({
            language: "cn"
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* <StatusBar barStyle={'light-content'} /> */}
                <ImageBackground source={loginheadImage} style={{ width: width, height: width * 156 / 375 }} >
                    <TouchableOpacity
                        style={{ width: 44, marginLeft: 17, paddingTop: statusBarHeight, height: statusBarHeight + 44, justifyContent: "center" }}
                        onPress={this.goBack.bind(this)} >
                        <Image
                            style={{ height: 16, width: 16 }}
                            source={backIcon} />
                    </TouchableOpacity>
                </ImageBackground>
                <View style={{ alignItems: "center", justifyContent: "center", marginTop: 50 }}>
                    <Image
                        style={{ height: 60, width: 213 }}
                        source={logoImage} />
                </View>

                <View style={{ flex: 1, marginTop: 90 }}>

                    <View style={{
                        flexDirection: "row",
                        marginLeft: 34,
                        marginRight: 34,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: "#DCDCDC"
                    }}>
                        <TextInput
                            style={{ height: 47, padding: 0, paddingLeft: 14, fontSize: 14, color: "#808080" }}
                            placeholder="输入手机号登陆"
                            onChangeText={(text) => this.setState({ text })} />
                    </View>
                    <View style={{
                        flexDirection: "row", marginLeft: 34, marginRight: 34, marginTop: 21,
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: "#DCDCDC"
                    }}>
                        <TextInput
                            style={{ flex: 1, height: 47, padding: 0, paddingLeft: 14, fontSize: 14, color: "#808080" }}
                            placeholder="输入验证码"
                            onChangeText={(text) => this.setState({ text })} />
                        <View style={{ width: 1, backgroundColor: "#DCDCDC", transform: [{ scaleY: 0.4 }] }} />
                        <TouchableOpacity onPress={this._onVCodePress.bind(this)}>
                            <View style={{
                                height: 47,
                                width: 130,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <Text style={{ fontSize: 16, color: '#F97E43' }}
                                    numberOfLines={1}>获取验证码{this.state.time === 0 ? null : "(" + this.state.time + ")"}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={this._onPress.bind(this)}>
                        <ImageBackground
                            source={loginImage} //758x928
                            imageStyle={{ borderRadius: 8 }}
                            style={{
                                height: 47, marginLeft: 31, marginRight: 31, marginTop: 20, alignItems: "center",
                                justifyContent: "center"
                            }}>
                            <Text style={{ color: '#fff', fontSize: 20 }}>开始赚钱</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    goBack() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    _onPress() {
        //进入首页
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        // routeName: "Drawer"
                        routeName: "DouDou"
                    })
                ]
            })
        );
    }
    _onVCodePress() {
        //获取验证码 并开始倒计时
        if (this.state.time !== 0) {
            return;
        }
        this.setState({
            time: 60,
        });

        let interval = setInterval(() => {
            this.setState({
                time: this.state.time - 1,
            });
            if (this.state.time === 0) {
                clearInterval(interval);
            }
        }, 1000);
    }
}
export default login;

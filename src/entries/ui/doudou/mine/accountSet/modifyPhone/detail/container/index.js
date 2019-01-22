import React, { PureComponent } from "react";
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { StackActions } from "react-navigation";
import TopBar from "../../../../../../../../components/topbar";
import nextImage from "../../../../../../../../assets/images/modifyPhone_next.png"
export default class ModeifyPhoneDetailController extends PureComponent {
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    clickGetCodeBtn() {

    }

    clickSubmitBtn() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TopBar navigation={this.props.navigation} title="修改手机号码" _rightOnPress={this.handleBackPress.bind(this)}
                    leftIsVisible={true}></TopBar>

                <View style={{ height: 100, marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput placeholder='输入手机号码' style={{ height: 50, flex: 3 }}></TextInput>
                    <TouchableOpacity onPress={this.clickGetCodeBtn.bind(this)} style={{
                        height: 20, flex: 1, marginRight: 20
                    }}>
                        <Text style={{ color: '#F98141' }}>获取验证码</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: 200, height: 1, marginLeft: 15, backgroundColor: '#DCDCDC' }}></View>
                <View style={{ height: 100, marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput placeholder='输入验证码' style={{ height: 50, flex: 3 }}></TextInput>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={{ width: 200, height: 1, marginLeft: 15, backgroundColor: '#DCDCDC' }}></View>

                <TouchableOpacity onPress={this.clickSubmitBtn.bind(this)} style={{
                    flex: 1, marginTop: 50, alignSelf: 'center'
                }}>
                    <ImageBackground source={nextImage} style={{
                        width: 150, height: 45,
                        borderRadius: 5, justifyContent: 'center', alignItems: "center"
                    }}>
                        <Text style={{
                            width: 28, height: 15, color: 'white',
                            justifyContent: 'center'
                        }}>提交</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}
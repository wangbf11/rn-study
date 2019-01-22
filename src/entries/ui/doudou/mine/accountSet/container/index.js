import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StackActions } from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import styles from "./style";
import userImage from "../../../../../../assets/images/accountSet_01.png"
import modify from "../../../../../../assets/images/accountSet_modify.png"
import codeImage from "../../../../../../assets/images/accountSet_code.png"
export default class AccountSetController extends PureComponent {
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }

    clickModifyUserImage() {

    }

    clickModifyUserName() {

    }

    clickModifyUserPhone() {
        this.props.navigation.dispatch(
            StackActions.push({
                routeName: "ModifyPhone"
            })
        );

    }

    clickModifyUserCode() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TopBar navigation={this.props.navigation} title="账号设置" _rightOnPress={this.handleBackPress.bind(this)}
                    leftIsVisible={true}></TopBar>
                <View style={{ height: 125, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={userImage} style={{
                        width: 90, height: 90, alignSelf: 'center',
                        marginLeft: 15, resizeMode: 'contain'
                    }}></Image>
                    <TouchableOpacity onPress={this.clickModifyUserImage.bind(this)} style={{
                        width: 100,
                        height: 20, marginLeft: 15, justifyContent: 'center'
                    }}>
                        <Text style={{ fontSize: 14 }}>修改头像</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 1, marginLeft: 15, marginRight: 15, backgroundColor: '#EEEEEE' }}></View>
                <View style={{ height: 70, flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Text style={{ width: 110, height: 20, fontSize: 14, color: '#202020' }}>豆豆赚钱ID</Text>
                    <Text style={{ height: 20, fontSize: 14 }}>43562145</Text>
                </View>
                <View style={{ height: 1, marginLeft: 15, marginRight: 15, backgroundColor: '#EEEEEE' }}></View>
                <View style={{ height: 70, flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Text style={{ width: 110, height: 20, fontSize: 14, color: '#202020' }}>昵称</Text>
                    <Text style={{ height: 20, fontSize: 14 }}>木质本樱</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.clickModifyUserName.bind(this)} style={{
                            width: 20, height: 20
                        }}>
                            <Image source={modify} style={{ width: 20, height: 20, resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 1, marginLeft: 15, marginRight: 15, backgroundColor: '#EEEEEE' }}></View>
                <View style={{ height: 70, flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Text style={{ width: 110, height: 20, fontSize: 14, color: '#202020' }}>绑定手机号</Text>
                    <Text style={{ height: 20, fontSize: 14 }}>158****1425</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={this.clickModifyUserPhone.bind(this)} style={{
                            width: 20, height: 20
                        }}>
                            <Image source={modify} style={{ width: 20, height: 20, resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ height: 1, marginLeft: 15, marginRight: 15, backgroundColor: '#EEEEEE' }}></View>
                <View style={{ height: 70, flexDirection: 'row', marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                    <Text style={{ width: 110, height: 20, fontSize: 14, color: '#202020' }}>我的二维码</Text>
                    <TouchableOpacity onPress={this.clickModifyUserCode.bind(this)}>
                        <Image source={codeImage} style={{ width: 38, height: 38, resizeMode: 'contain' }}></Image>
                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}
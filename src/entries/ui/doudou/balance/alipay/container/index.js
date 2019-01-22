import React, { PureComponent } from "react";
import {
    View, FlatList, Text, TouchableOpacity, Alert, TextInput, ImageBackground
} from "react-native";
import TopBar from "../../../../../../components/topbar";
import styles from "../container/style";
import { width, safeAreaViewHeight } from '../../../../../../util/AdapterUtil'
import loginImage from "../../../../../../assets/images/bt_login.png";

class AliPay extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [{ id: 1, money: '5', isSelect: true }, { id: 2, money: '10', isSelect: false }, { id: 3, money: '20', isSelect: false },
            { id: 4, money: '50', isSelect: false }, { id: 5, money: '100', isSelect: false }, { id: 6, money: '200', isSelect: false }]
        }
    }

    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                <TopBar navigation={this.props.navigation} title="支付宝提现"
                    leftIsVisible={true}></TopBar>
                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: "#fff", height: (width - 20 - 24) / 3 * 60 / 107 * 2 + 40, marginTop: 20 }}>
                        <FlatList
                            style={{ backgroundColor: "#fff", marginLeft: 12, marginRight: 12 }}
                            renderItem={this._renderItem}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            numColumns={3}
                            horizontal={false} />
                    </View>

                    <View style={{
                        backgroundColor: '#fff',
                        paddingLeft: 20,
                        justifyContent: "center",
                        borderRadius: 3
                    }}>
                        <Text style={{ fontSize: 12, color: '#222' }}>消耗余额
                        <Text style={{ color: 'red', fontFamily: "Helvetica" }}>
                                20.00
                        </Text>
                            元，当前余额
                        <Text style={{ color: 'red', fontFamily: "Helvetica" }}>
                                200.00
                        </Text>
                            元</Text>
                    </View>

                    <View style={{ backgroundColor: "#fff", marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{
                                height: 80, width: 120, paddingLeft: 20,
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#202020", fontSize: 16 }}>
                                    支付宝账号
                            </Text>
                            </View>

                            <TextInput
                                style={{ flex: 1, height: 80 }}
                                placeholder="手机号/邮箱"
                                onChangeText={(text) => this.setState({ text })}
                            />
                        </View>
                        <View style={styles.line} />
                    </View>
                    <View style={{ backgroundColor: "#fff", justifyContent: "center" }}>
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <View style={{
                                height: 80, width: 120, paddingLeft: 20,
                                justifyContent: "center"
                            }}>
                                <Text style={{ color: "#202020", fontSize: 16 }}>
                                    收款人姓名
                            </Text>
                            </View>

                            <TextInput
                                style={{ flex: 1, height: 80 }}
                                placeholder="支付宝账号对应认证姓名"
                                onChangeText={(text) => this.setState({ text })} />
                        </View>
                        <View style={styles.line} />
                    </View>
                </View>
                <TouchableOpacity onPress={this._onPressRecharge.bind(this)}>
                    <ImageBackground
                        source={loginImage} //758x928
                        style={{
                            height: 47, marginLeft: 16, marginRight: 16, alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>立即提现</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <Text style={{ marginTop: 16, fontSize: 11, color: '#808080', textAlign: "center", marginBottom: 30 + safeAreaViewHeight }}>预计需要1-2个工作日到账</Text>
            </View>
        );
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <MyListItem
            item={item}
            onPressItem={this._onPressItem.bind(this)}
        />
    )

    _onPressItem(item) {
        let data = this.state.data;
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === item.id) {
                data[i].isSelect = true;
            } else {
                data[i].isSelect = false;
            }
        }

        this.setState({
            data: [...data]
        });
    }

    //发送验证码
    _onSendCode() {
        Alert.alert("发送验证码！");
    }
    //立即充值
    _onPressRecharge() {
        Alert.alert("立即充值！");
    }
}

class MyListItem extends PureComponent {
    constructor() {
        super();
    }

    componentDidMount() {
    }
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        return (
            <View style={[{
                margin: 5,
                width: (width - 20 - 24) / 3,
                height: (width - 20 - 24) / 3 * 60 / 107,
                flex: 1,
                borderRadius: 8,
                justifyContent: "center",
                alignItems: 'center',
                borderWidth: 1,
            }, this.props.item.isSelect ? { borderColor: "#F98141", backgroundColor: '#F98141' } : { borderColor: "#dcdcdc", backgroundColor: '#fff' }]}>
                <TouchableOpacity
                    style={{
                        width: "100%", height: "100%", justifyContent: "center",
                        alignItems: 'center'
                    }}
                    onPress={this._onPress.bind(this)}>
                    {/*{this.props.item.isSelect ?<Image*/}
                    {/*style={{*/}
                    {/*height: 14,*/}
                    {/*width: 14,*/}
                    {/*position: 'absolute', left: 5, top: 5*/}
                    {/*}}*/}
                    {/*source={myIcon} />:null}*/}
                    <Text style={[styles.fontStyle, this.props.item.isSelect ? { color: "#fff" } : { color: "#202020" }]}>{this.props.item.money}元</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default AliPay;

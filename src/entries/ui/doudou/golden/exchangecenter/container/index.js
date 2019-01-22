import React, { PureComponent } from "react";
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Alert,
    Image, ImageBackground
} from "react-native";
import {
    NavigationActions,
    StackActions
} from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import { safeAreaViewHeight } from "../../../../../../util/AdapterUtil"
import styles from "./style";
import myIcon from "../../../../../../assets/images/my.png";
import iconAdd from "../../../../../../assets/images/icon_add.png";
import jian from "../../../../../../assets/images/jian.png";
import buttonImage from "../../../../../../assets/images/001_login.png";
export default class ExchangeCenterScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selceNum: 0,
            showBeans: 0,
            money: 0,
        }
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <TopBar navigation={this.props.navigation} title="金豆兑换"
                    leftIsVisible={true}></TopBar>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={{ fontSize: 14, color: '#808080', marginTop: 30 }}>金豆余额</Text>
                            <Text style={{ fontSize: 24, marginTop: 5, marginBottom: 25, fontWeight: 'bold', color: "#252525", fontFamily: "Helvetica" }}>2000</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 14, color: '#808080', marginTop: 30 }}>累计金豆</Text>
                            <Text style={{ fontSize: 24, marginTop: 5, marginBottom: 25, fontWeight: 'bold', color: "#252525", fontFamily: "Helvetica" }}>13140</Text>
                        </View>
                    </View>

                    <View style={{
                        marginLeft: 17,
                        backgroundColor: "#F98141",
                        borderBottomLeftRadius: 8,
                        borderTopLeftRadius: 8
                    }}>
                        <Text style={{ marginLeft: 14, marginTop: 10, marginBottom: 10, fontSize: 15, color: '#fff' }}>金豆兑换规则:（2000金豆=1元，200金豆起兑）</Text>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 37, marginBottom: 58 }}>
                        <View style={{ width: 155 }}>
                            <Text style={{ fontSize: 14, color: '#aaa', marginBottom: 10, alignSelf: "flex-start", fontFamily: "Helvetica" }}>x200金豆</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={this.subPoints.bind(this)}>
                                <View style={{
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    width: 47, height: 47
                                }}>
                                    <Image source={jian} style={{ width: 24, height: 2 }} />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 25, fontWeight: "bold", fontFamily: "Helvetica" }}>{this.state.selceNum}</Text>
                            <TouchableOpacity onPress={this.addPoints.bind(this)}>
                                <View style={{
                                    borderRadius: 5,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderWidth: 1,
                                    borderColor: "#ccc",
                                    width: 47, height: 47
                                }}>
                                    <Image source={iconAdd} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 1, transform: [{ translateY: 0.5 }], backgroundColor: "#dcdcdc", marginLeft: 15, marginRight: 15 }} />

                    <Text style={{ marginLeft: 20, marginTop: 15, fontSize: 16, color: "#202020", }}>最终兑换</Text>
                    <View style={{ flexDirection: "row" }} >
                        <View style={{ flex: 1, flexDirection: "row" }} >
                            <Text style={{ marginLeft: 20, marginTop: 10, color: "#F98141", fontSize: 24, fontWeight: "bold", fontFamily: "Helvetica" }}>{this.state.money}
                                <Text style={{ fontSize: 12, color: "#F98141", }}>{" "}元</Text></Text>
                        </View>
                        <Text style={{ marginRight: 20, marginTop: 25, fontSize: 16, color: '#202020', }}>-{" " + this.state.showBeans}金豆</Text>
                    </View>
                    <View style={{ height: 1, backgroundColor: "#dcdcdc", transform: [{ translateY: 0.5 }], marginLeft: 15, marginRight: 15, marginTop: 15 }} />
                </View>

                <TouchableOpacity style={{ marginBottom: 30 + safeAreaViewHeight, borderRadius: 5 }} onPress={this.sureExchange.bind(this)}>
                    <ImageBackground source={buttonImage}
                        style={styles.button}
                        imageStyle={{ borderRadius: 5 }}>
                        <Text style={styles.buttonText}>确认兑换</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    //确认事件
    sureExchange() {
        console.log("点击")
    }

    addPoints() {
        this.setState(
            previousState => {
                return { selceNum: previousState.selceNum + 1, showBeans: (previousState.selceNum + 1) * 200, money: (previousState.selceNum + 1) / 10 }
            }
        )
    }

    subPoints() {
        if (this.state.selceNum >= 1) {
            this.setState(
                previousState => {
                    return { selceNum: previousState.selceNum - 1, showBeans: (previousState.selceNum - 1) * 200, money: (previousState.selceNum - 1) / 10 }
                }
            )
        }

    }

}


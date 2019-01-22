import React, { PureComponent } from "react";

import { View, Alert, TouchableOpacity, Image, Text, FlatList, ImageBackground } from "react-native";

import TopBar from "../../../../../components/topbar";

import selectImage from "../../../../../assets/images/004_select.png"

import buttonImage from "../../../../../assets/images/004_button.png"

import headImage from "../../../../../assets/images/004_head.png"

import oneImage from "../../../../../assets/images/004_1.png"

import twoImage from "../../../../../assets/images/004_2.png"

import threeImage from "../../../../../assets/images/004_3.png"

import fourImage from "../../../../../assets/images/004_4.png"

import fiveImage from "../../../../../assets/images/004_5.png"

import { width } from "../../../../../util/AdapterUtil"

import styles from "./style"

export default class NewbieTaskScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [{ id: "1", details: "绑定手机号", money: '+0.5', isSelect: true, image: oneImage },
            { id: "2", details: "完成一个精选任务", money: '+0.5', isSelect: false, image: twoImage },
            { id: "3", details: "完成1次签到", money: '+0.5', isSelect: false, image: threeImage },
            { id: "4", details: "收1位徒弟", money: '+0.5', isSelect: false, image: fourImage },
            { id: "5", details: "完成1个深度任务", money: '+0.5', isSelect: false, image: fiveImage }]
        }
    }
    componentDidMount() {

    }

    _keyExtractor = (item, index) => item.id

    isSelectAll() {
        for (let i = 0; i < this.state.data.length; i++) {
            if (!this.state.data[i].isSelect) {
                return false
            }
        }
        return true
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#F97E43" }}>
                <TopBar navigation={this.props.navigation} title="新手任务"
                    leftIsVisible={true} ></TopBar>
                <Image source={headImage} style={{ width: width, height: width * 142 / 375 }}></Image>
                <View style={styles.whiteView}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>任务说明</Text>
                    <FlatList
                        style={{ marginTop: 15 }}
                        scrollEnabled={false}
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: "row", height: 50 }}>
                                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                                    <Image source={item.image} style={styles.numImage} />
                                    <Text style={styles.detailsStyle}>{item.details}</Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                                    <Text style={styles.moneyStyle}>{item.money}元</Text>
                                    <Image style={styles.imageStyle} source={item.isSelect ? selectImage : null} />
                                </View>
                            </View>
                        } />

                    <TouchableOpacity style={[styles.buttonSize, { borderColor: "#A0A0A0", borderWidth: this.isSelectAll() ? 0 : 1 }]}>
                        <ImageBackground source={this.isSelectAll() ? buttonImage : null}
                            style={{
                                width: width - 34 - 108, height: 40, alignItems: "center",
                                justifyContent: "center", borderRadius: 5
                            }} imageStyle={{ borderRadius: 5 }}>
                            <Text style={{ fontSize: 16, fontFamily: "Helvetica", color: this.isSelectAll() ? "#fff" : "#808080" }}>全部完成，领取2.0元</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    submitGetMoney() {

    }
}

import React, { PureComponent } from "react";

import { View, TouchableOpacity, Image, Text, FlatList, ScrollView } from "react-native";

import TopBar from "../../../../../../components/topbar";

import { width, statusBarHeight, safeAreaViewHeight } from '../../../../../../util/AdapterUtil'

import headImage from "../../../../../../assets/images/007_QQ.png"

import styles from "./style"

export default class ShareListScreen extends PureComponent {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <TopBar navigation={this.props.navigation} title="收徒记录"
                    leftIsVisible={true} ></TopBar>
                <ScrollView>
                    <Text style={styles.titleStyle}>我的师傅</Text>
                    <View style={{ marginTop: 10 }}>
                        {this.cellContentView(headImage, "师傅名字", "2018-11-23", "ID：45F00")}
                    </View>
                    <Text style={styles.titleStyle}>我的徒弟</Text>
                    <FlatList style={styles.scrollViewStyle} scrollEnabled={false} data={[
                        { key: '张三', details: "2018-11-23", id: "ID：45F00", image: headImage },
                        { key: '李四', details: "2018-11-23", id: "ID：45F00", image: headImage },
                        { key: '牛七', details: "2018-11-23", id: "ID：45F00", image: headImage },
                        { key: '狗八', details: "2018-11-23", id: "ID：45F00", image: headImage },
                        { key: '赵五', details: "2018-11-23", id: "ID：45F00", image: headImage },
                        { key: '王六', details: "2018-11-23", id: "ID：45F00", image: headImage },
                    ]}
                        renderItem={({ item }) =>
                            <View>
                                {this.cellContentView(item.image, item.key, item.details, item.id)}
                            </View>}
                    />
                </ScrollView>
                <View style={{ height: safeAreaViewHeight }} />
            </View>
        )
    }

    cellContentView(headImage, name, time, id) {
        return <View style={styles.shadowStyle}>
            <Image source={headImage} style={styles.headImageStyle}></Image>
            <View style={{ flex: 1 }}>
                <Text style={styles.nameStyle}>{name}</Text>
                <Text style={styles.timeStyle}>{time}</Text>
            </View>
            <View style={[{ width: 100 }, styles.centerStyle]}>
                <Text style={styles.idStyle}>{id}</Text>
            </View>

        </View>
    }

    shareRules() {

    }
}
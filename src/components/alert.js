/**
 * 直接导出组件，不用写module.exports=ConfirmDialog
 */
import React, { PureComponent } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal } from "react-native";
import {
    width,
    height,
} from "../util/AdapterUtil"

import successImage from "../assets/images/005_signsuccess.png"
import failedImage from "../assets/images/005_signfailed.png"
export default class AlertView extends PureComponent {

    sureClick() {
        let { sureClick } = this.props;
        if (sureClick && typeof sureClick === "function") {
            sureClick();
        }
    }

    render() {
        let { isShow, title, isSuccess } = this.props;
        return (
            <Modal transparent={true}
                visible={isShow}>
                <View style={styles.confirmCont}>
                    <View style={styles.contentStyle}>
                        <Text style={styles.titleStyle}>{title}</Text>
                        {isSuccess ? this.renderSuccess() : this.renderFailed()}
                        <View style={{ backgroundColor: "#e5e5e5", height: 1, marginTop: 15, width: width - 132, transform: [{ scaleY: 0.5 }] }}></View>
                        <TouchableOpacity onPress={this.sureClick.bind(this)} style={{ height: 50, width: width - 66, justifyContent: "center", alignItems: "center" }}>
                            <Text style={styles.buttonTextStyle}>我知道了</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

    renderSuccess() {
        let { goldenNum, tomorrow } = this.props;
        return <View style={{ alignItems: "center" }}>
            <Text style={styles.getGoldenStyle}>+{goldenNum}金豆</Text>
            <Image source={successImage} style={styles.imageStyle} />
            <View style={{ flexDirection: "row", marginTop: 29 }}>
                <Text style={styles.detailsStyle}>再接再厉，明天还可以领取
                    <Text style={styles.numStyle}>{tomorrow}
                        <Text style={styles.detailsStyle}>金豆。</Text>
                    </Text>
                </Text>
            </View>
        </View>
    }

    renderFailed() {
        let { failedMessage, request } = this.props;
        return <View style={{ alignItems: "center" }}>
            <Image source={failedImage} style={styles.imageFailStyle} />
            <Text style={[styles.detailsStyle, { marginTop: 29 }]}>{failedMessage}</Text>
            <Text style={styles.getGoldenStyle}>{request}</Text>
        </View>
    }

}

let styles = StyleSheet.create({

    confirmCont: {
        position: 'absolute',
        top: 0,
        width: width,
        height: height,
        backgroundColor: 'rgba(52,52,52,0.5)',
        alignItems: 'center',
        justifyContent: "center",
    },

    contentStyle: {
        width: width - 66,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: "center",
    },

    titleStyle: {
        color: "#202020",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 31,
    },

    getGoldenStyle: {
        color: "#F97F42",
        fontSize: 14,
        textAlign: "center",
        marginTop: 12,
        fontFamily: "Helvetica"
    },

    imageStyle: {
        marginTop: 30,
        width: 91,
        height: 66,
        marginLeft: 10,
    },

    imageFailStyle: {
        marginTop: 38,
        width: 113,
        height: 56,
        marginLeft: 20,
    },

    detailsStyle: {
        color: "#202020",
        fontSize: 14,
    },

    numStyle: {
        color: "#F97F42",
        fontSize: 14,
        fontFamily: "Helvetica"
    },

    buttonTextStyle: {
        color: "#F97F42",
        fontSize: 14,
    },
});

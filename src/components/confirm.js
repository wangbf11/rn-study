import React, { PureComponent, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Modal
} from "react-native";
import closeIcon from "../assets/images/close.png";
import warn from "../assets/images/ic_warn.png";
import InputVCode from "./inputVCode";


class DetailInfo extends PureComponent {
    constructor(props) {
        super(props);
    }

    static defaultProps ={
        canceText: "取消",
        sureText: "确定"
    }

    cancelClick() {
        let { cancelClick } = this.props;
        if (cancelClick && typeof cancelClick === "function") {
            cancelClick();
        }
    }
    sureClick() {
        let { sureClick } = this.props;
        if (sureClick && typeof sureClick === "function") {
            sureClick();
        }
    }

    render() {
        let { isVisible } = this.props;//整个提示框显示
        let { inputIsVisible } = this.props;//输入框显示
        let { closeIsVisible } = this.props;//右上角按钮显示
        let { hideLeftBtn } = this.props;//左边按钮显示
        let { warnIsVisible } = this.props;//左边按钮显示

        let input= inputIsVisible ?
           <View  style={{
            backgroundColor: '#fff',
            marginLeft:10,
            marginRight:10,
            marginBottom:15}}>
               <InputVCode />
            </View>: null;
        let leftBtn= hideLeftBtn ?null:
                <Text
                    style={[styles.btn, styles.grey]}
                    onStartShouldSetResponder={() => {
                        return true;
                    }}
                    onResponderGrant={this.cancelClick.bind(this)}
                >
                    {this.props.canceText}
                </Text>;
        let line= hideLeftBtn ?null:
            <View style={styles.middleLine} />;

        let close= closeIsVisible ?
            <Image
                source={closeIcon}
                style={styles.closeBtn}
                onStartShouldSetResponder={() => {
                    return true;
                }}
                onResponderGrant={this.cancelClick.bind(this)}/> : null;

        return (
            <Modal
                transparent={true}
                visible={isVisible}
                onRequestClose={this.cancelClick.bind(this)}
                animationType="none"
                style={styles.detail_info}>

                <View style={[styles.modalContainer,{ marginTop: 50}]}>
                    <View style={styles.modalCont}>
                        <View style={styles.title}>

                            <Text style={{ textAlign: "center",fontWeight: "bold",fontSize: 20 ,marginTop:10}}>
                                {warnIsVisible?<Image
                                    source={warn}
                                    style={{ width:25,height:25}}/>:null}

                                {warnIsVisible? " ":null}
                                {this.props.title}
                            </Text>
                            {close}
                        </View>
                        <Text style={styles.context}>{this.props.content}</Text>
                        {input}
                        <View style={styles.line} />

                        <View style={styles.bottonBox}>
                            {leftBtn}
                            {line}
                            <Text
                                style={[styles.btn, {color: "#F97F42",fontSize: 16}]}
                                onStartShouldSetResponder={() => {
                                    return true;
                                }}
                                onResponderGrant={this.sureClick.bind(this)}
                            >
                                {this.props.sureText}
                            </Text>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
DetailInfo.propTypes = {};
const styles = StyleSheet.create({
    detail_info: {
        backgroundColor: "rgba(0,0,0,.5)"
    },
    modalContainer: {
        backgroundColor: "rgba(0,0,0,.5)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    modalCont: {
        backgroundColor: "#fff",
        width: "70%",
        borderRadius: 10
    },
    title: {
        position: "relative",
        paddingTop: 10,
        paddingBottom: 10
    },
    closeBtn: {
        position: "absolute",
        right: 5,
        top: 10,
        width: 18,
        height: 18
    },
    line: {
        backgroundColor: "#ccc",
        height: 1,
    },
    line2: {
        backgroundColor: "#ccc",
        height: 1,
        transform: [{ scaleY: 0.5 }]
    },
    middleLine: {
        backgroundColor: "#ccc",
        width: 1,
    },
    context: {
        paddingLeft: 20,
        paddingBottom: 20,
        paddingTop: 10,
        paddingRight: 20,
        fontSize: 13
    },
    bottonBox: {
        flexDirection: "row"
    },
    btn: {
        flex: 1,
        textAlign: "center",
        paddingTop: 15,
        paddingBottom: 15
    },
    green: {
        color: "#05d178"
    },
    grey: {
        color: "#8f8f8f"
    }
});
export default DetailInfo;

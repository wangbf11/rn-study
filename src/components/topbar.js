import React, { PureComponent, PropTypes } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet, TouchableOpacity
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import backIcon from "../assets/images/back_16x16.png";
import closeIcon from "../assets/images/close.png";
import {
    width,
    unitWidth,
    titleHeight,
    statusBarHeight
} from '../util/AdapterUtil'
class TopBar extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { leftIsVisible } = this.props;
        let { rightIsVisible } = this.props;
        let { rightImage } = this.props;
        let { rightTitle } = this.props
        //是否隐藏左边和右边图标
        let left = leftIsVisible ?
            <TouchableOpacity
                style={topStyles.back_btn}
                onPress={this._goBack.bind(this)} >
                <Image
                    style={topStyles.back_icon}
                    source={backIcon} />
            </TouchableOpacity> : <View style={topStyles.back_btn}></View>;
        let image = rightImage == null ? closeIcon : rightImage
        let right = rightIsVisible ? (rightTitle ? <TouchableOpacity
            style={topStyles.rightTitle}
            onPress={this.rightOnPress.bind(this)}>
            <Text>{this.props.rightTitle}</Text>

        </TouchableOpacity> : <TouchableOpacity
            style={topStyles.back_btn}
            onPress={this.rightOnPress.bind(this)}>
                <Image
                    style={topStyles.back_icon}
                    source={image} />

            </TouchableOpacity>) : <View style={topStyles.back_btn}></View>;

        let marginTitle = rightTitle ? 56 : 10
        return (
            <View>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || '#00000000'}
                    barStyle={this.props.barStyle || 'dark-content'}
                    translucent = {true}/>
                <View style={[topStyles.titleLayout,
                    { paddingTop: statusBarHeight, height: 44 + statusBarHeight },
                    this.props.statusBarBgColor ? { backgroundColor: this.props.statusBarBgColor } : { backgroundColor: "#fff" }]}>
                    {left}
                    <View style={[topStyles.title_container, { marginLeft: marginTitle }]}>
                        <Text style={topStyles.title} numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    {right}
                </View>

                <View style={{
                    height: 1,
                    backgroundColor: "#ccc",
                    transform: [{ scaleY: 0.5 }]
                }}>
                </View>
            </View>
        );
    }

    _goBack() {
        if (this.props.isDrawer) {
            this.props.isDrawer();//如果方法存在就直接调用
        }else {
            this.props.navigation.dispatch(StackActions.pop({
                n: 1,
            }));
        }
    }

    rightOnPress() {
        this.props._rightOnPress();
    }
}

const topStyles = StyleSheet.create({

    titleLayout: {
        zIndex: 1000,
        height: 44,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    back_btn: {
        height: 44,
        width: 44,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    rightTitle: {
        height: 44,
        width: 100,
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    back_icon: {
        height: 16,
        width: 16
    },
    title_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        color: "#222222",
        fontSize: 18,
    },
    statusBar: {
        width: width,
        height: statusBarHeight,
        backgroundColor: 'transparent'
    }
});
export default TopBar;

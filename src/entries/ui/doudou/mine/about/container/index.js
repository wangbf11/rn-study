import React, { PureComponent } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import TopBar from "../../../../../../components/topbar";
import styles from "./style";
export default class AboutController extends PureComponent {
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
            n: 1,
        }));
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <TopBar navigation={this.props.navigation} title="关于" _rightOnPress={this.handleBackPress.bind(this)}
                    leftIsVisible={true}></TopBar>
            </View>
        );
    }
}

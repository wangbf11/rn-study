import { Image, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "../home";
import homeIcon from "../../assets/images/home.png";
import MsgScreen from "../message";
import msgIcon from "../../assets/images/message.png";
import MyScreen from "../my";
import myIcon from "../../assets/images/my.png";
import React from "react";

const setIcon = function ({ ...set }) {

    return (
        <View style={styles.iconbox}>
            <Text style={styles.text} />
            <Image
                source={set.source}
                style={{
                    width: 24,
                    height: 24
                }}
                tintColor={set.focused ? "red" : set.tintColor}
            />
        </View>
    );
};

export const TabRoot = createBottomTabNavigator(
    {
        HomeStack: {
            screen: HomeScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "首页",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: homeIcon
                        });
                    }
                };
            }
        },
        Message: {
            screen: MsgScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "消息",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: msgIcon
                        });
                    }
                };
            }
        },
        My: {
            screen: MyScreen,
            navigationOptions: navigation => {
                return {
                    tabBarLabel: "我的",
                    tabBarIcon: state => {
                        return setIcon({
                            ...state,
                            source: myIcon
                        });
                    }
                };
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "red"
        }
    }
);

const styles = StyleSheet.create({
    iconbox: {
        position: "relative"
    },
    text: {
        position: "absolute",
        right: -5,
        top: 0,
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: "red"
    }
});

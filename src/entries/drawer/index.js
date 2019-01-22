import { Component } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import {
    createDrawerNavigator,
    DrawerItems, NavigationActions,
    SafeAreaView, StackActions
} from "react-navigation";
import React from "react";
import {TabRoot} from "../buttomtab";
import TopBar from "../../components/topbar";

//抽屉里面第一个页面是TabRoot  这是第二个页面MyNotificationsScreen
class MyNotificationsScreen extends Component {
    static navigationOptions = {
        //{ focused: boolean, tintColor: string }
        drawerLabel: '第一页',
        //{ focused: boolean, tintColor: string }
        drawerIcon: ({ tintColor }) => (
            <Image
                source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                style={{width: 24,height: 24,borderRadius: 12 }}
            />
        ),
    }

    render() {
        return (
            <View style={{ flex: 1}}>
                <TopBar navigation={this.props.navigation} title="金豆兑换"
                        leftIsVisible={true} isDrawer = {()=>{
                        this.props.navigation.dispatch(
                            StackActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({
                                        routeName: "Drawer"
                                    })
                                ]
                            })
                        );
                }}></TopBar>
                <View  style={{ flex: 1, justifyContent: "center",alignItems:"center" }}>
                    <TouchableOpacity
                        onPress={this.goBack.bind(this)}>
                        <Image
                            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                            style={{ width: 80, height: 80,borderRadius: 40 }} />
                    </TouchableOpacity>
                </View>
            </View>

        );
    }
    goBack(){
       this.props.navigation.openDrawer();
    }
}

export const MyDrawer = createDrawerNavigator({
        TabRoot: {
            screen: TabRoot,
        },
        Notifications: {
            screen: MyNotificationsScreen,
        },
    },{
        //drawerWidth:100, 一般用默认
        drawerBackgroundColor:"#ffffff",
        initialRouteName: 'TabRoot',//初始路由的routeName。
        contentOptions:{
            activeTintColor: '#e91e63',
            itemsContainerStyle: {
                marginVertical: 0,
            },
            iconContainerStyle: {
                opacity: 1
            }
        },
        //左边菜单栏样式自定义 默认下面的写法 自定义跳转 的地方props已经传进来
        contentComponent: (props) => (
            <ScrollView>
                <SafeAreaView style={{ flex: 1}}
                              forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <TouchableOpacity
                        onPress={()=>{
                            props.navigation.dispatch(
                                StackActions.push({
                                    routeName: 'Balance',
                                })
                            )
                        }}>
                        <Image
                            source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                            style={{ width: 30, height: 30,borderRadius: 15 }} />
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        )
    }
);

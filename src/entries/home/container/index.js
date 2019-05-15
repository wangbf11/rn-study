import React, { PureComponent } from "react";
import {
    Text,
    View,
    BackHandler,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    TouchableNativeFeedback,
    ToastAndroid,
    Image,
    TouchableWithoutFeedback,
    Animated, StatusBar, Platform
} from "react-native";
import styles from "./style";
import {
    width,
    statusBarHeight
} from '../../../util/AdapterUtil'
import Swiper from 'react-native-swiper'
import LocalImg from '../../../assets/images'
import {ClassicsHeader, SmartRefreshControl } from "react-native-smartrefreshlayout";
class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            location: "三里屯SOHO",
            scrollY: new Animated.Value(0),
            isRefreshing: false
        }
        this.SEARCH_BOX_Y = 38 //搜索框上面天气栏的高度
    }
    componentDidMount() {
        //注册返回键监听
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }

    _onRefresh(){
        this.setState({isRefreshing: true});
        setTimeout(() => {
            Platform.OS == 'ios' ? this.setState({ isRefreshing: false }) : this.rc && this.rc.finishRefresh();
        }, 1000);
    }
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
                <StatusBar
                    backgroundColor={'#0398ff'}
                    barStyle={'dark-content'}
                    translucent = {true}/>
                <View style={{width: "100%", height:statusBarHeight,backgroundColor: "#0398ff"}}/>
                {/*把滑动事件的Y轴变化和动画绑定*/}
                <ScrollView
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    scrollEventThrottle={16}
                    refreshControl={
                        Platform.OS == 'ios' ?
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                backgroundColor={"#0398ff"}>
                            </RefreshControl>
                            :
                            <SmartRefreshControl
                                ref={ref => this.rc = ref}
                                HeaderComponent={<ClassicsHeader
                                    primaryColor = '#0398ff'
                                />}

                                onRefresh={this._onRefresh.bind(this)}
                            />
                    }>
                    {this._renderHeader()}
                    <View style={{backgroundColor: "#fff", paddingBottom: 10}}>
                        {this._renderBanner()}
                        <TouchableOpacity>
                            <View style={{height: 90, paddingHorizontal: 10}}>
                                <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                    <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                    <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                    <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                    <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                        <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                        <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                        <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                        <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                        <View style={{height: 90, paddingHorizontal: 10}}>
                        <Image source={LocalImg.ad1} style={{height: 90, width: width-20, resizeMode: 'cover'}}/>
                    </View>
                </ScrollView>
                {this._renderFixHeader()}
            </View>
        )
    }

    _renderHeader(){
        this.state.scrollY.addListener(value => {
            alert(
                '动画结束，最终值：' + JSON.stringify(value)
            )
        })
        // this.state.scrollY.stopAnimation(value => {
        //     alert(
        //         '动画结束，最终值：',
        //         JSON.stringify(value),
        //         [
        //             {text: 'OK', onPress: () => {}}
        //         ]
        //     )
        // });
        /*透明度映射,滚动0到43的时候下面透明变化*/
        let lbsOpaticy = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y],
            outputRange: [1, 0]
        })
        /*透明度映射,滚动43到57的时候下面透明变化*/
        let keyOpaticy = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y, 57],
            outputRange: [1, 1, 0]
        })
        return (
            <View style={styles.header}>
                <Animated.View style={[styles.lbsWeather, {opacity: lbsOpaticy}]}>
                    <TouchableWithoutFeedback >
                        <View style={styles.lbs}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', color:"#fff", paddingHorizontal: 5}}>{this.state.location}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.weather}>
                        <View style={{marginRight: 5}}>
                            <Text style={{color: "#fff", fontSize: 11, textAlign: "center"}}>{"3°"}</Text>
                            <Text style={{color: "#fff", fontSize: 11}}>{"阵雨"}</Text>
                        </View>
                    </View>
                </Animated.View>
                <View style={{marginTop: 10}}>
                    <TouchableWithoutFeedback >
                        <View style={[styles.searchBtn, {backgroundColor: "#fff"}]}>
                            <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Animated.View style={[styles.keywords, {opacity: keyOpaticy}]}>
                    {
                        ['肯德基','烤肉','吉野家','粥','必胜客','一品生煎','星巴克'].map((item, i) => {
                            return (
                                <TouchableWithoutFeedback key={i}>
                                    <View style={{marginRight: 12}}>
                                        <Text style={{fontSize: 12, color:"#fff"}}>{item}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </Animated.View>
            </View>
        )
    }

    _renderFixHeader(){
        let showY = this.state.scrollY.interpolate({
            inputRange: [0, this.SEARCH_BOX_Y, this.SEARCH_BOX_Y, this.SEARCH_BOX_Y],
            outputRange: [-9999, -9999, 0, 0]
        })
        return (
            <Animated.View style={[styles.header, {
                position: "absolute",
                left: 0,
                right: 0,
                top: statusBarHeight,
                bottom:0,
                height: 43,
                alignItems: "center",
                transform: [
                    {translateY: showY}
                ]
            }]}>
                <TouchableWithoutFeedback>
                    <View style={[styles.searchBtn, { position: "absolute",top: 10,backgroundColor: "#fff"}]}>
                        <Text style={{fontSize: 13, color:"#666", marginLeft: 5}}>{"输入商家，商品名称"}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        )
    }

    _renderBanner(){
        const w = width/4, h = w*.6 + 20
        let renderSwipeView = (types, n) => {
            return (
                <View style={styles.typesView}>
                    {
                        types.map((item, i) => {
                            let render = (
                                <View style={[{width: w, height: h}, styles.typesItem]}>
                                    <Image source={LocalImg['h'+(i+n)]} style={{width: w*.5, height: w*.5}}/>
                                    <Text style={{fontSize: 12, color:"#666"}}>{item}</Text>
                                </View>
                            )
                            return (
                                    <TouchableNativeFeedback style={{width: w, height: h}} key={i} onPress={() => {}}>{render}</TouchableNativeFeedback>
                                )
                        })
                    }
                </View>
            )
        }
        return (
            <Swiper
                height={h*2.4}
                paginationStyle={{ bottom: 10 }}
                dotStyle={{backgroundColor:'rgba(0,0,0,.2)', width: 6, height: 6}}
                activeDotStyle={{backgroundColor:'rgba(0,0,0,.5)', width: 6, height: 6}}>
                {renderSwipeView(['美食','甜品饮品','商店超市','预定早餐','果蔬生鲜','新店特惠','准时达','高铁订餐'], 0)}
                {renderSwipeView(['土豪推荐','鲜花蛋糕','汉堡炸鸡','日韩料理','麻辣烫','披萨意面','川湘菜','包子粥店'], 8)}
            </Swiper>
        )
    }
}
export default Index;

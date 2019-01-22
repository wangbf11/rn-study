import React, { PureComponent } from "react";
import {
    View,
    Text,
    FlatList,
    ProgressBarAndroid,
    ActivityIndicator,
    DeviceEventEmitter,
    BackHandler,
    ToastAndroid,
    TouchableOpacity,
    Image,
    Animated,
    Platform,
    RefreshControl, ScrollView
} from "react-native";
import styles from "./style";
import TopBar from "../../../components/topbar";
import { ClassicsHeader, SmartRefreshControl } from "react-native-smartrefreshlayout";
class Index extends PureComponent {
    constructor() {
        super();
        this.state = {
            user: null,
            videos: null,
            loadMore:false,
            isRefreshing:false
        };
    }
    componentDidMount() {
        // let user = global.realm.objects("User").filtered('phone = "13452145875"');
        this.setState({
            // 下拉刷新
            user:[{id:"1",name:"大的",phone:"123456"},{id:"2",name:"小的",phone:"123456"},{id:"3",name:"的的",phone:"123456"}],
            isRefresh:false,
            // 加载更多
            isLoadMore:false
        });

        //注册事件监听
        this.deEmitter = DeviceEventEmitter.addListener('left', (a) => {
            alert('收到通知：' + a);
        });
        //注册返回键监听
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);

        this.props.getListData({format:"json",page_name:"coindex",block_sign:"index_index_focus_poster_small",_:"1542857342892"})
            .then((res)=>{
                this.setState({
                    videos :this.props.videos
                })
        })
    }

    componentWillUnmount() {
        this.deEmitter.remove();
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

    render() {
        return (
            <View style={styles.pageBox}>
                <TopBar title = "我的"
                        leftIsVisible = {false}></TopBar>

               {/* <Text style={{zIndex:1000,backgroundColor:"#fff"}}>百度一下,你就知道了</Text>
                <View style={{zIndex:100,backgroundColor:"#fff"}}>
                    <View style={{padding: 10,flexDirection: 'row'}}>
                        <TextInput
                            style={{height: 40}}
                            onChangeText={(text) => this.setState({text})}
                        />
                        <Text>搜索{this.props.listData?JSON.stringify(this.props.listData[0].data.videos):null}</Text>
                    </View>
                </View>*/}

                <ScrollView
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
                    )}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd = {this._contentViewScroll.bind(this)}
                    refreshControl={
                        Platform.OS == 'ios' ?
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={this._onRefresh.bind(this)}
                                backgroundColor={"#F8F8F8"}>
                            </RefreshControl>
                            :
                            <SmartRefreshControl
                                ref={ref => this.rc = ref}
                                HeaderComponent={<ClassicsHeader
                                    primaryColor = '#F8F8F8'
                                />}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                    }>
                    <FlatList
                        data={this.state.videos}
                        renderItem={this._renderItem}
                        // topIndicatorComponent = { () =><ProgressBarAndroid color='red'/>}
                        // bottomIndicatorComponent = { () =><ProgressBarAndroid color='red'/>}
                        // // ref={(ref) => { this.flatList = ref}}
                        // topPullingPrompt = "下拉刷新"
                        // topRefreshingPrompt = "刷新中..."
                        // topHoldingPrompt = "下拉刷新"
                        // bottomPullingPrompt = "上拉加载"
                        // bottomRefreshingPrompt = "加载中..."
                        // bottomHoldingPrompt = "上拉加载"
                        // onRefreshing={this._onRefresh}
                        // onLoadMore={this._onLoadMore}
                        keyExtractor={item => item.title}
                        // styles={{ prompt: { color: 'gray' } }}
                    />
                </ScrollView>
            </View>
        );
    }
    _contentViewScroll(e: Object){
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight-5){
           this._onLoadMore();
        }
    }
    _onRefresh() {
        this.setState({isRefreshing: true});
        this.props.getListData({format:"json",page_name:"coindex",block_sign:"index_index_focus_poster_small",_:"1542857342892"})
            .then(res=>{
                Platform.OS == 'ios' ? this.setState({ isRefreshing: false }) : this.rc && this.rc.finishRefresh();
                this.setState({
                    videos :this.props.videos
                })
            }).catch(e=>{
                Platform.OS == 'ios' ? this.setState({ isRefreshing: false }) : this.rc && this.rc.finishRefresh();
            })
    }
    _onLoadMore() {
        //alert("加载更多");
        this.props.getListData({format:"json",page_name:"coindex",block_sign:"index_index_focus_poster_small",_:"1542857342892"})
            .then((res)=>{
                if (res && res[0].data.videos.length>0) {
                    let video = this.state.videos?this.state.videos.concat(res[0].data.videos):this.state.videos
                    this.setState({
                        videos :video
                    })
                }
            })
    }
    /**
     * 创建头部布局
     */
    _createListHeader(){
        return (
            <View style={styles.headView}>
                <Text style={{color:'white'}}>
                    头部布局
                </Text>
            </View>
        )
    }

    /**
     * 创建尾部布局
     */
    _createListFooter(){
        return (
            <View style={styles.footerView}>
                <Text style={{color:'white'}}>
                    底部底部
                </Text>
            </View>
        )
    }



    _onPressItem (item) {
        //let  s =await this.props.getListData(); //异步变同步标记 等待执行完 再执行下面代码
        // alert(s);
        // console.log(111)
        // let {listData}=this.props;
        // alert(JSON.stringify(listData));
    };



    _renderItem = ({item}) => (
        <MyListItem
            onPressItem={this._onPressItem.bind(this)}
            item={item}
        />
    )
}

class MyListItem extends PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.item);
    };

    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{marginLeft:15,marginRight:15,marginBottom:5,marginTop:5,borderRadius:8,backgroundColor:"#fff",
                        shadowOffset: { width: 0, height: 0 },shadowOpacity: 0.2, shadowRadius: 10,elevation:2}}
                    onPress={this._onPress.bind(this)}>
                    <View style={{width: "100%",flexDirection:"row", alignItems: "center",
                        justifyContent: "center"}}>

                        <Image
                            source={{uri:this.props.item.imgh_url}}
                            style={{  width: 60,height: 60,marginLeft:10, justifyContent: "center"}}/>

                        <View style={{flex:1,marginTop: 15,marginBottom: 15,marginLeft:15}}>
                            <Text style={{ flex:1,color: '#222',fontSize:11}}>
                                {this.props.item.title}
                            </Text>
                            <Text style={{flex:1,color:'#ccc',fontSize:12,paddingTop: 5}}>
                                {this.props.item.update_time}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Index;

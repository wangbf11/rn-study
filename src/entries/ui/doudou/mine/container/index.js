import React, { PureComponent } from 'react';
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity, FlatList, Alert, TouchableHighlight } from 'react-native';
import TopBar from "../../../../../components/topbar";
import { StackActions } from "react-navigation";
import { width, safeAreaViewHeight } from '../../../../../util/AdapterUtil'
import styles from "./style"
import MineCellView from "../mineCell/mineCell"
import modifyImage from "../../../../../assets/images/mine_01.png"
import codeImage from "../../../../../assets/images/mine_02.png"
import backImage from "../../../../../assets/images/mine_03.png"
import moneyImage from "../../../../../assets/images/mine_04.png"

import image5 from "../../../../../assets/images/mine_05.png"
import image6 from "../../../../../assets/images/mine_06.png"
import image7 from "../../../../../assets/images/mine_07.png"
import image8 from "../../../../../assets/images/mine_08.png"
import image9 from "../../../../../assets/images/mine_09.png"
import image10 from "../../../../../assets/images/mine_10.png"
import image11 from "../../../../../assets/images/mine_11.png"

import indicator from "../../../../../assets/images/mine_indicator.png"

export default class MyView extends PureComponent {
  handleBackPress() {
    this.props.navigation.dispatch(StackActions.pop({
      n: 1,
    }));
  }


  pushToModifyInfo() {
    this.props.navigation.dispatch(
      StackActions.push({
        routeName: "AccountSet"
      })
    );
  }

  clickSignBtn() {
    this.props.navigation.dispatch(
      StackActions.push({
        routeName: 'Balance',
      })
    );
  }

  clickCodeBtn() {//点击二维码按钮

  }

  clickMineCell(index) {
    //Alert.alert('你点击了按钮 index = ' + index);
    if (index == 0) {//金豆中心
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "GoldenCenter"
        })
      );
    } else if (index == 1) {//填写邀请码

    } else if (index == 2) {//收支明细
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "Income"
        })
      );
    } else if (index == 3) {//消息中心
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "MessageCenter"
        })
      );
    } else if (index == 4) {//帮助中心
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "HelpCenter"
        })
      );
    } else if (index == 5) {//切换账号

    } else if (index == 6) {//关于
      this.props.navigation.dispatch(
        StackActions.push({
          routeName: "About"
        })
      );
    }

  }

  _keyExtractor = (item, index) => item.id

  render() {

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <TopBar navigation={this.props.navigation} title="个人中心" _rightOnPress={this.handleBackPress.bind(this)}
          leftIsVisible={true}></TopBar>
        <ScrollView style={{ marginBottom: safeAreaViewHeight }}>
          <View style={{ flexDirection: 'row', height: 95, alignItems: "center" }}>
            <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} style={{ width: 73, height: 73, borderRadius: 73 / 2, marginLeft: 16 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 17, fontSize: 20, fontWeight: "bold" }}> 我是昵称</Text>
              <Text style={{ marginLeft: 17, fontSize: 16, color: '#505050', marginTop: 10 }}> ID 123456</Text>
            </View>
            <TouchableOpacity onPress={this.pushToModifyInfo.bind(this)}>
              <Image source={modifyImage} style={{ width: 46, height: 46 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.clickSignBtn.bind(this)}>
              <Image
                source={codeImage}
                style={{ width: 46, height: 46, marginRight: 10 }}></Image>
            </TouchableOpacity>
          </View>

          <ImageBackground source={backImage} style={{
            height: width * 132 / 367, borderRadius: 10,
            flexDirection: 'row'
          }}>
            <Image source={moneyImage} style={{ width: 50, height: 47, marginLeft: 20, alignSelf: 'center' }} />
            <View style={{ marginLeft: 4, alignSelf: 'center', flex: 1 }}>
              <Text style={{ fontSize: 12, color: 'white' }}>余额 (元)</Text>
              <Text style={{ fontSize: 34, marginTop: 5, color: 'white', fontFamily: "Helvetica" }}>200.00</Text>
            </View>
            <View style={{ justifyContent: "flex-end", marginBottom: 30, marginRight: 30 }}>
              <TouchableOpacity onPress={() => this.clickSignBtn()} style={{
                width: 86, height: 26, backgroundColor: '#FFD22A', justifyContent: "center", borderRadius: 13
              }} >
                <Text style={{ height: 15, fontSize: 12, textAlign: "center" }}>
                  立即提现 </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{ marginRight: 9, marginLeft: 9, flex: 1, marginBottom: 10 }}>
            <View style={[styles.shadowView, { flex: 1 }]}>
              <FlatList
                data={[
                  { id: "1", title: '金豆中心', content: '2000', imageName: image5 },
                  { id: "2", title: '填写邀请码', content: '+1.0元', imageName: image6 },
                  { id: "3", title: '收支明细', content: '10', imageName: image7 },
                  { id: "4", title: '消息中心', content: '', imageName: image8 },
                  { id: "5", title: '帮助中心', content: '', imageName: image9 },
                  { id: "6", title: '切换账号', content: 'V1.2.1', imageName: image10 },
                  { id: "7", title: '关于', content: 'V1.2.1', imageName: image11 },
                ]}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) => <TouchableOpacity onPress={this.clickMineCell.bind(this, index)}>
                  <MineCellView imageName={item.imageName} indicator={indicator} title={item.title} content={item.content}></MineCellView>
                  <View style={{ height: 1, marginLeft: 50, marginRight: 18, backgroundColor: "#eee", transform: [{ scaleY: 0.5 }] }} />
                </TouchableOpacity>
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

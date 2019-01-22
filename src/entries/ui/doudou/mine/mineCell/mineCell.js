import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
export default class MineCellView extends Component {
  render() {
    return (
      <View style={{ height: 70, alignItems: 'center', flexDirection: 'row' }}>
        <Image source={this.props.imageName} style={{ width: 20, height: 20, marginLeft: 21 }} />
        <Text style={{ width: 100, fontSize: 16, marginLeft: 10, color: "#202020" }}>{this.props.title}</Text>
        <View style={{ flex: 1, justifyContent: "flex-end", alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ fontSize: 16, color: "#F98141" }}>{this.props.content}</Text>
          <Image source={this.props.indicator} style={{ width: 6, height: 11, marginLeft: 10, marginRight: 15 }} />

        </View>
      </View>
    );
  }
}

import React, {
    Component,
} from 'react';
import {
    findNodeHandle,
    requireNativeComponent,
    UIManager,
    View
} from "react-native";
import PropTypes from 'prop-types';

export default class MyCustomView extends Component{
    constructor(props){
        super(props)
        this._onChange = this._onChange.bind(this);
    }

    render(){
        let self = this;
        // {...this.props} 一定需要设置，不让你永远也看不到
        return(
            <RCTMyCustomView
                ref="My_CustomView"
                {...this.props}
                onChange={this._onChange}
               />);
    }

    _onChange() {
        if (!this.props.onChangeColor) {
            return;
        }
        //js发送命令
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs.My_CustomView), // 对应原生方法 接受命令receiveCommand的3个参数 参数1:原生控件  参数2: commandId  参数3: 数组参数
            1,["red"]
        )
        this.props.onChangeColor();
    }
}
//参数类型定义
MyCustomView.propTypes = {
    onChangeColor: PropTypes.func,
    color: PropTypes.string,  // 设置color属性
    ...View.propTypes, // 这里一定需要设置，不然会报错。has no propType for native prop。这个被坑了
};

// 拿到Native组件
var RCTMyCustomView = requireNativeComponent('MyCustomView', MyCustomView,{
    nativeOnly: {onClick: true}
});


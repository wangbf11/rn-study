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
        //js 调安卓修改view的颜色
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs.My_CustomView), // 找到与NativeUI组件对应的JS组件实例  []是可以加参数
            1,["red"]
        )
        this.props.onChangeColor();
    }
}

MyCustomView.propTypes = {
    onChangeColor: PropTypes.func,
    color: PropTypes.string,  // 设置color属性
    ...View.propTypes, // 这里一定需要设置，不然会报错。has no propType for native prop。这个被坑了
};

var RCTMyCustomView = requireNativeComponent('MyCustomView', MyCustomView,{
    nativeOnly: {onClick: true}
});  // 拿到Native组件


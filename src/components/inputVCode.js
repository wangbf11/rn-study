import React, {PureComponent } from "react";
import { Platform, TextInput, View } from "react-native";
export default class inputVCode extends PureComponent {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.firstInput.focus();
        }, 500); //延时弹出弹框请求焦点
    }

    setFirstValue(value){
        this.refs.secondInput.focus();
    }

    setSecondValue(value){
        this.refs.threeInput.focus();

    }

    setThirdValue(value){
        this.refs.fourInput.focus();
    }

    setFourthValue(value){

    }

    render() {

        return(
            <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
                <View style = {{marginLeft:10,marginRight:10,alignItems:'center'}}>
                    <View style = {{width:40,height:40,marginTop:10,backgroundColor:'#fff',
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:3,
                        borderColor:"#F97F42",
                        borderWidth:1}}>
                        <TextInput
                            ref="firstInput"
                            selectionColor='#F97F42'
                            style = {{width:10, height:25,padding:0}}
                            onChangeText = {(value) => this.setFirstValue(value)}
                            keyboardType = {"numeric"}
                            maxLength = {1}>
                        </TextInput>
                   </View>
                </View>
                <View style = {{marginLeft:10,marginRight:10,alignItems:'center'}}
                      defaultValue="foo">
                    <View style = {{width:40,height:40,marginTop:10,backgroundColor:'#fff',
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:3,
                        borderColor:"#F97F42",
                        borderWidth:1}}>
                        <TextInput
                            ref="secondInput"
                            selectionColor='#F97F42'
                            style = {{width:10, height:25,padding:0}}
                            onChangeText = {(value) => this.setSecondValue(value)}
                            keyboardType = {"numeric"}
                            maxLength = {1}>
                        </TextInput>
                    </View>
                </View>
                <View style = {{marginLeft:10,marginRight:10,alignItems:'center'}}>
                    <View style = {{width:40,height:40,marginTop:10,backgroundColor:'#fff',
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:3,
                        borderColor:"#F97F42",
                        borderWidth:1}}>
                        <TextInput
                            ref="threeInput"
                            selectionColor='#F97F42'
                            style = {{width:10, height:25,padding:0}}
                            onChangeText = {(value) => this.setThirdValue(value)}
                            keyboardType = {"numeric"}
                            maxLength = {1}>
                        </TextInput>
                    </View>
                </View>
                <View style = {{marginLeft:10,marginRight:10,alignItems:'center'}}>
                    <View style = {{width:40,height:40,marginTop:10,backgroundColor:'#fff',
                        alignItems:"center",
                        justifyContent:"center",
                        borderRadius:3,
                        borderColor:"#F97F42",
                        borderWidth:1}}>
                        <TextInput
                            ref="fourInput"
                            selectionColor='#F97F42'
                            style = {{width:10, height:25,padding:0}}
                            onChangeText = {(value) => this.setFourthValue(value)}
                            keyboardType = {"numeric"}
                            maxLength = {1}>
                        </TextInput>
                    </View>
                </View>
            </View>
        );
    }
}

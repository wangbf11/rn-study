import React, { PureComponent } from "react";
import { View, Text,ImageBackground,TouchableOpacity,Alert} from "react-native";
import { StackActions } from "react-navigation";
import TopBar from "../../../../../../../components/topbar";
import HidePhoneView from  './hidePhone'
import nextImage from "../../../../../../../assets/images/modifyPhone_next.png"
export default class ModifyPhoneController extends PureComponent {
    constructor(props){
        super(props);
        this.state = {zhouyuan:''};
    }
    handleBackPress() {
        this.props.navigation.dispatch(StackActions.pop({
          n: 1,
      }));
      }

    clickNextBtn(){
        console.log(this.refs.phone.state.firstValue);
        console.log(this.refs.phone.getPhoneVlue());
        this.props.navigation.dispatch(
            StackActions.push({
              routeName: "ModifyPhoneDetail"
            })
          );
    }


    render() {
        return (
            <View style={{flex:1,backgroundColor: 'white'}}>
                    <TopBar navigation = {this.props.navigation} title = "修改手机号" _rightOnPress ={this.handleBackPress.bind(this)}
                        leftIsVisible = {true}></TopBar>
                    
                    <View style = {{alignItems:'center'}}>
                            <Text style = {{fontSize:12,marginTop:20}}>
                                    为了账号安全，修改绑定前确认已绑定手机号
                            </Text>
                            <Text style = {{fontSize:18,marginTop:20,fontWeight:'bold'}}>
                                    请填写当中隐去的4位
                            </Text>
                            <Text style = {{fontSize:15,marginTop:25,color:'#F98141'}}>
                                    158****3421
                            </Text>
                            <HidePhoneView ref = "phone"></HidePhoneView>
                            
                            <TouchableOpacity onPress={this.clickNextBtn.bind(this)} style = {{
                            flex:1,marginTop:50}}>
                                    <ImageBackground source = {nextImage} style = {{width:150, height:45,
                                     borderRadius:5,justifyContent: 'center',alignItems:"center"}}>
                                    <Text style = {{width:45,height:15,color:'white',
                                    justifyContent:'center'}}>下一步</Text>
                                    </ImageBackground>            
                            </TouchableOpacity>
                            
                            

                    </View>


            </View>
        );
    }
}
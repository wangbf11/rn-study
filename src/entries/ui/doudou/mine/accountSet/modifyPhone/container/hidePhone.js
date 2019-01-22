import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
export default class HidePhoneView extends Component {
    constructor(props) {
        super(props);
        this.state = { firstValue: '', secondValue: '', thirdValue: '', fourthValue: '' }
    }
    componentDidMount() {
        setTimeout(() => {
            this.refs.firstInput.focus();
        }, 500); //延时弹出弹框请求焦点
    }
    setFirstValue(value) {
        this.setState({ firstValue: value });
        this.refs.secondInput.focus();

    }

    setSecondValue(value) {
        this.setState({ secondValue: value });
        this.refs.thirdInput.focus();


    }

    setThirdValue(value) {
        this.setState({ thirdValue: value });
        this.refs.fourthInput.focus();


    }

    setFourthValue(value) {
        this.setState({ fourthValue: value });
        this.refs.fourthInput.blur();

    }

    clearFirstValue() {
        this.setState({ firstValue: '' });
    }

    clearSecondValue() {
        this.setState({ secondValue: '' });
    }

    clearThirdValue() {
        this.setState({ thirdValue: '' });
    }

    clearFourthValue() {
        this.setState({ fourthValue: '' });
    }


    getPhoneVlue = () => {
        if (this.state.firstValue != '' && this.state.secondValue != '' && this.state.thirdValue != '' && this.state.fourthValue != '') {
            return this.state.firstValue + this.state.secondValue + this.state.thirdValue + this.state.fourthValue;
        } else {
            return '请填写电话号码!';
        }
    }

    render() {

        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, alignItems: 'center' }}>
                    <TextInput
                        ref="firstInput"
                        style={{ width: 10, height: 25, padding: 0 }}
                        onChangeText={(value) => this.setFirstValue(value)}
                        keyboardType={"numeric"}
                        maxLength={1}
                        autoFocus={true}
                        clearTextOnFocus={true}
                        onFocus={this.clearFirstValue.bind(this)}>
                    </TextInput>
                    <View style={{ width: 30, height: 1, marginTop: 10, backgroundColor: 'gray' }}></View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, alignItems: 'center' }}
                    defaultValue="foo">
                    <TextInput
                        ref="secondInput"
                        style={{ width: 10, height: 25, padding: 0 }}
                        onChangeText={(value) => this.setSecondValue(value)}
                        keyboardType={"numeric"}
                        maxLength={1}
                        clearTextOnFocus={true}
                        onFocus={this.clearSecondValue.bind(this)}>
                    </TextInput>
                    <View style={{ width: 30, height: 1, marginTop: 10, backgroundColor: 'gray' }}></View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, alignItems: 'center' }}>
                    <TextInput
                        ref="thirdInput"
                        style={{ width: 10, height: 25, padding: 0 }}
                        onChangeText={(value) => this.setThirdValue(value)}
                        keyboardType={"numeric"}
                        maxLength={1}
                        clearTextOnFocus={true}
                        onFocus={this.clearThirdValue.bind(this)}>
                    </TextInput>
                    <View style={{ width: 30, height: 1, marginTop: 10, backgroundColor: 'gray' }}></View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, marginTop: 20, alignItems: 'center' }}>
                    <TextInput
                        ref="fourthInput"
                        style={{ width: 10, height: 25, padding: 0 }}
                        onChangeText={(value) => this.setFourthValue(value)}
                        keyboardType={"numeric"}
                        maxLength={1}
                        clearTextOnFocus={true}
                        onFocus={this.clearFourthValue.bind(this)}>
                    </TextInput>
                    <View style={{ width: 30, height: 1, marginTop: 10, backgroundColor: 'gray' }}></View>
                </View>

            </View>

        );
    }
}

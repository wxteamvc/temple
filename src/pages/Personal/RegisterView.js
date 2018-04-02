import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ScreenWidth, fontSizeScaler, styleColor, log } from '../../constants/global';
import { TextField } from 'react-native-material-textfield';
import { Toast } from 'teaset';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import NavigationBar from '../../components/navigationBar';
import MyBtn from '../../components/button';
import * as Urls from "../../constants/urls";
import Util from "../../constants/util";
import { register } from '../../actions/personalAction';
import moment from 'moment';




class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            password: '',
            code: '',
        }
    }


    componentWillMount() {
        const { dispatch, userInfo } = this.props;
        const { sendCode } = userInfo;
        const time = parseInt(moment().format('X'));
        if (sendCode.cd_timeStamp > time) {
            const remaining_time = sendCode.cd_timeStamp - time;
            dispatch({
                type: 'RESET_SENDCORD_CD',
                data: remaining_time
            })
            this.timer = setInterval(
                () => {
                    dispatch({
                        type: 'CHANGE_SENDCORD_CD',
                    })
                }, 1000);
        } else {
            dispatch({
                type: 'INIT_SENDCORD_CD',
            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { dispatch, userInfo } = this.props;
        const nextsendCode = nextProps.userInfo.sendCode;
        const { sendCode } = userInfo;
        if (nextsendCode.cd_cycle != sendCode.cd_cycle && nextsendCode.cd_cycle == 0) {
            dispatch({
                type: 'INIT_SENDCORD_CD'
            })
            this.timer && clearTimeout(this.timer);
        }
    }

    submit = () => {
        //这边写简单的验证
        this.props.dispatch(register(this.state))

    }


    getCode = () => {
        const { phone } = this.state;
        const { dispatch, userInfo } = this.props;
        const { sendCode } = userInfo;
        if (sendCode.cd_cycle == 0) {
            // if (!phone) {
            //     Toast.message('请先输入手机号码')
            //     return;
            // }
            // Util.get(Urls.SENDCODE_URL + `/${phone}`,
            //     (respJson) => {
            //         if (respJson.status == 'success') {
                        dispatch({
                            type: 'SET_SENDCORD_CD',
                            data: 90
                        })
                        this.timer = setInterval(
                            () => {
                                dispatch({
                                    type: 'CHANGE_SENDCORD_CD',
                                })
                            }, 1000);
            //         } else {
            //             Toast.fail(respJson.message);
            //         }
            //     },
            //     (error) => {
            //         log(error.message)
            //         Toast.fail(error.message);
            //     }
            // )
        }


    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        const { initInfo, userInfo, navigation } = this.props;
        const { sendCode } = userInfo;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                <NavigationBar {...this.props} title={'注册'} />
                <ScrollView contentContainerStyle={{ width: ScreenWidth, paddingLeft: 20, paddingRight: 20 }}>
                    <WhiteSpace size={'md'} />
                    <View>
                        <Text style={[styles.fontsize22, { fontWeight: '500' }]}>手机号快速注册</Text>
                        <Text style={[styles.fontsize12, { color: '#ccc' }]}>注册账号以使用更多服务</Text>
                    </View>
                    <View>
                        <TextField
                            label='昵称'
                            onChangeText={(value) => this.setState({ name: value })}
                            labelHeight={20}
                        />
                        <TextField
                            label='手机号码'
                            onChangeText={(value) => this.setState({ phone: value })}
                            labelHeight={20}
                            keyboardType={'numeric'}
                        />
                        <TextField
                            secureTextEntry={true}
                            label='密码'
                            onChangeText={(value) => this.setState({ password: value })}
                            labelHeight={20}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TextField
                                label='验证码'
                                onChangeText={(value) => this.setState({ code: value })}
                                labelHeight={20}
                                keyboardType={'numeric'}
                                containerStyle={{ flex: 0.6 }}
                            />
                            <View style={{ flex: 0.4, alignItems: 'center' }}>
                                <MyBtn
                                    style={{ padding: 10, backgroundColor: sendCode.cd_cycle > 0 ? '#333333' : styleColor, borderRadius: 5, }}
                                    onPress={this.getCode}
                                >
                                    <Text style={[styles.fontsize12, { color: '#fff' }]}> {sendCode.cd_cycle > 0 ? `(${sendCode.cd_cycle}s)后可重新获取` : '获取验证码'}</Text>
                                </MyBtn>
                            </View>
                        </View>
                        <WhiteSpace size={'md'} />
                        <View style={styles.flex_row_center}>
                            <MyBtn
                                onPress={this.submit}
                                style={[styles.flex_center, { backgroundColor: styleColor, flex: 0.7, borderRadius: 5, padding: 15 }]}
                            >
                                <Text style={[styles.fontsize14, { color: '#fff' }]}>注册</Text>
                            </MyBtn>
                        </View>
                        <View style={{ alignItems: 'flex-start', justifyContent: 'center', height: 60 }}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    this.props.navigation.navigate('Agreement')
                                }}
                            >
                                <View>
                                    <Text style={[styles.fontsize10, { color: '#ccc' }]}>登陆/注册即视为同意用户服务协议</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={[styles.flex_row_columncenter, { height: 50 }]}>
                            <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginLeft: 10, opacity: 0.1 }}></View>
                            <View style={{ flex: 1, alignItems: 'center', opacity: 0.5 }}><Text>快捷注册</Text></View>
                            <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginRight: 10, opacity: 0.1 }}></View>
                        </View>
                    </View>
                    <View style={styles.flex_row_center}>
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <TouchableWithoutFeedback
                                onPress={() => { }}
                            >
                                <Image
                                    source={require('../../constants/images/微信.png')}
                                    style={{ width: 35, height: 35 }}
                                />
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={{ flex: 0.25, alignItems: 'center' }}>
                            <Image
                                source={require('../../constants/images/qq.png')}
                                style={{ width: 35, height: 35 }}
                            />
                        </View>
                    </View>
                    <WhiteSpace size={'md'} />
                </ScrollView>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    fontsize10: {
        fontSize: 10 * fontSizeScaler,
    },
    fontsize12: {
        fontSize: 12 * fontSizeScaler,
    },
    fontsize14: {
        fontSize: 14 * fontSizeScaler,
    },
    fontsize22: {
        fontSize: 22 * fontSizeScaler,
    },
    flex_row_columncenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    flex_row_center: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },

})

function mapStateToProps(state) {
    return {
        userInfo: state.personalReducer,
    }
}

export default connect(mapStateToProps)(Register);


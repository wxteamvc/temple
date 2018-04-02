import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { ScreenWidth, fontSizeScaler, styleColor } from '../../constants/global'
import { TextField } from 'react-native-material-textfield';
import { Toast } from 'teaset';
import { Button } from 'antd-mobile';
import { NavigationActions } from 'react-navigation';
import NavigationBar from '../../components/navigationBar';
import Util from '../../constants/util';
import { login, initUserInfo } from '../../actions/personalAction'
import MyBtn from '../../components/button';
const key = {
    mobile: 'phone',
    email: 'email',
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            email: '',
            password: '',
            type: 'mobile',
        }
    }

    submit = () => {
        //这边写简单的验证
        this.props.dispatch(login(this.state, this.state.type))
    }


    componentWillUpdate(nextProps, nextState) {
        const { userInfo, navigation } = this.props;
        const nextUserInfo = nextProps.userInfo;
        if (nextUserInfo.token !== userInfo.token) {
            // this.props.dispatch(initUserInfo())
            navigation.goBack()
        }
    }

    render() {
        const { initInfo, userInfo, navigation } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
                <NavigationBar {...this.props} title={'登录'} rbtn={'注册'} rbtnOnPress={() => navigation.navigate('Register')} />
                <View style={{ width: ScreenWidth - 40, marginTop: 10 }}>
                    <Text style={[styles.fontsize22, { fontWeight: '500' }]}>登录</Text>
                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>使用账号登录以使用更多服务</Text>
                </View>
                <View
                    style={{ width: ScreenWidth - 40, marginTop: 10 }}
                >
                    <TextField
                        label='手机号码'
                        // value={this.state.email}
                        onChangeText={(value) => this.setState({ [key[this.state.type]]: value })}
                    />
                    <TextField
                        secureTextEntry={true}
                        label='密码'
                        // value={this.state.password}
                        onChangeText={(value) => this.setState({ password: value })}
                    />
                    <View
                        style={[styles.flex_row_center, { width: ScreenWidth - 40, marginTop: 10 }]}
                    >
                        <MyBtn
                            onPress={this.submit}
                            style={[styles.flex_center, { backgroundColor: styleColor, flex: 0.7, borderRadius: 5, padding: 15 }]}
                        >
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>登录</Text>
                        </MyBtn>
                    </View>

                    <View
                        style={{ width: ScreenWidth - 40, marginTop: 30, flexDirection: 'row', alignItems: 'flex-start' }}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => {
                                alert('验证码登陆')
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                <Text style={[styles.fontsize14]}>手机验证登陆</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                alert('找回密码')
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Text style={[styles.fontsize14]}>忘记了?找回密码</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ alignItems: 'flex-start', justifyContent: 'center', height: 100 }}>
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

                    <View style={[{ height: 50, flexDirection: 'row', alignItems: 'center', }]}>
                        <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginLeft: 10, opacity: 0.1 }}></View>
                        <View style={{ flex: 1, alignItems: 'center', opacity: 0.5 }}><Text>快捷登陆</Text></View>
                        <View style={{ flex: 1, backgroundColor: 'gray', height: 1, marginRight: 10, opacity: 0.1 }}></View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.25, alignItems: 'center' }}>
                        <TouchableWithoutFeedback
                        // onPress={this.loginWithWechat}
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
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.personalReducer
    }
}

export default connect(mapStateToProps)(Login);

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
    flex_row_center: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },
})
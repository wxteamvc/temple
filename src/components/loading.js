"use strict"
import React, { Component } from 'react';
import {
    Text,
    View,
    ActivityIndicator,
    Image,
} from 'react-native';

export default class Loading extends Component {
    render() {
        if (this.props.status == 'fail') {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../constants/images/加载失败.png')} style={{ width: 100, height: 100 }} />
                    <Text style={{ marginTop: 30 }}>页面被外星怪兽吃掉了哦~~~</Text>
                </View>
            )
        } else {
            return (
                <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={30}></ActivityIndicator>
                </View>
            )
        }

    }
}





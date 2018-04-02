/**
 * 
 * 导航条组件
 *  以下为使用组件时候可传的参数:
 *  barStyle     导航条样式
 *  lbtn         导航条左边返回按钮(只能传组件,默认是向左箭头)  
 *  lText        导航条左边文字(传字符串,默认无)   
 *  textStyle    导航条文字样式
 *  rbtn         导航条右边按钮(可传字符串或者组件)
 *  rbtnOnPress  点击右边触发的事件
 *  title        导航条中部title
 *  titleStyle   title样式
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../constants/global';
import Mybtn from './button';
import { WingBlank } from 'antd-mobile';

export default class NavigationBar extends Component {

    renderRbtn(item) {
        const { textStyle } = this.props;
        switch (typeof (item)) {
            case 'string':
                return <Text style={[styles.text, textStyle ? textStyle : {}]}>{item}</Text>
                break;
            case 'object':
                return item
                break;
            default:
                return null
                break;
        }
    }



    render() {
        const { barStyle, lbtn, lText, rbtn, rbtnOnPress, title, titleStyle, textStyle, navigation } = this.props;
        return (
            <View style={[styles.container, barStyle ? barStyle : {}]}>
                <Mybtn
                    style={styles.left}
                    onPress={() => navigation.goBack()}
                >
                    {lbtn ? lbtn : <Icon name='chevron-left' size={20} color={'#fff'}/>}
                    {lText ? <WingBlank size={'sm'}><Text numberOfLines={1} style={[styles.text, textStyle ? textStyle : {}]}>{lText}</Text></WingBlank> : null}
                </Mybtn>
                <View style={styles.mid}>
                    {title ? <Text style={[styles.title, titleStyle ? titleStyle : {}]}>{title}</Text> : null}
                </View>
                <View style={styles.right}>
                    <Mybtn
                        onPress={() => rbtnOnPress ? rbtnOnPress() : {}}
                    >
                        {rbtn ? this.renderRbtn(rbtn) : null}
                    </Mybtn>
                </View>

            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: styleColor, height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10
    },
    left: {
        flex: 0.15, flexDirection: 'row', alignItems: 'center',
    },
    mid: {
        flex: 0.7, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    right: {
        flex: 0.15, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    },
    title: {
        fontSize: 16 * fontSizeScaler, color: '#fff', fontWeight: 'bold'
    },
    text: {
        fontSize: 14 * fontSizeScaler, color: '#fff',
    }

})
import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Home from '../pages/HomeTab/HomeView';
import Message from '../pages/HomeTab/MessageView';
import Discovery from '../pages/HomeTab/DiscoveryView';
import Personal from '../pages/HomeTab/PersonalView';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth,styleColor } from '../constants/global';
export default TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '首页',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={'home'} size={20} color={tintColor} />
            ),

        }),
    },
    Message: {
        screen: Message,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '消息',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={'comment'} size={20} color={tintColor} />
            )
        }),
    },
    Discovery: {
        screen: Discovery,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '发现',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={'bandcamp'} size={20} color={tintColor} />
            )
        }),
    },
    Personal: {
        screen: Personal,
        navigationOptions: ({ navigation }) => ({
            tabBarLabel: '我的',
            tabBarIcon: ({ focused, tintColor }) => (
                <Icon name={'user'} size={20} color={tintColor} />
            )
        }),
    },
}, {
        // animationEnabled: false, // 切换页面时不显示动画
        tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
        // swipeEnabled: false, // 禁止左右滑动
        //backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
        tabBarOptions: {
            activeTintColor: styleColor, // 文字和图片选中颜色
            inactiveTintColor: '#B5B5B5', // 文字和图片默认颜色
            showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
            showLabel: true,
            indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
            style: {
                backgroundColor: '#fff', // TabBar 背景色
                height: 50,

            },
            labelStyle: {
                marginTop: 0,
                fontSize: 10
            },
            iconStyle: {
                marginTop: -5,
                width: 30,
                height: 30,
            },
            tabStyle: {
                //...
            }
        },
    })
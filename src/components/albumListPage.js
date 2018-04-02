/**
 * 专辑详情页面
 * 
 */

/*
带封面图列表展示组件
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import ListBlock from './listBlock';
import { data1, data2, data3, data4, } from '../pages/deadData';

export default class AlbumListPage extends Component {

    ChangeNum(num) {
        if (num >= 10000) {
            return (
                `${(num / 10000).toFixed(1)}万`
            )
        } else {
            return num
        }
    }

    renderItem = ({ item, index }) => {
        log(item)
        return (
            <View style={styles.item_container}>
                <Image source={item.cover_image?{ uri: item.cover_image }:require('../constants/images/默认封面.png')}
                    style={styles.item_image}
                />
                <View style={styles.item_mid}>
                    <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={2}>{item.title}</Text>
                    <WhiteSpace size={'md'} />
                    <View style={styles.item_mid_foot_container}>
                        <View style={styles.item_mid_foot_left}>
                            <Icon name={'signal'} size={12} color={'#ccc'} style={{ marginRight: 5 }} />
                            <Text style={styles.fontsize12}>{item.playtime_string}</Text>
                        </View>
                        <View style={styles.item_mid_foot_right}>
                            <Icon name={'headphones'} size={15} color={'#ccc'} style={{ marginRight: 5 }} />
                            <Text style={styles.fontsize12}>4077</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.item_right}>
                    <Text style={styles.fontsize12}>2018-3-18</Text>
                    <WhiteSpace size={'sm'} />
                    <MyBtn
                        onPress={() => alert('我是下载')}
                    >
                        <Icon name={'download'} size={15} color={'#ccc'} />
                    </MyBtn>
                </View>
            </View>
        )
    }



    render() {
        const { data, title, onClickMore, onClickItem, icon } = this.props; //icon需要直接传一个icon组件进来
        return (
            <View style={styles.container}>
                <View style={styles.head_container}>
                    <View style={styles.head_item}>
                        <Icon name="caret-right" size={20} color={styleColor} style={{ marginRight: 5 }} />
                        <Text style={[styles.fontsize14, { color: '#000' }]}>共{data.resources_count}集</Text>
                    </View>
                    <MyBtn style={styles.head_item}
                        onPress={() => { }}
                    >
                        <Icon2 name="md-swap" size={15} color={'#333'} style={{ marginRight: 5 }} />
                        <Text style={[styles.fontsize12, styles.head_text]}>排序</Text>
                    </MyBtn>
                </View>
                <FlatList
                    data={data.resources}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={styles.division_line}></View>}
                    showsVerticalScrollIndicator={false}
                />
            </View >

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
    fontsize16: {
        fontSize: 16 * fontSizeScaler, color: '#000'
    },
    container: {
        backgroundColor: '#fff'
    },
    head_container: {
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10
    },
    head_item: {
        flexDirection: 'row', alignItems: 'center'
    },
    head_text: {
        color: '#333'
    },
    item_container: {
        paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, flexDirection: 'row', alignItems: 'center'
    },
    item_image: {
        width: 50, height: 50, borderRadius: 25
    },
    item_mid: {
        marginRight: 20, marginLeft: 20, flex: 1
    },
    item_mid_foot_container: {
        flexDirection: 'row'
    },
    item_mid_foot_left: {
        flexDirection: 'row', alignItems: 'center', marginRight: 10
    },
    item_mid_foot_right: {
        flexDirection: 'row', alignItems: 'center'
    },
    division_line: {
        height: 0.5, backgroundColor: '#ccc'
    },
    item_right: {
        alignItems: 'center'
    },
})

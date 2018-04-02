/*
长方形封面图展示部分组件
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
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import Head from './blockHead';



export default class LectionBlock extends Component {

    ChangeNum(num) {
        if (num >= 10000) {
            return (
                `${(num / 10000).toFixed(1)}万`
            )
        } else {
            return num
        }
    }


    render() {
        const { data, title, onClickMore, onClickItem, icon, hasHead } = this.props; //icon需要直接传一个icon组件进来
        const showHead = hasHead != undefined ? hasHead : true
        return (
            <View style={styles.container}>
                {showHead ? <Head {...this.props} style={{ paddingBottom: 0 }} /> : null}
                <View style={{ padding: 5 }}>
                    <View style={styles.content_container}>
                        {data.map((item, index) => (
                            <View style={styles.content_item_container} key={index} >
                                <WhiteSpace size={'md'} />
                                <MyBtn
                                    onPress={() => onClickItem ? onClickItem(item, index) : {}}
                                >
                                    <Image source={{ uri: item.img }} style={styles.content_item_img} />
                                </MyBtn>
                                <WhiteSpace size={'xs'} />
                                <Text style={[styles.fontsize12, { color: '#000' }]} numberOfLines={1}>{item.title}</Text>
                                <WhiteSpace size={'sm'} />
                                <View style={styles.content_foot_container}>
                                    {icon ? icon : <Icon name={'eye'} size={15} color='#ccc' />}
                                    <WingBlank size={'sm'}><Text style={[styles.fontsize10, { color: '#ccc' }]} numberOfLines={1}>{this.ChangeNum(item.sum)}</Text></WingBlank>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    fontsize10: {
        fontSize: 10 * fontSizeScaler,
    },
    fontsize12: {
        fontSize: 12 * fontSizeScaler,
    },
    fontsize14: {
        fontSize: 14 * fontSizeScaler, color: '#000'
    },
    head_container: {
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingLeft: 10, paddingRight: 10
    },
    head_item: {
        flexDirection: 'row', alignItems: 'center'
    },
    content_container: {
        flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'
    },
    content_item_container: {
        marginLeft: 5, marginRight: 5, width: (ScreenWidth - 40) / 3
    },
    // content_item_img_container: {
    //     padding: 3, borderColor: '#ccc', borderWidth: 0.5
    // },
    content_item_img: {
        width: (ScreenWidth - 43) / 3, height: (ScreenWidth - 43) / 3 * 1.3
    },
    content_foot_container: {
        flexDirection: 'row', alignItems: 'center'
    },
})

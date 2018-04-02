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
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import ListBlock from './listBlock';
import { data1, data2, data3, data4, } from '../pages/deadData';

export default class AlbumDetailspage extends Component {

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
        const { data, recommend } = this.props;
        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.introduce_container}>
                    <Text style={styles.fontsize16}>专辑简介</Text>
                    <WhiteSpace size={'sm'} />
                    <Text style={styles.fontsize12}>{data.description}</Text>
                </View>
                <WhiteSpace size={'md'} />
                <View style={styles.introduce_container}>
                    <Text style={styles.fontsize16}>发布者介绍</Text>
                    <WhiteSpace size={'md'} />
                    <View style={styles.author_introduce_avatar_container}>
                        <Image source={{ uri: data.publisher_avatar }} style={styles.author_introduce_avatar} />
                        <View style={styles.author_introduce_nickname}>
                            <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={1}>{data.publisher}</Text>
                        </View>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <Text style={styles.fontsize12}>
                        禅意歌者，音乐唱作人，自推出《半壶纱》《一袖云》等优质唱作作品以来，广受好评，其创立的“禅意中国风”也成为了近年来最为别致的音乐标签。
                    </Text>
                </View>
                {recommend.status == 'success' ?
                    <View>
                        <WhiteSpace size={'md'} />
                        <ListBlock {...this.props} data={recommend.data} hasIcon={false} title='相关推荐' />
                    </View>
                    : null}
                <WhiteSpace size={'lg'} />
            </ScrollView>
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
    introduce_container: {
        padding: 10, paddingTop: 15, paddingBottom: 15, backgroundColor: '#fff'
    },
    author_introduce_avatar_container: {
        flexDirection: 'row', alignItems: 'center',
    },
    author_introduce_avatar: {
        width: 40, height: 40, borderRadius: 20
    },
    author_introduce_nickname: {
        paddingLeft: 10, paddingRight: 10, flex: 1
    }
})

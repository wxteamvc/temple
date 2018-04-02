/*
分答展示部分组件
*/
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import Head from './blockHead';

export default class MediaBlock extends Component {

    ChangeNum(num) {
        if (num >= 10000) {
            return (
                `${(num / 10000).toFixed(1)}万`
            )
        } else {
            return num
        }
    }


    renderListItem = ({ item, index }) => {
        const { onClickItem } = this.props;
        return (
            <MyBtn
                style={{ padding: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center' }}
                onPress={() => onClickItem ? onClickItem(item, index) : {}}
            >
                <View style={{ flex: 0.8 }}>
                    <Text numberOfLines={2} style={styles.fontsize14}>{item.issue}</Text>
                </View>
                <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Image
                        source={require('../constants/images/hongbao.png')}
                        style={{ height: 60, width: 40 }}
                    />
                </View>
            </MyBtn>


        )
    }

    render() {
        const { data, title, onClickMore, onClickItem, icon, hasHead } = this.props; //icon需要直接传一个icon组件进来
        const showHead = hasHead != undefined ? hasHead : true
        return (
            <View style={styles.container}>
                {showHead ? <Head {...this.props} /> : null}
                <FlatList
                    data={data}
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<View style={{ height: 0.5, backgroundColor: '#ccc' }}></View>}
                    ItemSeparatorComponent={() => <View style={{ height: 0.5, backgroundColor: '#ccc' }}></View>}
                />

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
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10
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
    content_item_img_container: {
        padding: 3, borderColor: '#ccc', borderWidth: 0.5
    },
    content_item_img: {
        width: (ScreenWidth - 61) / 3, height: (ScreenWidth - 61) / 3
    },
    content_foot_container: {
        flexDirection: 'row', alignItems: 'center'
    },
})

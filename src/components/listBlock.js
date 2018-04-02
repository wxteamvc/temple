/*
带封面图列表展示组件
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

export default class ListBlock extends Component {

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
        const { onClickItem, iconRight, icon } = this.props;
        iconDirection = iconRight ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }
        return (
            <MyBtn
                style={styles.item_container}
                onPress={() => onClickItem ? onClickItem(item, index) : {}}
            >
                <View style={styles.item_img_container}>
                    <Image
                        source={{ uri: item.cover_image }}
                        style={styles.item_img}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text numberOfLines={1} style={styles.fontsize14}>{item.title}</Text>
                    <WhiteSpace size={'sm'} />
                    <Text numberOfLines={2} style={styles.fontsize12}>{item.description}</Text>
                    <WhiteSpace size={'md'} />
                    <View style={[styles.row_alignItems_center, iconDirection]}>
                        {item.contentSum ?
                            <View style={[styles.row_alignItems_center, { marginRight: 15 }]}>
                                <Icon name={'list'} size={10} color={'#ccc'} style={{ marginRight: 5 }} />
                                <Text numberOfLines={1} style={[styles.fontsize10, { color: '#ccc' }]}>{item.contentSum}</Text>
                            </View> : null
                        }
                        <View style={styles.row_alignItems_center}>
                            {icon ? icon : <Icon name={'eye'} size={15} color={'#ccc'} style={{ marginRight: 5 }} />}
                            <Text numberOfLines={1} style={[styles.fontsize10, { color: '#ccc' }]}>{this.ChangeNum(item.sum)}</Text>
                        </View>
                    </View>
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
                    ListHeaderComponent={<View style={styles.division_line}></View>}
                    ItemSeparatorComponent={() => <View style={styles.division_line}></View>}
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
    row_alignItems_center: {
        flexDirection: 'row', alignItems: 'center'
    },
    item_container: {
        padding: 5, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center'
    },
    item_img_container: {
        padding: 2, backgroundColor: '#ccc'
    },
    item_img: {
        height: 80, width: 80
    },
    division_line: {
        height: 0.5, backgroundColor: '#ccc'
    }
})

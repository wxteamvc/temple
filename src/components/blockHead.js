import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../constants/global';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MyBtn from './button';


export default class BlockHead extends Component {
    render() {
        const { title, onClickMore, style, hasIcon } = this.props;    //icon需要直接传一个icon组件进来
        const showIcon = hasIcon != undefined ? hasIcon : true;
        return (
            <View style={[styles.head_container, style ? style : {}]}>
                <View style={styles.head_item}>
                    {showIcon ? <Icon name="caret-right" size={20} color={styleColor} style={{ marginRight: 5 }} /> : null}
                    <Text style={styles.fontsize14}>{title}</Text>
                </View>
                <MyBtn style={styles.head_item}
                    onPress={() => onClickMore ? onClickMore() : {}}
                >
                    <Text style={[styles.fontsize12, styles.head_text]}>更多</Text>
                    <Icon name="angle-right" size={15} color={'#333'} />
                </MyBtn>
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
        fontSize: 14 * fontSizeScaler, color: '#000'
    },
    head_container: {
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10
    },
    head_item: {
        flexDirection: 'row', alignItems: 'center'
    },
    head_text: {
        marginRight: 5, color: '#333'
    }

})
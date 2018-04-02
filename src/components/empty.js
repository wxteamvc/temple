
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,

} from 'react-native';
import { WhiteSpace, WingBlank } from 'antd-mobile';




export default class Empty extends Component {
    render() {
        return (
            <View style={styles.WhitePage_container}>
                <Image source={require('../constants/images/空白.png')} style={styles.WhitePage_img} />
                <WhiteSpace size={'lg'} />
                <Text>还没有回答哦~~~</Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    WhitePage_container: {
        paddingTop: 50, paddingBottom: 50, alignItems: 'center',
    },
    WhitePage_img: {
        height: 80, width: 80
    },
})

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Message extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    我是消息
                  </Text>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },

})
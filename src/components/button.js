/*
没有触摸效果的TouchableOpacity

*/

import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { log } from '../constants/global';

export default class Button extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={1} {...this.props}>
                {this.props.children}
            </TouchableOpacity>
        )
    }
}
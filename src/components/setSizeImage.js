import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import { WhiteSpace, WingBlank, Tabs } from 'antd-mobile';


export default class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: 0,
            height: 0
        }
    }

    componentWillMount() {
        const { uri, containerWidth, longestLength, ratio } = this.props;
        const long_side = longestLength ? longestLength : 150;
        const bili = ratio ? ratio : 0.65;
        Image.getSize(uri,
            (width, height) => {
                if (0.8 < (width / height) && (width / height) < 1.2) {
                    width = long_side;
                    height = long_side
                } else if (width > height) {

                    width = long_side;
                    height = long_side * bili;
                } else {

                    height = long_side;
                    width = long_side * bili;
                }
                this.setState({ width, height });
            }
        )
    }

    render() {
        const { width, height } = this.state;
        const { uri } = this.props;
        return (
            <Image
                style={{ width: width, height: height }}
                source={{ uri: uri }}
            />

        )
    }

}



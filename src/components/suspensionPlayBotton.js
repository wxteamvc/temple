import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Easing,
    Image,
    ImageBackground
} from 'react-native';
import MyBtn from './button';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import NavigationService from '../container/NavigationService';

class SuspensionPlayBotton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rotateValue: new Animated.Value(0),

        }
        this.rotateTime = 12000;
        this.next_pause = false;
        this.myAnimate = Animated.timing(this.state.rotateValue, {
            toValue: 1,
            duration: this.rotateTime,
            easing: Easing.inOut(Easing.linear),
        });
    }

    componentWillUpdate(nextProps, nextState) {
        const next_playReducer = nextProps.playReducer;
        const { playReducer } = this.props;
        if (playReducer.pause != next_playReducer.pause && next_playReducer.pause) {   //如果执行了暂停操作
            this.next_pause = next_playReducer.pause
            this.state.rotateValue.stopAnimation((oneTimeRotate) => {
                this.myAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * this.rotateTime,
                    easing: Easing.inOut(Easing.linear),
                });
            })
        }
        if (playReducer.pause != next_playReducer.pause && !next_playReducer.pause) {   //如果执行了播放操作
            this.next_pause = next_playReducer.pause
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: this.rotateTime,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
        }
    }


    componentWillMount() {
        const { playReducer } = this.props;
        if (!playReducer.pause) {
            this.imgMoving()
        }

    }

    imgMoving = () => {
        if (!this.next_pause) {
            this.state.rotateValue.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            })
        }

    };



    render() {
        const { playReducer } = this.props;
        return (
            <View style={styles.container}>
                <MyBtn onPress={() => {
                    // this.props.dispatch({ type: 'change_pause' })
                    NavigationService.navigate('PlayScene')
                }}>
                    <Animated.View style={[styles.image_container,{
                        transform: [{
                            rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }]}>
                    <Image
                        source={playReducer.play.cover_image ? { uri: playReducer.play.cover_image } : require('../constants/images/默认封面.png')}
                        style={styles.image}
                    />
                    </Animated.View>
                </MyBtn>

            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        playReducer: state.playReducer
    }
}
export default connect(mapStateToProps)(SuspensionPlayBotton);


const styles = StyleSheet.create({

    container: {
        position: 'absolute', bottom: 100, right: 10
    },
    image_container: {
        borderRadius: 20
    },
    image: {
        height: 40, width: 40, borderRadius: 20,
    },
})
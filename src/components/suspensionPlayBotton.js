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
                    this.props.dispatch({ type: 'change_pause' })
                }}>
                    <Animated.View style={[{
                        transform: [{
                            rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }]}>
                        <ImageBackground
                            source={require('../constants/images/默认封面.png')}
                            style={styles.image}
                        >
                        </ImageBackground>
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
        backgroundColor: '#000', borderRadius: 20
    },
    image: {
        height: 38, width: 38, borderRadius: 19, justifyContent: 'center', alignItems: 'center',
    },
    icon: {
        height: 40, width: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.5)', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, left: 0
    }
})
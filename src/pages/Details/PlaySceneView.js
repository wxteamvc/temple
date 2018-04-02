import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Animated,
    Easing,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, List } from 'antd-mobile';
import { ScreenWidth, ScreenHeight, StatusBarHeight, fontSizeScaler, styleColor, log, toMinute } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Loading from '../../components/loading';
import Slider from 'react-native-slider';





class PlayScene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rotateValue: new Animated.Value(0),
            pointerValue: new Animated.Value(0),
            progress: null
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
            this.is_pause = next_playReducer.pause
            this.state.rotateValue.stopAnimation((oneTimeRotate) => {
                this.myAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: (1 - oneTimeRotate) * this.rotateTime,
                    easing: Easing.inOut(Easing.linear),
                });
            })
            this.pause_pointer() //指针离开
        }
        if (playReducer.pause != next_playReducer.pause && !next_playReducer.pause) {   //如果执行了播放操作
            this.is_pause = next_playReducer.pause
            this.myAnimate.start(() => {
                this.myAnimate = Animated.timing(this.state.rotateValue, {
                    toValue: 1,
                    duration: this.rotateTime,
                    easing: Easing.inOut(Easing.linear),
                });
                this.imgMoving()
            })
            this.paly_pointer() //指针回来
        }
    }

    paly_pointer() {
        Animated.timing(this.state.pointerValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.inOut(Easing.linear),
        }).start();
    }

    pause_pointer() {
        Animated.timing(this.state.pointerValue, {
            toValue: -0.15,
            duration: 400,
            easing: Easing.inOut(Easing.linear),
        }).start();
    }


    imgMoving = () => {
        if (!this.is_pause) {
            this.state.rotateValue.setValue(0);
            this.myAnimate.start(() => {
                this.imgMoving()
            })
        }

    };



    componentWillMount() {
        const { playReducer } = this.props;
        this.props.dispatch({ type: 'hide_btn' })
        if (playReducer.pause) this.state.pointerValue.setValue(-0.15)

    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'show_btn' })
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     return !nextProps.playReducer.change_progress
    // }

    sliderStartChange = value => {
        this.props.dispatch({ type: 'change_slider_begin' })
    };

    sliderChangeDone = value => {
        this.props.dispatch({ type: 'change_slider_end', data: value })
    };

    render() {
        const { playReducer } = this.props;
        log(playReducer.play_progress)
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Image style={styles.image_background} blurRadius={8} source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522402811523&di=f108a3bacacf82d1147bd395561744a6&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Faaa6d8bdcfbbea9eb07b02e3ef4d8285c9acab1a.jpg' }} />
                <View style={styles.cover_layer}>
                    <View style={styles.navigationBar}>
                        <MyBtn style={styles.nav_left}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name='chevron-left' size={20} color={'#fff'} />
                        </MyBtn>
                        <View style={styles.nav_mid}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]} numberOfLines={1}>欧若拉</Text>
                        </View>
                    </View>
                    <View style={styles.changpianjiao_container}>
                        <Animated.Image
                            resizeMode={'stretch'}
                            source={require('../../constants/images/机械臂.png')}
                            style={[styles.changpianjiao, {
                                transform: [{
                                    rotate: this.state.pointerValue.interpolate({ // 旋转，使用插值函数做值映射
                                        inputRange: [-1, 1],
                                        outputRange: ['-180deg', '180deg']
                                    })
                                }]
                            }]}

                        />
                    </View>
                    <Animated.View style={[styles.changpian, {
                        transform: [{
                            rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                inputRange: [0, 1],
                                outputRange: ['0deg', '360deg']
                            })
                        }]
                    }]}>
                        <ImageBackground
                            source={require('../../constants/images/唱片.png')}
                            style={styles.cover_container}
                        >
                            <Image source={{ uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1522402811523&di=f108a3bacacf82d1147bd395561744a6&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2Faaa6d8bdcfbbea9eb07b02e3ef4d8285c9acab1a.jpg' }} style={styles.cover} />
                        </ImageBackground>
                    </Animated.View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: 50, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={[styles.fontsize12, { color: '#fff' }]}>{toMinute(playReducer.play_progress)}</Text>
                        </View>
                        <Slider
                            minimumValue={0}
                            maximumValue={playReducer.playtime_seconds}
                            step={1}
                            minimumTrackTintColor={'#C5A5AB'}
                            thumbTintColor={'#fff'}
                            maximumTrackTintColor={'rgba(255,255,255,0.3)'}
                            trackStyle={{ height: 2 }}
                            style={{ width: ScreenWidth - 120, marginLeft: 10, marginRight: 10 }}
                            value={this.state.progress == null ? playReducer.play_progress : this.state.progress}
                            thumbStyle={{ width: 15, height: 15 }}
                            onSlidingStart={this.sliderStartChange}
                            onSlidingComplete={this.sliderChangeDone}
                        />
                        <View style={{ width: 50 }}>
                            <Text style={[styles.fontsize12, { color: 'rgba(255,255,255,0.3)' }]}>{toMinute(playReducer.playtime_seconds)}</Text>
                        </View>

                    </View>
                    <View style={styles.bottom_container}>
                        <Icon2 name="ios-repeat-outline" size={30} color={'#fff'} />
                        <Icon2 name="ios-skip-backward-outline" size={30} color={'#fff'} />
                        <MyBtn onPress={() => { this.props.dispatch({ type: 'change_pause' }) }}>
                            {playReducer.pause ? <Icon2 name="ios-play-outline" size={30} color={'#fff'} /> : <Icon2 name="ios-pause-outline" size={30} color={'#fff'} />}
                        </MyBtn>
                        <Icon2 name="ios-skip-forward-outline" size={30} color={'#fff'} />
                        <Icon2 name="ios-list-outline" size={30} color={'#fff'} />
                    </View>

                </View>
            </View>

        )
    }
}


function mapStateToProps(state) {
    return {
        playReducer: state.playReducer
    }
}
export default connect(mapStateToProps)(PlayScene);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },
    row_columncenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    fontsize10: {
        fontSize: 10 * fontSizeScaler,
    },
    fontsize12: {
        fontSize: 12 * fontSizeScaler,
    },
    fontsize14: {
        fontSize: 14 * fontSizeScaler,
    },
    image_background: {
        width: ScreenWidth, height: ScreenHeight, position: 'absolute', zIndex: 1, opacity: 0.7
    },
    cover_layer: {
        width: ScreenWidth, height: ScreenHeight, zIndex: 2, backgroundColor: 'rgba(0,0,0,0.5)'
    },
    navigationBar: {
        flexDirection: 'row', alignItems: 'center', padding: 10, marginTop: StatusBarHeight, borderBottomWidth: 0.3, borderColor: 'rgba(255,255,255,0.5)',
    },
    nav_left: {
        flex: 0.2, flexDirection: 'row',
    },
    nav_mid: {
        flex: 0.6, flexDirection: 'row', justifyContent: 'center',
    },
    changpianjiao_container: {
        alignItems: 'center', zIndex: 4
    },
    changpianjiao: {
        height: 280, width: 160, marginTop: -140,
    },
    changpian: {
        alignItems: 'center', marginTop: -60, zIndex: 3
    },
    cover_container: {
        width: ScreenWidth - 60, height: ScreenWidth - 60, justifyContent: 'center', alignItems: 'center',
    },
    cover: {
        width: ScreenWidth - 160, height: ScreenWidth - 160, borderRadius: (ScreenWidth - 160) / 2
    },
    bottom_container: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 10, paddingBottom: 40
    }
})
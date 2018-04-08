import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Animated,
    Easing,
    ImageBackground,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Modal, List } from 'antd-mobile';
import { ScreenWidth, ScreenHeight, StatusBarHeight, fontSizeScaler, styleColor, log, toMinute } from '../../constants/global';
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Loading from '../../components/loading';
import Slider from 'react-native-slider';
import { Toast } from 'teaset';



class PlayScene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rotateValue: new Animated.Value(0),
            pointerValue: new Animated.Value(0),
            visible: false,
            show_confirm_window: false
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
        if (playReducer.pause) {
            this.state.pointerValue.setValue(-0.15)
        } else {
            this.imgMoving()
        }

    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'show_btn' })
    }


    sliderStartChange = (value) => {
        this.props.dispatch({ type: 'change_slider_start', data: value })
    }

    onValueChange = (value) => {
        this.props.dispatch({ type: 'change_slider_doing', data: value })

    }
    sliderChangeDone = value => {
        this.props.dispatch({ type: 'change_slider_end', data: value })
    };

    changePlayType = () => {
        const { playReducer } = this.props;
        switch (playReducer.play_type) {
            case 'order':
                this.props.dispatch({ type: 'change_play_type', data: 'random' })
                Toast.message('随机播放')
                break;
            case 'random':
                this.props.dispatch({ type: 'change_play_type', data: 'loop' })
                Toast.message('单曲循环')
                break;
            case 'loop':
                this.props.dispatch({ type: 'change_play_type', data: 'order' })
                Toast.message('顺序播放')
                break;
            default:
                break;
        }
    }


    renderTYpeBtn() {
        const { playReducer } = this.props;
        switch (playReducer.play_type) {
            case 'order':
                return <Icon2 name="ios-repeat-outline" size={30} color={'#fff'} />
                break;
            case 'random':
                return <Icon2 name="ios-shuffle-outline" size={30} color={'#fff'} />
                break;
            case 'loop':
                return <Icon2 name="ios-sync-outline" size={22} color={'#fff'} />
                break;
            default:
                break;
        }
    }


    palyItem = (item, index) => {
        const { playReducer } = this.props;
        this.setState({ visible: false })
        this.props.dispatch({ type: 'set_and_play', list: playReducer.resources_list, data: item, index: index })

    }

    renderListItem = ({ item, index }) => {
        return (
            <MyBtn style={styles.item_container} onPress={() => this.palyItem(item, index)}>
                {index == this.props.playReducer.current_index ? <Icon name={'volume-up'} color={'#CC6666'} style={{ marginRight: 10 }} /> : null}
                <Text style={[styles.fontsize14, { color: index == this.props.playReducer.current_index ? '#CC6666' : '#fff' }]} numberOfLines={1}>{item.title}</Text>
            </MyBtn>
        )
    }

    initPlay = () => {
        this.setState({ show_confirm_window: false })
        this.props.dispatch({ type: 'player_init' });
        this.props.navigation.goBack();
    }

    render() {
        const { playReducer } = this.props;
        // log(playReducer)
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="transparent"
                    translucent={true}
                />
                <Image style={styles.image_background} blurRadius={8} source={playReducer.play.cover_image ? { uri: playReducer.play.cover_image } : require('../../constants/images/默认背景.jpg')} />
                <View style={styles.cover_layer}>
                    <View style={styles.navigationBar}>
                        <MyBtn style={styles.nav_left}
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name='chevron-left' size={20} color={'#fff'} />
                        </MyBtn>
                        <View style={styles.nav_mid}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]} numberOfLines={1}>{playReducer.play.title}</Text>
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
                            <Image source={playReducer.play.cover_image ? { uri: playReducer.play.cover_image } : require('../../constants/images/默认封面.png')} style={styles.cover} />
                        </ImageBackground>
                    </Animated.View>
                    <View style={[styles.flex_row_center, { padding: 5 }]}>
                        <WingBlank size={'lg'}>
                            <MyBtn onPress={() => alert('喜欢')}>
                                <Icon2 name={'ios-heart-outline'} color={'#fff'} size={30} />
                            </MyBtn>
                        </WingBlank>
                        <WingBlank size={'lg'}></WingBlank>
                        <WingBlank size={'lg'}>
                            <MyBtn onPress={() => alert('下载')}>
                                <Icon2 name={'md-download'} color={'#fff'} size={30} />
                            </MyBtn>
                        </WingBlank>
                    </View>


                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{ width: 50, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={[styles.fontsize12, { color: '#fff' }]}>{toMinute(playReducer.play_progress)}</Text>
                        </View>
                        <Slider
                            minimumValue={0}
                            maximumValue={playReducer.play.playtime_seconds}
                            step={1}
                            minimumTrackTintColor={'#C5A5AB'}
                            thumbTintColor={'#fff'}
                            maximumTrackTintColor={'rgba(255,255,255,0.3)'}
                            trackStyle={{ height: 2 }}
                            style={{ width: ScreenWidth - 120, marginLeft: 10, marginRight: 10 }}
                            value={playReducer.play_progress}
                            thumbStyle={{ width: 15, height: 15 }}
                            onSlidingStart={this.sliderStartChange}
                            onSlidingComplete={this.sliderChangeDone}
                            onValueChange={this.onValueChange}
                        />
                        <View style={{ width: 50 }}>
                            <Text style={[styles.fontsize12, { color: 'rgba(255,255,255,0.3)' }]}>{toMinute(playReducer.play.playtime_seconds)}</Text>
                        </View>
                    </View>
                    <View style={styles.bottom_container}>
                        <View style={styles.bottom_left}>
                            <MyBtn onPress={this.changePlayType}>
                                {this.renderTYpeBtn()}
                            </MyBtn>
                        </View>
                        <View style={styles.bottom_mid}>
                            <MyBtn onPress={() => this.props.dispatch({ type: 'change_sound', data: 'last' })}>
                                <Icon2 name="ios-skip-backward-outline" size={30} color={'#fff'} />
                            </MyBtn>
                            <MyBtn onPress={() => { this.props.dispatch({ type: 'change_pause' }) }}>
                                {playReducer.pause ? <Icon2 name="ios-play-outline" size={30} color={'#fff'} /> : <Icon2 name="ios-pause-outline" size={30} color={'#fff'} />}
                            </MyBtn>
                            <MyBtn onPress={() => this.props.dispatch({ type: 'change_sound', data: 'next' })}>
                                <Icon2 name="ios-skip-forward-outline" size={30} color={'#fff'} />
                            </MyBtn>
                        </View>
                        <View style={styles.bottom_right}>
                            <MyBtn style={styles.bottom_right} onPress={() => this.setState({ visible: true })} >
                                <Icon2 name="ios-list-outline" size={30} color={'#fff'} />
                            </MyBtn>
                        </View>

                    </View>
                </View>
                <Modal
                    popup
                    visible={this.state.visible}
                    maskClosable={true}
                    onClose={() => this.setState({ visible: false })}
                    animationType="slide-up"
                >
                    <ImageBackground style={{ width: ScreenWidth, height: ScreenHeight * 0.5 }} blurRadius={20} source={playReducer.play.cover_image ? { uri: playReducer.play.cover_image } : require('../../constants/images/默认背景.jpg')}>
                        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={[styles.flex_row_end, { padding: 10, borderBottomColor: '#fff', borderBottomWidth: 0.5 }]}>
                                <MyBtn onPress={() => {
                                    this.setState({ show_confirm_window: true })
                                }}>
                                    <Icon name={'trash'} color={'#fff'} size={20} />
                                </MyBtn>
                            </View>
                            <FlatList
                                data={playReducer.resources_list}
                                renderItem={this.renderListItem}
                                keyExtractor={(item, index) => index.toString()}
                                ItemSeparatorComponent={() => <View style={styles.division_line}></View>}
                                showsVerticalScrollIndicator={false}
                                ListFooterComponent={<WhiteSpace size={'lg'} />}
                            />
                            {this.state.show_confirm_window ?
                                <View style={{ position: 'absolute', top: 30, left: (ScreenWidth - 200) / 2, width: 200, backgroundColor: '#fff', padding: 10 }}>
                                    <View style={styles.flex_center}>
                                        <Text style={styles.fontsize12}>确认要清空播放列表么?</Text>
                                    </View>
                                    <WhiteSpace size={'lg'} />
                                    <View style={styles.flex_row_end}>
                                        <WingBlank size={'lg'}>
                                            <MyBtn onPress={this.initPlay}>
                                                <Text style={styles.fontsize12}>确定</Text>
                                            </MyBtn>
                                        </WingBlank>
                                        <WingBlank size={'lg'}>
                                            <MyBtn onPress={() => {
                                                this.setState({ show_confirm_window: false })
                                            }}>
                                                <Text style={styles.fontsize12}>取消</Text>
                                            </MyBtn>
                                        </WingBlank>
                                    </View>

                                </View> : null
                            }

                        </View>
                    </ImageBackground>
                </Modal>
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
    flex_row_end: {
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    },
    flex_row_center: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
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
        flexDirection: 'row', alignItems: 'center', padding: 15,
    },
    bottom_left: {
        flex: 0.25, flexDirection: 'row',
    },
    bottom_mid: {
        flex: 0.5, flexDirection: 'row', justifyContent: 'space-between'
    },
    bottom_right: {
        flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end'
    },
    division_line: {
        height: 0.5, backgroundColor: '#ccc'
    },
    item_container: {
        padding: 10, paddingLeft: 15, paddingRight: 15, flexDirection: 'row', alignItems: 'center',
    }
})
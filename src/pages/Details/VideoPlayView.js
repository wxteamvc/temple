import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    StatusBar,
    TouchableWithoutFeedback,
    Button,
    Slider,
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, List, Tabs } from 'antd-mobile';
import { ScreenWidth, ScreenHeight, StatusBarHeight, fontSizeScaler, styleColor, log, formatTime } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import NavigationBar from '../../components/navigationBar';
import Loading from '../../components/loading';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import Collapsible from '../../components/Accordion/Collapsible'


class VideoPlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: "http://192.168.1.186/storage/files/8f62bedfc2f18c23f8e9d30584da4059.mp4",
            videoCover: "http://dl.bizhi.sogou.com/images/2014/10/31/942928.jpg",
            videoTitle: '上海STYLE',
            videoWidth: ScreenWidth,
            videoHeight: ScreenWidth * 9 / 16, // 默认16：9的宽高比
            showVideoCover: true,    // 是否显示视频封面
            showVideoControl: false, // 是否显示视频控制组件
            isPlaying: false,        // 视频是否正在播放
            currentTime: 0,        // 视频当前播放的时间
            duration: 0,           // 视频的总时长
            isFullScreen: false,     // 当前是否全屏显示
            playFromBeginning: false, // 是否从头开始播放
        };
    }

    renderListHead = () => {
        return (
            <View>
                <View style={styles.listHead_top}>
                    <Image source={require('../../constants/images/默认头像.png')} style={styles.listHead_top_img} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text style={[styles.fontsize14]} numberOfLines={1}>Administrator</Text>
                    </View>
                    <View style={styles.listHead_top_right_container}>
                        <MyBtn style={styles.listHead_top_btn}>
                            <Text style={[styles.fontsize14, { color: '#fff' }]}>+ 关注</Text>
                        </MyBtn>
                    </View>
                </View>
                <Collapsible
                    collapsed={true}
                >
                   <Text>上海，简称“沪”或“申”，是中国共产党的诞生地，中华人民共和国直辖市，国家中心城市，超大城市，沪杭甬大湾区核心城市，国际经济、金融、贸易、航运、科技创新中心 [1-2]  ，首批沿海开放城市。上海地处长江入海口，是长江经济带的龙头城市，隔东中国海与日本九州岛相望，南濒杭州湾，北、西与江苏、浙江两省相接。</Text>
                </Collapsible>

            </View>
        )
    }

    render() {
        return (
            <View style={styles.container} onLayout={this._onLayout}>
                <StatusBar
                    backgroundColor="rgba(0,0,0,0.3)"
                    translucent={true}
                    hidden={this.state.showVideoCover || this.state.showVideoControl ? false : true}
                />
                <View style={{ width: this.state.videoWidth, height: this.state.videoHeight, backgroundColor: '#000000' }}>
                    <Video
                        ref={(ref) => this.videoPlayer = ref}
                        source={{ uri: this.state.videoUrl }}
                        rate={1.0}
                        volume={1.0}
                        muted={false}
                        paused={!this.state.isPlaying}
                        resizeMode={'contain'}
                        playWhenInactive={false}
                        playInBackground={false}
                        ignoreSilentSwitch={'ignore'}
                        progressUpdateInterval={250.0}
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoaded}
                        onProgress={this._onProgressChanged}
                        onEnd={this._onPlayEnd}
                        onError={this._onPlayError}
                        onBuffer={this._onBuffering}
                        onTimedMetadata={this._onTimedMetadata}
                        style={{ width: this.state.videoWidth, height: this.state.videoHeight }}
                    />
                    {
                        this.state.showVideoCover ?
                            <Image
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: this.state.videoWidth,
                                    height: this.state.videoHeight
                                }}
                                resizeMode={'cover'}
                                source={{ uri: this.state.videoCover }}
                            /> : null
                    }
                    <TouchableWithoutFeedback onPress={() => { this.hideControl() }}>
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: this.state.videoWidth,
                                height: this.state.videoHeight,
                                backgroundColor: this.state.isPlaying ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            {
                                this.state.isPlaying ? null :
                                    <TouchableWithoutFeedback onPress={() => { this.onPressPlayButton() }}>
                                        <Image
                                            style={styles.playButton}
                                            source={require('../../constants/images/icon_video_play.png')}
                                        />
                                    </TouchableWithoutFeedback>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    {
                        this.state.showVideoControl || !this.state.isPlaying ?
                            <View style={[styles.top_control, { width: this.state.videoWidth }]}>
                                <MyBtn style={{ flex: 0.15 }} onPress={this.onControlBack}>
                                    <Image
                                        style={{ width: 20, height: 15 }}
                                        source={require('../../constants/images/left.png')}
                                    />
                                </MyBtn>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={[styles.fontsize16, { color: '#fff' }]} numberOfLines={1}>{this.state.videoTitle}</Text>
                                </View>
                                <View style={{ flex: 0.15 }}></View>
                            </View>


                            : null}
                    {
                        this.state.showVideoControl ?
                            <View style={[styles.control, { width: this.state.videoWidth }]}>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlPlayPress() }}>
                                    <Image
                                        style={styles.playControl}
                                        source={this.state.isPlaying ? require('../../constants/images/icon_control_pause.png') : require('../../constants/images/icon_control_play.png')}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.time}>{formatTime(this.state.currentTime)}</Text>
                                <Slider
                                    style={{ flex: 1 }}
                                    maximumTrackTintColor={'#999999'}
                                    minimumTrackTintColor={'#00c06d'}
                                    thumbImage={require('../../constants/images/icon_control_slider.png')}
                                    value={this.state.currentTime}
                                    minimumValue={0}
                                    maximumValue={this.state.duration}
                                    onValueChange={(currentTime) => { this.onSliderValueChanged(currentTime) }}
                                />
                                <Text style={styles.time}>{formatTime(this.state.duration)}</Text>
                                <TouchableOpacity activeOpacity={0.3} onPress={() => { this.onControlShrinkPress() }}>
                                    <Image
                                        style={styles.shrinkControl}
                                        source={this.state.isFullScreen ? require('../../constants/images/icon_control_shrink_screen.png') : require('../../constants/images/icon_control_full_screen.png')}
                                    />
                                </TouchableOpacity>
                            </View> : null
                    }
                </View>
                <Tabs tabs={[{ title: '简介', }, { title: '评论', },]}
                    swipeable={false}
                    tabBarActiveTextColor={styleColor}
                    tabBarUnderlineStyle={{ backgroundColor: styleColor }}
                    tabBarInactiveTextColor={'#939393'}
                    tabBarTextStyle={{ fontSize: 14 * fontSizeScaler }}
                >
                    <FlatList
                        style={{ backgroundColor: '#fff' }}
                        showsVerticalScrollIndicator={false}
                        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                        renderItem={({ item, index }) => <View style={{ height: 30, justifyContent: 'center', alignItems: 'center', }}><Text style={styles.fontsize12}>{item}</Text></View>}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={this.renderListHead}
                    />
                    <View style={{ height: 500, backgroundColor: 'green' }}></View>
                </Tabs>



            </View>
        )
    }

    /// -------Video组件回调事件-------

    _onLoadStart = () => {
        // console.log('视频开始加载');
    };

    _onBuffering = (val) => {

    };
    _onTimedMetadata = () => {

    }
    _onLoaded = (data) => {
        this.setState({
            duration: data.duration,
        });
    };

    _onProgressChanged = (data) => {
        // console.log('视频进度更新');
        if (this.state.isPlaying) {
            this.setState({
                currentTime: data.currentTime,
            })
        }
    };

    _onPlayEnd = () => {
        // console.log('视频播放结束');
        this.setState({
            currentTime: 0,
            isPlaying: false,
            playFromBeginning: true
        });
    };

    _onPlayError = () => {
        // console.log('视频播放失败');
    };

    ///-------控件点击事件-------

    /// 控制播放器工具栏的显示和隐藏
    hideControl() {
        if (this.state.showVideoControl) {
            this.timer && clearTimeout(this.timer);
            this.setState({
                showVideoControl: false,
            })
        } else {
            this.setState(
                {
                    showVideoControl: true,
                },
                // 5秒后自动隐藏工具栏
                () => {
                    this.timer && clearTimeout(this.timer);
                    this.timer = setTimeout(
                        () => {
                            this.setState({
                                showVideoControl: false
                            })
                        }, 5000
                    )
                }
            )
        }
    }

    /// 点击了播放器正中间的播放按钮
    onPressPlayButton() {
        let isPlay = !this.state.isPlaying;
        this.setState({
            isPlaying: isPlay,
            showVideoCover: false
        });
        if (this.state.playFromBeginning) {
            this.videoPlayer.seek(0);
            this.setState({
                playFromBeginning: false,
            })
        }
    }

    /// 点击了工具栏上的播放按钮
    onControlPlayPress() {
        this.onPressPlayButton();
    }

    /// 点击了工具栏上的全屏按钮
    onControlShrinkPress() {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            Orientation.lockToLandscape();
        }
    }

    /// 进度条值改变
    onSliderValueChanged(currentTime) {
        this.videoPlayer.seek(currentTime);
        if (this.state.isPlaying) {
            this.setState({
                currentTime: currentTime
            })
        } else {
            this.setState({
                currentTime: currentTime,
                isPlaying: true,
                showVideoCover: false
            })
        }
    }


    //点击了上部工具栏的后退按钮
    onControlBack = () => {
        if (this.state.isFullScreen) {
            Orientation.lockToPortrait();
        } else {
            alert('back')
            this.props.navigation.goBack();
        }
    }

    /// 屏幕旋转时宽高会发生变化，可以在onLayout的方法中做处理，比监听屏幕旋转更加及时获取宽高变化
    _onLayout = (event) => {
        //获取根View的宽高
        let { width, height } = event.nativeEvent.layout;
        // 一般设备横屏下都是宽大于高，这里可以用这个来判断横竖屏
        let isLandscape = (width > height);
        if (isLandscape) {
            this.setState({
                videoWidth: width,
                videoHeight: height,
                isFullScreen: true,
            })
        } else {
            this.setState({
                videoWidth: width,
                videoHeight: width * 9 / 16,
                isFullScreen: false,
            })
        }
        // Orientation.unlockAllOrientations();
    };

    /// -------外部调用事件方法-------

    ///播放视频，提供给外部调用
    playVideo() {
        this.setState({
            isPlaying: true,
            showVideoCover: false
        })
    }

    /// 暂停播放，提供给外部调用
    pauseVideo() {
        this.setState({
            isPlaying: false,
        })
    }

    /// 切换视频并可以指定视频开始播放的时间，提供给外部调用
    switchVideo(videoURL, seekTime) {
        this.setState({
            videoUrl: videoURL,
            currentTime: seekTime,
            isPlaying: true,
            showVideoCover: false
        });
        this.videoPlayer.seek(seekTime);
    }
}



function mapStateToProps(state) {
    return {

    }
}
export default connect()(VideoPlay);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0'
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
    fontsize16: {
        fontSize: 16 * fontSizeScaler,
    },
    playButton: {
        width: 50,
        height: 50,
    },
    playControl: {
        width: 24,
        height: 24,
        marginLeft: 15,
    },
    shrinkControl: {
        width: 15,
        height: 15,
        marginRight: 15,
    },
    time: {
        fontSize: 12,
        color: 'white',
        marginLeft: 10,
        marginRight: 10
    },
    control: {
        flexDirection: 'row',
        height: 44,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    top_control: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        position: 'absolute',
        top: StatusBarHeight,
        left: 0,
        paddingLeft: 15,
        paddingRight: 15
    },
    listHead_top: {
        flexDirection: 'row', paddingLeft: 15, paddingRight: 15, marginTop: 10
    },
    listHead_top_img: {
        width: 40, height: 40, borderRadius: 20
    },
    listHead_top_btn: {
        padding: 2, paddingLeft: 15, paddingRight: 15, backgroundColor: '#FB7299', borderRadius: 5
    },
    listHead_top_right_container: {
        justifyContent: 'center',
    }
});
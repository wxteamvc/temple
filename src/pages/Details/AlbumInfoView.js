
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing
} from 'react-native';
import NavigationBar from '../../components/navigationBar';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import { fontSizeScaler, ScreenHeight, ScreenWidth, styleColor, log } from '../../constants/global';
import MyBtn from '../../components/button';
import AlbumDetailspage from '../../components/albumDetailspage';
import AlbumListPage from '../../components/albumListPage';
import { getAlbumInfo } from '../../actions/albumInfoAction';
import { getRecommend } from '../../actions/recommendAction';
import { connect } from 'react-redux';
import Loading from '../../components/loading';
import moment from 'moment';


class AlbumInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rotateValue: new Animated.Value(0),
        }
    }


    componentDidMount() {
        const { navigation, dispatch } = this.props;
        dispatch(getAlbumInfo(1))
        dispatch(getRecommend('audio', 4))
        this.startAnimated()
    }


    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch({ type: 'ALBUMINFO_INIT' })
        dispatch({ type: 'RECOMMEND_INIT' })
    }

    startAnimated() {
        this.state.rotateValue.setValue(0)
        Animated.loop(
            Animated.timing(this.state.rotateValue, {
                toValue: 1,
                duration: 12000,// 动画持续的时间（单位是毫秒），默认为500
                easing: Easing.out(Easing.linear),// 一个用于定义曲线的渐变函数
            })
        ).start()
    }


    render() {
        const { albumInfo ,recommend} = this.props;
        log(recommend)
        if (albumInfo.status == 'success') {
            const { data } = albumInfo;
            const tabs = [
                { title: '详情', },
                { title: `选集(${data.resources_count})` },
            ]
            return (
                <View style={styles.container}>
                    <NavigationBar {...this.props} rbtn={<Icon2 name={'md-aperture'} size={25} color={'#fff'} />} rbtnOnPress={() => alert('我是分享')} />
                    <View style={styles.top_container}>
                        <View style={styles.top_left}>
                            <Animated.View style={[styles.top_left_img_container, {
                                transform: [{
                                    rotate: this.state.rotateValue.interpolate({ // 旋转，使用插值函数做值映射
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']
                                    })
                                }]
                            }]}>
                                <Image
                                    source={{ uri: data.cover_image }}
                                    style={styles.top_left_img}
                                />
                            </Animated.View>
                        </View>
                        <View style={styles.top_right}>
                            <Text style={styles.fontsize14} numberOfLines={2}> {data.title} </Text>
                            <WhiteSpace size={'md'} />
                            <Text style={styles.fontsize12} numberOfLines={1}> 发&nbsp;布&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{data.publisher} </Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12} numberOfLines={1}> 播&nbsp;放&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;3.1万 </Text>
                            <WhiteSpace size={'sm'} />
                            <Text style={styles.fontsize12} numberOfLines={1}> 更&nbsp;新&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{moment(data.updated_at * 1000).format('YYYY-MM-DD')} </Text>
                        </View>
                    </View>
                    <WhiteSpace size={'md'} />
                    <Tabs tabs={tabs}
                        tabBarActiveTextColor={styleColor}
                        tabBarUnderlineStyle={{ backgroundColor: styleColor }}
                        tabBarInactiveTextColor={'#939393'}
                        tabBarTextStyle={{ fontSize: 16 * fontSizeScaler }}
                    >
                        <AlbumDetailspage {...this.props} data={data} ></AlbumDetailspage>
                        <AlbumListPage {...this.props} data={data}></AlbumListPage>
                    </Tabs>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <NavigationBar {...this.props} rbtn={<Icon2 name={'md-aperture'} size={25} color={'#fff'} />} rbtnOnPress={() => alert('我是分享')} />
                    <Loading status={albumInfo.status} />
                </View>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        albumInfo: state.albumInfo,
        recommend:state.recommend,
    }
}
export default connect(mapStateToProps)(AlbumInfo);

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
    container: {
        flex: 1
    },
    top_container: {
        height: 150, paddingLeft: 40, paddingRight: 40, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'
    },
    top_left: {
        justifyContent: 'center'
    },
    top_left_img_container: {
        padding: 10, backgroundColor: '#000', borderRadius: 60
    },
    top_left_img: {
        height: 100, width: 100, borderRadius: 50
    },
    top_right: {
        flex: 1, marginLeft: 20,
    },


})
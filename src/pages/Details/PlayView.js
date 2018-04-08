import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, List } from 'antd-mobile';
import { ScreenWidth, fontSizeScaler, styleColor, log } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import NavigationBar from '../../components/navigationBar';
import Loading from '../../components/loading';
import Video from 'react-native-video';





class Play extends Component {


    componentWillUpdate(nextProps, nextState) {
        if (this.props.playReducer.seek_time != nextProps.playReducer.seek_time) {
            function playSeek(play) {
                return (
                    new Promise((resolve, reject) => {
                        play.seek(nextProps.playReducer.seek_time);
                        this.timer = setTimeout(() => resolve(),250);

                    })
                )
            }
            playSeek(this.player).then(() => {
                this.props.dispatch({ type: 'change_progress_done' })
            }).then(this.timer && clearTimeout(this.timer))

        }
    }



    setTime = (time) => {
        const { playReducer } = this.props
        if (!playReducer.is_slider) {
            this.props.dispatch({ type: 'play', data: time.currentTime })
        }
    }

    onEnd = () => {
        this.player.seek(0)
        if (!this.props.playReducer.is_repeat) {
            this.props.dispatch({ type: 'change_sound', data: 'next' })
        }
    }

    render() {
        const { playReducer } = this.props
        return (
            <View>
                <Video
                    ref={(ref) => { this.player = ref }}
                    source={{ uri: playReducer.play.path }}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    repeat={playReducer.is_repeat}
                    playInBackground={true}
                    paused={playReducer.pause}
                    // onLoad={() => { alert('开始') }}
                    onProgress={this.setTime}
                    onEnd={this.onEnd}
                />
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        playReducer: state.playReducer
    }
}
export default connect(mapStateToProps)(Play);



const styles = StyleSheet.create({
    container: {
        flex: 1
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
})
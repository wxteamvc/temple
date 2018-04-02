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
        if (nextProps.playReducer.change_progress == 'done') {
            const { play_progress } = nextProps.playReducer
            log(play_progress)
            this.player.seek(play_progress)
            this.props.dispatch({ type: 'change_progress_done' })
        }
    }



    setTime = (time) => {
        this.props.dispatch({ type: 'play', data: time.currentTime })
    }

    render() {
        const { playReducer } = this.props
        return (
            <View>
                <Video
                    ref={(ref) => { this.player = ref }}
                    source={{ uri: playReducer.path }}
                    style={styles.backgroundVideo}
                    resizeMode="cover"
                    repeat={true}
                    playInBackground={true}
                    paused={playReducer.pause}
                    onProgress={this.setTime}
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
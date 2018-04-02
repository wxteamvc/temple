/**
 * 
 * 首页的推荐页面
 * 
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor, log } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import MediaBlock from './mediaBlock';
import ArticleBlock from './articleBlock';
import LectionBlock from './lectionBlock';



export default class HomeRecommend extends Component {

    ChangeNum(num) {
        if (num >= 10000) {
            return (
                `${(num / 10000).toFixed(1)}万`
            )
        } else {
            return num
        }
    }


    render() {
        const { data, navigation } = this.props
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Carousel
                        autoplay={true}
                        infinite
                        // dots={false}
                        dotActiveStyle={{ backgroundColor: '#fff' }}
                    >
                        {data.lunbo.map((item, index) => {
                            return (
                                <MyBtn key={index} onPress={() => { alert('我要跳走了') }}>
                                    <Image source={{ uri: item.uri }} style={styles.banner_image} resizeMode={'cover'} />
                                </MyBtn>
                            )
                        })}
                    </Carousel>
                    <WhiteSpace size={'md'} />
                    <MediaBlock title={'佛乐梵音'} data={data.audio} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => navigation.navigate('AlbumInfo')} />
                    <WhiteSpace size={'md'} />
                    <ArticleBlock title={'分答'} data={data.issues} onClickMore={(item, index) => navigation.navigate('QuestionList')} onClickItem={(item, index) => navigation.navigate('Question')} />
                    <WhiteSpace size={'md'} />
                    <LectionBlock title={'天下经书'} data={data.lection} onClickMore={() => alert('我是更多')} onClickItem={(item, index) =>navigation.navigate('Article')} />
                    <WhiteSpace size={'md'} />
                    <MediaBlock title={'佛学视频'} data={data.vedio} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} icon={<Icon2 name={'ios-play-outline'} size={18} color={'#ccc'} />} />
                    <WhiteSpace size={'lg'} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fontsize10: {
        fontSize: 10 * fontSizeScaler,
    },
    fontsize12: {
        fontSize: 12 * fontSizeScaler,
    },
    banner_image: {
        width: ScreenWidth, height: 180
    },
    top_content: {
        flexDirection: 'row', alignItems: 'center', flex: 0.9, backgroundColor: '#fff', padding: 5, borderRadius: 5
    }
})
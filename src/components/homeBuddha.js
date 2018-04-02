/**
 * 
 * 首页的佛经页面
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
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel } from 'antd-mobile';
import MediaBlock from './mediaBlock';
import ArticleBlock from './articleBlock';
import LectionBlock from './lectionBlock';

export default class HomeBuddha extends Component {

    render() {
        const { data } = this.props;
        return (
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator ={false}>
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
                    <LectionBlock title={'推荐'} data={data.tuijian} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
                    <WhiteSpace size={'md'} />
                    <LectionBlock title={'原文'} data={data.yuanwen} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
                    <WhiteSpace size={'md'} />
                    <LectionBlock title={'有声书'} data={data.youshen} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} icon={<Icon name={'headphones'} size={15} color='#ccc' />} />
                    <WhiteSpace size={'md'} />
                    <MediaBlock title={'视频'} data={data.vedio} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} icon={<Icon2 name={'ios-play-outline'} size={18} color={'#ccc'} />} />
                    <WhiteSpace size={'md'} />
                    <LectionBlock title={'研究'} data={data.yanjiu} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
                    <WhiteSpace size={'md'} />
                    <LectionBlock title={'心咒'} data={data.xinzhou} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
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
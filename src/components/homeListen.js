/**
 * 
 * 首页的我听页面
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
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth } from '../constants/global';
import MyBtn from './button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import MediaBlock from './mediaBlock';
import ArticleBlock from './articleBlock';
import LectionBlock from './lectionBlock';
import ListBlock from './listBlock';

const gridData = [
    { icon: require('../constants/images/yinpin.png'), title: '佛教音乐' },
    { icon: require('../constants/images/gushi.png'), title: '佛教故事' },
    { icon: require('../constants/images/kaishi.png'), title: '高僧开示' },
]



export default class HomeListen extends Component {




    renderGridItem = (item, index) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <Image source={item.icon} style={styles.GridItem} />
                <Text style={styles.fontsize12} numberOfLines={1}>{item.title}</Text>
            </View>
        )
    }

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
                    <Grid
                        data={gridData}
                        activeStyle={false}
                        hasLine={false}
                        columnNum={3}
                        renderItem={this.renderGridItem}
                        itemStyle={styles.grid}
                        onClick={(item, index) => alert(item)}
                    />
                    <WhiteSpace size={'md'} />
                    <MediaBlock title={'佛教音乐'} data={data.audio} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} icon={<Icon name={'headphones'} size={15} color='#ccc' />} />
                    <WhiteSpace size={'md'} />
                    <ListBlock title={'佛教故事'} data={data.gushi} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
                    <WhiteSpace size={'md'} />
                    <ListBlock title={'高僧开示'} data={data.kaishi} onClickMore={() => alert('我是更多')} onClickItem={(item, index) => alert(item)} />
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
    top: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10, backgroundColor: '#06C1AE'
    },
    banner_image: {
        width: ScreenWidth, height: 180
    },
    top_content: {
        flexDirection: 'row', alignItems: 'center', flex: 0.9, backgroundColor: '#fff', padding: 5, borderRadius: 5
    },
    grid: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'
    },
    GridItem: {
        width: 50, height: 50
    },
})
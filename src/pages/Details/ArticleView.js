import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Easing,
    ScrollView
} from 'react-native';
import NavigationBar from '../../components/navigationBar';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import { WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../../constants/global';
import MyBtn from '../../components/button';
import AlbumDetailspage from '../../components/albumDetailspage';
import AlbumListPage from '../../components/albumListPage';
import LectionBlock from '../../components/lectionBlock'
import { data1, data2, data3, data4, } from '../deadData';

export default class Article extends Component {




    render() {

        const tab = [
            { title: '原文' }, { title: '视频' }, { title: '研究' }, { title: '译文' }
        ]
        return (
            <View style={styles.container}>
                <NavigationBar {...this.props} rbtn={<Icon2 name={'md-aperture'} size={25} color={'#fff'} />} rbtnOnPress={() => alert('我是分享')} />
                <View style={styles.top_container}>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={{ uri: 'http://p4.music.126.net/KEwJ7upc2aCRUBu570GFyQ==/18645518185769474.jpg?param=200y200' }} style={styles.top_img} />
                    </View>
                    <View style={styles.top_right_container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.fontsize14, { color: '#000' }]}>《药师经》</Text>
                        </View>
                        <WhiteSpace size={'md'} />
                        <Text style={styles.fontsize12}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;《药师经》，一般指《药师琉璃光如来本愿功德经》，由唐三藏法师玄奘奉诏译的佛经，是赞叹药师佛行愿的佛经，是大乘经典之一。</Text>
                    </View>
                </View>
                <WhiteSpace size={'md'} />
                <Tabs
                    tabs={tab}
                    tabBarActiveTextColor={styleColor}
                    tabBarUnderlineStyle={{ backgroundColor: styleColor }}
                    tabBarInactiveTextColor={'#939393'}
                    tabBarTextStyle={{ fontSize: 16 * fontSizeScaler }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <LectionBlock data={data2.yuanwen} hasHead={false} />
                        <WhiteSpace size={'lg'} />
                    </ScrollView>
                    <Text>视频</Text>
                    <Text>研究</Text>
                    <Text>译文</Text>
                </Tabs>
            </View>
        )
    }
}






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
        padding: 15, paddingLeft: 10, paddingRight: 10, flexDirection: 'row', backgroundColor: '#fff'
    },
    top_img: {
        width: (ScreenWidth - 40) / 3, height: (ScreenWidth - 40) / 3 * 1.3
    },
    top_right_container: {
        flex: 1, marginLeft: 15, marginRight: 10
    }


})
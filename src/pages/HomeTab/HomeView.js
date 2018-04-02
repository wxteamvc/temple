
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { fontSizeScaler, ScreenHeight, StatusBarHeight, ScreenWidth, styleColor } from '../../constants/global';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import HomeRecommend from '../../components/homeRecommend';
import HomeBuddha from '../../components/homeBuddha';
import HomeListen from '../../components/homeListen';
import HomeWatch from '../../components/homeWatch';
import { data1, data2, data3, data4, } from '../deadData';
import { material } from 'react-native-typography'

class Home extends Component {

    render() {
        const tabs = [
            { title: '推荐', },
            { title: '佛经', },
            { title: '我听', },
            { title: '我看', },
        ]
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <MyBtn
                        style={styles.top_content}
                        onPress={() => { alert('我要去搜索啦') }}
                    >
                        <WingBlank size={'md'}><Icon name="search" size={15} color="#ccc" /></WingBlank>
                        <Text style={styles.fontsize10}>请输入关键词搜索</Text>
                    </MyBtn>
                </View>
                <Tabs tabs={tabs}
                    swipeable={false}
                    tabBarActiveTextColor={styleColor}
                    tabBarUnderlineStyle={{ backgroundColor: styleColor }}
                    tabBarInactiveTextColor={'#939393'}
                    tabBarTextStyle={{ fontSize: 16 * fontSizeScaler }}
                >
                    <HomeRecommend data={data1} {...this.props} />
                    <HomeBuddha data={data2} {...this.props} />
                    <HomeListen data={data3} {...this.props} />
                    <HomeWatch data={data4} {...this.props} />
                </Tabs>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(Home);


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fontsize10: {
        fontSize: 10 * fontSizeScaler,
    },
    top: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10, backgroundColor: styleColor
    },
    top_content: {
        flexDirection: 'row', alignItems: 'center', flex: 0.9, backgroundColor: '#fff', padding: 5, borderRadius: 5
    }
})
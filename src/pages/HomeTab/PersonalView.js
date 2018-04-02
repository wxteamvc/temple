
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, List } from 'antd-mobile';
import { ScreenWidth, fontSizeScaler, styleColor, log } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { initUserInfo } from '../../actions/personalAction'


class Personal extends Component {



    componentDidMount() {
        let { token, info } = this.props.userInfo;
        if (token !== null) {
            this.props.dispatch(initUserInfo());
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { userInfo, dispatch } = this.props;
        if (userInfo.isLoading === false && userInfo.isUpdate === true) {
            this.props.dispatch(initUserInfo());
        }
    }



    renderListRow = (listData) => {
        let list = [];
        for (const key in listData) {
            list.push(
                <View key={key}>
                    <List>
                        {this.renderItem(listData[key])}
                    </List>
                    <WhiteSpace size="lg" />
                </View>
            )
        }
        return list;
    }

    renderItem(items) {
        const { userInfo, navigation } = this.props;
        let row = [];
        for (const key in items) {
            row.push(
                <ListRow key={key} title={items[key].title} detail={items[key].detail ? items[key].detail : null}
                    icon={
                        <View style={{ padding: 4, backgroundColor: items[key].color ? items[key].color : '#000', marginRight: 5, borderRadius: 3 }}>
                            <Image source={items[key].icon} style={{ height: 18, width: 18 }} />
                        </View>
                    }
                    accessory='indicator'
                    onPress={() => {
                        if (userInfo.token) {
                            navigation.navigate(items[key].gourl ? items[key].gourl : '', items[key].extra ? items[key].extra : {})
                        } else {
                            navigation.navigate('Login')
                        }
                    }}
                />)
        }
        return row;
    }


    render() {
        const listData = [
            [
                { title: '个人主页', icon: require('../../constants/images/personal/个人主页.png'), color: '#1296DB' },
                { title: '钱包', icon: require('../../constants/images/personal/钱包.png'), color: '#666633' },
                { title: '分答', icon: require('../../constants/images/personal/分答.png'), color: '#F8686B' },
                { title: '收藏', icon: require('../../constants/images/personal/收藏.png'), color: '#D81F07' },
                { title: '已下载', icon: require('../../constants/images/personal/下载.png'), color: '#42D1EF' },
            ],
            [
                { title: '认证服务', icon: require('../../constants/images/personal/认证.png'), color: '#FF6666', gourl: 'Authentication' },
                { title: '邀请好友', icon: require('../../constants/images/personal/邀请.png'), color: '#1296DB' },
            ],
            [
                { title: '联系我们', icon: require('../../constants/images/personal/联系.png'), color: '#B89946' },
                { title: '操作指南', icon: require('../../constants/images/personal/操作指南.png'), color: '#515151' },
                { title: '意见反馈', icon: require('../../constants/images/personal/意见反馈.png'), color: '#B89946' },
            ]

        ];
        const { userInfo, navigation } = this.props;
        const { info } = userInfo;
        const avatar = userInfo.info && userInfo.info.avatar_path ? { uri: userInfo.info.avatar_path } : require('../../constants/images/头像.png');
        log(info)
        return (
            <View style={styles.container}>
                <ScrollView>
                    {userInfo.info ?
                        <View style={{ paddingTop: 20, paddingBottom: 20, backgroundColor: styleColor }} >
                            <View style={[styles.flex_row_columncenter]}>
                                <View style={[styles.flex_row_center, { flex: 0.6 }]}>
                                    <MyBtn
                                        onPress={() => { alert('跳转个人中心') }}
                                        style={[{ borderRadius: 36, borderColor: '#fff', borderWidth: 1,marginLeft:10 }]}
                                    >
                                        <Image
                                            source={avatar}
                                            style={{ height: 70, width: 70, borderRadius: 35 }}
                                        />
                                    </MyBtn>
                                    <WingBlank size={'md'} style={{flex:1}}> 
                                        <Text style={[styles.fontsize14, { color: '#fff' }]} numberOfLines={2}>{userInfo.info.name}</Text>
                                        <View style={styles.flex_row_columncenter}>
                                            <View style={{ padding: 5, paddingTop: 1, paddingBottom: 1, borderColor: '#fff', borderWidth: 1, borderRadius: 5, marginTop: 10 }}>
                                                <Text style={[styles.fontsize10, { color: '#fff' }]}>用户</Text>
                                            </View>
                                        </View>
                                    </WingBlank>
                                </View>
                                <View style={[styles.flex_row_end, { flex: 0.4 }]}>
                                    <MyBtn
                                        onPress={() => {
                                            if (info.user_auth.is_pass != 2) {
                                                navigation.navigate('PersonalAuthentication')
                                            }
                                        }}
                                        style={[styles.flex_row_center, { height: 30, paddingLeft: 10, paddingRight: 10, borderBottomLeftRadius: 15, borderTopLeftRadius: 15, backgroundColor: info.is_auth ? '#0099CC' : '#8a8a8a' }]}>
                                        <View style={[styles.flex_center, { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', marginRight: 10 }]}>
                                            {info.is_auth ? <Icon size={16} name={'check'} color={'#0099CC'} /> :
                                                <Icon size={16} name={'check'} color={'#8a8a8a'} />}
                                        </View>
                                        <Text style={[styles.fontsize12, { color: '#fff' }]}>{info.is_auth ? '已认证' : '未认证'}</Text>
                                    </MyBtn>
                                </View>
                            </View>
                        </View> :
                        <View style={[styles.flex_row_center, { paddingTop: 10, paddingBottom: 10, backgroundColor: styleColor }]}>
                            <MyBtn
                                onPress={() => navigation.navigate('Login')}
                                style={styles.flex_column_rowcenter}
                            >
                                <View
                                    style={[{ borderRadius: 36, borderColor: '#fff', borderWidth: 1 }]}
                                >
                                    <Image
                                        source={avatar}
                                        style={{ height: 70, width: 70, borderRadius: 35 }}
                                    />
                                </View>
                                <WhiteSpace size={'md'} />
                                <Text style={[styles.fontsize12, { color: '#fff' }]}>点击登录</Text>
                            </MyBtn>
                        </View>
                    }
                    <WhiteSpace size="md" />
                    {this.renderListRow(listData)}
                </ScrollView>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(Personal);

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
    fontsize14: {
        fontSize: 14 * fontSizeScaler,
    },
    flex_row_columncenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    flex_row_center: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    flex_row_end: {
        flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    },
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },
    flex_column_rowcenter: {
        flexDirection: 'column', alignItems: 'center',
    },
})
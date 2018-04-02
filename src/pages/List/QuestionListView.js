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
import { WhiteSpace, WingBlank, Tabs } from 'antd-mobile';
import { ScreenWidth, ScreenHeight, fontSizeScaler, styleColor, log, ChangeNum } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import NavigationBar from '../../components/navigationBar';
import { getQuestionList, getMoreQuestionList } from '../../actions/questionAction'
import Loading from '../../components/loading';




class QuestionList extends Component {

    componentWillMount() {
        this.props.dispatch(getQuestionList('new'))
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.is_load) {
            log('我刷新了')
            this.props.dispatch(getQuestionList(this.props.type))
        }
    }







    renderItem = ({ item, index }) => {
        return (
            <MyBtn
                style={styles.item_container}
                onPress={() => this.props.navigation.navigate('Question', { data: item })}
            >
                <View style={{ flex: 1 }}>
                    <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={2}>{item.content}</Text>
                </View>
                <WhiteSpace size={'lg'} />
                <View style={styles.item_foot_container}>
                    <View style={styles.row_columncenter}>
                        <View style={styles.image_container}>
                            <Image source={item.publisher_avatar ? { uri: item.publisher_avatar } : require('../../constants/images/默认头像.png')} style={styles.item_foot_img} />
                        </View>
                        <WingBlank size={'sm'}>
                            <Text style={styles.fontsize12}>{item.publisher}</Text>
                        </WingBlank>
                    </View>
                    <View style={styles.row_columncenter}>
                        <WingBlank size={'sm'}>
                            <Text style={[styles.fontsize12, { color: '#ccc' }]}>{ChangeNum(item.answer_count)}人回答</Text>
                        </WingBlank>
                        <Icon name="angle-right" size={15} color={'#ccc'} />
                    </View>
                </View>

            </MyBtn>
        )
    }

    rendenListEmpty = () => {
        return (
            <View style={{ height: this.fHeight, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.fontsize14}>此间事空空...</Text>
            </View>
        )
    }



    render() {
        const { questionList, question_types } = this.props;
        const tabs = question_types.map((item) => {
            return { title: item.title }
        })
        // log(questionList)
        return (
            <View style={styles.container}>
                <NavigationBar {...this.props} title={'问答'} rbtn={'提问'} rbtnOnPress={() => { this.props.navigation.navigate('CreatQuestion') }} />
                <View style={styles.top}>
                    <MyBtn
                        style={styles.top_content}
                        onPress={() => { alert('我要去搜索啦') }}
                    >
                        <WingBlank size={'md'}><Icon name="search" size={15} color="#ccc" /></WingBlank>
                        <Text style={styles.fontsize10}>输入寺院、问答、佛经</Text>
                    </MyBtn>
                </View>
                <Tabs tabs={tabs}
                    tabBarActiveTextColor={styleColor}
                    tabBarUnderlineStyle={{ backgroundColor: styleColor }}
                    tabBarInactiveTextColor={'#939393'}
                    tabBarTextStyle={{ fontSize: 16 * fontSizeScaler }}
                    onTabClick={(item, index) => {
                        this.props.dispatch(getQuestionList(question_types[index].key))
                    }}
                >
                    {question_types.map((item, index) => {
                        if (questionList[item.key] && questionList[item.key].status == 'success') {
                            return (
                                <FlatList
                                    key={index}
                                    refreshing={true}
                                    data={questionList[item.key].data}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    showsVerticalScrollIndicator={false}
                                    ListFooterComponent={questionList[item.key].data.length > 0 && !questionList[item.key].next ? <View style={styles.list_foot}><Text style={styles.fontsize12}>已经到底了哦~~~~~~</Text></View> : null}
                                    ItemSeparatorComponent={() => <WhiteSpace size={'sm'} />}
                                    onLayout={e => this.fHeight = e.nativeEvent.layout.height}
                                    ListEmptyComponent={this.rendenListEmpty}
                                    onEndReachedThreshold={0.3}
                                    onEndReached={() => {
                                        if (questionList[item.key].next) {
                                            this.props.dispatch(getMoreQuestionList(item.key, questionList[item.key].next))
                                        }
                                    }}
                                />
                            )
                        }
                        else {
                            return < Loading key={index} status={questionList[item.key] ? questionList[item.key].status : 'doing'} />
                        }
                    })}
                </Tabs>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        questionList: state.questionListReducer.data,
        is_load: state.questionListReducer.is_load,
        type: state.questionListReducer.index,
        question_types: state.initReducer.question_types,
    }
}
export default connect(mapStateToProps)(QuestionList);



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
    top: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 10, backgroundColor: '#757575'
    },
    top_content: {
        flexDirection: 'row', alignItems: 'center', flex: 0.9, backgroundColor: '#fff', padding: 5, borderRadius: 15
    },
    item_container: {
        padding: 10, backgroundColor: '#fff'
    },
    item_foot_container: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    },
    image_container: {
        padding: 1, borderRadius: 13, backgroundColor: '#000'
    },
    item_foot_img: {
        width: 25, height: 25, borderRadius: 12.5
    },
    item_foot_left: {
        flexDirection: 'row', alignItems: 'center',
    },
    item_foot_right: {
        flexDirection: 'row', alignItems: 'center',
    },
    list_foot: {
        alignItems: 'center', paddingBottom: 10, paddingTop: 10,
    }
})
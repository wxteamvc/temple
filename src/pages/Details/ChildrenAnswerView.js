import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    TextInput
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
import ModalBox from 'react-native-modalbox';
import Empty from '../../components/empty';
import moment from 'moment';
import { getChildrenAnswerList, getMoreChildrenAnswerList } from '../../actions/childrenAnswerAction';
import { getAnswerList } from '../../actions/answerAction';
import Util from "../../constants/util";
import * as Urls from "../../constants/urls";

class ChildrenAnswerView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: '',
        }
    }


    componentDidMount() {
        const data = this.props.navigation.state.params.data;
        this.props.dispatch(getChildrenAnswerList(data.id))
    }

    componentWillUnmount() {
        const { dispatch, } = this.props;
        dispatch({ type: 'CHILDREN_ANSWERlIST_INIT' })
    }

    submitComment = () => {
        const { dispatch, navigation, userInfo } = this.props;
        const id = navigation.state.params.data.id;
        const { comment } = this.state
        if (!userInfo.token) {
            navigation.navigate('Login');
            return
        }
        if (comment) {
            Util.post(Urls.CHILDREN_ANSWER_URL + `/${id}`, { content: comment },
                (res) => {
                    if (res.status == 'success') {
                        this.input.blur();
                        this.setState({ comment: '' })
                        dispatch(getChildrenAnswerList(id))
                        dispatch(getAnswerList(navigation.state.params.data.question_id))
                    } else {
                        Toast.info(res.message)
                    }
                },
                (error) => {
                    console.log(error.message)
                }
            )
        } else {
            Toast.message('你还没写评论哦~~')
        }
    }



    renderItem(data, index = null) {
        return (
            <View style={styles.item_container}>
                <Image source={data.user_avatar ? { uri: data.user_avatar } : require('../../constants/images/默认头像.png')} style={{ width: 30, height: 30, borderRadius: 15 }} />
                <View style={styles.item_right_container}>
                    <View style={styles.item_right_head}>
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Text style={[styles.fontsize14, { color: '#000' }]} numberOfLines={1}>{data.user_name}</Text>
                            <Text style={[styles.fontsize12, { color: '#000' }]}>{moment(data.created_at * 1000).format('MM-DD  HH:mm')}</Text>
                        </View>
                    </View>
                    <WhiteSpace size={'md'} />
                    <Text style={styles.fontsize16}>{data.content}</Text>
                </View>

            </View>
        )
    }

    renderListHead = (data) => {
        return (
            <View >
                {this.renderItem(data)}
                <View style={{ padding: 10, paddingTop: 5, paddingBottom: 5, borderColor: '#ccc', borderTopWidth: 0.7, borderBottomWidth: 0.7 }}>
                    <Text style={styles.fontsize14}>全部评论( {data.child_count} )</Text>
                </View>
            </View>
        )
    }



    renderListitem = ({ item, index }) => {
        return (
            this.renderItem(item, item)
        )
    }

    render() {
        const data = this.props.navigation.state.params.data;
        const { childrenAnswer } = this.props;
        // log(childrenAnswer)
        return (
            <View style={styles.container}>
                <NavigationBar {...this.props} />
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    data={childrenAnswer.data}
                    renderItem={this.renderListitem}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }} />}
                    ListHeaderComponent={() => this.renderListHead(data)}
                    ListFooterComponent={childrenAnswer.data.length > 0 && !childrenAnswer.next ? < View style={styles.list_foot}><Text style={styles.fontsize12}>没有更多评论了~~~</Text></View> : null}
                    ListEmptyComponent={childrenAnswer.status == 'success' ? <Empty /> : <View style={{ marginTop: 50 }}>< Loading status={'doing'} /></View>}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => {
                        if (childrenAnswer.next) {
                            this.props.dispatch(getMoreChildrenAnswerList(childrenAnswer.next))
                        }
                    }}
                />
                <ModalBox style={[styles.modal]} position={"bottom"} isOpen={true} swipeToClose={false} backdropPressToClose={false} backdrop={false} swipeArea={50}>
                    <View style={{ flex: 1, height: 40, marginLeft: 10 }}>
                        <TextInput
                            ref={(input) => this.input = input}
                            style={styles.input}
                            placeholder={'期待你的评论~~'}
                            value={this.state.comment}
                            underlineColorAndroid="transparent"
                            multiline={true}
                            onChangeText={(value) => this.setState({ comment: value })}
                        />
                    </View>
                    <WingBlank size={'md'}>
                        <MyBtn style={styles.sendBotton}
                            onPress={this.submitComment}
                        >
                            <Text style={[styles.fontsize10, { color: '#fff' }]}>发送</Text>
                        </MyBtn>
                    </WingBlank>

                </ModalBox>
            </View >
        )
    }
}


function mapStateToProps(state) {
    return {
        childrenAnswer: state.childrenAnswerReducer,
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(ChildrenAnswerView);


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
    fontsize16: {
        fontSize: 16 * fontSizeScaler,
    },
    item_container: {
        flexDirection: 'row', padding: 15,
    },
    item_right_container: {
        marginLeft: 10, flex: 1,
    },
    item_right_head: {
        flexDirection: 'row', justifyContent: 'space-between',
    },
    modal: {
        flexDirection: 'row', alignItems: 'center', maxHeight: 50, backgroundColor: '#fff'
    },
    sendBotton: {
        padding: 5, paddingLeft: 15, paddingRight: 15, backgroundColor: styleColor, borderRadius: 5
    },
    input: {
        padding: 0, paddingLeft: 5, paddingRight: 5, flex: 1, height: 40, borderRadius: 5, fontSize: 12 * fontSizeScaler, backgroundColor: '#eee'
    },
    list_foot: {
        paddingTop: 10, paddingBottom: 60, alignItems: 'center', borderColor: '#ccc', borderTopWidth: 0.5
    }
})
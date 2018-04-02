import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Modal,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, Grid } from 'antd-mobile';
import { ScreenWidth, fontSizeScaler, styleColor, log, ChangeNum } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import NavigationBar from '../../components/navigationBar';
import { getAnswerList, getMoreAnswerList } from '../../actions/answerAction';
import moment from 'moment';
import momentLocale from 'moment/locale/zh-cn';
import MyImage from '../../components/setSizeImage';
import ImageViewer from 'react-native-image-zoom-viewer';
import ModalBox from 'react-native-modalbox';
import { Toast } from 'teaset';
import Util from "../../constants/util";
import * as Urls from "../../constants/urls";
import Loading from '../../components/loading';
moment.updateLocale('zh-cn', momentLocale);
const persons = [1, 2, 3, 4];



class QAView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            index: 0,
            comment: '',
            thumbUp: {},
        }
    }




    componentDidMount() {
        const { dispatch, navigation } = this.props;
        const id = navigation.state.params.data.id;
        dispatch(getAnswerList(id))
    }

    componentWillUnmount() {
        const { dispatch, } = this.props;
        dispatch({ type: 'ANSWERlIST_INIT' })
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
            Util.post(Urls.ANSWER_URL + `/${id}`, { content: comment },
                (res) => {
                    if (res.status == 'success') {
                        this.input.blur();
                        this.setState({ comment: '' })
                        dispatch(getAnswerList(id))
                        dispatch({ type: 'QUESTIONlIST_LOAD' })
                    } else {
                        Toast.message(res.message)
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

    thumbUp = (id, index) => {
        const { dispatch, navigation, userInfo } = this.props;
        if (!userInfo.token) {
            navigation.navigate('Login');
            return
        }
        Util.get(Urls.ANSWER_THUMBUP_URL + `/${id}`,
            (res) => {
                log(res)
                if (res.status == 'success') {
                    this.setState({
                        thumbUp: {
                            ...this.state.thumbUp,
                            [index]: true,
                        }
                    })
                    dispatch({ type: 'ANSWERlIST_THUMBUP_SUCCESS', key: index })
                } else {
                    Toast.message(res.message)
                }
            },
            (error) => {
                console.log(error.message)
            }
        )

    }



    renderListHead = () => {
        const { data } = this.props.navigation.state.params;
        const contentStage = data.content.split('\r\n');
        const { tag_list } = this.props;
        let this_tag = '';
        tag_list.map((item) => {
            if (item.key == data.question_type) {
                this_tag = item.title
            }
        })
        function renderConten() {
            return contentStage.map((item, index) => {
                if (index == 0) {
                    return (
                        <Text style={styles.q_q} key={index}>问 : <Text style={styles.q_q_content}>{item}</Text></Text>
                    )
                } else {
                    return (
                        <View key={index}>
                            <Text style={styles.q_q_content}>{item}</Text>
                            <WhiteSpace size={'md'} />
                        </View>
                    )
                }
            })
        }
        return (
            <View>
                <View style={styles.q_container}>
                    <View style={styles.q}>
                        {renderConten()}
                    </View>
                    <WhiteSpace size={'sm'} />
                    {this.renderQuestionImage()}
                    <WhiteSpace size={'sm'} />
                    <View style={styles.q_mid}>
                        <Text style={[styles.fontsize12, { color: '#ccc' }]}>{moment(data.created_at * 1000).fromNow()}</Text>
                        <Text style={[styles.fontsize12, { color: '#ccc' }]}>{ChangeNum(data.answer_count)}人回答</Text>
                    </View>
                    <WhiteSpace size={'sm'} />
                    <View style={styles.q_foot}>
                        <View style={styles.q_foot_item_container}>
                            <Icon name={'tag'} size={15} color={'#ccc'} />
                            <WingBlank size={'sm'} >
                                <Text style={styles.fontsize12}>{this_tag}</Text>
                            </WingBlank>
                        </View>
                    </View>
                </View>
                <View style={styles.cut_off}></View>
                <View style={styles.package_container}>
                    <View style={styles.package_left}>
                        <Image source={require('../../constants/images/hongbao.png')} style={styles.package_left_img} />
                    </View>
                    <View style={styles.package_right}>
                        <View style={styles.package_right_top}>
                            <Text style={[styles.fontsize14, { color: '#FF7500' }]}>南 無 阿 彌 陀 佛</Text>
                        </View>
                        <View style={styles.package_right_bottom}>
                            {persons.map((item, index) => {
                                if (index >= 8) return null;
                                return (
                                    <MyBtn
                                        key={index}
                                        onPress={() => alert('我是领取红包')}
                                    >
                                        <Image
                                            source={{ uri: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike72%2C5%2C5%2C72%2C24/sign=fcf9449040166d222c7a1dc6274a6292/ca1349540923dd54ff4c6433d209b3de9c8248aa.jpg' }} style={styles.package_right_bottom_img} />
                                    </MyBtn>
                                )
                            })}
                        </View>
                    </View>
                </View>
                <View style={styles.cut_off}></View>
            </View>
        )
    }


    imageOnclick(index) {
        this.setState({
            visible: true,
            index: index
        })
    }


    renderQuestionImage = () => {
        const data = this.props.navigation.state.params.data;
        if (data.is_images) {
            this.images = data.images_path.map((item, index) => {
                return { url: item }
            })
            switch (data.images_thumb_path.length) {
                case 1:
                    return (
                        <MyBtn onPress={() => {
                            this.imageOnclick(0)
                        }}>
                            <MyImage uri={data.images_thumb_path[0]} longestLength={ScreenWidth - 30} />
                        </MyBtn>
                    )
                    break;
                case 4:
                    return (
                        <View style={{ width: (ScreenWidth - 30) / 3 * 2 }}>
                            < Grid data={data.images_thumb_path} columnNum={2} hasLine={false} itemStyle={[styles.Grid_item_container]}
                                onClick={(item, index) => this.imageOnclick(index)}
                                renderItem={(item) => {
                                    return (
                                        <Image source={{ uri: item }} style={styles.Grid_img} />
                                    )
                                }}
                            />
                        </View>

                    )
                    break;
                default:
                    return (
                        < Grid data={data.images_thumb_path} columnNum={3} hasLine={false} itemStyle={styles.Grid_item_container}
                            onClick={(item, index) => this.imageOnclick(index)}
                            renderItem={(item) => {
                                return (
                                    <Image source={{ uri: item }} style={styles.Grid_img} />
                                )
                            }}
                        />
                    )
            }
        } else {
            return null
        }


    }


    renderItem = ({ item, index }) => {
        const { publisher_id, is_back,  } = this.props.navigation.state.params.data;
        return (
            <View style={styles.item_container}>
                <Image source={item.user_avatar ? { uri: item.user_avatar } : require('../../constants/images/默认头像.png')} style={styles.item_img} />
                <View style={styles.item_content_container}>
                    <View style={styles.row_columncenter}>
                        <Text style={[styles.fontsize14, { color: '#000' }]}>{item.user_name}</Text>
                        {is_back == 0 && publisher_id == item.user_id ?
                            <WingBlank size={'md'}>
                                <View style={styles.item_user_tag_container}>
                                    <Text style={[styles.fontsize10, { color: '#fff' }]}>题主</Text>
                                </View>
                            </WingBlank>
                            : null}
                    </View>
                    <WhiteSpace size={'md'} />
                    <Text style={[styles.fontsize12]}>{item.content}</Text>
                    <WhiteSpace size={'md'} />
                    <View style={styles.item_content_foot}>
                        <Text style={[styles.fontsize12, { color: '#ccc' }]}>{moment(item.created_at * 1000).fromNow()}</Text>
                        <View style={styles.row_columncenter}>
                            <MyBtn style={styles.row_columncenter}
                                onPress={() => {
                                    this.props.navigation.navigate('ChildrenAnswer', { data: item })
                                }}
                            >
                                <Text style={[styles.fontsize12, { color: '#ccc' }]}>{item.child_count}</Text>
                                <WingBlank size={'md'}>
                                    <Icon name={'comment'} size={15} color={'#ccc'} />
                                </WingBlank>
                            </MyBtn>
                            <WingBlank size={'lg'}>
                                <MyBtn style={styles.row_columncenter}
                                    onPress={()=>this.thumbUp(item.id,index)}
                                >
                                    <Text style={[styles.fontsize12, { color: '#ccc' }]}>{item.up_count}</Text>
                                    <WingBlank size={'md'}>
                                        <Icon name={'thumbs-up'} size={15} color={this.state.thumbUp[index] ? 'red' : '#ccc'} />
                                    </WingBlank>
                                </MyBtn>
                            </WingBlank>
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    renderEmpty = () => {
        return (
            <View style={styles.WhitePage_container}>
                <Image source={require('../../constants/images/空白.png')} style={styles.WhitePage_img} />
                <WhiteSpace size={'lg'} />
                <Text>还没有回答哦~~~</Text>
            </View>
        )
    }

    render() {
        const { answerReducer, tag_list } = this.props;
        const { data } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <NavigationBar {...this.props} title={`${data.publisher}的提问`} rbtn={<Icon2 name={'md-aperture'} size={25} color={'#fff'} />} rbtnOnPress={() => alert('我是分享')} />
                <View style={styles.top_container}>
                    <View style={styles.row_columncenter}>
                        <View style={styles.image_container}>
                            <Image source={data.publisher_avatar ? { uri: data.publisher_avatar } : require('../../constants/images/默认头像.png')} style={styles.top_img} />
                        </View>
                        <WingBlank size={'sm'}>
                            <Text style={styles.fontsize12}>{data.publisher}</Text>
                        </WingBlank>
                    </View>
                </View>
                <FlatList
                    style={{ backgroundColor: '#fff' }}
                    refreshing={true}
                    ListEmptyComponent={answerReducer.status == 'success' ? this.renderEmpty : <View style={{ marginTop: 30 }}>< Loading status={'doing'} /></View>}
                    data={answerReducer.data}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={this.renderListHead}
                    ListFooterComponent={answerReducer.data.length > 0 && !answerReducer.next ? <View style={styles.list_foot}><Text style={styles.fontsize12}>没有更多评论了</Text></View> : null}
                    ItemSeparatorComponent={() => <WhiteSpace size={'sm'} style={{ backgroundColor: '#eee' }} />}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.3}
                    onEndReached={() => {
                        if (answerReducer.next) {
                            this.props.dispatch(getMoreAnswerList(answerReducer.next))
                        }
                    }}
                />
                <Modal visible={this.state.visible} transparent={true} onRequestClose={() => { }}>
                    <ImageViewer
                        imageUrls={this.images}
                        index={this.state.index}
                        onSwipeDown={() => this.setState({ visible: false })}
                        onClick={() => this.setState({ visible: false })}
                    />
                </Modal>
                <ModalBox style={[styles.modal]} position={"bottom"} isOpen={true} swipeToClose={false} backdropPressToClose={false} backdrop={false} swipeArea={50}>
                    <View style={{ flex: 1, height: 40, marginLeft: 10 }}>
                        <TextInput
                            ref={(input) => this.input = input}
                            style={styles.input}
                            placeholder={'我也要回答'}
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
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {
        answerReducer: state.answerReducer,
        tag_list: state.initReducer.tag_list,
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(QAView);



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
    q_container: {
        padding: 10, paddingLeft: 15, paddingRight: 15, backgroundColor: '#fff'
    },
    q_q: {
        color: styleColor, fontSize: 16 * fontSizeScaler,
    },
    q_q_content: {
        color: '#737375', fontSize: 14 * fontSizeScaler,
    },
    q_mid: {
        flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 0.5, borderColor: '#ccc'
    },
    q_foot: {
        flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap'
    },
    q_foot_item_container: {
        flexDirection: 'row', alignItems: 'center', marginRight: 10
    },
    package_container: {
        backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center'
    },
    package_left: {
        height: ScreenWidth * 0.25, width: ScreenWidth * 0.25, backgroundColor: '#FF7500', justifyContent: 'center', alignItems: 'center',
    },
    package_left_img: {
        width: 40, height: 60
    },
    package_right: {
        flex: 1, height: ScreenWidth * 0.25, paddingLeft: 10, paddingRight: 10
    },
    package_right_top: {
        flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderColor: '#ccc'
    },
    package_right_bottom: {
        flex: 1, flexDirection: 'row', alignItems: 'center',
    },
    package_right_bottom_img: {
        width: (ScreenWidth - 140) / 8, height: (ScreenWidth - 140) / 8, marginRight: 5, borderRadius: (ScreenWidth - 140) / 8 / 2
    },
    item_container: {
        backgroundColor: '#fff', padding: 10, flexDirection: 'row',
    },
    item_img: {
        width: 30, height: 30, borderRadius: 15
    },
    item_user_tag_container: {
        padding: 1, paddingLeft: 10, paddingRight: 10, backgroundColor: '#0099CC', borderRadius: 8
    },
    item_content_container: {
        flex: 1, marginLeft: 10, marginRight: 5
    },
    item_content_foot: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    list_foot: {
        alignItems: 'center', paddingBottom: 10,
    },
    cut_off: {
        height: 6, backgroundColor: '#EFEFF4'
    },
    WhitePage_container: {
        paddingTop: 50, paddingBottom: 50, alignItems: 'center',
    },
    WhitePage_img: {
        height: 80, width: 80
    },
    Grid_item_container: {
        width: (ScreenWidth - 30) / 3, height: (ScreenWidth - 30) / 3, justifyContent: 'center', alignItems: 'center'
    },
    Grid_img: {
        width: (ScreenWidth - 42) / 3, height: (ScreenWidth - 42) / 3,
    },
    top_container: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, paddingTop: 10, paddingBottom: 10, backgroundColor: '#fff', borderBottomWidth: 0.7, borderBottomColor: '#ccc'
    },
    image_container: {
        padding: 1, borderRadius: 13, backgroundColor: '#000'
    },
    top_img: {
        width: 25, height: 25, borderRadius: 12.5
    },

    modal: {
        flexDirection: 'row', alignItems: 'center', maxHeight: 50, backgroundColor: '#eee'
    },
    sendBotton: {
        padding: 5, paddingLeft: 15, paddingRight: 15, backgroundColor: styleColor, borderRadius: 5
    },
    input: {
        padding: 0, paddingLeft: 5, paddingRight: 5, flex: 1, height: 40, borderRadius: 5, fontSize: 12 * fontSizeScaler, backgroundColor: '#fff'
    },
    list_foot: {
        paddingTop: 10, paddingBottom: 60, alignItems: 'center', borderColor: '#ccc', borderTopWidth: 0.5
    }
})
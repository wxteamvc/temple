import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    TextInput,
    CameraRoll,
    FlatList,
    Modal,
    ProgressBarAndroid
} from 'react-native';
import { connect } from 'react-redux';
import MyBtn from '../../components/button';
import { WhiteSpace, WingBlank, Carousel, List, TextareaItem, ActionSheet } from 'antd-mobile';
import { ScreenWidth, fontSizeScaler, styleColor, log } from '../../constants/global'
import { ListRow } from 'teaset';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import NavigationBar from '../../components/navigationBar';
import Loading from '../../components/loading';
import ModalBox from 'react-native-modalbox';
import MyList from '../../components/myList';
import { Toast } from 'teaset';
import Util from "../../constants/util";
import * as Urls from "../../constants/urls";




const tabs = [
    { lable: '祈福', value: 1 },
    { lable: '忏悔', value: 2 },
    { lable: '工作', value: 3 },
    { lable: '家庭', value: 4 },
    { lable: '某某', value: 5 },
]



 class CreatQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            is_agree: true,
            show_modal: false,
            after: '',
            localImage: [],
            selected: new Map(),
            has_more_image: true,
            types: 1,
            form: {
                content: '',
                images: [],
                is_images: 0,
                is_anonymous: 0,
                is_redpacket: false
            }
        }
    }


    submit = () => {
        const { is_agree, form, types } = this.state;
        // log(form)
        const data = Object.assign({}, form);
        if (!is_agree) {
            Toast.message('同意社区守则才可提问哦~~~')
            return
        }

        this.setState({ loading: true })
        if (form.images.length > 0) {
            data.is_images = 1;
            const new_images = [];
            data.images.map((item) => {
                new_images.push({ uri: item, type: 'multipart/form-data', name: 'xx.jpg' })
            })
            data.images = new_images;

        }
        Util.post(Urls.CREATE_QUESTION_URL + `/${types}`, data,
            (respJson) => {
                Toast.message(respJson.message);
                this.setState({ loading: false });
                log(respJson)
                if (respJson.status == 'success') {
                    this.props.dispatch({ type: 'ANSWERlIST_LOAD' })
                    this.props.navigation.goBack();
                }
            },
            (error) => {
                log(error.message)
                Toast.message(error.message);
                this.setState({ loading: false });
            }
        )


    }

    chooseImage = () => {
        if (!this.state.has_more_image) return null;
        const fetchParams = {
            first: 30,
            after: this.state.after,
            assetType: 'Photos'
        }
        const promise = CameraRoll.getPhotos(fetchParams)
        promise.then((data) => {

            const images = data.edges.map((item, index) => {
                return {
                    uri: item.node.image.uri
                }
            })
            if (data.page_info.has_next_page) {
                this.setState({
                    localImage: this.state.localImage.concat(images),
                    after: data.page_info.end_cursor,
                    show_modal: true
                })
            } else {
                this.setState({
                    localImage: this.state.localImage.concat(images),
                    show_modal: true,
                    has_more_image: false,
                })
            }

        })

    }


    selected = (images, selected) => {
        this.setState({
            form: {
                ...this.state.form,
                images
            },
            show_modal: false,
            selected
        })
    }


    renderTags() {
        const { types } = this.state;
        return (
            tabs.map((item, index) => {
                return (
                    <MyBtn key={index} style={[styles.tag_item_container, { borderColor: types == item.value ? '#06C1AE' : '#ccc', backgroundColor: types == item.value ? '#06C1AE' : '#fff' }]}
                        onPress={() => this.setState({
                            types: item.value
                        })}
                    >
                        <Text style={[styles.fontsize12, { color: types == item.value ? '#fff' : '#878789' }]} numberOfLines={1}>{item.lable}</Text>
                    </MyBtn>
                )
            })
        )

    }


    render() {
        // log(this.state.form.images)
        return (
            <View style={styles.container}>
                <NavigationBar {...this.props} title={'问答'} rbtn={'提交'} rbtnOnPress={this.submit} />
                <ScrollView>
                    <WhiteSpace size={'md'} />
                    <View>
                        <TextareaItem
                            style={{ paddingBottom: 50 }}
                            rows={6}
                            count={1000}
                            onChange={(val) => this.setState({
                                form: {
                                    ...this.state.form,
                                    content: val
                                }
                            })}
                        />
                        <MyBtn style={styles.iconContainer}
                            onPress={this.chooseImage}
                        >
                            <Icon name={'camera'} size={20} color={'#06C1AE'} />
                        </MyBtn>
                    </View>
                    <WhiteSpace size={'md'} />
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.tags_container}>
                        {this.renderTags()}
                    </ScrollView>
                    <WhiteSpace size={'lg'} />
                    <MyBtn
                        style={styles.anonymous_container}
                        onPress={() => this.setState({
                            form: {
                                ...this.state.form,
                                is_anonymous: this.state.form.is_anonymous == 0 ? 1 : 0
                            }

                        })}
                    >
                        <View style={styles.row_columncenter}>
                            <WingBlank size={'md'}><Icon name={this.state.form.is_anonymous == 1 ? 'check-square' : 'square'} color={this.state.form.is_anonymous == 1 ? '#06C1AE' : '#ccc'} size={20} /></WingBlank>
                            <Text style={styles.fontsize14}>匿名提问</Text>
                        </View>
                    </MyBtn>
                    < WhiteSpace size={'lg'} />
                    <View style={{ minHeight: 200 }}>
                        <FlatList
                            style={{ paddingLeft: 2, paddingRight: 2 }}
                            data={this.state.form.images}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={{ uri: item }} style={{ height: (ScreenWidth - 16) / 3, width: (ScreenWidth - 16) / 3, margin: 2 }} />
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                        />

                    </View>
                    < WhiteSpace size={'lg'} />
                    <View style={styles.center}>
                        <MyBtn
                            style={styles.row_columncenter}
                            onPress={() => this.setState({ is_agree: !this.state.is_agree })}
                        >
                            <WingBlank size={'md'}><Icon name={this.state.is_agree ? 'check-square' : 'square'} color={this.state.is_agree ? '#06C1AE' : '#ccc'} size={20} /></WingBlank>
                            <Text>遵守社区守则,文明提问</Text>
                        </MyBtn>
                    </View>
                    < WhiteSpace size={'lg'} />
                </ScrollView>
                <Modal style={{ flex: 1 }} visible={this.state.show_modal} onRequestClose={() => { }}>
                    <MyList data={this.state.localImage} onEnd={this.chooseImage} done={this.selected} onBack={() => this.setState({ show_modal: false })} selected={this.state.selected} />
                </Modal>
                <Modal
                    visible={this.state.loading}
                    transparent
                    animationType={'none'}
                    maskClosable={false}
                    onRequestClose={() => { }}

                >
                    <View style={[styles.flex_center, { flex: 1 }]}>
                        <View style={[styles.flex_center, { height: 100, width: 100, borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)' }]}>
                            <ProgressBarAndroid styleAttr="Inverse" color={'#fff'} />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default connect()(CreatQuestion);



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    row_columncenter: {
        flexDirection: 'row', alignItems: 'center',
    },
    center: {
        justifyContent: 'center', alignItems: 'center'
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
    flex_center: {
        justifyContent: 'center', alignItems: 'center',
    },
    iconContainer: {
        justifyContent: 'center', alignItems: 'center', width: 35, height: 35, borderRadius: 17.5, borderWidth: 1, borderColor: '#06C1AE', position: 'absolute', bottom: 5, left: 10
    },
    tags_container: {
        padding: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: '#fff'
    },
    tag_item_container: {
        marginLeft: 5, marginRight: 5, width: 70, justifyContent: 'center', alignItems: 'center', borderRadius: 15, borderWidth: 0.7, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 3,
    },
    anonymous_container: {
        flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 20
    },
    modal_container: {
        backgroundColor: '#fff', height: 50, flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10
    },
    modal_left: {
        flex: 0.25, flexDirection: 'row', alignItems: 'center',
    },
    modal_mid: {
        flex: 0.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    },
    modal_right: {
        flex: 0.25, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
    },
    modal_title: {
        fontSize: 16 * fontSizeScaler, fontWeight: 'bold'
    },
})
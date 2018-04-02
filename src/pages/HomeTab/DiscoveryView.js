
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
import { logout } from '../../actions/personalAction'



class Discovery extends Component {
    render() {
        const { userInfo, navigation, dispatch } = this.props;
        return (
            <View style={styles.container}>
                <Text>{userInfo.token}</Text>
                <WhiteSpace size='lg' />
                <MyBtn
                    style={{ padding: 5, paddingLeft: 20, paddingRight: 20, backgroundColor: styleColor, borderRadius: 5 }}
                    onPress={() => {
                        dispatch(logout())
                        // dispatch({
                        //     type: 'LOGOUT_SUCCESS',
                        // })
                     }}
                >
                    <Text style={{ color: '#fff' }}>点我清除本地存储</Text>
                </MyBtn>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo: state.personalReducer,
    }
}
export default connect(mapStateToProps)(Discovery);

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },

})
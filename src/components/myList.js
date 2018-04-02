import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
} from 'react-native';
import MyBtn from './button';
import { ScreenWidth, fontSizeScaler, styleColor, log } from '../constants/global'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Toast } from 'teaset';


class MyListItem extends React.PureComponent {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const { selected, uri } = this.props
        return (
            <MyBtn
                onPress={this._onPress}
                style={{ flex: 1 / 3, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri }} style={{ height: (ScreenWidth - 16) / 3, width: (ScreenWidth - 16) / 3, margin: 2 }} />
                <View style={{ position: 'absolute', top: 5, right: 7 }}>
                    {selected ? <Icon name={'check-circle'} color={'#0099CC'} size={25} /> : <Icon name={'circle'} size={25} color={'rgba(255,255,255,0.5)'}/>}
                </View>
            </MyBtn>
        )
    }
}

export default class MyList extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            local_image: this.props.data,
            selected: this.props.selected,
        }
    }

    _onPressItem = (index) => {
        const selected = new Map(this.state.selected);
        if (selected.has(index)) {
            this.setState((state) => {
                selected.delete(index);
                return { selected };
            })
        } else {
            if (this.state.selected.size >= 9) return false
            this.setState((state) => {
                selected.set(index, true);
                return { selected };
            })
        }
    };

    _renderItem = ({ item, index }) => (
        <MyListItem
            onPressItem={() => this._onPressItem(index)}
            selected={!!this.state.selected.get(index)}
            uri={item.uri}
        />
    );


    selectedEnd = () => {
        const images = [];
        this.state.selected.forEach((item, key) => {
            images.push(this.props.data[key].uri)
        })
        this.props.done(images, this.state.selected)
    }


    render() {
        // log(this.state.selected)
        return (
            <View>
                <View style={[styles.modal_container]}>
                    <MyBtn
                        style={styles.modal_left}
                        onPress={() => {
                            this.props.onBack()
                        }}
                    >
                        <Icon name='chevron-left' size={20} />
                    </MyBtn>
                    <View style={styles.modal_mid}>
                        <Text style={styles.modal_title}>请选择图片</Text>
                    </View>
                    <MyBtn style={styles.modal_right}
                        onPress={this.selectedEnd}
                    >
                        <View style={styles.modal_r_btn}>
                            <Text style={[styles.fontsize14,{color:'#fff'}]}>已选择{this.state.selected.size}/9</Text>
                        </View>
                    </MyBtn>
                </View >
                <FlatList
                    style={{ paddingLeft: 2, paddingRight: 2 }}
                    data={this.props.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    onEndReached={() => {
                        this.props.onEnd()
                    }
                    }
                    onEndReachedThreshold={0.2}
                    extraData={this.props.extra}
                />
            </View >

        );
    }
}


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
    modal_r_btn: {
        padding: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: styleColor, borderRadius: 5
    },
    modal_title: {
        fontSize: 16 * fontSizeScaler, fontWeight: 'bold'
    },
})
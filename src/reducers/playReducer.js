import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    resources_list: [],   //资源列表
    path: 'http://192.168.1.186/storage/files/b9c4b028b02f99b75f4f4d4661da8ef1.mp3',  //当前播放的资源
    cover_image: '',
    title: '',
    pause: true,   //true 为暂停 ,false 为播放
    showBtn: false,   // 控制悬浮按钮是否显示
    play_progress: 0,  //音频进度
    playtime_seconds: 259.344, //音频长度
    change_progress: false,   //进度条状态
    seek_time: 0
}

export function playReducer(state = initialState, action) {
    switch (action.type) {
        case 'set_and_play':
            return {
                ...state,
                resources: action.data,
                is_play: true
            }
        case 'change_pause':
            return {
                ...state,
                pause: !state.pause
            }
        case 'show_btn':
            return {
                ...state,
                showBtn: true
            }
        case 'hide_btn':
            return {
                ...state,
                showBtn: false
            }
        case 'play':
            return {
                ...state,
                play_progress: action.data
            }
        case 'change_slider_begin':
            return {
                ...state,
                change_progress: 'begin',
            }
        case 'change_slider_end':
            return {
                ...state,
                play_progress: action.data,
                change_progress: 'done',

            }
        case 'change_progress_done':
            return {
                ...state,
                change_progress: false,
            }




        default:
            return state;
    }
}
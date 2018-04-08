import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    resources_list: [],   //资源列表
    random_list: [],       //随机播放列表
    current_index: 0,   //当前播放的内容序号
    play: {
        path: '',  //当前播放的资源
        cover_image: '',
        title: '',
        playtime_seconds: 0, //音频长度
    },
    pause: true,   //true 为暂停 ,false 为播放
    showBtn: false,   // 控制悬浮按钮是否显示
    play_progress: 0,  //音频进度
    is_slider: false,   //是否开始拖动进度条
    seek_time: 0,
    play_type: 'order',   //播放模式 (顺序播放 随机播放 单曲循环等等)
    is_repeat: false     //是否单曲循环
}

function createArray(length) {  //创建一个资源数组长度的数组
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = i;
    }
    return arr
}

function shuffle(arr) {      //打乱数组
    for (let i = arr.length - 1; i >= 0; i--) {
        const random = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
    return arr;
};


export function playReducer(state = initialState, action) {
    switch (action.type) {
        case 'set_and_play':
            return {
                ...state,
                resources_list: action.list,
                play: Object.assign({}, state.play, action.data),
                random_list: createArray(action.list.length),
                current_index: action.index,
                pause: false
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
        case 'change_slider_start':
            return {
                ...state,
                is_slider: true,
                play_progress: action.data,
            }
        case 'change_slider_doing':
            return {
                ...state,
                play_progress: action.data
            }
        case 'change_slider_end':
            return {
                ...state,
                play_progress: action.data,
                seek_time: action.data,
            }
        case 'change_progress_done':
            return {
                ...state,
                is_slider: false,
            }
        case 'change_play_type':
            switch (action.data) {
                case 'loop':
                    return {
                        ...state,
                        play_type: action.data,
                        is_repeat: true
                    }
                    break;
                case 'random':
                    return {
                        ...state,
                        play_type: action.data,
                        is_repeat: false,
                        random_list: shuffle(createArray(state.resources_list.length)),
                    }
                    break;
                default:
                    return {
                        ...state,
                        play_type: action.data,
                        is_repeat: false,
                        random_list: createArray(state.resources_list.length)
                    }
                    break;
            }
        case 'change_sound':
            let list_length = state.resources_list.length;
            let index = state.random_list.indexOf(state.current_index);
            if (action.data == 'next') {
                ++index
            } else {
                --index
            }
            if (index >= list_length) {
                index = 0;
            } else if (index < 0) {
                index = list_length - 1
            }
            return {
                ...state,
                current_index: state.random_list[index],
                play: Object.assign({}, state.play, state.resources_list[state.random_list[index]]),
            }
        case 'player_init':
            return initialState
        default:
            return state;
    }
}
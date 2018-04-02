import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    isLoading: false,
    isUpdate: false,
    info: null,
    token: null,
    notice: [],
    sendCode: {
        cd_cycle: 0,  //可再次发送验证码时间间隔
        cd_timeStamp: 0,  //可再次发送验证码时间戳
    }
}

export function personalReducer(state = initialState, action) {
    switch (action.type) {
        case Types.REGISTER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Types.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.data,
                isUpdate:true
            }
        case Types.REGISTER_FAILED:
            return {
                ...state,
                isLoading: false
            }
        case Types.LOGIN_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Types.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                token: action.data,
                isUpdate:true
            }
        case Types.LOGIN_FAILED:
            return {
                ...state,
                isLoading: false,
                token: null
            }
        case Types.USERINFO_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case Types.USERINFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                info: action.data,
                isUpdate:false
            }
        case Types.USERINFO_FAILED:
            return {
                ...state,
                isLoading: false,
                isUpdate:false
            }
            case Types.USERINFO_UPDATE:
            return {
                ...state,
                isUpdate:true
            }
        case Types.SET_SENDCORD_CD:
            return {
                ...state,
                sendCode: {
                    cd_cycle: action.data,
                    cd_timeStamp: parseInt(moment().format('X')) + action.data
                }
            }
        case Types.INIT_SENDCORD_CD:
            return {
                ...state,
                sendCode: {
                    cd_cycle: 0,
                    cd_timeStamp: 0
                }
            }
        case Types.RESET_SENDCORD_CD:
            return {
                ...state,
                sendCode: {
                    ...state.sendCode,
                    cd_cycle: action.data,
                }
            }
        case Types.CHANGE_SENDCORD_CD:
            return {
                ...state,
                sendCode: {
                    ...state.sendCode,
                    cd_cycle: state.sendCode.cd_cycle - 1,
                }
            }

        case Types.LOGOUT_SUCCESS:
            return initialState
        default:
            return state;
    }
}
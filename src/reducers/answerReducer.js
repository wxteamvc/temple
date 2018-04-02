import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    status: '',
    data: [],
    next: '',
}

export function answerReducer(state = initialState, action) {
    switch (action.type) {
        case Types.ANSWERlIST_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.ANSWERlIST_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.data.data,
                next: action.data.links.next
            }
        case Types.ANSWERlIST_FAILED:
            return {
                ...state,
                status: 'fail',
            }
        case Types.MORE_ANSWERlIST_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: state.data.concat(action.data.data),
                next: action.data.links.next
            }
        case Types.ANSWERlIST_THUMBUP_SUCCESS:
            return {
                ...state,
                data: state.data.map((item, index) => {
                    if (index == action.key) {
                        return Object.assign({}, item, { up_count: item.up_count + 1 })
                    } else {
                        return item
                    }
                })
            }
        case Types.ANSWERlIST_INIT:
            return initialState
        default:
            return state;
    }
}
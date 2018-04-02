import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    status: '',
    data: [],
    next: '',
}

export function childrenAnswerReducer(state = initialState, action) {
    switch (action.type) {
        case Types.CHILDREN_ANSWERlIST_BEGIN:
            return {
                ...state,
                status: 'doing',
            }
        case Types.CHILDREN_ANSWERlIST_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.data.data,
                next: action.data.links.next
            }
        case Types.CHILDREN_ANSWERlIST_FAILED:
            return {
                ...state,
                status: 'fail',
            }
        case Types.MORE_CHILDREN_ANSWERlIST_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: state.data.concat(action.data.data),
                next: action.data.links.next
            }
        case Types.CHILDREN_ANSWERlIST_INIT:
            return initialState
        default:
            return state;
    }
}
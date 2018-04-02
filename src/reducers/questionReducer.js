import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';
import moment from 'moment';

const initialState = {
    data: {},
    index: 'new',
    is_load: false
}

export function questionListReducer(state = initialState, action) {
    switch (action.type) {
        case Types.QUESTIONlIST_BEGIN:
            return {
                ...state,
                is_load: false,
                data: {
                    ...state.data,
                    index: action.key,
                    [action.key]: {
                        status: 'doing'
                    },

                }
            }
        case Types.QUESTIONlIST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.key]: {
                        status: 'success',
                        data: action.data.data,
                        next: action.data.links.next
                    }
                }
            }
        case Types.MORE_QUESTIONlIST_SUCCESS:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.key]: {
                        status: 'success',
                        data: state.data[action.key].data.concat(action.data.data),
                        next: action.data.links.next
                    }
                }
            }
        case Types.QUESTIONlIST_FAILED:
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.key]: {
                        status: 'fail',
                    }
                }
            }
        case Types.QUESTIONlIST_LOAD:
            return {
                ...state,
                is_load: true
            }

        default:
            return state;
    }
}
import * as Types from "../actions/actionTypes";
import { DeviceEventEmitter } from 'react-native';


const initialState = {
    question_types: [],
    tag_list: [],

}

export function initReducer(state = initialState, action) {

    switch (action.type) {
        case Types.INITQUESTIONTYPES_SUCCESS:
            return {
                ...state,
                question_types: action.data.questionTypes,
                tag_list: action.data.tagList
            }

        default:
            return state;
    }


}
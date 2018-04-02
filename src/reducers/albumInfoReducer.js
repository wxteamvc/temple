import * as Types from "../actions/actionTypes";

const initialState = {
    status: '',
    data: null
}


export function albumInfo(state = initialState, action) {
    switch (action.type) {
        case Types.ALBUMINFO_BEGIN:
            return {
                ...state,
                status: 'doing'
            }
        case Types.ALBUMINFO_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.data
            }
        case Types.ALBUMINFO_FAILED:
            return {
                ...state,
                status: 'fail'
            }
        case Types.ALBUMINFO_INIT:
            return initialState
        default:
            return state;
    }
}
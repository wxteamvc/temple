import * as Types from "../actions/actionTypes";

const initialState = {
    status: '',
    data: null
}


export function recommend(state = initialState, action) {
    switch (action.type) {
        case Types.RECOMMEND_BEGIN:
            return {
                ...state,
                status: 'doing'
            }
        case Types.RECOMMEND_SUCCESS:
            return {
                ...state,
                status: 'success',
                data: action.data
            }
        case Types.RECOMMEND_FAILED:
            return {
                ...state,
                status: 'fail'
            }
        case Types.RECOMMEND_INIT:
            return initialState
        default:
            return state;
    }
}
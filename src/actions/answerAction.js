import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getAnswerList(id) {
    return (dispatch) => {
        dispatch({
            type: Types.ANSWERlIST_BEGIN,
        })
        Util.get(Urls.ANSWERlIST_URL + `/${id}`,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.ANSWERlIST_SUCCESS,
                        data: res,
                    })
                } else {
                    dispatch({
                        type: Types.ANSWERlIST_FAILED,
                    })
                    Toast.fail(res.message)
                }
            },
            (error) => {
                dispatch({
                    type: Types.ANSWERlIST_FAILED,
                })
                Toast.fail(error.message)
            }
        )
    }
}

export function getMoreAnswerList(nextUrl) {
    return (dispatch) => {
        Util.get(nextUrl,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.MORE_ANSWERlIST_SUCCESS,
                        data: res,
                    })
                }
            },
            (error) => {
                console.log(error.message)
            }
        )
    }
}

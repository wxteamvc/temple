import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getChildrenAnswerList(id) {
    return (dispatch) => {
        dispatch({
            type: Types.CHILDREN_ANSWERlIST_BEGIN,
        })
        Util.get(Urls.CHILDRENANSWERlIST_URL + `/${id}`,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.CHILDREN_ANSWERlIST_SUCCESS,
                        data: res,
                    })
                } else {
                    dispatch({
                        type: Types.CHILDREN_ANSWERlIST_FAILED,
                    })
                    Toast.fail(res.message)
                }
            },
            (error) => {
                dispatch({
                    type: Types.CHILDREN_ANSWERlIST_FAILED,
                })
                Toast.fail(error.message)
            }
        )
    }
}

export function getMoreChildrenAnswerList(nextUrl) {
    return (dispatch) => {
        Util.get(nextUrl,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.MORE_CHILDREN_ANSWERlIST_SUCCESS,
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

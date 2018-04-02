import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getQuestionList(key) {
    return (dispatch) => {
        dispatch({
            type: Types.QUESTIONlIST_BEGIN,
            key: key
        })
        Util.get(Urls.QUESTIONlIST_URL + `/${key}`,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.QUESTIONlIST_SUCCESS,
                        data: res,
                        key: key
                    })
                } else {
                    dispatch({
                        type: Types.QUESTIONlIST_FAILED,
                        key: key
                    })
                    Toast.fail(res.message)
                }
            },
            (error) => {
                dispatch({
                    type: Types.QUESTIONlIST_FAILED,
                    key: key
                })
                Toast.fail(error.message)
            }
        )
    }
}

export function getMoreQuestionList(key, nextUrl) {
    return (dispatch) => {
        Util.get(nextUrl,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.MORE_QUESTIONlIST_SUCCESS,
                        data: res,
                        key: key
                    })
                }
            },
            (error) => {
                console.log(error.message)
            }
        )
    }
}
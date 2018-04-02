import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getRecommend(type, take, id = null) {
    return (dispatch) => {
        dispatch({
            type: Types.RECOMMEND_BEGIN
        })
        Util.get(Urls.RECOMMEND_URL + `/${type}` + `${id != null ? `/${id}` : ''}` + `?take=${take}`,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.RECOMMEND_SUCCESS,
                        data: res.data,
                    })
                } else {
                    dispatch({
                        type: Types.RECOMMEND_FAILED
                    })
                    Toast.fail(res.message)
                }
            },
            (error) => {
                dispatch({
                    type: Types.RECOMMEND_FAILED
                })
                Toast.fail(error.message)
            }
        )
    }
}
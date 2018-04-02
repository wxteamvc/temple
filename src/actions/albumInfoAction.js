import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';


export function getAlbumInfo(id) {
    return (dispatch) => {
        dispatch({
            type: Types.ALBUMINFO_BEGIN
        })
        Util.get(Urls.ALBUMINFO_URL + `/${id}`,
            (res) => {
                if (res.status == 'success') {
                    dispatch({
                        type: Types.ALBUMINFO_SUCCESS,
                        data: res.data
                    })
                } else {
                    dispatch({
                        type: Types.ALBUMINFO_FAILED
                    })
                    Toast.fail(res.message)
                }
            },
            (error) => {
                Toast.fail(error.message)
            }

        )
    }
}
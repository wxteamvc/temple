import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';



export function initQuestionTypes(key) {
    return (dispatch) => {
        Util.get(Urls.GET_QUESTIONTYPES_URL,
            (res) => {
                if (res.status == 'success') {
                    const data = {};
                    const questionTypes = [];
                    for (const key in res.data) {
                        questionTypes.push(
                            { key: key, title: res.data[key] }
                        )
                    }
                    const tagList = questionTypes.filter((item) => {
                        return item.key !== 'new' && item.key !== 'redpacket'
                    })
                    data.questionTypes = questionTypes;
                    data.tagList = tagList;
                    dispatch({
                        type: Types.INITQUESTIONTYPES_SUCCESS,
                        data: data,
                    })
                }
            },
            (error) => {
                console.log(error.message)
            }
        )
    }
}
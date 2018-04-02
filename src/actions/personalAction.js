import * as Types from "./actionTypes";
import * as Urls from "../constants/urls";
import Util from "../constants/util";
import { Toast } from 'teaset';

export function login(data, type = 'mobile') {
    return (dispatch) => {
        dispatch({
            type: Types.LOGIN_BEGIN
        })
        Util.post(Urls.LOGIN_URL + `/${type}`, data,
            (respJson) => {
                if (respJson.status == 'success') {
                    dispatch({
                        type: Types.LOGIN_SUCCESS,
                        data: respJson.data.token
                    })
                } else {
                    dispatch({
                        type: Types.LOGIN_FAILED,
                    })
                    Toast.fail(respJson.message);
                }
            },
            (error) => {
                dispatch({
                    type: Types.LOGIN_FAILED,
                })
                Toast.message(error.message);
            }
        )
    }
}



export function register(data, type = 'phone') {
    return (dispatch) => {
        dispatch({
            type: Types.REGISTER_BEGIN
        })
        Util.post(Urls.REGISTER_URL + `/${type}`, data,
            (respJson) => {
                console.log(respJson)
                if (respJson.status == 'success') {
                    dispatch({
                        type: Types.REGISTER_SUCCESS,
                        data: respJson.data.token
                    })
                } else {
                    dispatch({
                        type: Types.REGISTER_FAILED,
                    })
                    Toast.fail(respJson.message);
                }
            },
            (error) => {
                dispatch({
                    type: Types.REGISTER_FAILED,
                })
                Toast.message(error.message);
            }
        )
    }
}

export function initUserInfo() {
    return (dispatch) => {
        dispatch({
            type: Types.USERINFO_BEGIN
        })
        Util.get(Urls.USERINFO_URL,
            (respJson) => {
                if (respJson.status == 'success') {
                    dispatch({
                        type: Types.USERINFO_SUCCESS,
                        data: respJson.data
                    })
                } else {
                    dispatch({
                        type: Types.USERINFO_FAILED,
                    })
                    Toast.fail(respJson.message);
                }
            },
            (error) => {
                dispatch({
                    type: Types.USERINFO_FAILED,
                })
                Toast.message(error.message);
            }
        )
    }
}

export function logout() {
    return (dispatch) => {
        Util.get(Urls.LOGOUT_URL,
            (respJson) => {
                if (respJson.status == 'success') {
                    dispatch({
                        type: Types.LOGOUT_SUCCESS,
                    })
                } else {
                    Toast.fail(respJson.message);
                }
            },
            (error) => {
                Toast.message(error.message);
            }
        )
    }
}




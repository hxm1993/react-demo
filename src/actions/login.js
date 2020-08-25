import actionTypes from "./actionTypes"
import { login, modifyUserAvatar as modifyUserAvatarReq } from "../requests"

const requestStart = () => {
    return {
        type: actionTypes.START_REQUEST
    }
}

const requestFinish = () => {
    return {type: actionTypes.FINISH_REQUEST}
}

export const loginFailed = () => {
    window.localStorage.removeItem("authToken")
    window.sessionStorage.removeItem("authToken")
    window.localStorage.removeItem("userInfo")
    window.sessionStorage.removeItem("userInfo")
    
    return {type: actionTypes.LOGIN_FAILED}
}

export const loginAction = (userInfo) => {
    return dispatch => {
        dispatch(requestStart());
        login(userInfo).then(res => {
            console.log("login_request", res)
            if(userInfo.remember) {
                window.localStorage.setItem("authToken", res.authToken)
                window.localStorage.setItem("userInfo", JSON.stringify(res))
            }else {
                window.sessionStorage.setItem("authToken", res.authToken)
                window.sessionStorage.setItem('userInfo',JSON.stringify(res))
            }
            
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payLoad: {
                    userInfo: res
                }
            })
        }).catch(err => {
            dispatch(loginFailed)
        }).finally(() => {
            dispatch(requestFinish());
        })
    }
}

export const modifyUserAvatar = (file) => {
    return dispatch => {
        modifyUserAvatarReq(file).then(res => {
            console.log('mod', res)
            dispatch({
                type: actionTypes.CHANGE_AVATAR,
                payload: res.data
            })

        })
    }
}
import actionTypes from "./actionTypes"
import { modifyUserAvatar as modifyUserAvatarReq } from "../requests"

export const modifyUserAvatar = (file) => {
    alert("a")
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
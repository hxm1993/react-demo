import actionTypes from "./actionTypes"
import { getNotifications } from "../requests"

export const makeNotificationAsReadById = (id) => {
    return dispatch => {
        dispatch({type: actionTypes.START_REQUEST});
        setTimeout(() => {
            dispatch({
                type: actionTypes.MAKE_NOTIFICATION_AS_READ_BY_ID,
                payLoad: {
                    id
                }
            })
            dispatch({type: actionTypes.FINISH_REQUEST});
        }, 2000)
    }
}

export const makeAllNotificationAsRead = () => {
    return dispatch => {
        dispatch({type: actionTypes.START_REQUEST});
        setTimeout(() => {
            dispatch({
                type: actionTypes.MAKE_ALL_NOTIFICATION_AS_READ
            })
            dispatch({type: actionTypes.FINISH_REQUEST});
        }, 2000)
    }
}

export const getNotificationsList = () => {
    return dispatch => {
        dispatch({type: actionTypes.START_REQUEST});
        getNotifications().then(res => {
            dispatch({
                type: actionTypes.GET_ALL_NOTIFICATIONS_LIST,
                payLoad: {
                    list: res.list
                }
            })
        }).finally(() => {
            dispatch({type: actionTypes.FINISH_REQUEST});
        })
    }
}
import actionTypes from "../actions/actionTypes.js"
const initState = {
    list: [],
    isLoading: true
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.MAKE_NOTIFICATION_AS_READ_BY_ID:
            return {
                ...state,
                list: state.list.map(d => {
                    if (d.id === action.payLoad.id) {
                        d.hasRead = false;
                    }
                    return d;
                })
            }
        case actionTypes.MAKE_ALL_NOTIFICATION_AS_READ:
            return {
                ...state,
                list: state.list.map(d => {
                    d.hasRead = false;
                    return d;
                })
            }
        case actionTypes.GET_ALL_NOTIFICATIONS_LIST:
            return {
                ...state,
                list: [...action.payLoad.list]
            }
        case actionTypes.START_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.FINISH_REQUEST:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}
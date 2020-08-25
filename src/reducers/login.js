import actionTypes from "../actions/actionTypes"
const initState = {
    userInfo: {
        username: '',
        avator: '',

    },
    isLoading: false,
    isLogin: Boolean(window.localStorage.getItem("authToken") || window.sessionStorage.getItem("authToken"))
}

export default (state=initState, action) => {
    switch(action.type) {
        case "START_REQUEST":
            return {
                ...state,
                isLoading: true
            }
        case "FINISH_REQUEST":
            return {
                ...state,
                isLoading: false
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                userInfo: {
                    ...action.payLoad
                },
                isLogin: true,
                isLoading: false
            }
        case "LOGIN_FAILED":
            return {
                userInfo: null,
                isLogin: false,
                isLoading: false
            }
        case actionTypes.CHANGE_AVATAR:
        let imgUrl = action.payload.linkurl
        console.log(123,action.payload.linkurl)
            return {
                ...state,

                userInfo: {
                    ...state.userInfo,
                    avator: imgUrl
                }
            }
        default: 
            return state
    }
}
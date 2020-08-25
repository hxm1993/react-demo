import actionTypes from "../actions/actionTypes"
const initState = {

}

export default (state=initState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_AVATAR:
            return {
                ...state,
                avatar: action
            }
    }
}
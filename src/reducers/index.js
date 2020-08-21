
import { combineReducers } from "redux"

import notifications from "./notificationReducer"
import login from "./login"

export default combineReducers({
    notifications,
    login
})
import { combineReducers } from "redux"
import { login } from "./loginReducer"
import { register } from "./registerReducers"
import { userProfile } from "./userProfileReducer"

const authReducers = combineReducers({
  login,
  register,
  userProfile
})

export default authReducers

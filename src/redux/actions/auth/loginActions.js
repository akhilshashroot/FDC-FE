
import { performRequest } from '../../../services/index';



export const loginWithJWT = user => {
  let postReqObj = {};
  postReqObj.username = user.username;
  postReqObj.password = user.password;
  const headers = {}
  return dispatch => {
    // dispatch({
    //   type: 'LOGIN_WITH_JWT_CLEAR'
    // })
    dispatch({
      type: 'LOGIN_WITH_JWT_REQUEST'
    })
    return performRequest('post', '/api/login', headers, postReqObj)
      .then((response) => {
        if (response.status === 200 && response.data.token) {
          var loggedInUser = { name: "" }
          // localStorage.setItem("token", response.data.token)
          // localStorage.setItem("user_id", response.data.user_id)
          dispatch({
            type: 'LOGIN_WITH_JWT_SUCCESS',
            payload: { loggedInUser, response, loggedInWith: "jwt" }
          })
        }
        if (response.data.Status === 400) {
          dispatch({
            type: 'LOGIN_WITH_INCORRECT_CREDENTIALS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOGIN_WITH_JWT_ERROR',
          payload: error
        })
      })
  }
}

export const changeRole = role => {
  return dispatch => dispatch({ type: "CHANGE_ROLE", userRole: role })
}

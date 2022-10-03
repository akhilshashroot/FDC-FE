export const clearLoginWithJWT= user => {
    return dispatch => {
      dispatch({ type: "LOGIN_WITH_JWT_CLEAR"})
    }
}

export const clearSignUpWithJWT= user => {
    return dispatch => {
      dispatch({ type: "SIGNUP_WITH_JWT_CLEAR"})
    }
}
export const register = (state = {}, action) => {
  switch (action.type) {
    case "SIGNUP_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "SIGNUP_WITH_JWT_CLEAR": {
      return { state : null}
    }
    case "SIGNUP_WITH_JWT_REQUEST": {
      return { ...state, isLoading : true }
    }
    case "SIGNUP_WITH_JWT_SUCCESS":
    return {
        ...state,
        signupSuccess: action.payload.data,
        isLoading : false
      }
      case "SIGNUP_WITH_JWT_ERROR": {
        return { ...state, signupError: action.payload, isLoading : false }
      }
    default: {
      return state
    }
  }
}

export const login = (state = { userRole: "admin" }, action) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_JWT_CLEAR": {
      return { state : null }
    }
    case "LOGIN_WITH_JWT_REQUEST": {
      return { ...state, isLoginLoading: true }
    }
    case "LOGIN_WITH_JWT_SUCCESS": {
      return { ...state, values: action.payload, loginResponse:action.payload.response.data, isLoginLoading : false }
    }
    case "LOGIN_WITH_INCORRECT_CREDENTIALS" : {
      return {...state, isLoginLoading : false, values :action.payload }
    }
    case "LOGIN_WITH_JWT_ERROR": {
      return { ...state, values: action.payload, isLoginLoading : false }
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload }
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole }
    }
    default: {
      return state
    }
  }
}

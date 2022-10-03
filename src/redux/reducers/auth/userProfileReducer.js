export const userProfile = (state = {}, action) => {
    switch (action.type) {
      case "USER_DETAILS_REQUEST": {
        return { ...state, isLoading : true }
      }
      case "USER_DETAILS_SUCCESS":
      return {
          ...state,
          userDetails: action.payload.data,
          isLoading : false
        }
        case "USER_DETAILS_ERROR": {
          return { ...state, userDetailsError: action.payload, isLoading : false }
        }
      default: {
        return state
      }
    }
  }
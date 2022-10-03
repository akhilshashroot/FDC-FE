const UserListReducer = (state = {}, action) => {
  switch (action.type) {

    // Clear User Data
    case "CLEAR_ALL_USERS_REQUEST": {
      return { ...state, allData: "", allDataError: "" }
    }

    // Add User
    case "ADD_USER_DATA_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_USER_DATA_SUCCESS":
      return {
        ...state,
        addedUser: action.payload.data,
        isLoading: false
      }
    case "ADD_USER_DATA_ERROR": {
      return { ...state, addUserError: action.payload, isLoading: false }
    }

    // Get User

    case "GET_ALL_USER_DATA_REQUEST": {
      return { ...state, isAllUSERLoading: true }
    }

    case "GET_ALL_USER_DATA_SUCCESS":
      return {
        ...state,
        allData: action.data.data,
        isAllUSERLoading: false
      }
    case "GET_ALL_USER_DATA_FAILURE":
      return { ...state, allDataError: action.data, isAllUSERLoading: false }

    // Update User
    case "CLEAR_USER_UPDATE_DATA":
      return { ...state, isLoading: false, userUpdatedSuccess: "", userUpdatedError: "" }

    case "UPDATE_USER_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "UPDATE_USER_SUCCESS":
      return {
        ...state,
        userUpdatedSuccess: action.payload.response_message,
        userUpdatedError: "",
        isLoading: false
      }

    case "UPDATE_USER_ERROR": {
      return { ...state, userUpdatedError: action.payload, userUpdatedSuccess: "", isLoading: false }
    }

    // Delete User
    case "DELETE_USER_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        deletedSuccess: action.payload,
        isLoading: false
      }

    case "DELETE_USER_ERROR": {
      return { ...state, deletedError: action.payload, isLoading: false }
    }

    // Get UserPrivilege
    case "GET_USER_PRIVILEGE": {
      return { ...state, prvLoading: true }
    }

    case "GET_USER_PRIVILEGE_SUCCESS":
      return {
        ...state,
        prevData: action.data.data,
        prvLoading: false
      }
    case "GET_USER_PRIVILEGE_ERROR":
      return { ...state, prevDataError: action.data, prvLoading: false }

    // Change Password
    case "CHANGE_PASSWORD_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        changePassword: action.payload.data,
        changePasswordError: "",
        isLoading: false
      }
    case "CHANGE_PASSWORD_ERROR": {
      return { ...state, changePasswordError: action.payload, changePassword: "", isLoading: false }
    }

    // Update User Duo
    case "UPDATE_USER_DUO_REQUEST":
      return { ...state, isUserDuoLoading: true, updatedUserDuo: "", updatedUserDuoError: "" }
    case "UPDATE_USER_DUO_SUCCESS":
      return { ...state, isUserDuoLoading: false, updatedUserDuo: action.payload, updatedUserDuoError: "" }
    case "UPDATE_USER_DUO_ERROR":
      return { ...state, isUserDuoLoading: false, updatedUserDuo: "", updatedUserDuoError: action.payload }

      // Update User Resource
      case "UPDATE_USER_RESOURCE_REQUEST":
        return { ...state, isUserResourceLoading: true, updatedUserResource: "", updatedUserResourceError: "" }
      case "UPDATE_USER_RESOURCE_SUCCESS":
        return { ...state, isUserResourceLoading: false, updatedUserResource: action.payload, updatedUserResourceError: "" }
      case "UPDATE_USER_RESOURCE_ERROR":
        return { ...state, isUserResourceLoading: false, updatedUserResource: "", updatedUserResourceError: action.payload }

        // Update User Access
    case "UPDATE_USER_ACCESS_REQUEST":
      return { ...state, isUserAcessLoading: true, updatedUserAccess: "", updatedUserAccessError: "" }
    case "UPDATE_USER_ACCESS_SUCCESS":
      return { ...state, isUserAcessLoading: false, updatedUserAccess: action.payload, updatedUserAccessError: "" }
    case "UPDATE_USER_ACCESS_ERROR":
      return { ...state, isUserAcessLoading: false, updatedUserAccess: "", updatedUserAccessError: action.payload }

    default: {
      return state
    }
  }
}

export default UserListReducer
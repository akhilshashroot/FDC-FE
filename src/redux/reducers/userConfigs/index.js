
const UserConfigReducer = (state = {}, action) => {
    switch (action.type) {
        // Get Config
        case "GET_USER_CONFIG_REQUEST": {
            return { ...state, isUserConfigLoading: true }
        }

        case "GET_USER_CONFIG_SUCCESS":
            return {
                ...state,
                allData: action.data.data,
                isUserConfigLoading: false
                // sortIndex: getIndex(action.data, state.data, state.sortIndex)
            }

        case "GET_USER_CONFIG_FAILURE":
            return { ...state, allDataError: action.data, isUserConfigLoading: false }

        //  Update Config
        case "UPDATE_USER_CONFIG_REQUEST": {
            return { ...state, isConfigUpdateLoading: true }
        }

        case "UPDATE_USER_CONFIG_SUCCESS":
            return {
                ...state,
                configUpdated: action.data,
                isConfigUpdateLoading: false,
                configUpdatedError: ""
            }

        case "UPDATE_USER_CONFIG_FAILURE":
            return { ...state, configUpdated: "", configUpdatedError: action.data, isConfigUpdateLoading: false }

        // Get Location Based Config
        case "GET_LOCATION_CONFIG_REQUEST": {
            return { ...state, isLocationConfigLoading: true }
        }

        case "GET_LOCATION_CONFIG_SUCCESS":
            return {
                ...state,
                locationConfig: action.data.data,
                isLocationConfigLoading: false
                // sortIndex: getIndex(action.data, state.data, state.sortIndex)
            }

        case "GET_LOCATION_CONFIG_FAILURE":
            return { ...state, locationConfigError: action.data, isLocationConfigLoading: false }

        // Set Location Based Config
        case "SET_LOCATION_CONFIG_REQUEST": {
            return { ...state, isUpdateLocConfigLoading: true }
        }

        case "SET_LOCATION_CONFIG_SUCCESS":
            return {
                ...state,
                updatedLocationConfig: action.data,
                isUpdateLocConfigLoading: false
                // sortIndex: getIndex(action.data, state.data, state.sortIndex)
            }

        case "SET_LOCATION_CONFIG_FAILURE":
            return { ...state, updatedLocationConfigError: action.data, isUpdateLocConfigLoading: false }

        case "CLEAR_LOCATION_CONFIG_REQUEST":
            return { ...state, locationConfig: "" }

        default: {
            return state
        }
    }
}

export default UserConfigReducer
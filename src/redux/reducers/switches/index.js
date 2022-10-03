const SwitchesReducer = (state = {}, action) => {
  switch (action.type) {

    // Clear Switches
    case "CLEAR_ALL_SWITCHES_REQUEST":
      return {
        ...state,
        allData: "",
        allDataError: ""
      }

    // Add Switches
    case "ADD_SWITCHES_DATA_REQUEST": {
      return { ...state, isLoading: true, addedSwitches: "", addSwitchesError: "" }
    }
    case "ADD_SWITCHES_DATA_SUCCESS":
      return {
        ...state,
        addedSwitches: action.payload.data,
        isLoading: false,
        addSwitchesError: ""
      }
    case "ADD_SWITCHES_DATA_ERROR": {
      return { ...state, addSwitchesError: action.payload.data, addedSwitches: "", isLoading: false }
    }

    // Get Switches

    case "GET_ALL_SWITCHES_DATA_REQUEST":
      return { ...state, isAllSwitchesDataLoading: true }

    case "GET_ALL_SWITCHES_DATA_SUCCESS":
      return {
        ...state,
        allData: action.data,
        isAllSwitchesDataLoading: false,
        allDataError: ""
        // sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }

    case "GET_ALL_SWITCHES_DATA_FAILURE":
      return { ...state, allDataError: action.data, isAllSwitchesDataLoading: false, allData: "" }

    // Update Switches

    case "UPDATE_SWITCHES_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "UPDATE_SWITCHES_SUCCESS":
      return {
        ...state,
        SwitchesUpdated: action.payload.response_message,
        isLoading: false,
        SwitchesUpdatedError: ""
      }

    case "UPDATE_SWITCHES_ERROR": {
      return { ...state, SwitchesUpdatedError: action.payload.data, SwitchesUpdated: "", isLoading: false }
    }


    // Fetch Switch

    case "FETCH_SWITCH_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "FETCH_SWITCH_SUCCESS":
      return {
        ...state,
        fetchSwitchData: action.payload.data,
        isLoading: false
      }

    case "FETCH_SWITCH_ERROR": {
      return { ...state, fetchSwitchDataError: action.payload, isLoading: false }
    }

    // Get Switches based on location

    case "GET_LOCATION_SWITCHES_DATA_REQUEST":
      return { ...state, isLocationSwitchesDataLoading: true }

    case "GET_LOCATION_SWITCHES_DATA_SUCCESS":
      return {
        ...state,
        allData: action.data,
        isLocationSwitchesDataLoading: false,
        allDataError: ""
        // sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }

    case "GET_LOCATION_SWITCHES_DATA_FAILURE":
      return { ...state, allDataError: action.data, isLocationSwitchesDataLoading: false, allData: "" }

    // Delete Switch
    case "DELETE_SWITCH_REQUEST":
      return {
        ...state,
        isSwitchDelete: true
      }

    case "DELETE_SWITCH_SUCCESS":
      return {
        ...state,
        switchDeleted: action.payload,
        isSwitchDelete: false,
        switchDeletedError: ""
      }

    case "DELETE_SWITCH_FAILURE":
      return {
        ...state,
        switchDeletedError: action.payload,
        switchDeleted: "",
        isSwitchDelete: false
      }

    default: {
      return state
    }
  }
}

export default SwitchesReducer
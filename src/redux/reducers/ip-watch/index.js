const IPSearchReducer = (state = {}, action) => {
  switch (action.type) {

    // Get IW Location

    case "GET_IW_LOCATION_DATA_REQUEST": {
      return { ...state, locationLoading : true, iwLocationError: "", iwLocation: "" }
    }
    case "GET_IW_LOCATION_DATA_SUCCESS":
    return {
        ...state,
        iwLocation: action.payload,
        iwLocationError : "",
        locationLoading : false
      }
      case "GET_IW_LOCATION_DATA_FAILURE": {
        return { ...state, iwLocationError: action.payload, iwLocation: "", locationLoading : false }
      }

    // IP-Search
    case "CLEAR_IP_SEARCH_DATA":
      return { ...state, searchIp: "", searchIpError: "" }
    case "IP_SEARCH_REQUEST": {
      return { ...state, searchIpLoading: true }
    }
    case "IP_SEARCH_SUCCESS":
      return {
        ...state,
        searchIp: action.payload,
        searchIpError: "",
        searchIpLoading: false
      }
    case "IP_SEARCH_ERROR": {
      return { ...state, searchIpError: action.payload, searchIp: "", searchIpLoading: false }
    }

    // Devices
    case "DEVICE_REQUEST": {
      return { ...state, isLoading: true, ipDevices: "", ipDeviceError: "" }
    }
    case "DEVICE_SUCCESS":
      return {
        ...state,
        ipDevices: action.payload,
        ipDeviceError: "",
        isLoading: false
      }
    case "DEVICE_ERROR": {
      return { ...state, ipDeviceError: action.payload, ipDevices: "", isLoading: false }
    }

    // Vlans
    case "VLAN_REQUEST": {
      return { ...state, isLoading: true, ipVlan: "", ipVlanError: "" }
    }
    case "VLAN_SUCCESS":
      return {
        ...state,
        ipVlan: action.payload.vlans,
        ipVlanError: "",
        isLoading: false
      }
    case "VLAN_ERROR": {
      return { ...state, ipVlanError: action.payload, ipVlan: "", isLoading: false }
    }

    // Summary
    case "SUMMARY_REQUEST": {
      return { ...state, isLoading: true, summary: "", summaryError: "" }
    }
    case "SUMMARY_SUCCESS":
      return {
        ...state,
        summary: action.payload.subnets,
        summaryError: "",
        isLoading: false
      }
    case "SUMMARY_ERROR": {
      return { ...state, summaryError: action.payload, summary: "", isLoading: false }
    }

    default: {
      return state
    }
  }
}

export default IPSearchReducer
const ServerReducer = (state = {}, action) => {
  switch (action.type) {

    // Add Server
    case "ADD_SERVER_DATA_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_SERVER_DATA_SUCCESS":
      return {
        ...state,
        addedServer: action.payload.data,
        isLoading: false,
        addServerError: ""
      }

    case "ADD_SERVER_DATA_ERROR": {
      return { ...state, addServerError: action.payload, addedServer: "", isLoading: false }
    }

    // Get Servers

    case "GET_ALL_SERVER_DATA_REQUEST":
      return {
        ...state,
        isServerDataLoading: true
      }
    case "GET_ALL_SERVER_DATA":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
        isServerDataLoading: false,
        isFDALoading: false
        // sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }

    case "GET_ALL_SERVER_DATA_FAILURE":
      return {
        ...state,
        isServerDataLoading: false,
        allDataFailure: action.data
        // sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }

    case "FETCH_FDA_SERVER_REQUEST":
      return {
        ...state,
        isFDALoading: true,
        allData : ""
      }

    case "FETCH_FDA_SERVER_ERROR":
      return {
        ...state,
        isFDALoading: false,
        allData : "",
        allFDADataError: action.payload
      }

    // Update Servers
    case "UPDATE_SERVER_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "UPDATE_SERVER_SUCCESS":
      return {
        ...state,
        ServerUpdated: action.payload.response_message,
        ServerUpdatedError: "",
        isLoading: false
      }

    case "UPDATE_SERVER_ERROR": {
      return { ...state, ServerUpdatedError: action.payload, ServerUpdated: "", isLoading: false }
    }

    //Location Server
    case "LOCATION_SERVER_REQUEST": {
      return { ...state, LocationServer: "", isLocationServerLoading: true }
    }

    case "LOCATION_SERVER_SUCCESS":
      return {
        ...state,
        LocationServer: action.payload.data,
        isLocationServerLoading: false
      }

    case "LOCATION_SERVER_ERROR": {
      return { ...state, LocationServerError: action.payload, isLocationServerLoading: false }
    }

    //PORTS BASED ON SWITCH
    case "SWITCH_PORTS_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "SWITCH_PORTS_SUCCESS":
      return {
        ...state,
        switchPorts: action.payload.data,
        isLoading: false
      }

    case "SWITCH_PORTS_ERROR": {
      return { ...state, switchPortsError: action.payload, isLoading: false }
    }

    //PDU BASED ON LOCATION
    case "LOCATION_PDU_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "LOCATION_PDU_SUCCESS":
      return {
        ...state,
        locationPdus: action.payload.data,
        isLoading: false
      }

    case "LOCATION_PDU_ERROR": {
      return { ...state, locationPdusError: action.payload, isLoading: false }
    }

    //ALL SERVER RELATED DETAILS
    case "ALL_SERVER_DETAILS_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "ALL_SERVER_DETAILS_SUCCESS":
      return {
        ...state,
        allServerDetails: action.payload.data,
        isLoading: false
      }
    case "ALL_SERVER_DETAILS_ERROR": {
      return { ...state, allServerDetailsError: action.payload, isLoading: false }
    }

    //GET ALL CPU'S
    case "GET_CPU_REQUEST": {
      return { ...state, isCpuDataLoading: true }
    }

    case "GET_CPU_SUCCESS":
      return {
        ...state,
        cpu: action.payload.data,
        isCpuDataLoading: false
      }

    case "GET_CPU_ERROR": {
      return { ...state, cpuError: action.payload, isCpuDataLoading: false }
    }


    //GET ALL RAM'S
    case "GET_RAM_REQUEST": {
      return { ...state, isRamDataLoading: true }
    }

    case "GET_RAM_SUCCESS":
      return {
        ...state,
        ram: action.payload.data,
        isRamDataLoading: false
      }

    case "GET_RAM_ERROR": {
      return { ...state, ramError: action.payload, isRamDataLoading: false }
    }

    //GET ALL HDD
    case "GET_HDD_REQUEST": {
      return { ...state, isHddDataLoading: true }
    }

    case "GET_HDD_SUCCESS":
      return {
        ...state,
        hdd: action.payload.data,
        isHddDataLoading: false
      }

    case "GET_HDD_ERROR": {
      return { ...state, hddError: action.payload, isHddDataLoading: false }
    }

    // Add CPU
    case "ADD_CPU_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_CPU_SUCCESS":
      return {
        ...state,
        cpuCreated: action.payload.data,
        cpuCreatedError : "",
        isLoading: false
      }
    case "ADD_CPU_ERROR": {
      return { ...state,cpuCreated:"", cpuCreatedError: action.payload, isLoading: false }
    }

    // Add RAM
    case "ADD_RAM_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_RAM_SUCCESS":
      return {
        ...state,
        ramCreated: action.payload.data,
        ramCreatedError:"",
        isLoading: false
      }
    case "ADD_RAM_ERROR": {
      return { ...state, ramCreated:"",ramCreatedError: action.payload, isLoading: false }
    }

    // Add HDD
    case "ADD_HDD_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_HDD_SUCCESS":
      return {
        ...state,
        hddCreated: action.payload.data,
        hddCreatedError:"",
        isLoading: false
      }
    case "ADD_HDD_ERROR": {
      return { ...state, hddCreated:"",hddCreatedError: action.payload, isLoading: false }
    }

    // Update CPU
    case "UPDATE_CPU_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "UPDATE_CPU_SUCCESS":
      return {
        ...state,
        cpuUpdated: action.payload.data,
        cpuUpdatedError : "",
        isLoading: false
      }
    case "UPDATE_CPU_ERROR": {
      return { ...state, cpuUpdated: "",cpuUpdatedError: action.payload, isLoading: false }
    }

    // Update RAM
    case "UPDATE_RAM_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "UPDATE_RAM_SUCCESS":
      return {
        ...state,
        ramUpdated: action.payload.data,
        ramUpdatedError : "",
        isLoading: false
      }
    case "UPDATE_RAM_ERROR": {
      return { ...state, ramUpdatedError: action.payload,ramUpdated: "", isLoading: false }
    }

    // Update HDD
    case "UPDATE_HDD_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "UPDATE_HDD_SUCCESS":
      return {
        ...state,
        hddUpdated: action.payload.data,
        hddUpdatedError : "",
        isLoading: false
      }
    case "UPDATE_HDD_ERROR": {
      return { ...state,hddUpdated :"", hddUpdatedError: action.payload, isLoading: false }
    }

    //GET ALL SERVER'S
    case "GET_SERVER_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "GET_SERVER_SUCCESS":
      return {
        ...state,
        server: action.payload.data,
        isLoading: false
      }

    case "GET_SERVER_ERROR": {
      return { ...state, serverError: action.payload, isLoading: false }
    }

    //GET ALL IPMI_IP'S
    case "GET_IPMI_IP_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "GET_IPMI_IP_SUCCESS":
      return {
        ...state,
        ipmi_ip: action.payload.data,
        isLoading: false
      }

    case "GET_IPMI_IP_ERROR": {
      return { ...state, ipmi_ipError: action.payload, isLoading: false }
    }

    // Fwtch Server logs
    case "FETCH_SERVER_LOG_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "FETCH_SERVER_LOG_SUCCESS":
      return {
        ...state,
        fetchLogSucces: action.payload.data,
        fetchLogError : "",
        isLoading: false
      }
    case "FETCH_SERVER_LOG_ERROR": {
      return { ...state, fetchLogError: action.payload,fetchLogSucces:"", isLoading: false }
    }

    case "CLEAR_FETCH_SERVER_LOG_DATA" :
      return {
        ...state , fetchLogSucces:"" , fetchLogError:"" , isLoading:false
      }

    // Add Port
    case "ADD_PORT_DATA_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_PORT_DATA_SUCCESS":
      return {
        ...state,
        addedPort: action.payload.data,
        addPortError : "",
        isLoading: false
      }
    case "ADD_PORT_DATA_ERROR": {
      return { ...state, addedPort:"",addPortError: action.payload, isLoading: false }
    }

    
    // Add Pass log
    case "ADD_PASS_DATA_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_PASS_DATA_SUCCESS":
      return {
        ...state,
        addeddata: action.payload.data,
        addPortError : "",
        isLoading: false
      }
    case "ADD_pass_DATA_ERROR": {
      return { ...state, addeddata:"",addPortError: action.payload, isLoading: false }
    }


    // Update Port
    case "UPDATE_PORT_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "UPDATE_PORT_SUCCESS":
      return {
        ...state,
        PortUpdated: action.payload.data,
        portInUse: "",
        isLoading: false
      }

    case "UPDATE_SAME_PORT_ERROR":
      return { ...state, PortUpdated: "", portInUse: action.payload.data, isLoading: false }

    case "UPDATE_PORT_ERROR": {
      return { ...state, PortUpdatedError: action.payload, isLoading: false }
    }

    // Delete Server
    case "DELETE_SERVER_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "DELETE_SERVER_SUCCESS":
      return {
        ...state,
        deletedServerSuccess: action.payload,
        isLoading: false,
        deletedServerError: ""
      }

    case "DELETE_SERVER_ERROR": {
      return { ...state, deletedServerError: action.payload, deletedServerSuccess: "", isLoading: false }
    }

    // Delete Port
    case "DELETE_PORT_REQUEST": {
      return { ...state, isLoading: true }
    }

    case "DELETE_PORT_SUCCESS":
      return {
        ...state,
        deletedPortSuccess: action.payload,
        isLoading: false,
        deletedPortError: ""
      }

    case "DELETE_PORT_ERROR": {
      return { ...state, deletedPortError: action.payload, deletedPortSuccess: "", isLoading: false }
    }

    //GET Info/Vps CPU'S
    case "FETCH_INFO_VPS_DETAILS_REQUEST":
      return { ...state, isLoading: true }


    case "FETCH_INFO_VPS_DETAILS_SUCCESS":
      return {
        ...state,
        info_vps_success: action.payload.data,
        isLoading: false
      }

    case "FETCH_INFO_VPS_DETAILS_ERROR":
      return { ...state, info_vps_error: action.payload, isLoading: false }

    //Update Info/Vps CPU'S
    case "UPDATE_INFO_VPS_DETAILS_REQUEST":
      return { ...state, isLoading: true }


    case "UPDATE_INFO_VPS_DETAILS_SUCCESS":
      return {
        ...state,
        info_vps_update_success: action.payload.response_message,
        isLoading: false
      }

    case "UPDATE_INFO_VPS_DETAILS_ERROR":
      return { ...state, info_vps_update_error: action.payload, isLoading: false }


    //Fetch log of a  location
    case "FETCH_LOCATION_LOG_REQUEST":
      return { ...state, isLocationLogLoading: true }


    case "FETCH_LOCATION_LOG_SUCCESS":
      return {
        ...state,
        locationLogSuccess: action.payload.data,
        isLocationLogLoading: false,
        locationLogError : ""
      }

    case "FETCH_LOCATION_LOG_ERROR":
      return { ...state, locationLogError: action.payload, locationLogSuccess: "",isLocationLogLoading: false }

    //Get Child Switches
    case "GET_CHILD_SWITCHES_REQUEST":
      return { ...state, isChildSwitchesLoading: true }


    case "GET_CHILD_SWITCHES_SUCCESS":
      return {
        ...state,
        childSwitches: action.payload.data,
        childSwitchesError: "",
        isChildSwitchesLoading: false
      }

    case "GET_CHILD_SWITCHES_FAILURE":
      return { ...state, childSwitchesError: action.payload, childSwitches: "", isChildSwitchesLoading: false }

    // Delete Server Resources
    case "DELETE_SERVER_RESOURCES_REQUEST": 
      return { ...state, isLoading: true,deletedServerResource:"",deletedServerResourceError:"" }
    

    case "DELETE_SERVER_RESOURCES_SUCCESS":
      return {
        ...state,
        deletedServerResource: action.payload,
        isLoading: false,
        deletedServerResourceError: ""
      }

    case "DELETE_SERVER_RESOURCES_ERROR": 
      return { ...state, deletedServerResourceError: action.payload, deletedServerResource: "", isLoading: false }
    
    default: {
      return state
    }
  }
}

export default ServerReducer
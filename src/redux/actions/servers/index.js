import { performRequest } from '../../../services/index';


// Add Servers

export const addServersAction = (data, loc_switch_id) => {
  const user_id = localStorage.getItem('user_id') || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  data.user_id = user_id;

  return dispatch => {
    dispatch({
      type: 'ADD_SERVER_DATA_REQUEST'
    })

    return performRequest('post', '/api/docs/server/add', headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ADD_SERVER_DATA_SUCCESS',
            payload: response
          })
          loc_switch_id && dispatch(getServerData(loc_switch_id, false))
          dispatch(getServer())
          dispatch(GetAllServerDetails())
        } else {
          dispatch({ type: "ADD_SERVER_DATA_ERROR", payload: response.data })
        }
      })
      .catch((error) => {
        if (error.response.status === 422 && error.response.data && error.response.data.errors && error.response.data.message === "The given data was invalid.") {
          dispatch({
            type: 'ADD_SERVER_DATA_ERROR',
            payload: error.response.data.errors
          })
        } else {
          dispatch({
            type: 'ADD_SERVER_DATA_ERROR',
            payload: error
          })
        }
      })
  }
}


// Get Servers

export const getServerData = (switch_id, toggleLoading) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (toggleLoading) {
      dispatch({
        type: 'GET_ALL_SERVER_DATA_REQUEST'
      })
    }


    return performRequest('get', `/api/docs/server/${switch_id}/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_ALL_SERVER_DATA',
            data: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_ALL_SERVER_DATA_FAILURE',
          payload: error.response
        })
      })
  }
}

// Update Servers

export const UpdateServer = (server_id, data, loc_switch_id, tab_selection, location_ID, pageNumber = false) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_SERVER_REQUEST'
    })

    return performRequest('put', `/api/docs/server/${server_id}/update`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_SERVER_SUCCESS',
            payload: response.data
          })
          if (tab_selection && location_ID) {
            dispatch(getFDAServers(tab_selection, location_ID, false, pageNumber))
            dispatch(getServer())
            dispatch(GetAllServerDetails())
          } else {
            loc_switch_id && dispatch(getServerData(loc_switch_id, false))
            dispatch(getServer())
            dispatch(GetAllServerDetails())
          }
        }
      })
      .catch((error) => {
        if (error.response.status === 422 && error.response.data && error.response.data.errors && error.response.data.message === "The given data was invalid.") {
          dispatch({
            type: 'UPDATE_SERVER_ERROR',
            payload: error.response.data.errors
          })
        } else {
          dispatch({
            type: 'UPDATE_SERVER_ERROR',
            payload: error
          })
        }
      })
  }
}

// Get Server/Switches with Locaton

export const GetLocationServer = (loc_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'LOCATION_SERVER_REQUEST'
    })

    return performRequest('get', `/api/docs/switches_in_location/${loc_id}/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'LOCATION_SERVER_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'LOCATION_SERVER_ERROR',
          payload: error
        })
      })
  }
}


// Get Port based on Switch
export const GetSwitchPorts = (switch_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'SWITCH_PORTS_REQUEST'
    })

    return performRequest('get', `/api/docs/switch/${switch_id}/ports`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'SWITCH_PORTS_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'SWITCH_PORTS_ERROR',
          payload: error
        })
      })
  }
}

// Get Pdu based on Location
export const GetLocationPdus = (loc_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'LOCATION_PDU_REQUEST'
    })

    return performRequest('get', `/api/docs/pdus_in_location/${loc_id}/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'LOCATION_PDU_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'SWITCH_PORTLOCATION_PDU_ERRORS_ERROR',
          payload: error
        })
      })
  }
}


// Get All Location related data
export const GetAllServerDetails = () => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ALL_SERVER_DETAILS_REQUEST'
    })

    return performRequest('get', `/api/docs/location_switches/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ALL_SERVER_DETAILS_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'ALL_SERVER_DETAILS_ERROR',
          payload: error
        })
      })
  }
}

// fetch all CPU'S
export const getCpu = (isCpuLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (isCpuLoading) {
      dispatch({
        type: 'GET_CPU_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/server/resource/cpu/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_CPU_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_CPU_ERROR',
          payload: error
        })
      })
  }
}

// fetch all RAM'S
export const getRam = (isRamLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (isRamLoading) {
      dispatch({
        type: 'GET_RAM_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/server/resource/ram/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_RAM_SUCCESS',
            payload: response.data
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'GET_RAM_ERROR',
          payload: error
        })
      })
  }
}

// fetch all HDD
export const getHdd = (isHddLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (isHddLoading) {
      dispatch({
        type: 'GET_HDD_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/server/resource/hdd/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_HDD_SUCCESS',
            payload: response.data
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'GET_HDD_ERROR',
          payload: error
        })
      })
  }
}

//add CPU
export const AddCpu = (data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ADD_CPU_REQUEST'
    })

    return performRequest('post', `/api/docs/server/resource/add`, headers, data)
      .then((response) => {
        dispatch({
          type: 'ADD_CPU_SUCCESS',
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_CPU_ERROR',
          payload: error
        })
      })
  }
}

//add RAM
export const AddRam = (data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ADD_RAM_REQUEST'
    })

    return performRequest('post', `/api/docs/server/resource/add`, headers, data)
      .then((response) => {
        dispatch({
          type: 'ADD_RAM_SUCCESS',
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_RAM_ERROR',
          payload: error
        })
      })
  }
}

//add HDD
export const AddHdd = (data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ADD_HDD_REQUEST'
    })

    return performRequest('post', `/api/docs/server/resource/add`, headers, data)
      .then((response) => {
        dispatch({
          type: 'ADD_HDD_SUCCESS',
          payload: response.data
        })
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_HDD_ERROR',
          payload: error
        })
      })
  }
}

//Update CPU
export const UpdateCpu = (cpu_id, data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_CPU_REQUEST'
    })

    return performRequest('put', `/api/docs/server/resource/${cpu_id}/update`, headers, data)
      .then((response) => {
        if (response.response_code === 200) {
          dispatch({
            type: 'UPDATE_CPU_SUCCESS',
            payload: response.data
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_CPU_ERROR',
          payload: error
        })
      })
  }
}

//Update RAM
export const UpdateRam = (ram_id, data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_RAM_REQUEST'
    })

    return performRequest('put', `/api/docs/server/resource/${ram_id}/update`, headers, data)
      .then((response) => {
        if (response.response_code === 200) {
          dispatch({
            type: 'UPDATE_RAM_SUCCESS',
            payload: response.data
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_RAM_ERROR',
          payload: error
        })
      })
  }
}

//Update HDD
export const UpdateHdd = (hdd_id, data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_HDD_REQUEST'
    })

    return performRequest('put', `/api/docs/server/resource/${hdd_id}/update`, headers, data)
      .then((response) => {
        if (response.response_code === 200) {
          dispatch({
            type: 'UPDATE_HDD_SUCCESS',
            payload: response.data
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_HDD_ERROR',
          payload: error
        })
      })
  }
}

// fetch all SERVER'S
export const getServer = () => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'GET_SERVER_REQUEST'
    })

    return performRequest('get', `/api/docs/server/resource/server/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_SERVER_SUCCESS',
            payload: response
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'GET_SERVER_ERROR',
          payload: error
        })
      })
  }
}

// fetch all IPMI_IP'S
export const getIpmiIp = () => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'GET_IPMI_IP_REQUEST'
    })

    return performRequest('get', `/api/docs/server/resource/ipmi_ip/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_IPMI_IP_SUCCESS',
            payload: response
          })
        }

      })
      .catch((error) => {
        dispatch({
          type: 'GET_IPMI_IP_ERROR',
          payload: error
        })
      })
  }
}

// view Server log
export const fetchServerLogs = (server_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'FETCH_SERVER_LOG_REQUEST'
    })

    return performRequest('get', `/api/docs/server/${server_id}/logs`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'FETCH_SERVER_LOG_SUCCESS',
            payload: response
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_SERVER_LOG_ERROR',
          payload: error
        })
      })
  }
}

export const clearFetchServerLogData = () => {
  return dispatch => {
    dispatch({
      type: 'CLEAR_FETCH_SERVER_LOG_DATA'
    })
  }
}


// Add Port

export const addServersPort = (data, loc_switch_id, list_server = true) => {

  const user_id = localStorage.getItem('user_id') || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  data.user_id = user_id;

  return dispatch => {
    dispatch({
      type: 'ADD_PORT_DATA_REQUEST'
    })

    return performRequest('post', '/api/docs/switch/extra_port/add', headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ADD_PORT_DATA_SUCCESS',
            payload: response
          })
          if (list_server) {
            dispatch(getServerData(loc_switch_id, false))
            dispatch(GetAllServerDetails())
          }
        }

      })
      .catch((error) => {
        dispatch({
          type: 'ADD_PORT_DATA_ERROR',
          payload: error
        })
      })
  }
}

//Add Passsword Log
export const addPasswordLog = (addPasslog) => {

  const user_id = localStorage.getItem('user_id') || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  addPasslog.user_id = user_id;

  return dispatch => {
    dispatch({
      type: 'ADD_PASS_DATA_REQUEST'
    })

    return performRequest('post', '/api/docs/server/ipmi_pwd_log/add', headers, addPasslog)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ADD_PASS_DATA_SUCCESS',
            payload: response
          })
          // if (list_server) {
          //   dispatch(getServerData(loc_switch_id, false))
          //   dispatch(GetAllServerDetails())
          // }
        }

      })
      .catch((error) => {
        dispatch({
          type: 'ADD_PASS_DATA_ERROR',
          payload: error
        })
      })
  }
}
// Update Port

export const UpdatePort = (port_id, data, loc_switch_id) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_PORT_REQUEST'
    })

    return performRequest('put', `/api/docs/server/port/${port_id}/update`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_PORT_SUCCESS',
            payload: response
          })
          dispatch(getServerData(loc_switch_id, false))
          dispatch(GetAllServerDetails())
        }
        if ((response.data.response_code === 400) && (response.data.data === "port no already in use")) {
          dispatch({
            type: 'UPDATE_SAME_PORT_ERROR',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_PORT_ERROR',
          payload: error
        })
      })
  }
}

// Delete Server
export const DeleteServer = (server_id, loc_switch_id, tab_selection, location_ID, pageNumber = 0, serv_del = true) => {
  const token_value = localStorage.getItem('token') || null;
  const user_id = localStorage.getItem('user_id') || null;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_SERVER_REQUEST'
    })

    return performRequest('delete', `/api/docs/server/${server_id}/delete_by/${user_id}`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'DELETE_SERVER_SUCCESS',
            payload: response.data
          })
          if (serv_del) {
            if (tab_selection && location_ID) {
              dispatch(getFDAServers(tab_selection, location_ID, false, pageNumber))
              dispatch(GetAllServerDetails())
            } else {
              loc_switch_id && dispatch(getServerData(loc_switch_id, false))
              dispatch(GetAllServerDetails())
            }
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_SERVER_ERROR',
          payload: error
        })
      })
  }
}


// Delete Port
export const DeletePort = (portId, loc_switch_id, tab_selection, location_ID) => {
  const token_value = localStorage.getItem('token') || null;
  // const user_id = localStorage.getItem('user_id') || null;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_PORT_REQUEST'
    })

    return performRequest('delete', `/api/docs/server/port/${portId}/delete`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'DELETE_PORT_SUCCESS',
            payload: response.data
          })
          if (tab_selection && location_ID) {
            dispatch(getFDAServers(tab_selection, location_ID, false))
            dispatch(GetAllServerDetails())
          } else {
            loc_switch_id && dispatch(getServerData(loc_switch_id, false))
            dispatch(GetAllServerDetails())
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_PORT_ERROR',
          payload: error
        })
      })
  }
}

// Fetch Free/Disconnected/All Servers
export const getFDAServers = (keyword, locationId, toggleLoading, PER_PAGE) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (toggleLoading) {
      dispatch({
        type: 'FETCH_FDA_SERVER_REQUEST'
      })
    }
    // return performRequest('get', `/api/docs/server/sort/${keyword}/of/${locationId}view?page=${PER_PAGE}`, headers)
    return performRequest('get', `/api/docs/server/sort/${keyword}/of/${locationId}/view?page=${PER_PAGE}`, headers)
      .then(response => {
        if (response.data.response_code === 200) {
          dispatch({ type: "GET_ALL_SERVER_DATA", data: response.data.data })
        }
      }).catch((error) => {
        dispatch({
          type: 'FETCH_FDA_SERVER_ERROR',
          payload: error.response
        })
      })
  }
}

// Fetch Info/Vps of a location
export const getInfoVpsDetails = (keyword, locationId) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'FETCH_INFO_VPS_DETAILS_REQUEST'
    })
    return performRequest('get', `/api/docs/server/${keyword}/of_location/${locationId}/view`, headers)
      .then(response => {
        if (response.data.response_code === 200) {
          dispatch({ type: "FETCH_INFO_VPS_DETAILS_SUCCESS", payload: response.data })
        }
      }).catch((error) => {
        dispatch({
          type: 'FETCH_INFO_VPS_DETAILS_ERROR',
          payload: error
        })
      })
  }
}

// Update Info/Vps of a location
export const updateInfoVpsData = (keyword, locationId, data) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_INFO_VPS_DETAILS_REQUEST'
    })
    return performRequest('put', `/api/docs/server/${keyword}/of_location/${locationId}/update`, headers, data)
      .then(response => {
        if (response.data.response_code === 200) {
          dispatch({ type: "UPDATE_INFO_VPS_DETAILS_SUCCESS", payload: response.data })
          dispatch(getInfoVpsDetails(keyword, locationId))
        }
      }).catch((error) => {
        dispatch({
          type: 'UPDATE_INFO_VPS_DETAILS_ERROR',
          payload: error
        })
      })
  }
}

// Fetch Log  of a location
export const fetchLocationLog = (locationId, PER_PAGE) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'FETCH_LOCATION_LOG_REQUEST'
    })
    return performRequest('get', `/api/docs/server/logs_of/${locationId}?page=${PER_PAGE}`, headers)
      .then(response => {
        if (response.data.response_code === 200) {
          dispatch({ type: "FETCH_LOCATION_LOG_SUCCESS", payload: response.data })
        }
      }).catch((error) => {
        dispatch({
          type: 'FETCH_LOCATION_LOG_ERROR',
          payload: error
        })
      })
  }
}



export const callResources = () => {
  return dispatch => {
    dispatch(getCpu());
    dispatch(getRam());
    dispatch(getHdd());
    dispatch(getServer());
    dispatch(getIpmiIp());
  }
}

// Get Servers

export const getChildSwitches = (switch_id, toggleLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (toggleLoading) {
      dispatch({
        type: 'GET_CHILD_SWITCHES_REQUEST'
      })
    }


    return performRequest('get', `/api/docs/switches_of_switchset/${switch_id}/view`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_CHILD_SWITCHES_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_CHILD_SWITCHES_FAILURE',
          payload: error.response
        })
      })
  }
}

// delete resources
export const DeleteServerResource = (resource_id, resource_type) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_SERVER_RESOURCES_REQUEST'
    })

    return performRequest('delete', `/api/docs/server/resource/${resource_id}/delete`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          if (resource_type === "cpu") {
            dispatch({
              type: 'DELETE_SERVER_RESOURCES_SUCCESS',
              payload: resource_type
            })
            dispatch(getCpu())
          }
          if (resource_type === "ram") {
            dispatch({
              type: 'DELETE_SERVER_RESOURCES_SUCCESS',
              payload: resource_type
            })
            dispatch(getRam())
          }
          if (resource_type === "hdd") {
            dispatch({
              type: 'DELETE_SERVER_RESOURCES_SUCCESS',
              payload: resource_type
            })
            dispatch(getHdd())
          }

        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_SERVER_RESOURCES_ERROR',
          payload: error
        })
      })
  }
}
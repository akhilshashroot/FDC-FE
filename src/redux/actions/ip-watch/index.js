import { performRequest } from '../../../services/index';

// IP Location
export const getIwLocation = (isLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    if(isLoading){
      dispatch({ type: "GET_IW_LOCATION_DATA_REQUEST" })
    }
    return await performRequest('get',`/api/iw/locations`,headers)
    .then(response => {
      dispatch({ type: "GET_IW_LOCATION_DATA_SUCCESS", payload: response.data.data })
    })
    .catch(error => { dispatch({ type: "GET_IW_LOCATION_DATA_FAILURE", payload: error.response }) })
  }
}

// IP Search 
export const getSearchIp = (ip,loc,isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if(isLoading){
            dispatch({ type: "IP_SEARCH_REQUEST" })
        }
        return await performRequest('get', `/api/iw/search/query/${ip}/of/${loc}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "IP_SEARCH_SUCCESS", payload: response.data.data })
                    }
                    else {
                      dispatch({ type: "IP_SEARCH_ERROR", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "IP_SEARCH_ERROR", payload: error.response }) })
    }
}

// Subnet Search 
export const getSearchSubnet = (subnet,prefix,loc,isLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  // const user_id = localStorage.getItem('user_id') || null
  const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
      if(isLoading){
          dispatch({ type: "IP_SEARCH_REQUEST" })
      }
      return await performRequest('get', `/api/iw/search/query/${subnet}/${prefix}/of/${loc}`, headers)
          .then(response => {
              if (response.status === 200) {
                  if (response.data.response_code === 200) {
                      dispatch({ type: "IP_SEARCH_SUCCESS", payload: response.data.data })
                  }
                  else {
                    dispatch({ type: "IP_SEARCH_ERROR", payload: response.data.data })
                  }
              }

          })
          .catch(error => { dispatch({ type: "IP_SEARCH_ERROR", payload: error.response }) })
  }
}

  // Devices

export const GetDevices = (loc,isLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };

  return async dispatch => {
    if(isLoading){
      dispatch({
        type: 'DEVICE_REQUEST'
      })
    }
    return await performRequest('get', `/api/iw/devices/of/${loc}`, headers)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.response_code === 200) {
          dispatch({
            type: 'DEVICE_SUCCESS',
            payload: response.data.data
          })
        }
        else {
          dispatch({
            type: 'DEVICE_ERROR',
            payload: response.data
          })
        }
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DEVICE_ERROR',
          payload: error
        })
      })
  }
}

  // Vlans

  export const GetVlan = (device,loc,isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
  
    return async dispatch => {
      if(isLoading){
        dispatch({
          type: 'VLAN_REQUEST'
        })
      }
      return await performRequest('get', `/api/iw/search/view/device/${device}/of/${loc}`, headers)
        .then((response) => {
          if (response.status === 200) {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'VLAN_SUCCESS',
              payload: response.data.data
            })
          }
          else {
            dispatch({
              type: 'VLAN_ERROR',
              payload: response.data.data
            })
          }
          }
        })
        .catch((error) => {
          dispatch({
            type: 'VLAN_ERROR',
            payload: error
          })
        })
    }
  }

  // Status

  export const GetStatus = (device,vlan,loc,isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
  
    return async dispatch => {
      if(isLoading){
        dispatch({
          type: 'SUMMARY_REQUEST'
        })
      }
      return await performRequest('get', `/api/iw/search/view/vlans/${device}/${vlan}/of/${loc}`, headers)
        .then((response) => {
          if (response.status === 200) {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'SUMMARY_SUCCESS',
              payload: response.data.data
            })
          }
          else {
            dispatch({
              type: 'SUMMARY_ERROR',
              payload: response.data.data
            })
          }
          }
        })
        .catch((error) => {
          dispatch({
            type: 'SUMMARY_ERROR',
            payload: error
          })
        })
    }
  }
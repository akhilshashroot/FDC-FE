import { performRequest } from '../../../services/index';

// Clear Switches;
export const clearShipmentData = () => {
  return dispatch => dispatch({ type: "CLEAR_ALL_SWITCHES_REQUEST" })
}

// Add Switches
export const addSwitchesAction = (switchData) => {
    const user_id = localStorage.getItem('user_id') || null
    const token_value = localStorage.getItem('token') || null
    switchData.user_id = user_id;
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
  
    return dispatch => {
      dispatch({
        type: 'ADD_SWITCHES_DATA_REQUEST'
      })
  
      return performRequest('post', '/api/docs/switch/add',headers, switchData)
        .then((response) => {
          if(response.data.response_code ===200){
            dispatch({
              type: 'ADD_SWITCHES_DATA_SUCCESS',
              payload: response
          })
          }
        })
        .catch((error) => {
          dispatch({
              type: 'ADD_SWITCHES_DATA_ERROR',
              payload: error.response
          })
        })
    }
  }


// Get Switches

  export const getSwitchesData = (PER_PAGE,isAllSwitchesLoading = false) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
      if(isAllSwitchesLoading){
        dispatch({type : "GET_ALL_SWITCHES_DATA_REQUEST"})
      }
      return await performRequest('get',`/api/docs/switch/view?page=${PER_PAGE}`,headers).then(response => {
        if(response.data.response_code===200){
          dispatch({ 
            type: "GET_ALL_SWITCHES_DATA_SUCCESS",
           data: response.data.data
          })
        }
        
      }).catch(error =>{dispatch({type:"GET_ALL_SWITCHES_DATA_FAILURE", data : error.response})})
    }
  }


// Update Switches

  export const UpdateSwitches = (switch_id,data) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_SWITCHES_REQUEST'
      })

      return performRequest('put', `/api/docs/switch/${switch_id}/update`,headers, data)
          .then((response) => {
            if(response.data.response_code === 200){
              dispatch({
                type: 'UPDATE_SWITCHES_SUCCESS',
                payload: response.data
              })
            }
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_SWITCHES_ERROR',
                  payload: error.response
              })
          })
    }
  }

  //  fetch swithc using switch id
  export const fetchSwitchData = (switchId) => {
  
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
  
    return dispatch => {
      dispatch({
        type: 'FETCH_SWITCH_REQUEST'
      })
  
      return performRequest('get', `/api/docs/switch/${switchId}/fetch`,headers)
        .then((response) => {
          if(response.data.response_code ===200){
            dispatch({
              type: 'FETCH_SWITCH_SUCCESS',
              payload: response
          })
          }
        })
        .catch((error) => {
          dispatch({
              type: 'FETCH_SWITCH_ERROR',
              payload: error
          })
        })
    }
  }

  // Get Switches based on location

  export const GetLocationSwitchesView = (location_id,isAllSwitchesLoading = false) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
      if(isAllSwitchesLoading){
        dispatch({type : "GET_LOCATION_SWITCHES_DATA_REQUEST"})
      }
      return await performRequest('get',`/api/docs/switches_in_location/${location_id}/view/settings`,headers).then(response => {
        if(response.data.response_code===200){
          dispatch({ 
            type: "GET_LOCATION_SWITCHES_DATA_SUCCESS",
            data: response.data.data
          })
        }
        
      }).catch(error =>{dispatch({type:"GET_LOCATION_SWITCHES_DATA_FAILURE", data : error.response})})
    }
  }

  // Delete Switch
export const deleteSwitch = (switchid) => {
  const token_value = localStorage.getItem('token') || null
  // const user_id = localStorage.getItem('user_id') || null
  const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
      dispatch({ type: "DELETE_SWITCH_REQUEST" })
      return await performRequest('delete',`/api/docs/switch/${switchid}/delete`,headers)
          .then(response => {
              if(response.data.status_code === 200){
                  dispatch({ type: "DELETE_SWITCH_SUCCESS", payload: response.data})
                  // dispatch(getAllShipments(pageNumber,false))
              }
              
          })
          .catch(error => { dispatch({ type: "DELETE_SWITCH_FAILURE", payload: error.response }) })
  }
}

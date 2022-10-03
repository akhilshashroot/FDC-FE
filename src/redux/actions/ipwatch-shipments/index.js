import { performRequest } from '../../../services/index';

// Clear ShipmentData;
export const clearShipmentData = () => {
    return dispatch => dispatch({ type: "CLEAR_ALL_SHIPMENTS_REQUEST" })
}

// Shipment Location
export const getShipmentLocation = (isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    const user_id = localStorage.getItem('user_id') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
      if (isLoading) {
        dispatch({ type: "GET_SHIPMENT_LOCATION_DATA_REQUEST" })
      }
      return await performRequest('get', `/api/docs/location/${user_id}/view-for-shipments`, headers)
        .then(response => {
          dispatch({ type: "GET_SHIPMENT_LOCATION_DATA_SUCCESS", data: response.data })
        })
        .catch(error => { dispatch({ type: "GET_SHIPMENT_LOCATION_DATA_FAILURE", data: error.response }) })
    }
  }
// Shipment Carriers
export const getShipmentCarrier = (isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    const user_id = localStorage.getItem('user_id') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
      if (isLoading) {
        dispatch({ type: "GET_SHIPMENT_CARRIER_DATA_REQUEST" })
      }
      return await performRequest('get', `/api/iw/shipment/carriers`, headers)
        .then(response => {
          dispatch({ type: "GET_SHIPMENT_CARRIER_DATA_SUCCESS", data: response.data })
        })
        .catch(error => { dispatch({ type: "GET_SHIPMENT_CARRIER_DATA_FAILURE", data: error.response }) })
    }
  }

// Get shipments list
export const getAllShipments = (sorttype,mode,pageNumber,loader = true) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if(loader){
            dispatch({ type: "GET_ALL_SHIPMENTS_REQUEST" })
        }
        return await performRequest('get', `/api/iw/shipment/view_all/${sorttype}/${mode}?page=${pageNumber}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "GET_ALL_SHIPMENTS_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "GET_ALL_SHIPMENTS_FAILURE", payload: error.response }) })
    }
}

// Get Filtered shipments list
export const getFilteredShipments = (pageNumber,data,loader = true) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if(loader){
            dispatch({ type: "GET_ALL_SHIPMENTS_REQUEST" })
        }
        return await performRequest('post', `/api/iw/shipment/filter?page=${pageNumber}`, headers,data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "GET_ALL_SHIPMENTS_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "GET_ALL_SHIPMENTS_FAILURE", payload: error.response }) })
    }
}

// Fetch a shipment data
export const fetchShipment = (loader = true,shipmentId) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if(loader){
            dispatch({ type: "FETCH_SHIPMENT_REQUEST" })
        }
        return await performRequest('get', `/api/iw/shipment/view/${shipmentId}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "FETCH_SHIPMENT_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "FETCH_SHIPMENT_FAILURE", payload: error.response }) })
    }
}

// Add Shipment
export const addShipment = (data,filtered,filterData) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_SHIPMENT_REQUEST" })
        return await performRequest('post',`/api/iw/shipment/add`,headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        if(response.data.response_message && response.data.response_message.error ){
                            dispatch({ type: "ADD_SHIPMENT_FAILURE", payload: response.data.response_message.error })
                        }else{
                            dispatch({ type: "ADD_SHIPMENT_SUCCESS", payload: response.data.response_message })
                            if(filtered === true){
                                dispatch(getFilteredShipments(1,filterData))
                            }
                            else {
                                dispatch(getAllShipments("timestamp","desc",1,false))
                            }
                        }
                        
                    }
                    if (response.data.response_code === 400) {
                        dispatch({ type: "ADD_SHIPMENT_FAILURE", payload: response.data.response_message })
                    }
                }
            })
            .catch(error => {
                 dispatch({ type: "ADD_SHIPMENT_FAILURE", payload: error.response.data.errors }) 
                })
    }
}

// Update Shipment
export const updateShipment = (data,shipmentId,sorttype,mode,pageNumber,filtered,filterData) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_SHIPMENT_REQUEST" })
        return await performRequest('post',`/api/iw/shipment/update/${shipmentId}?_method=PUT`,headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "UPDATE_SHIPMENT_SUCCESS", payload: response.data.response_message })
                        if(filtered === true){
                            dispatch(getFilteredShipments(pageNumber,filterData))
                        }
                        else {
                            dispatch(getAllShipments(sorttype,mode,pageNumber,false))
                        }
                    }
                }
            })
            .catch(error => {
                 dispatch({ type: "UPDATE_SHIPMENT_FAILURE", payload: error.response.data.errors }) 
                })
    }
}

//Update Shipment Status
export const updateShipmentStatus = (data,shipmentId,sorttype,mode,pageNumber,filtered,filterData) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_SHIPMENT_STATUS_REQUEST" })
        return await performRequest('put',`/api/iw/shipment/delivery/update/${shipmentId}/${data}?_method=PUT`,headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "UPDATE_SHIPMENT_STATUS_SUCCESS", payload: response.data.response_message })
                        if(filtered === true){
                            dispatch(getFilteredShipments(pageNumber,filterData))
                        }
                        else {
                            dispatch(getAllShipments(sorttype,mode,pageNumber,false))
                        }
                    }
                }
            })
            .catch(error => {
                 dispatch({ type: "UPDATE_SHIPMENT_STATUS_FAILURE", payload: error.response.data.errors }) 
                })
    }
}




// Delete Shipment
export const deleteShipment = (shipmentId,sorttype,mode,pageNumber) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_SHIPMENT_REQUEST" })
        return await performRequest('delete',`/api/iw/shipment/delete/${shipmentId}`,headers)
            .then(response => {
                if(response.data.response_code === 200){
                    dispatch({ type: "DELETE_SHIPMENT_SUCCESS", payload: response.data})
                    dispatch(getAllShipments(sorttype,mode,pageNumber,false))
                }
                
            })
            .catch(error => { dispatch({ type: "DELETE_SHIPMENT_FAILURE", payload: error.response }) })
    }
}
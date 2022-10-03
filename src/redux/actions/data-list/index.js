import axios from "axios"
import { performRequest } from '../../../services/index';
import { getPDUData } from '../pdu/index';

export const getData = params => {
  return async dispatch => {
    await axios.get("/api/datalist/data", params).then(response => {
      dispatch({
        type: "GET_DATA",
        data: response.data.data,
        totalPages: response.data.totalPages,
        params
      })
    })
  }
}

export const getInitialData = () => {
  const token_value = localStorage.getItem('token') || null
  const user_id = localStorage.getItem('user_id') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    dispatch({ type: "GET_ALL_LOCATION_DATA_REQUEST" })
    return await performRequest('get', `/api/docs/location/${user_id}/view`, headers)
      .then(response => {
        dispatch({ type: "GET_ALL_LOCATION_DATA_SUCCESS", data: response.data })
      })
      .catch(error => { dispatch({ type: "GET_ALL_LOCATION_DATA_FAILURE", data: error.response }) })
  }
}

export const getSearchLocation = (isLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const user_id = localStorage.getItem('user_id') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    if (isLoading) {
      dispatch({ type: "GET_ALL_LOCATION_DATA_REQUEST" })
    }
    return await performRequest('get', `/api/docs/location/${user_id}/view`, headers)
      .then(response => {
        dispatch({ type: "GET_ALL_LOCATION_DATA_SUCCESS", data: response.data })
      })
      .catch(error => { dispatch({ type: "GET_ALL_LOCATION_DATA_FAILURE", data: error.response }) })
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_DATA", value })
}

export const deleteData = obj => {
  return dispatch => {
    axios
      .post("/api/datalist/delete-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "DELETE_DATA", obj })
      })
  }
}

export const updateData = obj => {
  return (dispatch, getState) => {
    axios
      .post("/api/datalist/update-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "UPDATE_DATA", obj })
      })
  }
}

export const addData = obj => {
  return (dispatch, getState) => {
    let params = getState().dataList.params
    axios
      .post("/api/datalist/add-data", {
        obj
      })
      .then(response => {
        dispatch({ type: "ADD_DATA", obj })
        dispatch(getData(params))
      })
  }
}

// Add location
export const addLocation = (locationData) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };

  return dispatch => {
    dispatch({
      type: 'ADD_LOCATION_REQUEST'
    })

    return performRequest('post', '/api/docs/location/add', headers, locationData)
      .then((response) => {
        dispatch({
          type: 'ADD_LOCATION_SUCCESS',
          payload: response
        })
        dispatch(getInitialData());
        dispatch(getAllLocation());
        dispatch(getPDUData());

      })
      .catch((error) => {
        dispatch({
          type: 'ADD_LOCATION_ERROR',
          payload: error.response.data
        })
      })
  }
}


// Update location

export const updateLocation = (data) => {
  const token_value = localStorage.getItem('token') || null
  var loc_id = data.id
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_LOCATION_REQUEST'
    })

    return performRequest('post', `/api/docs/location/${loc_id}/save`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_LOCATION_SUCCESS',
            payload: response
          })
          dispatch(getAllLocation());
          dispatch(getInitialData());
          dispatch(getPDUData());
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_LOCATION_ERROR',
          payload: error.response.data
        })
      })
  }
}

// Get All Location

export const getAllLocation = (locationLoading) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (locationLoading) {
      dispatch({
        type: 'GET_ALL_LOCATION_REQUEST'
      })
    }


    return performRequest('get', `/api/docs/location/alldata`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_ALL_LOCATION_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_ALL_LOCATION_FAILURE',
          payload: error.response
        })
      })
  }
}

// Delete Location
export const deleteLocation = (locationId) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_LOCATION_REQUEST'
    })
    return performRequest('delete', `/api/docs/location/${locationId}/delete`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'DELETE_LOCATION_SUCCESS',
            payload: response.data
          });
          dispatch(getInitialData());
          dispatch(getAllLocation());
          dispatch(getPDUData());
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_LOCATION_FAILURE',
          payload: error.response
        })
      })
  }
}
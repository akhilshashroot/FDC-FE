import { performRequest } from '../../../services/index';

// Get Device List
export const getDeviceList = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_DEVICE_LIST_REQUEST" })
        return performRequest('get', '/api/ps/quarantine_devices_operation', headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_DEVICE_LIST_SUCCESS", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_DEVICE_LIST_FAILURE", payload: error.response }) })
    }
}


// Delete Device
export const deleteDevice = (id) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_DEVICE_REQUEST" })
        return performRequest('delete', `/api/ps/delete_devices_and_ip_assign/${id}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "DELETE_DEVICE_SUCCESS", payload: response.data })
                    dispatch(getDeviceList())
                }
                else if (response.data.response_code === 400) {
                    dispatch({ type: "DELETE_DEVICE_FAILURE", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "DELETE_DEVICE_FAILURE", payload: error.response }) })
    }
}

// Delete Device
export const deleteAllDeviceData = () => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_ALL_DEVICE_REQUEST" })
        return performRequest('delete', `/api/ps/delete/all/quarantine_devices`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "DELETE_ALL_DEVICE_SUCCESS", payload: response.data })
                    dispatch(getDeviceList())
                }
                else if (response.data.response_code === 400) {
                    dispatch({ type: "DELETE_ALL_DEVICE_FAILURE", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "DELETE_ALL_DEVICE_FAILURE", payload: error.response }) })
    }
}

// Delete Device
export const getQuarantineLog = () => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_QUARANTINE_LOG_REQUEST" })
        return performRequest('get', `/api/ps/get_deleted_quarantine_devices_log`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_QUARANTINE_LOG_SUCCESS", payload: response.data.data })
                }
                else if (response.data.response_code === 400) {
                    dispatch({ type: "GET_QUARANTINE_LOG_FAILURE", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_QUARANTINE_LOG_FAILURE", payload: error.response }) })
    }
}
import { performRequest } from '../../../services/index';

export const getUserConfigs = (isLoading = false) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (isLoading) {
            dispatch({ type: "GET_USER_CONFIG_REQUEST" })
        }

        return await performRequest('get', "/api/config/get", headers).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "GET_USER_CONFIG_SUCCESS", data: response.data })
            }

        }).catch(error => { dispatch({ type: "GET_USER_CONFIG_FAILURE", data: error.response }) })
    }
}

export const postUserConfigs = (isLoading = false, data) => {
    let sendData = {};
    sendData.config = data;
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (isLoading) {
            dispatch({ type: "UPDATE_USER_CONFIG_REQUEST" })
        }

        return await performRequest('post', "/api/config/set", headers, sendData).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "UPDATE_USER_CONFIG_SUCCESS", data: response.data });
                dispatch(getUserConfigs());
            }

        }).catch(error => { dispatch({ type: "UPDATE_USER_CONFIG_FAILURE", data: error.response }) })
    }
}

// Get Configuration Based On Location
export const getLocationConfigs = (isLoading = false, loc) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (isLoading) {
            dispatch({ type: "GET_LOCATION_CONFIG_REQUEST" })
        }

        return await performRequest('get', `/api/config/${loc}/get`, headers).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "GET_LOCATION_CONFIG_SUCCESS", data: response.data })
            }

        }).catch(error => { dispatch({ type: "GET_LOCATION_CONFIG_FAILURE", data: error.response }) })
    }
}

// Set Configuration Based On Location
export const setLocationConfigs = (loc, data) => {
    let sendData = {};
    sendData.config = data;
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "SET_LOCATION_CONFIG_REQUEST" });

        return await performRequest('post', `/api/config/${loc}/set`, headers, sendData).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "SET_LOCATION_CONFIG_SUCCESS", data: response.data.response_message });
            }

        }).catch(error => { dispatch({ type: "SET_LOCATION_CONFIG_FAILURE", data: error.response }) })
    }
}

// Set Configuration Based On Location
export const clearLocationConfigData = () => {
    return dispatch => {
        dispatch({ type: "CLEAR_LOCATION_CONFIG_REQUEST" })
    }
}


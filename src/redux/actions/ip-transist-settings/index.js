import { performRequest } from '../../../services/index';


// Get Providers List
export const getIpTransistProviders = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_IPTRANSIT_PROVIDERS_LIST_REQUEST" })
        return performRequest('get', `api/iptransit/view_all/providers`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_IPTRANSIT_PROVIDERS_LIST_SUCCESS", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_IPTRANSIT_PROVIDERS_LIST_FAILURE", payload: error.response }) })
    }
}


// Add IP-Transist Provider
export const addIpTransistProvider = (data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_IPTRANSIT_PROVIDER_REQUEST" })
        return performRequest('post', 'api/iptransit/add/provider', headers, data)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "ADD_IPTRANSIT_PROVIDER_SUCCESS", payload: response.data })
                    dispatch(getIpTransistProviders())
                }
            })
            .catch(error => { dispatch({ type: "ADD_IPTRANSIT_PROVIDER_FAILURE", payload: error.response }) })
    }
}

// Update IP-Transist Provider
export const updateIpTransitItem = (id, data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_IPTRANSIT_PROVIDER_REQUEST" })
        return performRequest('put', `api/iptransit/update/provider/${id}`, headers, data)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "UPDATE_IPTRANSIT_PROVIDER_SUCCESS", payload: response.data })
                    dispatch(getIpTransistProviders())
                }
            })
            .catch(error => { dispatch({ type: "UPDATE_IPTRANSIT_PROVIDER_FAILURE", payload: error.response }) })
    }
}

// Delete IP-Transist Item
export const deleteIpTransitItem = (id) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_IPTRANSIT_PROVIDER_REQUEST" })
        return performRequest('delete', `api/iptransit/delete/provider/${id}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "DELETE_IPTRANSIT_PROVIDER_SUCCESS", payload: response.data })
                    dispatch(getIpTransistProviders())
                }
            })
            .catch(error => { dispatch({ type: "DELETE_IPTRANSIT_PROVIDER_FAILURE", payload: error.response }) })
    }
}
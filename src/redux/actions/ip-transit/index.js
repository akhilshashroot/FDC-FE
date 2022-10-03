import { performRequest } from '../../../services/index';

// Get CancelIP-Transist List
export const getIpTransitCancelList = (pageno) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_IPTRANSIT_CANCEL_LIST_REQUEST" })
        return performRequest('get', `api/iptransit/view_all/cancelled?page=${pageno}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_IPTRANSIT_CANCEL_LIST_SUCCESS", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_IPTRANSIT_CANCEL_LIST_FAILURE", payload: error.response }) })
    }
}

// Get Active IP-Transist List
export const getIpTransitActiveList = (pageno) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_IPTRANSIT_ACTIVE_LIST_REQUEST" })
        return performRequest('get', `api/iptransit/view_all/active?page=${pageno}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_IPTRANSIT_ACTIVE_LIST_SUCCESS", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_IPTRANSIT_ACTIVE_LIST_FAILURE", payload: error.response }) })
    }
}


// Add IP-Transist Item
export const addIpTransitItem = (data, pageno, status) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_IPTRANSIT_ITEM_REQUEST" })
        return performRequest('post', 'api/iptransit/add', headers, data)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "ADD_IPTRANSIT_ITEM_SUCCESS", payload: response.data })
                    if (status === 'active') {
                        dispatch(getIpTransitActiveList(pageno))
                    }
                    else if (status === 'cancelled') {
                        dispatch(getIpTransitCancelList(pageno))
                    }
                }
            })
            .catch(error => { dispatch({ type: "ADD_IPTRANSIT_ITEM_FAILURE", payload: error.response }) })
    }
}

// Update IP-Transist Item
export const updateIpTransitItem = (id, data, pageno, status) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_IPTRANSIT_ITEM_REQUEST" })
        return performRequest('put', `api/iptransit/update/${id}`, headers, data)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "UPDATE_IPTRANSIT_ITEM_SUCCESS", payload: response.data })
                    if (status === 'active') {
                        dispatch(getIpTransitActiveList(pageno))
                    }
                    else if (status === 'cancelled') {
                        dispatch(getIpTransitCancelList(pageno))
                    }
                }
            })
            .catch(error => { dispatch({ type: "UPDATE_IPTRANSIT_ITEM_FAILURE", payload: error.response }) })
    }
}

// Delete IP-Transist Item
export const deleteIpTransitItem = (id, pageno, status) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_IPTRANSIT_ITEM_REQUEST" })
        return performRequest('delete', `api/iptransit/delete/${id}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "DELETE_IPTRANSIT_ITEM_SUCCESS", payload: response.data })
                    if (status === 'active') {
                        dispatch(getIpTransitActiveList(pageno))
                    }
                    else if (status === 'cancelled') {
                        dispatch(getIpTransitCancelList(pageno))
                    }
                }
            })
            .catch(error => { dispatch({ type: "DELETE_IPTRANSIT_ITEM_FAILURE", payload: error.response }) })
    }
}
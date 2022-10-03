import { performRequest } from '../../../services/index';

// Get null ROutes List
export const getNullRoutes = (loader = true) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (loader) {
            dispatch({ type: "GET_NULL_ROUTES_REQUEST" })
        }
        return await performRequest('get', "/api/iw/null_route/view/all", headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "GET_NULL_ROUTES_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "GET_NULL_ROUTES_FAILURE", payload: error.response }) })
    }
}

// Get Activity Log
export const getNullRoutesActivityLog = (pageNumber, showLoading = true) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        showLoading && dispatch({ type: "GET_NULL_ROUTES_LOG_REQUEST" })
        return await performRequest('get', `/api/iw/null_route/view/logs?page=${pageNumber}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "GET_NULL_ROUTES_LOG_SUCCESS", payload: response.data.data, count: response.headers["x-total-count"] })
                    }
                }
            })
            .catch(error => { dispatch({ type: "GET_NULL_ROUTES_LOG_FAILURE", payload: error.response }) })
    }
}

// Get Null Route based on search value
export const getSearchedNullRoute = (nullRoute) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_NULL_ROUTES_LOG_REQUEST" })
        return await performRequest('get', `/api/iw/null_route/view/log/${nullRoute}`, headers)
            .then(response => {
                dispatch({ type: "GET_NULL_ROUTES_LOG_SUCCESS", payload: response.data.data, count: "10" })
            })
            .catch(error => { dispatch({ type: "GET_NULL_ROUTES_LOG_FAILURE", payload: error.response }) })
    }
}


// Add Null Route
export const addNullRoute = (data) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_NULL_ROUTES_REQUEST" })
        return await performRequest('post', `/api/iw/null_route/add`, headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "ADD_NULL_ROUTES_SUCCESS", payload: response.data.response_message, count: "10" })
                        dispatch(getNullRoutes(false))
                    }
                }
            })
            .catch(error => {
                dispatch({ type: "ADD_NULL_ROUTES_FAILURE", payload: error.response.data.errors })
            })
    }
}

// Delete Null Route
export const deleteNullRoute = (nullRouteId) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_NULL_ROUTES_REQUEST" })
        return await performRequest('delete', `/api/iw/null_route/${nullRouteId}/delete`, headers)
            .then(response => {
                dispatch({ type: "DELETE_NULL_ROUTES_SUCCESS", payload: response.data && response.data.response_message, count: "10" })
                dispatch(getNullRoutes(false))
            })
            .catch(error => { dispatch({ type: "DELETE_NULL_ROUTES_FAILURE", payload: error.response }) })
    }
}
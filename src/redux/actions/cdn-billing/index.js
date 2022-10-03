import { performRequest } from '../../../services/index';

// Get CDN User List
export const getCDNUserList = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_CDN_USER_LIST_REQUEST" })
        return performRequest('get', 'api/oa/get/users', headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "GET_CDN_USER_LIST_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_CDN_USER_LIST_FAILURE", payload: error.response }) })
    }
}

// Get CDN User Update List
export const getCDNUserUpdateList = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_CDN_USER_LIST_REQUEST" })
        return performRequest('get', 'api/oa/update/users', headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "GET_CDN_USER_LIST_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_CDN_USER_LIST_FAILURE", payload: error.response }) })
    }
}

// Get CDN Bill List
export const getCDNBillList = (data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_CDN_BILL_LIST_REQUEST" })
        return performRequest('post', 'api/oa/calculate', headers, data)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "GET_CDN_BILL_LIST_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_CDN_BILL_LIST_FAILURE", payload: error.response }) })
    }
}
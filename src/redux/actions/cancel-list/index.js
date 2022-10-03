import { performRequest } from '../../../services/index';

// Get Cancel List
export const getCancelList = (pageno) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_CANCEL_LIST_REQUEST" })
        return performRequest('get', `api/iw/cancel/view_all?page=${pageno}`, headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "GET_CANCEL_LIST_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_CANCEL_LIST_FAILURE", payload: error.response }) })
    }
}


// Add Cancel Item
export const addCancelItem = (data,pageno) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_CANCEL_ITEM_REQUEST" })
        return performRequest('post', 'api/iw/cancel/add', headers, data)
            .then(response => {
                if(response.data.response_code === 200){
                    dispatch({ type: "ADD_CANCEL_ITEM_SUCCESS", payload: response.data})
                    dispatch(getCancelList(pageno))
                }
            })
            .catch(error => { dispatch({ type: "ADD_CANCEL_ITEM_FAILURE", payload: error.response }) })
    }
}

// Update Cancel Item
export const updateCancelItem = (id,data,pageno) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_CANCEL_ITEM_REQUEST" })
        return performRequest('put', `api/iw/cancel/update/${id}`, headers, data)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "UPDATE_CANCEL_ITEM_SUCCESS", payload: response.data})
                dispatch(getCancelList(pageno))
                }
            })
            .catch(error => { dispatch({ type: "UPDATE_CANCEL_ITEM_FAILURE", payload: error.response }) })
    }
}

// Delete Cancel Item
export const deleteCancelItem = (id,pageno) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_CANCEL_ITEM_REQUEST" })
        return performRequest('delete', `api/iw/cancel/delete/${id}`, headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "DELETE_CANCEL_ITEM_SUCCESS", payload: response.data})
                dispatch(getCancelList(pageno))
                }
            })
            .catch(error => { dispatch({ type: "DELETE_CANCEL_ITEM_FAILURE", payload: error.response }) })
    }
}
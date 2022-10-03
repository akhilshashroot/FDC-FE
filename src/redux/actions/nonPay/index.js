import { performRequest } from '../../../services/index';

// Clear ShipmentData;
export const clearShipmentData = () => {
    return dispatch => dispatch({ type: "CLEAR_ALL_NONPAYMENT_REQUEST" })
}

// Get NonPayments list
export const getAllNonPayments = (pageNumber, loader = true) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (loader) {
            dispatch({ type: "GET_ALL_NONPAYMENT_REQUEST" })
        }
        return await performRequest('get', `/api/iw/nonpay/view_all?page=${pageNumber}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "GET_ALL_NONPAYMENT_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "GET_ALL_NONPAYMENT_FAILURE", payload: error.response }) })
    }
}

// Fetch a NonPayment data
export const fetchNonPayment = (loader = true, shipmentId) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        if (loader) {
            dispatch({ type: "FETCH_NONPAYMENT_REQUEST" })
        }
        return await performRequest('get', `/api/iw/shipment/view/${shipmentId}`, headers)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "FETCH_NONPAYMENT_SUCCESS", payload: response.data.data })
                    }
                }

            })
            .catch(error => { dispatch({ type: "FETCH_NONPAYMENT_FAILURE", payload: error.response }) })
    }
}

// Add NonPayment
export const addNonPayment = (data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_NONPAYMENT_REQUEST" })
        return await performRequest('post', `/api/iw/nonpay/add`, headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        if (response.data.response_message && response.data.response_message.error) {
                            dispatch({ type: "ADD_NONPAYMENT_FAILURE", payload: response.data.response_message.error })
                        } else {
                            dispatch({ type: "ADD_NONPAYMENT_SUCCESS", payload: response.data.response_message })
                            dispatch(getAllNonPayments(1, false))
                        }

                    }
                    if (response.data.response_code === 400) {
                        dispatch({ type: "ADD_NONPAYMENT_FAILURE", payload: response.data.response_message })
                    }
                }
            })
            .catch(error => {
                dispatch({ type: "ADD_NONPAYMENT_FAILURE", payload: error.response.data.errors })
            })
    }
}

// Update Nonpayment
export const updateNonPayment = (data, shipmentId, pageNumber) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_NONPAYMENT_REQUEST" })
        return await performRequest('put', `/api/iw/nonpay/update/${shipmentId}`, headers, data)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.response_code === 200) {
                        dispatch({ type: "UPDATE_NONPAYMENT_SUCCESS", payload: response.data.response_message })
                        dispatch(getAllNonPayments(pageNumber, false))
                    }
                }
            })
            .catch(error => {
                dispatch({ type: "UPDATE_NONPAYMENT_FAILURE", payload: error.response.data.errors })
            })
    }
}

// Delete NonPayment
export const deleteNonPayment = (shipmentId, pageNumber) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_NONPAYMENT_REQUEST" })
        return await performRequest('delete', `/api/iw/nonpay/delete/${shipmentId}`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "DELETE_NONPAYMENT_SUCCESS", payload: response.data.response_message })
                    dispatch(getAllNonPayments(pageNumber, false))
                }

            })
            .catch(error => { dispatch({ type: "DELETE_NONPAYMENT_FAILURE", payload: error.response }) })
    }
}
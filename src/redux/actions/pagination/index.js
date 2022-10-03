import { performRequest } from '../../../services/index';

// Get Configuration Based On Location
export const getPaginateData = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_PAGINATE_DATA_REQUEST" });

        return await performRequest('get', `/api/paginate/get`, headers).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "GET_PAGINATE_DATA_SUCCESS", payload: response.data })
            }

        }).catch(error => { dispatch({ type: "GET_PAGINATE_DATA_FAILURE", payload: error.response }) })
    }
}

// Set Configuration Based On Location
export const setPaginateData = (data) => {
    let sendData = {};
    sendData.pCount = data;
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "SET_PAGINATE_DATA_REQUEST" });

        return await performRequest('post', `/api/paginate/set`, headers, sendData).then(response => {
            if (response.data.response_code === 200) {
                dispatch({ type: "SET_PAGINATE_DATA_SUCCESS", payload: response.data });
                dispatch({ type: "CLEAR_SEARCH_DATA" });
                dispatch({ type: "CLEAR_ALL_SHIPMENTS_REQUEST" });
                dispatch({ type: "CLEAR_ALL_SWITCHES_REQUEST" });
                dispatch({ type: "CLEAR_ALL_USERS_REQUEST" });
            }
        }).catch(error => { dispatch({ type: "SET_PAGINATE_DATA_FAILURE", payload: error.response }) })
    }
}
import { performRequest } from '../../../services/index';

// Get Export IP-Transist List
export const getIpTransitExportList = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_IPTRANSIT_EXPORT_LIST_REQUEST" })
        return performRequest('get', `api/iptransit/log`, headers)
            .then(response => {
                if (response.data.response_code === 200) {
                    dispatch({ type: "GET_IPTRANSIT_EXPORT_LIST_SUCCESS", payload: response.data })
                }
            })
            .catch(error => { dispatch({ type: "GET_IPTRANSIT_EXPORT_LIST_FAILURE", payload: error.response }) })
    }
}

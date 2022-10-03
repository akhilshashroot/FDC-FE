import { performRequest } from '../../../services/index';

// Get Shopping List
export const getShoppingList = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "GET_SHOPPING_LIST_REQUEST" })
        return performRequest('get', 'api/wf/item/view/all', headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "GET_SHOPPING_LIST_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_SHOPPING_LIST_FAILURE", payload: error.response }) })
    }
}

  // Shopping Location

  export const GetShoppingLocations = () => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
  
    return async dispatch => {
        dispatch({ type: "GET_SHOPPING_LOCATION_REQUEST" })
        return performRequest('get', 'api/wf/sector', headers)
            .then(response => {
                if(response.status === 200){
                    dispatch({ type: "GET_SHOPPING_LOCATION_SUCCESS", payload: response.data})
                }
            })
            .catch(error => { dispatch({ type: "GET_SHOPPING_LOCATION_FAILURE", payload: error.response }) })
    }
  }

// Add Shopping Item
export const addShoppingItem = (data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "ADD_SHOPPING_ITEM_REQUEST" })
        return performRequest('post', 'api/wf/item/add', headers, data)
            .then(response => {
                if(response.data.response_code === 200){
                    dispatch({ type: "ADD_SHOPPING_ITEM_SUCCESS", payload: response.data})
                    dispatch(getShoppingList())
                }
            })
            .catch(error => { dispatch({ type: "ADD_SHOPPING_ITEM_FAILURE", payload: error.response }) })
    }
}

// Update Shopping Item
export const updateShoppingItem = (id,data) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "UPDATE_SHOPPING_ITEM_REQUEST" })
        return performRequest('put', `api/wf/item/${id}/update`, headers, data)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "UPDATE_SHOPPING_ITEM_SUCCESS", payload: response.data})
                dispatch(getShoppingList())
                }
            })
            .catch(error => { dispatch({ type: "UPDATE_SHOPPING_ITEM_FAILURE", payload: error.response }) })
    }
}

// Delete Shopping Item
export const deleteShoppingItem = (id) => {
    const token_value = localStorage.getItem('token') || null
    // const user_id = localStorage.getItem('user_id') || null
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
    };
    return async dispatch => {
        dispatch({ type: "DELETE_SHOPPING_ITEM_REQUEST" })
        return performRequest('delete', `api/wf/item/${id}/delete`, headers)
            .then(response => {
                if(response.data.response_code === 200){
                dispatch({ type: "DELETE_SHOPPING_ITEM_SUCCESS", payload: response.data})
                dispatch(getShoppingList())
                }
            })
            .catch(error => { dispatch({ type: "DELETE_SHOPPING_ITEM_FAILURE", payload: error.response }) })
    }
}
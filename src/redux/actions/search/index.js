import { performRequest } from '../../../services/index';

// Search

export const SearchServer = (data,PER_PAGE,isLoading = false) => {
    // const user_id = localStorage.getItem('user_id') || null
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    // data.user_id = user_id;
  
    return dispatch => {
      dispatch({
        type: "CLEAR_SEARCH_DATA"
      })
      if(isLoading){
        dispatch({
          type: 'SERVER_SEARCH_REQUEST'
        })
      }
      return performRequest('post', `/api/docs/server/filtered/view?page=${PER_PAGE}`, headers, data)
        .then((response) => {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'SERVER_SEARCH_SUCCESS',
              payload: response
            })
          }
        })
        .catch((error) => {
          dispatch({
            type: 'SERVER_SEARCH_ERROR',
            payload: error
          })
        })
    }
  }
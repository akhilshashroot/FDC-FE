import { performRequest } from '../../../services/index';

export const userDetailsFetch = () => {
  const user_id = localStorage.getItem('user_id')
  const token_value = localStorage.getItem('token')
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
    return dispatch => {
      dispatch({
        type: 'USER_DETAILS_REQUEST'
      })
      return performRequest('get', `/api/user/${user_id}/fetch`,headers)
          .then((response) => {
            if(response.status === 200 && response.data && response.data.response_code === 200){
              sessionStorage.setItem("userName", response.data.data.username);
              dispatch({
                type: 'USER_DETAILS_SUCCESS',
                payload: response
            })
              
            }
          })
          .catch((error) => {
              dispatch({
                  type: 'USER_DETAILS_ERROR',
                  payload: error
              })
          })
    }
  }

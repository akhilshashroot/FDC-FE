import { performRequest } from '../../../services/index';

// Clear UserData;
export const clearUserData = () => {
  return dispatch => dispatch({ type: "CLEAR_ALL_USERS_REQUEST" })
}

// Add User
export const addUserAction = (data) => {
  let userData = {};
  userData.full_name = data.full_name
  userData.login = data.login;
  userData.password = data.password;
  userData.user_role = data.user_role;
  if (data.user_role === "3") {
    userData.location_list = data.user_list
  } else {
    userData.location_list = []
  }

  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };

  return dispatch => {
    dispatch({
      type: 'ADD_USER_DATA_REQUEST'
    })

    return performRequest('post', '/api/register', headers, userData)
      .then((response) => {
        dispatch({
          type: 'ADD_USER_DATA_SUCCESS',
          payload: response
        })
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_USER_DATA_ERROR',
          payload: error
        })
      })
  }
}


// GetUser

export const getUserData = (isLoading = false, pageNumber) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    if (isLoading) {
      dispatch({ type: "GET_ALL_USER_DATA_REQUEST" })
    }

    return await performRequest('get', `/api/user/view?page=${pageNumber}`, headers).then(response => {
      if (response.data.response_code === 200) {
        dispatch({ type: "GET_ALL_USER_DATA_SUCCESS", data: response.data })
      }

    }).catch(error => { dispatch({ type: "GET_ALL_USER_DATA_FAILURE", data: error.response }) })
  }
}


// Update User

export const UpdateUser = (user_id, data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: "CLEAR_USER_UPDATE_DATA"
    });
    dispatch({
      type: 'UPDATE_USER_REQUEST'
    });

    return performRequest('put', `/api/user/${user_id}/update`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_USER_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_USER_ERROR',
          payload: error.response.data
        })
      })
  }
}


// Delete User

export const DeleteUser = (user_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_USER_REQUEST'
    })

    return performRequest('delete', `/api/user/${user_id}/delete`, headers)
      .then((response) => {
        if (response.data.status_code === 200) {
          dispatch({
            type: 'DELETE_USER_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_USER_ERROR',
          payload: error
        })
      })
  }
}

// Get UserType

export const GetUserPrivilege = (prvLoading) => {
  let user_role = localStorage.getItem("user_role");
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if (prvLoading) {
      dispatch({
        type: 'GET_USER_PRIVILEGE'
      })
    }


    return performRequest('get',user_role==='Senior Sales'?`/api/docs/sales_team/roles/view` :`/api/docs/roles/view`, headers)
      .then((response) => {
        if (response.data.status_code === 200) {
          dispatch({
            type: 'GET_USER_PRIVILEGE_SUCCESS',
            data: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_USER_PRIVILEGE_ERROR',
          payload: error.response
        })
      })
  }
}

// Edit Password

export const changePassword = (data) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };

  return dispatch => {
    dispatch({
      type: 'CHANGE_PASSWORD_REQUEST'
    })

    return performRequest('post', '/api/user/change_password', headers, data)
      .then((response) => {
        if (response.data.status === 200) {
          dispatch({
            type: 'CHANGE_PASSWORD_SUCCESS',
            payload: response
          })
        }
        else {
          dispatch({
            type: 'CHANGE_PASSWORD_ERROR',
            payload: response
          })
        }
      })
    // .catch((error) => {
    //   dispatch({
    //       type: 'CHANGE_PASSWORD_ERROR',
    //       payload: error
    //   })
    // })
  }
}

export const updateUserDuo = (data, selected_user_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_USER_DUO_REQUEST'
    })
    return performRequest('put', `/api/user/${selected_user_id}/update/duo`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_USER_DUO_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_USER_DUO_ERROR',
          payload: error.response
        })
      })
  }
}
export const updateUserResource = (data, selected_user_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_USER_RESOURCE_REQUEST'
    })
    return performRequest('put', `/api/user/${selected_user_id}/update/resource`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_USER_RESOURCE_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_USER_RESOURCE_ERROR',
          payload: error.response
        })
      })
  }
}

export const updateUserAccess = (data, selected_user_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_USER_ACCESS_REQUEST'
    })
    return performRequest('put', `/api/user/${selected_user_id}/update/loginstatus`, headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'UPDATE_USER_ACCESS_SUCCESS',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_USER_ACCESS_ERROR',
          payload: error.response
        })
      })
  }
}
export const logOut = () => {
    return dispatch => {
      dispatch({
        type: 'USER_LOGOUT'
      })
    }
  }

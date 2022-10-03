
import { performRequest } from '../../../services/index';

export const signupWithJWT = (data) => {
  let signUpData = {};
  signUpData.name = data.name
  signUpData.email=data.email;
  signUpData.password=data.password;

  const headers = {};

  return dispatch => {
    // dispatch({
    //   type: 'SIGNUP_WITH_JWT_CLEAR'
    // })
    dispatch({
      type: 'SIGNUP_WITH_JWT_REQUEST'
    })

    return performRequest('post', '/api/register',headers, signUpData)
      .then((response) => {
        dispatch({
            type: 'SIGNUP_WITH_JWT_SUCCESS',
            payload: response
        })
      })
      .catch((error) => {
        dispatch({
            type: 'SIGNUP_WITH_JWT_ERROR',
            payload: error
        })
      })

  }
}

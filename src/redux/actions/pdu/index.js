import { performRequest } from '../../../services/index';


// Add PDU
export const addPDUAction = (data, locId, pageNumber) => {
  let pduData = {};
  pduData.loc_id = data.loc_id
  pduData.rack = data.rack;
  pduData.feeds = data.feeds;
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };

  return dispatch => {
    dispatch({
      type: 'ADD_PDU_DATA_REQUEST'
    })

    return performRequest('post', '/api/docs/pdu/add', headers, pduData)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ADD_PDU_DATA_SUCCESS',
            payload: response
          });
          dispatch(fetchPduDetails(false, locId, pageNumber));
        } else {
          if (response.data.response_code === 400 && response.data.data === "pdu port is already used") {
            dispatch({
              type: 'ADD_PDU_DATA_ERROR',
              payload: response.data.data
            })
          }
        }
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_PDU_DATA_ERROR',
          payload: error
        })
      })
  }
}


// Get PDU

export const getPDUData = (isAllPduLoading = false) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    if (isAllPduLoading) {
      dispatch({ type: "GET_ALL_PDU_DATA_REQUEST" })
    }
    return await performRequest('get', "/api/docs/pdu/view", headers).then(response => {
      dispatch({ type: "GET_ALL_PDU_DATA_SUCCESS", data: response.data })
    }).catch(error => { dispatch({ type: "GET_ALL_PDU_DATA_FAILURE", data: error.response }) })
  }
}


// Update PDU

// export const UpdatePDU = (pdu_id, data) => {
//   data.user_id = localStorage.getItem("user_id") || null
//   const token_value = localStorage.getItem('token') || null
//   const headers = {
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${token_value}`
//   };
//   return dispatch => {
//     dispatch({
//       type: 'UPDATE_PDU_REQUEST'
//     })

//     return performRequest('put', `/api/docs/inventory/${pdu_id}/update`, headers, data)
//       .then((response) => {
//         dispatch({
//           type: 'UPDATE_PDU_SUCCESS',
//           payload: response.data
//         })
//       })
//       .catch((error) => {
//         dispatch({
//           type: 'UPDATE_PDU_ERROR',
//           payload: error
//         })
//       })
//   }
// }


// Get PDU

export const fetchPduDetails = (isPduDetailsFetch = false, locId, pageNumber) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    if (isPduDetailsFetch) {
      dispatch({ type: "GET_PDU_DETAILS_REQUEST" })
    }
    return await performRequest('get', `/api/docs/pdu/${locId}/info/view?page=${pageNumber}`, headers).then(response => {
      if (response.data.response_code === 200) {
        dispatch({ type: "GET_PDU_DETAILS_SUCCESS", payload: response.data.data })
      }

    }).catch(error => { dispatch({ type: "GET_PDU_DETAILS_FAILURE", payload: error.response }) })
  }
}

// Update PDU
export const updatePdu = (pduId, data, locId, pageNumber) => {
  let sendData = {};
  sendData.port = data;
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    dispatch({ type: "UPDATE_PDU_REQUEST" });
    return await performRequest('put', `/api/docs/pdu/${pduId}/update`, headers, sendData).then(response => {
      if (response.data.status_code === 200) {
        dispatch({ type: "UPDATE_PDU_SUCCESS", payload: response.data });
        dispatch(fetchPduDetails(false, locId, pageNumber));
      } else {
        if (response.data.response_code === 400) {
          dispatch({ type: "UPDATE_PDU_FAILURE", payload: response.data.data })
        }
      }

    }).catch(error => {
      dispatch({ type: "UPDATE_PDU_FAILURE", payload: error.response.data })
    })
  }
}


// Delete PDU
export const pduDelete = (pduId, locId, pageNumber) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
    dispatch({ type: "DELETE_PDU_REQUEST" });
    return await performRequest('delete', `/api/docs/pdu/${pduId}/delete`, headers).then(response => {
      if (response.data.status_code === 200) {
        dispatch({ type: "DELETE_PDU_SUCCESS", payload: response.data });
        dispatch(fetchPduDetails(false, locId, pageNumber));
      }

    }).catch(error => {
      dispatch({ type: "DELETE_PDU_FAILURE", payload: error.response })
    })
  }
}
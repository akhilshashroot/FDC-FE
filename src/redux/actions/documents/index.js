import { performRequest } from '../../../services/index';

// Add Document

export const AddNewDocument = (data) => {
    // const user_id = localStorage.getItem('user_id') || null
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    // data.user_id = user_id;
  
    return dispatch => {
      dispatch({
        type: 'ADD_DOCUMENT_REQUEST'
      })
  
      return performRequest('post', '/api/documentation/add', headers, data)
        .then((response) => {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'ADD_DOCUMENT_SUCCESS',
              payload: response
            })
            dispatch(GetDocumentList(false))
          }
        })
        .catch((error) => {
          dispatch({
            type: 'ADD_DOCUMENT_ERROR',
            payload: error
          })
        })
    }
  }

  // List Document

  export const GetDocumentList = (allDocumentLoading) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(allDocumentLoading){
        dispatch({
          type: 'GET_ALL_DOCUMENT_REQUEST'
        })
      }
      
  
      return performRequest('get', `/api/documentation/list`, headers)
        .then((response) => {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'GET_ALL_DOCUMENT_DATA_SUCCESS',
              data: response.data
            })
          }
        })
        .catch((error) => {
          dispatch({
            type: 'GET_ALL_DOCUMENT_FAILURE',
            payload: error.response
          })
        })
    }
    }

    // Get Particular Document

    export const GetADocument = (docid,documentDataLoading) => {
        const token_value = localStorage.getItem('token') || null
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token_value}`
        };
        return dispatch => {
          if(documentDataLoading){
            dispatch({
              type: 'GET_DOCUMENT_REQUEST'
            })
          }
          
      
          return performRequest('get', `/api/documentation/${docid}/view`, headers)
            .then((response) => {
              if (response.data.response_code === 200) {
                dispatch({
                  type: 'GET_DOCUMENT_DATA',
                  data: response.data
                })
              }
            })
            .catch((error) => {
              dispatch({
                type: 'GET_DOCUMENT_FAILURE',
                payload: error.response
              })
            })
        }
        }


// Update Document

  export const UpdateDocument = (docid,data) => {
    // data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_DOCUMENT_REQUEST'
      })

      return performRequest('put', `/api/documentation/${docid}/update`,headers, data)
          .then((response) => {
            if(response.data.response_code === 200){
              dispatch({
                type: 'UPDATE_DOCUMENT_SUCCESS',
                payload: response
              })
              dispatch(GetDocumentList(false))
            }   
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_DOCUMENT_ERROR',
                  payload: error
              })
          })
    }
  }

    // Delete Document
export const deleteDocument = (docid) => {
  const token_value = localStorage.getItem('token') || null
  // const user_id = localStorage.getItem('user_id') || null
  const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
      dispatch({ type: "DELETE_DOCUMENT_REQUEST" })
      return await performRequest('delete',`/api/documentation/${docid}/delete`,headers)
          .then(response => {
              if(response.data.status_code === 200){
                  dispatch({ type: "DELETE_DOCUMENT_SUCCESS", payload: response.data})
                  dispatch(GetDocumentList(false))
                  // dispatch(getAllShipments(pageNumber,false))
              }
              
          })
          .catch(error => { dispatch({ type: "DELETE_DOCUMENT_FAILURE", payload: error.response }) })
  }
}
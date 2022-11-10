import { performRequest } from '../../../services/index';

export const AddNewKbaseImage = (data) => {
  const token_value = localStorage.getItem("token") || null;
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${token_value}`,
  };
  const formData = new FormData();
  formData.append("image", data);

  return (dispatch) => {
    dispatch({
      type: "ADD_KBASE_IMAGE_REQUEST",
    });

    return performRequest("post", "/api/docs/kbase/imageStore", headers, formData)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: "ADD_KBASE_IMAGE_SUCCESS",
            payload: response,
          });
          return response;
        }
      })
      .catch((error) => {
        dispatch({
          type: "ADD_KBASE_IMAGE_ERROR",
          payload: error,
        });
      });
  };
};

// Add K-Base

export const AddNewArticle = (data) => {
    // const user_id = localStorage.getItem('user_id') || null
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    // data.user_id = user_id;
  
    return dispatch => {
      dispatch({
        type: 'ADD_ARTICLE_REQUEST'
      })
  
      return performRequest('post', '/api/docs/kbase/add', headers, data)
        .then((response) => {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'ADD_ARTICLE_SUCCESS',
              payload: response
            })
          }
        })
        .catch((error) => {
          dispatch({
            type: 'ADD_ARTICLE_ERROR',
            payload: error
          })
        })
    }
  }

  // List Article

  export const GetArticleList = (allArticleLoading) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(allArticleLoading){
        dispatch({
          type: 'GET_ALL_ARTICLE_REQUEST'
        })
      }
      
  
      return performRequest('get', `/api/docs/kbase/list`, headers)
        .then((response) => {
          if (response.data.response_code === 200) {
            dispatch({
              type: 'GET_ALL_ARTICLE_DATA_SUCCESS',
              data: response.data
            })
          }
        })
        .catch((error) => {
          dispatch({
            type: 'GET_ALL_ARTICLE_FAILURE',
            payload: error.response
          })
        })
    }
    }

    // Get Particular Article

    export const GetKbaseArticle = (kbaseid,articleDataLoading) => {
        const token_value = localStorage.getItem('token') || null
        const headers = {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token_value}`
        };
        return dispatch => {
          if(articleDataLoading){
            dispatch({
              type: 'GET_KBASE_ARTICLE_REQUEST'
            })
          }
          
      
          return performRequest('get', `/api/docs/kbase/${kbaseid}/view`, headers)
            .then((response) => {
              if (response.data.response_code === 200) {
                dispatch({
                  type: 'GET_KBASE_ARTICLE_DATA',
                  data: response.data
                })
              }
            })
            .catch((error) => {
              dispatch({
                type: 'GET_KBASE_ARTICLE_FAILURE',
                payload: error.response
              })
            })
        }
        }


// Update Article

  export const UpdateArticle = (kbaseid,data) => {
    // data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_ARTICLE_REQUEST'
      })

      return performRequest('put', `/api/docs/kbase/${kbaseid}/update`,headers, data)
          .then((response) => {
            if(response.data.response_code === 200){
              dispatch({
                type: 'UPDATE_ARTICLE_SUCCESS',
                payload: response
              })
            }   
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_ARTICLE_ERROR',
                  payload: error
              })
          })
    }
  }

    // Delete Article
export const deleteArticle = (articleId) => {
  const token_value = localStorage.getItem('token') || null
  // const user_id = localStorage.getItem('user_id') || null
  const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
  };
  return async dispatch => {
      dispatch({ type: "DELETE_ARTICLE_REQUEST" })
      return await performRequest('delete',`/api/docs/kbase/${articleId}/delete`,headers)
          .then(response => {
              if(response.data.status_code === 200){
                  dispatch({ type: "DELETE_ARTICLE_SUCCESS", payload: response.data})
                  // dispatch(getAllShipments(pageNumber,false))
              }
              
          })
          .catch(error => { dispatch({ type: "DELETE_ARTICLE_FAILURE", payload: error.response }) })
  }
}

  // Categories


  // Add Category

export const AddNewCategory = (data) => {
  // const user_id = localStorage.getItem('user_id') || null
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  // data.user_id = user_id;

  return dispatch => {
    dispatch({
      type: 'ADD_CATEGORY_REQUEST'
    })

    return performRequest('post', '/api/docs/kbase/category/add', headers, data)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'ADD_CATEGORY_SUCCESS',
            payload: response.data
          })
          dispatch(GetCategoryList(false))
        }
      })
      .catch((error) => {
        dispatch({
          type: 'ADD_CATEGORY_ERROR',
          payload: error
        })
      })
  }
}

// List Category

export const GetCategoryList = (allCategoryLoading) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if(allCategoryLoading){
      dispatch({
        type: 'GET_ALL_CATEGORY_REQUEST'
      })
    }
    

    return performRequest('get', `/api/docs/kbase/category/list`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
          dispatch({
            type: 'GET_ALL_CATEGORY_DATA_SUCCESS',
            data: response.data.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'GET_ALL_CATEGORY_FAILURE',
          payload: error.response
        })
      })
  }
  }

// Update Category

export const UpdateCategory = (catid,data) => {
  // data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_CATEGORY_REQUEST'
    })

    return performRequest('put', `/api/docs/kbase/category/${catid}/update`,headers, data)
        .then((response) => {
          if(response.data.response_code === 200){
            dispatch({
              type: 'UPDATE_CATEGORY_SUCCESS',
              payload: response.data
            })
            dispatch(GetCategoryList(false))
          }   
        })
        .catch((error) => {
            dispatch({
                type: 'UPDATE_CATEGORY_ERROR',
                payload: error
            })
        })
  }
}

  // Delete Category
export const deleteCategory = (catId) => {
const token_value = localStorage.getItem('token') || null
// const user_id = localStorage.getItem('user_id') || null
const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
};
return async dispatch => {
    dispatch({ type: "DELETE_CATEGORY_REQUEST" })
    return await performRequest('delete',`/api/docs/kbase/category/${catId}/delete`,headers)
        .then(response => {
            if(response.data.status_code === 200){
                dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: response.data})
                dispatch(GetCategoryList(false))
            }
            
        })
        .catch(error => { dispatch({ type: "DELETE_CATEGORY_FAILURE", payload: error.response }) })
}
}
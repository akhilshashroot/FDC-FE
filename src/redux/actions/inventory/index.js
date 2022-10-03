import { performRequest } from '../../../services/index';


export const getInventaryProducts = (location_Id, isInventoryLoading) => {
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if(isInventoryLoading){
      dispatch({
        type: 'GET_INVENTORY_DATA_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/inventory/view/${location_Id}/list`,headers)
      .then((response) => {
          if(response.data.response_code === 200){
            dispatch({
                type: 'GET_INVENTORY_DATA_SUCCESS',
                payload: response.data
            })
          }
        
      })
      .catch((error) => {
        dispatch({
            type: 'GET_INVENTORY_DATA_ERROR',
            payload: error
        })
      })
  }
}

// fetch all manufacture list
export const getManufactures = (isManufacturesLoading = false) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(isManufacturesLoading){
        dispatch({
          type: 'GET_MANUFACTURES_REQUEST'
        })
      }
      return performRequest('get', `/api/docs/inv_manufacturer/view`,headers)
        .then((response) => {
              dispatch({
                  type: 'GET_MANUFACTURES_SUCCESS',
                  payload: response
              })
          
        })
        .catch((error) => {
          dispatch({
              type: 'GET_MANUFACTURES_ERROR',
              payload: error
          })
        })
    }
  }


// fetch all hardware list
export const getHardwares = (isHardwaresLoading = false) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(isHardwaresLoading){
        dispatch({
          type: 'GET_HARDWARES_REQUEST'
        })
      }
      return performRequest('get', `/api/docs/inv_hardware/view`,headers)
        .then((response) => {
              dispatch({
                  type: 'GET_HARDWARES_SUCCESS',
                  payload: response
              })
          
        })
        .catch((error) => {
          dispatch({
              type: 'GET_HARDWARES_ERROR',
              payload: error
          })
        })
    }
  }

// fetch all brand list
export const getBrands = (isBrandsLoadiong = false) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(isBrandsLoadiong){
        dispatch({
          type: 'GET_BRANDS_REQUEST'
        })
      }
      return performRequest('get', `/api/docs/inv_brand/view`,headers)
        .then((response) => {
              dispatch({
                  type: 'GET_BRANDS_SUCCESS',
                  payload: response
              })
          
        })
        .catch((error) => {
          dispatch({
              type: 'GET_BRANDS_ERROR',
              payload: error
          })
        })
    }
  }

// fetch all Model Numbers
export const getModelNumbers = (isModelNumbersLoading =false) => {
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if(isModelNumbersLoading){
      dispatch({
        type: 'GET_MODEL_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/inv_modelno/view`,headers)
      .then((response) => {
            dispatch({
                type: 'GET_MODEL_SUCCESS',
                payload: response
            })
        
      })
      .catch((error) => {
        dispatch({
            type: 'GET_MODEL_ERROR',
            payload: error
        })
      })
  }
}


// fetch all Sizes
export const getSize = (isSizeLoading = false) => {
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    if(isSizeLoading){
      dispatch({
        type: 'GET_SIZE_REQUEST'
      })
    }
    return performRequest('get', `/api/docs/inv_size/view`,headers)
      .then((response) => {
            dispatch({
                type: 'GET_SIZE_SUCCESS',
                payload: response
            })
        
      })
      .catch((error) => {
        dispatch({
            type: 'GET_SIZE_ERROR',
            payload: error
        })
      })
  }
}




// Add inventory
export const AddInventory = (data,loc_id) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'ADD_INVENTORY_REQUEST'
      })

      return performRequest('post', 'api/docs/inventory/add',headers, data)
          .then((response) => {
            if(response.data.response_code === 200){
              dispatch({
                type: 'ADD_INVENTORY_SUCCESS',
                payload: response
              })
              loc_id && dispatch(getInventaryProducts(loc_id),false)
            }else{
              if(response.data.response_code === 400 && response.data.data === "already exists"){
                dispatch({
                  type: 'ADD_INVENTORY_ERROR',
                  payload: response.data.data
              })
              }
            }
              
          })
          .catch((error) => {
              dispatch({
                  type: 'ADD_INVENTORY_ERROR',
                  payload: error
              })
          })
    }
  }



//Update Inventory

export const UpdateInventoryProduct = (inv_id,data,loc_id) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_INVENTORY_REQUEST'
      })
      dispatch({
        type : 'UPDATE_INVENTORY_CLEAR'
      })
      return performRequest('put', `/api/docs/inventory/product/${inv_id}/update`,headers, data)
          .then((response) => {
            if(response.data.response_code === 200){
              dispatch({
                type: 'UPDATE_INVENTORY_SUCCESS',
                payload: response.data
              })
              loc_id && dispatch(getInventaryProducts(loc_id),false)
            }
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_INVENTORY_ERROR',
                  payload: error
              })
          })
    }
  }

//Update Inventory

export const UpdateInventoryItem = (inv_id,data,loc_id) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'UPDATE_INVENTORY_ITEM_REQUEST'
    })
    dispatch({
      type: 'UPDATE_INVENTORY_ITEM_CLEAR'
    })
    return performRequest('put', `/api/docs/inventory/item/${inv_id}/update`,headers, data)
        .then((response) => {
          if(response.data.response_code === 200){
            dispatch({
              type: 'UPDATE_INVENTORY_ITEM_SUCCESS',
              payload: response.data
            })
            loc_id && dispatch(getInventaryProducts(loc_id),false)
          }
        })
        .catch((error) => {
            dispatch({
                type: 'UPDATE_INVENTORY_ITEM_ERROR',
                payload: error
            })
        })
  }
}



//add Brand
export const AddBrand = (data) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'ADD_BRAND_REQUEST'
      })

      return performRequest('post', `/api/docs/inv_brand/add`,headers, data)
          .then((response) => {
              dispatch({
                type: 'ADD_BRAND_SUCCESS',
                payload: response.data
              })
          })
          .catch((error) => {
              dispatch({
                  type: 'ADD_BRAND_ERROR',
                  payload: error
              })
          })
    }
  }

//add Manufacture
export const AddManufacture = (data) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'ADD_MANUFACTURE_REQUEST'
      })

      return performRequest('post', `/api/docs/inv_manufacturer/add`,headers, data)
          .then((response) => {
              if(response.response_code === 200){
                dispatch({
                    type: 'ADD_MANUFACTURE_SUCCESS',
                    payload: response.data
                })
            }
          })
          .catch((error) => {
              dispatch({
                  type: 'ADD_MANUFACTURE_ERROR',
                  payload: error
              })
          })
    }
  }

//add Hardware
export const AddHardware = (data) => {
    data.user_id = localStorage.getItem("user_id") || null
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'ADD_HARDWARE_REQUEST'
      })

      return performRequest('post', `/api/docs/inv_hardware/add`,headers, data)
          .then((response) => {
              dispatch({
                type: 'ADD_HARDWARE_SUCCESS',
                payload: response.data
              })
          })
          .catch((error) => {
              dispatch({
                  type: 'ADD_HARDWARE_ERROR',
                  payload: error
              })
          })
    }
  }

//add Model_No
export const AddModelno = (data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ADD_MODEL_NO_REQUEST'
    })

    return performRequest('post', `/api/docs/inv_modelno/add`,headers, data)
        .then((response) => {
            dispatch({
              type: 'ADD_MODEL_NO_SUCCESS',
              payload: response.data
            })
        })
        .catch((error) => {
            dispatch({
                type: 'ADD_MODEL_NO_ERROR',
                payload: error
            })
        })
  }
}

//add Size
export const AddSize = (data) => {
  data.user_id = localStorage.getItem("user_id") || null
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'ADD_SIZE_REQUEST'
    })

    return performRequest('post', `/api/docs/inv_size/add`,headers, data)
        .then((response) => {
            dispatch({
              type: 'ADD_SIZE_SUCCESS',
              payload: response.data
            })
        })
        .catch((error) => {
            dispatch({
                type: 'ADD_SIZE_ERROR',
                payload: error
            })
        })
  }
}


  //Update Manufacture
export const UpdateManufacture = (manu_id,data) => {
    data.id = manu_id
    const token_value = localStorage.getItem('token')|| null
    const user_id = localStorage.getItem('user_id')|| null
    data.user_id = user_id
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_MANUFACTURE_REQUEST'
      })

      return performRequest('put', `/api/docs/inv_manufacturer/${manu_id}/update`,headers, data)
          .then((response) => {
              if(response.response_code === 200){
                dispatch({
                    type: 'UPDATE_MANUFACTURE_SUCCESS',
                    payload: response.data
                  })
              }
              
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_MANUFACTURE_ERROR',
                  payload: error
              })
          })
    }
  }

  //Update Manufacture
  export const UpdateBrand = (brand_id,data) => {
    data.id = brand_id
    const token_value = localStorage.getItem('token')|| null
    const user_id = localStorage.getItem('user_id')|| null
    data.user_id = user_id
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_BRAND_REQUEST'
      })

      return performRequest('put', `/api/docs/inv_brand/${brand_id}/update`,headers, data)
          .then((response) => {
             if(response.response_code === 200){
                dispatch({
                    type: 'UPDATE_BRAND_SUCCESS',
                    payload: response.data
                  })
             }
              
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_BRAND_ERROR',
                  payload: error
              })
          })
    }
  }

    //Update Manufacture
export const UpdateHardware = (hw_id,data) => {
    data.id = hw_id
    const token_value = localStorage.getItem('token')|| null
    const user_id = localStorage.getItem('user_id')|| null
    data.user_id = user_id
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'UPDATE_HARDWARE_REQUEST'
      })

      return performRequest('put', `/api/docs/inv_hardware/${hw_id}/update`,headers, data)
          .then((response) => {
              if(response.data.response_code === 200){
                dispatch({
                    type: 'UPDATE_HARDWARE_SUCCESS',
                    payload: response.data
                  })
              }
              
          })
          .catch((error) => {
              dispatch({
                  type: 'UPDATE_HARDWARE_ERROR',
                  payload: error
              })
          })
    }
  }

    //Update Model No
    export const UpdateModelno = (model_id,data) => {
      data.user_id = localStorage.getItem("user_id") || null
      const token_value = localStorage.getItem('token')|| null
      const user_id = localStorage.getItem('user_id')|| null
      data.user_id = user_id
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
      };
      return dispatch => {
        dispatch({
          type: 'UPDATE_MODEL_REQUEST'
        })
  
        return performRequest('put', `/api/docs/inv_modelno/${model_id}/update`,headers, data)
            .then((response) => {
                if(response.response_code === 200){
                  dispatch({
                      type: 'UPDATE_MODEL_SUCCESS',
                      payload: response.data
                    })
                }
                
            })
            .catch((error) => {
                dispatch({
                    type: 'UPDATE_MODEL_ERROR',
                    payload: error
                })
            })
      }
    }


    //Update Size
    export const UpdateSize = (size_id,data) => {
      data.user_id = localStorage.getItem("user_id") || null
      const token_value = localStorage.getItem('token')|| null
      const user_id = localStorage.getItem('user_id')|| null
      data.user_id = user_id
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
      };
      return dispatch => {
        dispatch({
          type: 'UPDATE_SIZE_REQUEST'
        })
  
        return performRequest('put', `/api/docs/inv_size/${size_id}/update`,headers, data)
            .then((response) => {
                if(response.response_code === 200){
                  dispatch({
                      type: 'UPDATE_SIZE_SUCCESS',
                      payload: response.data
                    })
                }
                
            })
            .catch((error) => {
                dispatch({
                    type: 'UPDATE_SIZE_ERROR',
                    payload: error
                })
            })
      }
    }

//   Delete inventory products

  export const DeleteInventory = (inv_id) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'DELETE_INVENTORY_REQUEST'
      })

      return performRequest('delete', `/api/docs/inventory/product/${inv_id}/delete`,headers)
          .then((response) => {
            if(response.data.status_code === 200){
                dispatch({
                    type: 'DELETE_INVENTORY_SUCCESS',
                    payload: response.data
                  })
            }
              
          })
          .catch((error) => {
              dispatch({
                  type: 'DELETE_INVENTORY_ERROR',
                  payload: error
              })
          })
    }
  }

// Delet Inventory Item
export const DeleteInventoryItem = (inv_id) => {
  const token_value = localStorage.getItem('token')|| null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_INVENTORY_ITEM_REQUEST'
    })

    return performRequest('delete', `/api/docs/inventory/item/${inv_id}/delete`,headers)
        .then((response) => {
          if(response.data.status_code === 200){
              dispatch({
                  type: 'DELETE_INVENTORY_ITEM_SUCCESS',
                  payload: response.data
                })
          }
            
        })
        .catch((error) => {
            dispatch({
                type: 'DELETE_INVENTORY_ITEM_ERROR',
                payload: error
            })
        })
  }
}

// view log
export const fetchActivityLogs = (loc_id,invLogLoading) => {
    const token_value = localStorage.getItem('token')|| null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      if(invLogLoading){
        dispatch({
          type: 'FETCH_LOG_REQUEST'
        })
      }

  
      return performRequest('get', `/api/docs/inventory/view/${loc_id}/log`,headers)
        .then((response) => {
          if(response.data.response_code === 200){
            dispatch({
              type: 'FETCH_LOG_SUCCESS',
              payload: response
          })
          }   
        })
        .catch((error) => {
          dispatch({
              type: 'FETCH_LOG_ERROR',
              payload: error
          })
        })
    }
  }

  // delete Hardware
export const DeleteHardware = (hardware_id) => {
  const token_value = localStorage.getItem('token') || null
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token_value}`
  };
  return dispatch => {
    dispatch({
      type: 'DELETE_HARDWARE_REQUEST'
    })

    return performRequest('delete', `/api/docs/inv_hardware/${hardware_id}/delete`, headers)
      .then((response) => {
        if (response.data.response_code === 200) {
            dispatch({
              type: 'DELETE_HARDWARE_SUCCESS',
              payload: response.data
            })
            dispatch(getHardwares())          
        }
        else if(response.data.response_code === 400) {
          dispatch({
            type: 'DELETE_HARDWARE_COPY_ERROR',
            payload: response.data
          })
        }
      })
      .catch((error) => {
        dispatch({
          type: 'DELETE_HARDWARE_ERROR',
          payload: error
        })
      })
  }
}

  // delete Manufacture
  export const DeleteManufacture = (manufacture_id) => {
    const token_value = localStorage.getItem('token') || null
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token_value}`
    };
    return dispatch => {
      dispatch({
        type: 'DELETE_MANUFACTURE_REQUEST'
      })
  
      return performRequest('delete', `/api/docs/inv_manufacturer/${manufacture_id}/delete`, headers)
        .then((response) => {
          if (response.data.response_code === 200) {
              dispatch({
                type: 'DELETE_MANUFACTURE_SUCCESS',
                payload: response.data
              })
              dispatch(getManufactures())          
          }
          else if(response.data.response_code === 400) {

            dispatch({
              type: 'DELETE_MANUFACTURE_COPY_ERROR',
              payload: response.data
            })
          }
        })
        .catch((error) => {
          dispatch({
            type: 'DELETE_MANUFACTURE_ERROR',
            payload: error
          })
        })
    }
  }

    // delete Brand
    export const DeleteBrand = (brand_id) => {
      const token_value = localStorage.getItem('token') || null
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
      };
      return dispatch => {
        dispatch({
          type: 'DELETE_BRAND_REQUEST'
        })
    
        return performRequest('delete', `/api/docs/inv_brand/${brand_id}/delete`, headers)
          .then((response) => {
            if (response.data.response_code === 200) {
                dispatch({
                  type: 'DELETE_BRAND_SUCCESS',
                  payload: response.data
                })
                dispatch(getBrands())          
            }
          })
          .catch((error) => {
            dispatch({
              type: 'DELETE_BRAND_ERROR',
              payload: error
            })
          })
      }
    }


    // delete Model_Number
    export const DeleteModel = (model_id) => {
      const token_value = localStorage.getItem('token') || null
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
      };
      return dispatch => {
        dispatch({
          type: 'DELETE_MODEL_REQUEST'
        })
    
        return performRequest('delete', `/api/docs/inv_modelno/${model_id}/delete`, headers)
          .then((response) => {
            if (response.data.response_code === 200) {
                dispatch({
                  type: 'DELETE_MODEL_SUCCESS',
                  payload: response.data
                })
                dispatch(getModelNumbers())          
            }
          })
          .catch((error) => {
            dispatch({
              type: 'DELETE_MODEL_ERROR',
              payload: error
            })
          })
      }
    }

    // delete Size
    export const DeleteSize = (size_id) => {
      const token_value = localStorage.getItem('token') || null
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token_value}`
      };
      return dispatch => {
        dispatch({
          type: 'DELETE_SIZE_REQUEST'
        })
    
        return performRequest('delete', `/api/docs/inv_size/${size_id}/delete`, headers)
          .then((response) => {
            if (response.data.response_code === 200) {
                dispatch({
                  type: 'DELETE_SIZE_SUCCESS',
                  payload: response.data
                })
                dispatch(getSize())          
            }
          })
          .catch((error) => {
            dispatch({
              type: 'DELETE_SIZE_ERROR',
              payload: error
            })
          })
      }
    }
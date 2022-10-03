const SearchReducer = (state = {}, action) => {
    switch (action.type) {
  
      // Search
      case "CLEAR_SEARCH_DATA" :
        return {...state,searchServer: "",searchServerError:""}
      case "SERVER_SEARCH_REQUEST": {
        return { ...state, isLoading: true }
      }
      case "SERVER_SEARCH_SUCCESS":
        return {
          ...state,
          searchServer: action.payload.data,
          isLoading: false
        }
      case "SERVER_SEARCH_ERROR": {
        return { ...state, searchServerError: action.payload, isLoading: false }
      }

      default: {
        return state
      }
    }
  }
  
  export default SearchReducer
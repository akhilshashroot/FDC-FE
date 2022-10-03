
const PaginationReducer = (state = {}, action) => {

    switch (action.type) {

        case "GET_PAGINATE_DATA_REQUEST": {
            return { ...state, isGetPaginate: true }
        }

        case "GET_PAGINATE_DATA_SUCCESS":
            return {
                ...state,
                perPageCount: action.payload.data,
                isGetPaginate: false
            }

        case "GET_PAGINATE_DATA_FAILURE":
            return { ...state, perPageCountError: action.payload, isGetPaginate: false }


        case "SET_PAGINATE_DATA_REQUEST": {
            return { ...state, isSetPaginate: true }
        }

        case "SET_PAGINATE_DATA_SUCCESS":
            return {
                ...state,
                isSetPaginate: false,
                setPageCount: action.payload,
                setPageCountError: ""
            }

        case "SET_PAGINATE_DATA_FAILURE":
            return { ...state, isSetPaginate: false, setPageCount: "", setPageCountError: action.payload, }

        default: {
            return state
        }
    }
}

export default PaginationReducer
const IpwatchNullRouteReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Null routes data
        case "GET_NULL_ROUTES_REQUEST":
            return { ...state, isNullRouteLoading: true }

        case "GET_NULL_ROUTES_SUCCESS":
            return { ...state, allNullRoutes: action.payload, isNullRouteLoading: false, allNullRoutesError: "" }

        case "GET_NULL_ROUTES_FAILURE":
            return { ...state, allNullRoutesError: action.payload, allNullRoutes: "", isNullRouteLoading: false }

        // Get Null routes log data
        case "GET_NULL_ROUTES_LOG_REQUEST":
            return { ...state, isLogLoading: true }

        case "GET_NULL_ROUTES_LOG_SUCCESS":
            return { ...state, nullRouteLog: action.payload, isLogLoading: false, nullRouteLogError: "", total_count: action.count }

        case "GET_NULL_ROUTES_LOG_FAILURE":
            return { ...state, nullRouteLogError: action.payload, nullRouteLog: "", isLogLoading: false }

        // Add Null routes
        case "ADD_NULL_ROUTES_REQUEST":
            return { ...state, isAddingNullRoute: true }

        case "ADD_NULL_ROUTES_SUCCESS":
            return { ...state, nullRouteAddSuccess: action.payload, isAddingNullRoute: false, nullRouteAddError: "" }

        case "ADD_NULL_ROUTES_FAILURE":
            return { ...state, nullRouteAddError: action.payload, nullRouteAddSuccess: "", isAddingNullRoute: false }

        // Delete Null routes
        case "DELETE_NULL_ROUTES_REQUEST":
            return { ...state, isDeletingNullRoute: true }

        case "DELETE_NULL_ROUTES_SUCCESS":
            return { ...state, nullRouteDeleteSuccess: action.payload, isDeletingNullRoute: false, nullRouteDeleteError: "" }

        case "DELETE_NULL_ROUTES_FAILURE":
            return { ...state, nullRouteDeleteError: action.payload, nullRouteDeleteSuccess: "", isDeletingNullRoute: false }

        default: {
            return state
        }
    }

}

export default IpwatchNullRouteReducer
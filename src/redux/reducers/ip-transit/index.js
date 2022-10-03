const IpTransitReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Ip-Transist Cancel data
        case "GET_IPTRANSIT_CANCEL_LIST_REQUEST":
            return { ...state, isIpTransitCancelLoading: true }

        case "GET_IPTRANSIT_CANCEL_LIST_SUCCESS":
            return { ...state, ipTransitCancelList: action.payload.data, isIpTransitCancelLoading: false, ipTransitCancelError: "" }

        case "GET_IPTRANSIT_CANCEL_LIST_FAILURE":
            return { ...state, ipTransitCancelError: action.payload, ipTransitCancelList: "", isIpTransitCancelLoading: false }

        // Get Ip-Transist Active data
        case "GET_IPTRANSIT_ACTIVE_LIST_REQUEST":
            return { ...state, isIpTransitActiveLoading: true }

        case "GET_IPTRANSIT_ACTIVE_LIST_SUCCESS":
            return { ...state, ipTransitActiveList: action.payload.data, isIpTransitActiveLoading: false, ipTransitActiveListError: "" }

        case "GET_IPTRANSIT_ACTIVE_LIST_FAILURE":
            return { ...state, ipTransitActiveListError: action.payload, ipTransitActiveList: "", isIpTransitActiveLoading: false }


        // Add Ip-Transist Item
        case "ADD_IPTRANSIT_ITEM_REQUEST":
            return { ...state, isIpTransitAddLoading: true }

        case "ADD_IPTRANSIT_ITEM_SUCCESS":
            return { ...state, ipTransitItemAdd: action.payload, isIpTransitAddLoading: false, ipTransitItemAddError: "" }

        case "ADD_IPTRANSIT_ITEM_FAILURE":
            return { ...state, ipTransitItemAddError: action.payload.data.errors, ipTransitItemAdd: "", isIpTransitAddLoading: false }


        // Update Ip-Transist Item
        case "UPDATE_IPTRANSIT_ITEM_REQUEST":
            return { ...state, isIpTransitUpdateLoading: true }

        case "UPDATE_IPTRANSIT_ITEM_SUCCESS":
            return { ...state, ipTransitItemUpdate: action.payload, isIpTransitUpdateLoading: false, ipTransitItemUpdateError: "" }

        case "UPDATE_IPTRANSIT_ITEM_FAILURE":
            return { ...state, ipTransitItemUpdateError: action.payload, ipTransitItemUpdate: "", isIpTransitUpdateLoading: false }


        // Delete Ip-Transist Item
        case "DELETE_IPTRANSIT_ITEM_REQUEST":
            return { ...state, isIpTransitDeleteLoading: true }

        case "DELETE_IPTRANSIT_ITEM_SUCCESS":
            return { ...state, ipTransitItemDelete: action.payload, isIpTransitDeleteLoading: false, ipTransitItemDeleteError: "" }

        case "DELETE_IPTRANSIT_ITEM_FAILURE":
            return { ...state, ipTransitItemDeleteError: action.payload, ipTransitItemDelete: "", isIpTransitDeleteLoading: false }

        default: {
            return state
        }
    }

}

export default IpTransitReducer
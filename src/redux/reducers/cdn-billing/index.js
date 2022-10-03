const CDNListReducer = (state = {}, action) => {
    switch (action.type) {

        // Get CDN User data
        case "GET_CDN_USER_LIST_REQUEST":
            return { ...state, isCDNUserListLoading: true }

        case "GET_CDN_USER_LIST_SUCCESS":
            return { ...state, cdnUserList: action.payload.data, isCDNUserListLoading: false, cdnUserListError: "" }

        case "GET_CDN_USER_LIST_FAILURE":
            return { ...state, cdnUserListError: action.payload, cdnUserList: "", isCDNUserListLoading: false }

        // Get CDN Bill data
        case "GET_CDN_BILL_LIST_REQUEST":
            return { ...state, isCDNBillListLoading: true }

        case "GET_CDN_BILL_LIST_SUCCESS":
            return { ...state, cdnBillList: action.payload.data, isCDNBillListLoading: false, cdnBillListError: "" }

        case "GET_CDN_BILL_LIST_FAILURE":
            return { ...state, cdnBillListError: action.payload, cdnBillList: "", isCDNBillListLoading: false }


        default: {
            return state
        }
    }

}

export default CDNListReducer
const IpTransitExportReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Ip-Transist Cancel data
        case "GET_IPTRANSIT_EXPORT_LIST_REQUEST":
            return { ...state, isIpTransitExportLoading: true }

        case "GET_IPTRANSIT_EXPORT_LIST_SUCCESS":
            return { ...state, ipTransitExportList: action.payload.data, isIpTransitExportLoading: false, ipTransitExportError: "" }

        case "GET_IPTRANSIT_EXPORT_LIST_FAILURE":
            return { ...state, ipTransitExportError: action.payload, ipTransitExportList: "", isIpTransitExportLoading: false }

        
        default: {
            return state
        }
    }

}

export default IpTransitExportReducer
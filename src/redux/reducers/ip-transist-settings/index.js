const IpTransitSettingsReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Ip-Transist Provider List
        case "GET_IPTRANSIT_PROVIDERS_LIST_REQUEST":
            return { ...state, isIpTransitProviderLoading: true }

        case "GET_IPTRANSIT_PROVIDERS_LIST_SUCCESS":
            return { ...state, ipTransitProviderList: action.payload.data, isIpTransitProviderLoading: false, ipTransitProviderError: "" }

        case "GET_IPTRANSIT_PROVIDERS_LIST_FAILURE":
            return { ...state, ipTransitProviderError: action.payload, ipTransitProviderList: "", isIpTransitProviderLoading: false }


        // Add Ip-Transist Provider
        case "ADD_IPTRANSIT_PROVIDER_REQUEST":
            return { ...state, isProviderAddLoading: true }

        case "ADD_IPTRANSIT_PROVIDER_SUCCESS":
            return { ...state, ipTransitProviderAdd: action.payload, isProviderAddLoading: false, ipTransitProviderAddError: "" }

        case "ADD_IPTRANSIT_PROVIDER_FAILURE":
            return { ...state, ipTransitProviderAddError: action.payload.data.errors, ipTransitProviderAdd: "", isProviderAddLoading: false }


        // Update Ip-Transist Provider
        case "UPDATE_IPTRANSIT_PROVIDER_REQUEST":
            return { ...state, isProviderUpdateLoading: true }

        case "UPDATE_IPTRANSIT_PROVIDER_SUCCESS":
            return { ...state, ipTransitProviderUpdate: action.payload, isProviderUpdateLoading: false, ipTransitProviderUpdateError: "" }

        case "UPDATE_IPTRANSIT_PROVIDER_FAILURE":
            return { ...state, ipTransitProviderUpdateError: action.payload, ipTransitProviderUpdate: "", isProviderUpdateLoading: false }


        // Delete Ip-Transist Provider
        case "DELETE_IPTRANSIT_PROVIDER_REQUEST":
            return { ...state, isProviderDeleteLoading: true }

        case "DELETE_IPTRANSIT_PROVIDER_SUCCESS":
            return { ...state, ipTransitProviderDelete: action.payload, isProviderDeleteLoading: false, ipTransitProviderDeleteError: "" }

        case "DELETE_IPTRANSIT_PROVIDER_FAILURE":
            return { ...state, ipTransitProviderDeleteError: action.payload, ipTransitProviderDelete: "", isProviderDeleteLoading: false }

        default: {
            return state
        }
    }

}

export default IpTransitSettingsReducer
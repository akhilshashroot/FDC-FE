const NonPayReducer = (state = {}, action) => {
    switch (action.type) {

        // Clear NonPayment Data
        case "CLEAR_ALL_NONPAYMENT_REQUEST":
            return { ...state, allNonPayments: "", allNonPaymentsError: "" }

        // Get All NonPayment Data
        case "GET_ALL_NONPAYMENT_REQUEST":
            return { ...state, isAllNonPayLoading: true }

        case "GET_ALL_NONPAYMENT_SUCCESS":
            return { ...state, allNonPayments: action.payload.data, isAllNonPayLoading: false, allNonPaymentsError: "", total_count: action.payload.total }

        case "GET_ALL_NONPAYMENT_FAILURE":
            return { ...state, allNonPaymentsError: action.payload, allNonPayments: "", isAllNonPayLoading: false, total_count: "" }

        // Fetch a NonPayment Data
        case "FETCH_NONPAYMENT_REQUEST":
            return { ...state, fetchNonPaymentLoading: true }

        case "FETCH_NONPAYMENT_SUCCESS":
            return { ...state, nonPaymentsData: action.payload, fetchNonPaymentLoading: false, nonPaymentsDataError: "" }

        case "FETCH_NONPAYMENT_FAILURE":
            return { ...state, nonPaymentsDataError: action.payload, nonPaymentsData: "", fetchNonPaymentLoading: false }

        // Add NonPayment
        case "ADD_NONPAYMENT_REQUEST":
            return { ...state, addNonPaymentLoading: true }

        case "ADD_NONPAYMENT_SUCCESS":
            return { ...state, nonPaymentAddedSuccess: action.payload, addNonPaymentLoading: false, nonPaymentAddedError: "" }

        case "ADD_NONPAYMENT_FAILURE":
            return { ...state, nonPaymentAddedError: action.payload, nonPaymentAddedSuccess: "", addNonPaymentLoading: false }

        // Update NonPayment
        case "UPDATE_NONPAYMENT_REQUEST":
            return { ...state, updateNonPaymentLoading: true }

        case "UPDATE_NONPAYMENT_SUCCESS":
            return { ...state, nonPaymentUpdateSuccess: action.payload, updateNonPaymentLoading: false, nonPaymentUpdateError: "" }

        case "UPDATE_NONPAYMENT_FAILURE":
            return { ...state, nonPaymentUpdateError: action.payload, nonPaymentUpdateSuccess: "", updateNonPaymentLoading: false }

        // Delete NonPayment
        case "DELETE_NONPAYMENT_REQUEST":
            return { ...state, isNonPaymentDelete: true }

        case "DELETE_NONPAYMENT_SUCCESS":
            return { ...state, nonPaymentDeleted: action.payload, isNonPaymentDelete: false, nonPaymentDeletedError: "" }

        case "DELETE_NONPAYMENT_FAILURE":
            return { ...state, nonPaymentDeletedError: action.payload, nonPaymentDeleted: "", isNonPaymentDelete: false }

        default: {
            return state
        }
    }
}

export default NonPayReducer
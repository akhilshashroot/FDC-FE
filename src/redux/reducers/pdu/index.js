const PDUReducer = (state = {}, action) => {
  switch (action.type) {

    // Add PDU

    case "ADD_PDU_DATA_REQUEST": {
      return { ...state, isLoading: true }
    }
    case "ADD_PDU_DATA_SUCCESS":
      return {
        ...state,
        addedPdu: action.payload.data,
        addPduError: "",
        isLoading: false
      }
    case "ADD_PDU_DATA_ERROR": {
      return { ...state, addPduError: action.payload, addedPdu: "", isLoading: false }
    }

    // Get PDU

    case "GET_ALL_PDU_DATA_REQUEST":
      return { ...state, isAllPduLoading: true }

    case "GET_ALL_PDU_DATA_SUCCESS":
      return {
        ...state,
        allData: action.data,
        totalRecords: action.data.length,
        isAllPduLoading: false
        // sortIndex: getIndex(action.data, state.data, state.sortIndex)
      }

    case "GET_ALL_PDU_DATA_FAILURE": {
      return { ...state, allDataError: action.data, isAllPduLoading: false }
    }

    // Update PDU

    case "UPDATE_PDU_REQUEST": {
      return { ...state, isPduUpdating: true }
    }

    case "UPDATE_PDU_SUCCESS":
      return {
        ...state,
        pduUpdated: action.payload,
        isPduUpdating: false,
        pduUpdatedError :""
      }

    case "UPDATE_PDU_FAILURE": {
      return { ...state,pduUpdated: "", pduUpdatedError: action.payload, isPduUpdating: false }
    }


    // Get PDU Details

    case "GET_PDU_DETAILS_REQUEST":
      return { ...state, isPduDetails: true }

    case "GET_PDU_DETAILS_SUCCESS":
      return {
        ...state,
        isPduDetails: false,
        pduDetails: action.payload,
        pduDetailsError: ""
      }

    case "GET_PDU_DETAILS_FAILURE": {
      return { ...state, isPduDetails: false, pduDetails: "", pduDetailsError: action.payload, }
    }

    // Delete PDU 

    case "DELETE_PDU_REQUEST":
      return { ...state, isPduDelete: true }

    case "DELETE_PDU_SUCCESS":
      return {
        ...state,
        isPduDelete: false,
        pduDeleted: action.payload,
        pduDeletedError: ""
      }

    case "DELETE_PDU_FAILURE": {
      return { ...state, isPduDelete: false, pduDeleted: "", pduDeletedError: action.payload, }
    }

    default: {
      return state
    }
  }
}

export default PDUReducer
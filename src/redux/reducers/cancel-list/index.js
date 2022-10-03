const CancelListReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Cancel data
        case "GET_CANCEL_LIST_REQUEST":
            return { ...state, isCancelLoading: true }

        case "GET_CANCEL_LIST_SUCCESS":
            return { ...state, cancelList: action.payload.data, isCancelLoading: false, cancelListError: "" }

        case "GET_CANCEL_LIST_FAILURE":
            return { ...state, cancelListError: action.payload, cancelList: "", isCancelLoading: false }


         // Add Cancel Item
         case "ADD_CANCEL_ITEM_REQUEST":
            return { ...state, isCancelAddLoading: true }

        case "ADD_CANCEL_ITEM_SUCCESS":
            return { ...state, cancelItemAdd: action.payload, isCancelAddLoading: false, cancelItemAddError: "" }

        case "ADD_CANCEL_ITEM_FAILURE":
            return { ...state, cancelItemAddError: action.payload.data.errors, cancelItemAdd: "", isCancelAddLoading: false }

        // Update Cancel Item
         case "UPDATE_CANCEL_ITEM_REQUEST":
            return { ...state, isCancelUpdateLoading: true }

        case "UPDATE_CANCEL_ITEM_SUCCESS":
            return { ...state, cancelItemUpdate: action.payload, isCancelUpdateLoading: false, cancelItemUpdateError: "" }

        case "UPDATE_CANCEL_ITEM_FAILURE":
            return { ...state, cancelItemUpdateError: action.payload, cancelItemUpdate: "", isCancelUpdateLoading: false }

        // Delete Cancel Item
         case "DELETE_CANCEL_ITEM_REQUEST":
            return { ...state, isCancelDeleteLoading: true }

        case "DELETE_CANCEL_ITEM_SUCCESS":
            return { ...state, cancelItemDelete: action.payload, isCancelDeleteLoading: false, cancelItemDeleteError: "" }

        case "DELETE_CANCEL_ITEM_FAILURE":
            return { ...state, cancelItemDeleteError: action.payload, cancelItemDelete: "", isCancelDeleteLoading: false }

        default: {
            return state
        }
    }

}

export default CancelListReducer
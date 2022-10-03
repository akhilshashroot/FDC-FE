const IpwatchShoppingReducer = (state = {}, action) => {
    switch (action.type) {

        // Get Shopping data
        case "GET_SHOPPING_LIST_REQUEST":
            return { ...state, isShoppingLoading: true }

        case "GET_SHOPPING_LIST_SUCCESS":
            return { ...state, shoppingList: action.payload.data, isShoppingLoading: false, shoppingListError: "" }

        case "GET_SHOPPING_LIST_FAILURE":
            return { ...state, shoppingListError: action.payload, shoppingList: "", isShoppingLoading: false }

         // Get Shopping Locations
        case "GET_SHOPPING_LOCATION_REQUEST":
            return { ...state, isLocationLoading: true }

        case "GET_SHOPPING_LOCATION_SUCCESS":
            return { ...state, shoppingLocation: action.payload, isLocationLoading: false, shoppingLocationError: "" }

        case "GET_SHOPPING_LOCATION_FAILURE":
            return { ...state, shoppingLocationError: action.payload, shoppingLocation: "", isLocationLoading: false }

         // Add Shopping Item
         case "ADD_SHOPPING_ITEM_REQUEST":
            return { ...state, isShoppingAddLoading: true }

        case "ADD_SHOPPING_ITEM_SUCCESS":
            return { ...state, shoppingItemAdd: action.payload, isShoppingAddLoading: false, shoppingItemAddError: "" }

        case "ADD_SHOPPING_ITEM_FAILURE":
            return { ...state, shoppingItemAddError: action.payload.data.errors, shoppingItemAdd: "", isShoppingAddLoading: false }

        // Update Shopping Item
         case "UPDATE_SHOPPING_ITEM_REQUEST":
            return { ...state, isShoppingUpdateLoading: true }

        case "UPDATE_SHOPPING_ITEM_SUCCESS":
            return { ...state, shoppingItemUpdate: action.payload, isShoppingUpdateLoading: false, shoppingItemUpdateError: "" }

        case "UPDATE_SHOPPING_ITEM_FAILURE":
            return { ...state, shoppingItemUpdateError: action.payload, shoppingItemUpdate: "", isShoppingUpdateLoading: false }

        // Delete Shopping Item
         case "DELETE_SHOPPING_ITEM_REQUEST":
            return { ...state, isShoppingDeleteLoading: true }

        case "DELETE_SHOPPING_ITEM_SUCCESS":
            return { ...state, shoppingItemDelete: action.payload, isShoppingDeleteLoading: false, shoppingItemDeleteError: "" }

        case "DELETE_SHOPPING_ITEM_FAILURE":
            return { ...state, shoppingItemDeleteError: action.payload, shoppingItemDelete: "", isShoppingDeleteLoading: false }

        default: {
            return state
        }
    }

}

export default IpwatchShoppingReducer
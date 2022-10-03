const InventoryReducer = (state = {}, action) => {
    switch (action.type) {

        // Product List
        case "GET_INVENTORY_DATA_REQUEST": {
            return { ...state, isInventoryLoading: true }
        }
        case "GET_INVENTORY_DATA_SUCCESS":
            return {
                ...state,
                inventoryData: action.payload.data,
                isInventoryLoading: false,
                inventoryDataError: ""
            }
        case "GET_INVENTORY_DATA_ERROR": {
            return { ...state, inventoryDataError: action.payload,inventoryData: "", isInventoryLoading: false }
        }

        // Manufacture List
        case "GET_MANUFACTURES_REQUEST": {
            return { ...state, isManufactureLoading: true }
        }
        case "GET_MANUFACTURES_SUCCESS":
            return {
                ...state,
                manufactureData: action.payload.data,
                isManufactureLoading: false
            }
        case "GET_MANUFACTURES_ERROR": {
            return { ...state, manufactureDataError: action.payload, isManufactureLoading: false }
        }

        // Hardware List
        case "GET_HARDWARES_REQUEST": {
            return { ...state, isHardwareLoading: true }
        }
        case "GET_HARDWARES_SUCCESS":
            return {
                ...state,
                hardwareData: action.payload.data,
                isHardwareLoading: false
            }
        case "GET_HARDWARES_ERROR": {
            return { ...state, hardwareDataError: action.payload, isHardwareLoading: false }
        }

        // Brands List
        case "GET_BRANDS_REQUEST": {
            return { ...state, isBrandsLoading: true }
        }
        case "GET_BRANDS_SUCCESS":
            return {
                ...state,
                brandsData: action.payload.data,
                isBrandsLoading: false
            }
        case "GET_BRANDS_ERROR": {
            return { ...state, brandsDataError: action.payload, isBrandsLoading: false }
        }

        // Model Number List
        case "GET_MODEL_REQUEST": {
            return { ...state, isModelLoading: true }
        }
        case "GET_MODEL_SUCCESS":
            return {
                ...state,
                modelData: action.payload.data,
                isModelLoading: false
            }
        case "GET_MODEL_ERROR": {
            return { ...state, modelDataError: action.payload, isModelLoading: false }
        }

        // Size List
        case "GET_SIZE_REQUEST": {
            return { ...state, isSizeLoading: true }
        }
        case "GET_SIZE_SUCCESS":
            return {
                ...state,
                sizeData: action.payload.data,
                isSizeLoading: false
            }
        case "GET_SIZE_ERROR": {
            return { ...state, sizeDataError: action.payload, isSizeLoading: false }
        }

        // Add Inventory
        case "ADD_INVENTORY_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_INVENTORY_SUCCESS":
            return {
                ...state,
                inventoryCreated: action.payload.data,
                isLoading: false,
                inventoryCreatedError: ""
            }
        case "ADD_INVENTORY_ERROR": {
            return { ...state, inventoryCreatedError: action.payload, inventoryCreated: "", isLoading: false }
        }


        // Update Inventory
        case "UPDATE_INVENTORY_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_INVENTORY_CLEAR":
            return {
                ...state, inventoryUpdated: "", isLoading: "", inventoryUpdatedError: ""
            }
        case "UPDATE_INVENTORY_SUCCESS":
            return {
                ...state,
                inventoryUpdated: action.payload.response_message,
                isLoading: false,
                inventoryUpdatedError: ""
            }
        case "UPDATE_INVENTORY_ERROR": {
            return { ...state, inventoryUpdatedError: action.payload, inventoryUpdated: "", isLoading: false }
        }

        // Update Inventory Item
        case "UPDATE_INVENTORY_ITEM_REQUEST": {
            return { ...state, isLoading: true }
        }

        case "UPDATE_INVENTORY_ITEM_CLEAR":
            return {
                ...state, inventoryItemUpdated: "", isLoading: "", inventoryUpdatedItemError: ""
            }
        case "UPDATE_INVENTORY_ITEM_SUCCESS":
            return {
                ...state,
                inventoryItemUpdated: action.payload.response_message,
                isLoading: false,
                inventoryUpdatedItemError: ""
            }
        case "UPDATE_INVENTORY_ITEM_ERROR": {
            return { ...state, inventoryUpdatedItemError: action.payload, inventoryItemUpdated: "", isLoading: false }
        }



        // Add Brand
        case "ADD_BRAND_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_BRAND_SUCCESS":
            return {
                ...state,
                brandCreated: action.payload.data,
                isLoading: false
            }
        case "ADD_BRAND_ERROR": {
            return { ...state, brandCreatedError: action.payload, isLoading: false }
        }


        // Add Manufacture
        case "ADD_MANUFACTURE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_MANUFACTURE_SUCCESS":
            return {
                ...state,
                manufactureCreated: action.payload.data,
                isLoading: false
            }
        case "ADD_MANUFACTURE_ERROR": {
            return { ...state, manufactureCreatedError: action.payload, isLoading: false }
        }

        // Add Hardware
        case "ADD_HARDWARE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_HARDWARE_SUCCESS":
            return {
                ...state,
                hardwareCreated: action.payload.data,
                isLoading: false
            }
        case "ADD_HARDWARE_ERROR": {
            return { ...state, hardwareCreatedError: action.payload, isLoading: false }
        }

        // Add Model No
        case "ADD_MODEL_NO_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_MODEL_NO_SUCCESS":
            return {
                ...state,
                modelnoCreated: action.payload.data,
                isLoading: false
            }
        case "ADD_MODEL_NO_ERROR": {
            return { ...state, modelnoCreatedError: action.payload, isLoading: false }
        }

        // Add Size
        case "ADD_SIZE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "ADD_SIZE_SUCCESS":
            return {
                ...state,
                sizeCreated: action.payload.data,
                isLoading: false
            }
        case "ADD_SIZE_ERROR": {
            return { ...state, sizeCreatedError: action.payload, isLoading: false }
        }


        // Update Brand
        case "UPDATE_BRAND_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_BRAND_SUCCESS":
            return {
                ...state,
                brandUpdated: action.payload.data,
                isLoading: false
            }
        case "UPDATE_BRAND_ERROR": {
            return { ...state, brandUpdatedError: action.payload, isLoading: false }
        }


        // Update Manufacture
        case "UPDATE_MANUFACTURE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_MANUFACTURE_SUCCESS":
            return {
                ...state,
                manufactureUpdated: action.payload.data,
                isLoading: false
            }
        case "UPDATE_MANUFACTURE_ERROR": {
            return { ...state, manufactureUpdatedError: action.payload, isLoading: false }
        }

        // Update Hardware
        case "UPDATE_HARDWARE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_HARDWARE_SUCCESS":
            return {
                ...state,
                hardwareUpdated: action.payload.response_message,
                isLoading: false
            }
        case "UPDATE_HARDWARE_ERROR": {
            return { ...state, hardwareUpdatedError: action.payload, isLoading: false }
        }

        // Update Model No
        case "UPDATE_MODEL_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_MODEL_SUCCESS":
            return {
                ...state,
                modelUpdated: action.payload.data,
                isLoading: false
            }
        case "UPDATE_MODEL_ERROR": {
            return { ...state, modelUpdatedError: action.payload, isLoading: false }
        }

        // Update Size
        case "UPDATE_SIZE_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "UPDATE_SIZE_SUCCESS":
            return {
                ...state,
                sizeUpdated: action.payload.data,
                isLoading: false
            }
        case "UPDATE_SIZE_ERROR": {
            return { ...state, sizeUpdatedError: action.payload, isLoading: false }
        }

        // Delete Inventory
        case "DELETE_INVENTORY_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "DELETE_INVENTORY_SUCCESS":
            return {
                ...state,
                deletedSuccess: action.payload.response_message,
                isLoading: false,
                deletedError: ""
            }
        case "DELETE_INVENTORY_ERROR": {
            return { ...state, deletedError: action.payload, deletedSuccess: "", isLoading: false }
        }

        // Delete Inventory Item
        case "DELETE_INVENTORY_ITEM_REQUEST": {
            return { ...state, isLoading: true }
        }
        case "DELETE_INVENTORY_ITEM_SUCCESS":
            return {
                ...state,
                deletedItemSuccess: action.payload.response_message,
                isLoading: false,
                deletedItemError: ""
            }
        case "DELETE_INVENTORY_ITEM_ERROR": {
            return { ...state, deletedItemError: action.payload, deletedItemSuccess: "", isLoading: false }
        }

        // Fwtch Activity logs
        case "FETCH_LOG_REQUEST": {
            return { ...state, invLogLoading: true }
        }
        case "FETCH_LOG_SUCCESS":
            return {
                ...state,
                fetchLogSucces: action.payload.data,
                fetchLogError: "",
                invLogLoading: false
            }
        case "FETCH_LOG_ERROR": {
            return { ...state, fetchLogError: action.payload, fetchLogSucces: "", invLogLoading: false }
        }

        // Delete Hardware
        case "DELETE_HARDWARE_REQUEST": {
            return { ...state, isLoading: true, deletedHardwareError: "", deletedHardwareSuccess: "", deletedHardwareCopyError: "", }
        }
        case "DELETE_HARDWARE_SUCCESS":
            return {
                ...state,
                deletedHardwareSuccess: action.payload,
                isLoading: false,
                deletedHardwareError: "",
                deletedHardwareCopyError: ""
            }

        case "DELETE_HARDWARE_COPY_ERROR":
            return {
                ...state,
                deletedHardwareCopyError: action.payload,
                isLoading: false,
                deletedHardwareError: "",
                deletedHardwareSuccess: ""
            }
        case "DELETE_HARDWARE_ERROR": {
            return { ...state, deletedHardwareError: action.payload, deletedHardwareSuccess: "", deletedHardwareCopyError: "", isLoading: false }
        }

        // Delete Manufacture
        case "DELETE_MANUFACTURE_REQUEST": {
            return { ...state, isLoading: true, deletedManufactureError: "", deletedManufactureSuccess: "", deletedManufactureCopyError: "" }
        }
        case "DELETE_MANUFACTURE_SUCCESS":
            return {
                ...state,
                deletedManufactureSuccess: action.payload,
                isLoading: false,
                deletedManufactureError: ""
            }
        case "DELETE_MANUFACTURE_COPY_ERROR":
            return {
                ...state,
                deletedManufactureCopyError: action.payload,
                isLoading: false,
                deletedManufactureError: "",
                deletedManufactureSuccess: ""
            }
        case "DELETE_MANUFACTURE_ERROR": {
            return { ...state, deletedManufactureError: action.payload, deletedManufactureSuccess: "", deletedManufactureCopyError: "", isLoading: false }
        }

        // Delete Brand
        case "DELETE_BRAND_REQUEST": {
            return { ...state, isLoading: true, deletedBrandError: "", deletedBrandSuccess: "", }
        }
        case "DELETE_BRAND_SUCCESS":
            return {
                ...state,
                deletedBrandSuccess: action.payload,
                isLoading: false,
                deletedBrandError: ""
            }
        case "DELETE_BRAND_ERROR": {
            return { ...state, deletedBrandError: action.payload, deletedBrandSuccess: "", isLoading: false }
        }

        // Delete Model_Number
        case "DELETE_MODEL_REQUEST": {
            return { ...state, isLoading: true, deletedModelError: "", deletedModelSuccess: "", }
        }
        case "DELETE_MODEL_SUCCESS":
            return {
                ...state,
                deletedModelSuccess: action.payload,
                isLoading: false,
                deletedModelError: ""
            }
        case "DELETE_MODEL_ERROR": {
            return { ...state, deletedModelError: action.payload, deletedModelSuccess: "", isLoading: false }
        }

        // Delete Size
        case "DELETE_SIZE_REQUEST": {
            return { ...state, isLoading: true, deletedSizeError: "", deletedSizeSuccess: "", }
        }
        case "DELETE_SIZE_SUCCESS":
            return {
                ...state,
                deletedSizeSuccess: action.payload,
                isLoading: false,
                deletedSizeError: ""
            }
        case "DELETE_SIZE_ERROR": {
            return { ...state, deletedSizeError: action.payload, deletedSizeSuccess: "", isLoading: false }
        }


        default: {
            return state
        }
    }
}

export default InventoryReducer
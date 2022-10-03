const IpwatchShipmentReducer = (state = {}, action) => {
    switch (action.type) {

        // Locations
        case "GET_SHIPMENT_LOCATION_DATA_REQUEST":
            return {
              ...state,
              isLoading: true
            }
          case "GET_SHIPMENT_LOCATION_DATA_SUCCESS":
            return {
              ...state,
              allData: action.data,
              totalRecords: action.data.length,
            //   sortIndex: getIndex(action.data, state.data, state.sortIndex),
              isLoading: false
            }
          case "GET_SHIPMENT_LOCATION_DATA_FAILURE":
            return {
              ...state,
              isLoading: false,
              allDataError: action.data
            }
        // Carriers
        case "GET_SHIPMENT_CARRIER_DATA_REQUEST":
            return {
              ...state,
              isLoading: true
            }
          case "GET_SHIPMENT_CARRIER_DATA_SUCCESS":
            return {
              ...state,
              carrrierData: action.data,
              carriertotalRecords: action.data.length,
            //   sortIndex: getIndex(action.data, state.data, state.sortIndex),
              isLoading: false
            }
          case "GET_SHIPMENT_CARRIER_DATA_FAILURE":
            return {
              ...state,
              isLoading: false,
              carrierDataError: action.data
            }

        // Clear Shipment Data
        case "CLEAR_ALL_SHIPMENTS_REQUEST":
            return {...state,allShipments : "", allShipmentsError: ""}

        // Get All Shipments Data
        case "GET_ALL_SHIPMENTS_REQUEST":
            return { ...state, isAllShipmentLoading: true }

        case "GET_ALL_SHIPMENTS_SUCCESS":
            return { ...state, allShipments: action.payload.data, isAllShipmentLoading: false, allShipmentsError: "", total_count : action.payload.total}

        case "GET_ALL_SHIPMENTS_FAILURE":
            return { ...state, allShipmentsError: action.payload, allShipments: "", isAllShipmentLoading: false, total_count:"" }

        // Fetch a Shipment Data
        case "FETCH_SHIPMENT_REQUEST":
            return { ...state, fetchShipmentLoading: true }

        case "FETCH_SHIPMENT_SUCCESS":
            return { ...state, shipmentData: action.payload, fetchShipmentLoading: false, shipmentDataError: "" }

        case "FETCH_SHIPMENT_FAILURE":
            return { ...state, shipmentDataError: action.payload, shipmentData: "", fetchShipmentLoading: false }

        // Add Shipment
        case "ADD_SHIPMENT_REQUEST":
            return { ...state, addShipmentLoading: true }

        case "ADD_SHIPMENT_SUCCESS":
            return { ...state, shipmentAddedSuccess: action.payload, addShipmentLoading: false, shipmentAddedError: "" }

        case "ADD_SHIPMENT_FAILURE":
            return { ...state, shipmentAddedError: action.payload, shipmentAddedSuccess: "", addShipmentLoading: false }

        // Update Shipment
        case "UPDATE_SHIPMENT_REQUEST":
            return { ...state, updateShipmentLoading: true }

        case "UPDATE_SHIPMENT_SUCCESS":
            return { ...state, shipmentUpdateSuccess: action.payload, updateShipmentLoading: false, shipmentUpdateError: "" }

        case "UPDATE_SHIPMENT_FAILURE":
            return { ...state, shipmentUpdateError: action.payload, shipmentUpdateSuccess: "", updateShipmentLoading: false }

            
     // Update Shipment Staus
     case "UPDATE_SHIPMENT_STATUS_REQUEST":
        return { ...state, updateShipmentStatusLoading: true }

    case "UPDATE_SHIPMENT_STATUS_SUCCESS":
        return { ...state, shipmentStatusUpdateSuccess: action.payload, updateShipmentStatusLoading: false, shipmentStatusUpdateError: "" }

    case "UPDATE_SHIPMENT_STATUS_FAILURE":
        return { ...state, shipmentStatusUpdateError: action.payload, shipmentStatusUpdateSuccess: "", updateShipmentStatusLoading: false }

        // Delete Shipment
        case "DELETE_SHIPMENT_REQUEST":
            return { ...state, isShipmentDelete: true }

        case "DELETE_SHIPMENT_SUCCESS":
            return { ...state, shipmentDeleted: action.payload, isShipmentDelete: false, shipmentDeletedError: "" }

        case "DELETE_SHIPMENT_FAILURE":
            return { ...state, shipmentDeletedError: action.payload, shipmentDeleted: "", isShipmentDelete: false }

        default: {
            return state
        }
    }
}

export default IpwatchShipmentReducer
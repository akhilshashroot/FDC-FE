const QarentineDevicesReducer = (state = {}, action) => {
    switch (action.type) {

        // Get device list
        case "GET_DEVICE_LIST_REQUEST":
            return { ...state, isDeviceLoading: true }

        case "GET_DEVICE_LIST_SUCCESS":
            return { ...state, deviceList: action.payload.devices, isDeviceLoading: false, deviceListError: "" }

        case "GET_DEVICE_LIST_FAILURE":
            return { ...state, deviceListError: action.payload, deviceList: "", isDeviceLoading: false }


        // Delete device
        case "DELETE_DEVICE_REQUEST":
            return { ...state, isDeviceDeleteLoading: true }

        case "DELETE_DEVICE_SUCCESS":
            return { ...state, deviceDelete: action.payload, isDeviceDeleteLoading: false, deviceDeleteError: "" }

        case "DELETE_DEVICE_FAILURE":
            return { ...state, deviceDeleteError: action.payload, deviceDelete: "", isDeviceDeleteLoading: false }


        // DeleteAll devices
        case "DELETE_ALL_DEVICE_REQUEST":
            return { ...state, isAllDeviceDeleteLoading: true }

        case "DELETE_ALL_DEVICE_SUCCESS":
            return { ...state, allDeviceDelete: action.payload, isAllDeviceDeleteLoading: false, allDeviceDeleteError: "" }

        case "DELETE_ALL_DEVICE_FAILURE":
            return { ...state, allDeviceDeleteError: action.payload, allDeviceDelete: "", isAllDeviceDeleteLoading: false }

                    // Get Quarantine Activity log
        case "GET_QUARANTINE_LOG_REQUEST":
            return { ...state, isLogLoading: true }

        case "GET_QUARANTINE_LOG_SUCCESS":
            return { ...state, logData: action.payload, isLogLoading: false, logDataError: "" }

        case "GET_QUARANTINE_LOG_FAILURE":
            return { ...state, logDataError: action.payload, logData: "", isLogLoading: false }

        default: {
            return state
        }
    }

}

export default QarentineDevicesReducer
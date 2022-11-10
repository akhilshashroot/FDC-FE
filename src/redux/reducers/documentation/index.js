const DocumentReducer = (state = {}, action) => {
  
  switch (action.type) {
  
    // Add New Image
    case "ADD_DOCUMENT_IMAGE_REQUEST": {
      return { ...state, isLoading: true };
    }
    case "ADD_DOCUMENT_IMAGE_SUCCESS":{
      return {
        ...state,
        fileUrl: action.payload.data,
        isLoading: false,
      };
    }
    case "ADD_DOCUMENT_IMAGE_ERROR": {
      return {
        ...state,
        fileUrl:"",
        isLoading: false,
      };
    }

    // Add New Document

    case "ADD_DOCUMENT_REQUEST": {
      return { ...state, isLoading: true };
    }
    case "ADD_DOCUMENT_SUCCESS":
      return {
        ...state,
        addedDocument: action.payload.data,
        isLoading: false,
        addDocumentError: "",
      };

    case "ADD_DOCUMENT_ERROR": {
      return {
        ...state,
        addDocumentError: action.payload,
        addedDocument: "",
        isLoading: false,
      };
    }

    // Get All Document

    case "GET_ALL_DOCUMENT_REQUEST": {
      return { ...state, allDocumentLoading: true };
    }

    case "GET_ALL_DOCUMENT_DATA_SUCCESS":
      return {
        ...state,
        allDocumentData: action.data.data,
        totalRecords: action.data.data.length,
        allDocumentLoading: false,
      };
    case "GET_ALL_DOCUMENT_FAILURE": {
      return {
        ...state,
        allDocumentData: action.data,
        allDocumentLoading: false,
      };
    }

    // Get Particular Document

    case "GET_DOCUMENT_REQUEST": {
      return { ...state, documentDataLoading: true };
    }

    case "GET_DOCUMENT_DATA":
      return {
        ...state,
        particularDocumentData: action.data.data[0],
        totalRecords: action.data.data.length,
        documentDataLoading: false,
      };
    case "GET_DOCUMENT_FAILURE": {
      return {
        ...state,
        particularDocumentDataFailure: action.data,
        documentDataLoading: false,
      };
    }

    // Update Document

    case "UPDATE_DOCUMENT_REQUEST": {
      return { ...state, documentDataLoading: true };
    }

    case "UPDATE_DOCUMENT_SUCCESS":
      return {
        ...state,
        documentUpdatedSuccess: action.payload.data,
        documentDataLoading: false,
      };

    case "UPDATE_DOCUMENT_ERROR": {
      return {
        ...state,
        documentUpdatedError: action.payload,
        documentDataLoading: false,
      };
    }

    // Delete Document
    case "DELETE_DOCUMENT_REQUEST":
      return {
        ...state,
        isDocumentDelete: true,
      };

    case "DELETE_DOCUMENT_SUCCESS":
      return {
        ...state,
        documentDeleted: action.payload,
        isDocumentDelete: false,
        documentDeletedError: "",
      };

    case "DELETE_DOCUMENT_FAILURE":
      return {
        ...state,
        documentDeletedError: action.payload,
        documentDeleted: "",
        isDocumentDelete: false,
      };

    default: {
      return state;
    }
  }
};

export default DocumentReducer;
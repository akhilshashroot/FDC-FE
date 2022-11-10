const KbaseReducer = (state = {}, action) => {
  switch (action.type) {
    // Add New Image
    case "ADD_KBASE_IMAGE_REQUEST": {
      return { ...state, isLoading: true };
    }
    case "ADD_KBASE_IMAGE_SUCCESS":
      return {
        ...state,
        fileUrl: action.payload.data,
        isLoading: false,
      };

    case "ADD_KBASE_IMAGE_ERROR": {
      return {
        ...state,
        fileUrl: "",
        isLoading: false,
      };
    }
    // Add New Article

    case "ADD_ARTICLE_REQUEST": {
      return { ...state, isLoading: true };
    }
    case "ADD_ARTICLE_SUCCESS":
      return {
        ...state,
        addedArticle: action.payload.data,
        isLoading: false,
        addServerError: "",
      };

    case "ADD_ARTICLE_ERROR": {
      return {
        ...state,
        addArticleError: action.payload,
        addedArticle: "",
        isLoading: false,
      };
    }

    // Get All Article

    case "GET_ALL_ARTICLE_REQUEST": {
      return { ...state, allArticleLoading: true };
    }

    case "GET_ALL_ARTICLE_DATA_SUCCESS":
      return {
        ...state,
        allKbaseData: action.data.data,
        totalRecords: action.data.data.length,
        allArticleLoading: false,
      };
    case "GET_ALL_ARTICLE_FAILURE": {
      return { ...state, allKbaseData: action.data, allArticleLoading: false };
    }

    // Get Particular Article

    case "GET_KBASE_ARTICLE_REQUEST": {
      return { ...state, articleDataLoading: true };
    }

    case "GET_KBASE_ARTICLE_DATA":
      return {
        ...state,
        allKbaseArticleData: action.data.data[0],
        totalRecords: action.data.data.length,
        articleDataLoading: false,
      };
    case "GET_KBASE_ARTICLE_FAILURE": {
      return {
        ...state,
        allKbaseArticleData: action.data,
        articleDataLoading: false,
      };
    }

    // Update Article

    case "UPDATE_ARTICLE_REQUEST": {
      return { ...state, articleDataLoading: true };
    }

    case "UPDATE_ARTICLE_SUCCESS":
      return {
        ...state,
        articleUpdatedSuccess: action.payload.data,
        articleDataLoading: false,
      };

    case "UPDATE_ARTICLE_ERROR": {
      return {
        ...state,
        articleUpdatedError: action.payload,
        articleDataLoading: false,
      };
    }

    // Delete Article
    case "DELETE_ARTICLE_REQUEST":
      return {
        ...state,
        isArticleDelete: true,
      };

    case "DELETE_ARTICLE_SUCCESS":
      return {
        ...state,
        articleDeleted: action.payload,
        isArticleDelete: false,
        articleDeletedError: "",
      };

    case "DELETE_ARTICLE_FAILURE":
      return {
        ...state,
        articleDeletedError: action.payload,
        articleDeleted: "",
        isArticleDelete: false,
      };

    // Categories

    // Add New Category

    case "ADD_CATEGORY_REQUEST": {
      return { ...state, categoryLoading: true };
    }
    case "ADD_CATEGORY_SUCCESS":
      return {
        ...state,
        addedCategory: action.payload,
        categoryLoading: false,
        addCategoryError: "",
      };

    case "ADD_CATEGORY_ERROR": {
      return {
        ...state,
        addCategoryError: action.payload,
        addedCategory: "",
        categoryLoading: false,
      };
    }

    // Get All Category

    case "GET_ALL_CATEGORY_REQUEST": {
      return { ...state, allCategoryLoading: true };
    }

    case "GET_ALL_CATEGORY_DATA_SUCCESS":
      return {
        ...state,
        allCategory: action.data,
        allCategoryError: "",
        allCategoryLoading: false,
      };
    case "GET_ALL_CATEGORY_FAILURE": {
      return {
        ...state,
        allCategory: "",
        allCategoryError: action.data,
        allCategoryLoading: false,
      };
    }

    // Update Category

    case "UPDATE_CATEGORY_REQUEST": {
      return { ...state, categoryDataLoading: true };
    }

    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        categoryUpdatedSuccess: action.payload,
        categoryUpdatedError: "",
        categoryDataLoading: false,
      };

    case "UPDATE_CATEGORY_ERROR": {
      return {
        ...state,
        categoryUpdatedError: action.payload,
        categoryUpdatedSuccess: "",
        categoryDataLoading: false,
      };
    }

    // Delete Category
    case "DELETE_CATEGORY_REQUEST":
      return {
        ...state,
        isCategoryDelete: true,
      };

    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        categoryDeleted: action.payload,
        isCategoryDelete: false,
        categoryDeletedError: "",
      };

    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        categoryDeletedError: action.payload,
        categoryDeleted: "",
        isCategoryDelete: false,
      };

    default: {
      return state;
    }
  }
};

export default KbaseReducer;
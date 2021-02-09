import { PRODUCTS } from "../constants";

const initialState = {
  products: [],
  fetchingProducts: false,
  addingProduct: false,
  errors: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS.FETCH_PRODUCTS_STARTED: {
      return {
        ...state,
        fetchingProducts: true,
      };
    }
    case PRODUCTS.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: action.payload,
        fetchingProducts: false,
      };
    }
    case PRODUCTS.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        fetchingProducts: false,
      };
    }
    case PRODUCTS.ADD_PRODUCT_STARTED: {
      return {
        ...state,
        addingProduct: true,
      };
    }
    case PRODUCTS.ADD_PRODUCT_SUCCESS: {
      const updatedProducts = state.products || [];
      updatedProducts.push(action.payload);
      return {
        ...state,
        products: updatedProducts,
        addingProduct: false,
      };
    }
    case PRODUCTS.ADD_PRODUCT_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        addingProduct: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default productReducer;

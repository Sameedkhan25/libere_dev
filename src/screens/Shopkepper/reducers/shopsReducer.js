import SHOP from "../constants";

const initialState = {
  shops: [],
  fetchingShops: false,
  addingShop: false,
  errors: [],
};
const shopsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOP.FETCH_SHOPS_STARTED: {
      return {
        ...state,
        fetchingShops: true,
      };
    }
    case SHOP.FETCH_SHOPS_SUCCESS: {
      return {
        ...state,
        shops: action.payload,
        fetchingShops: false,
      };
    }
    case SHOP.FETCH_SHOPS_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        fetchingShops: false,
      };
    }
    case SHOP.REGISTER_SHOP_STARTED: {
      return {
        ...state,
        addingShop: true,
      };
    }
    case SHOP.REGISTER_SHOP_SUCCESS: {
      const updatedShops = state.shops || [];
      updatedShops.push(action.payload);
      return {
        ...state,
        shops: updatedShops,
        addingShop: false,
      };
    }
    case SHOP.REGISTER_SHOP_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        addingShop: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default shopsReducer;

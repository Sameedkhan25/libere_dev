import { WALLET } from "../constants";

const initialState = {
  wallet: null,
  fetchingWallet: false,
  updatingWallet: false,
  errors: [],
};
const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET.FETCH_WALLET_STARTED: {
      return {
        ...state,
        fetchingWallet: true,
      };
    }
    case WALLET.FETCH_WALLET_SUCCESS: {
      return {
        ...state,
        wallet: action.payload,
        fetchingWallet: false,
      };
    }
    case WALLET.FETCH_WALLET_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        fetchingWallet: false,
      };
    }
    case WALLET.UPDATE_WALLET_STARTED: {
      return {
        ...state,
        updatingWallet: true,
      };
    }
    case WALLET.UPDATE_WALLET_SUCCESS: {
      return {
        ...state,
        wallet: action.payload,
        updatingWallet: false,
      };
    }
    case WALLET.UPDATE_WALLET_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        updatingWallet: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default walletReducer;

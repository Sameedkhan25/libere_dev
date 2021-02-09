import AUTH from "../constants";

const initialState = {
  user: null,
  appInitialized: false,
  fetchingUser: false,
  signingUp: false,
  loggingIn: false,
  loggingOut: false,
  errors: [],
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH.FETCH_AUTH_STARTED: {
      return {
        ...state,
        fetchingUser: true,
      };
    }
    case AUTH.FETCH_AUTH_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
        appInitialized: true,
      };
    }
    case AUTH.FETCH_AUTH_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        fetchingUser: false,
      };
    }
    case AUTH.LOGIN_STARTED: {
      return {
        ...state,
        loggingIn: true,
      };
    }
    case AUTH.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loggingIn: false,
      };
    }
    case AUTH.LOGIN_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        loggingIn: false,
      };
    }
    case AUTH.SIGNUP_STARTED: {
      return {
        ...state,
        signingUp: true,
      };
    }
    case AUTH.SIGNUP_SUCCESS: {
      return {
        ...state,
        signingUp: false,
      };
    }
    case AUTH.SIGNUP_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        signingUp: false,
      };
    }
    case AUTH.LOGOUT_STARTED: {
      return {
        ...state,
        loggingOut: true,
      };
    }
    case AUTH.LOGOUT_SUCCESS: {
      return {
        ...state,
        user: null,
        loggingOut: false,
      };
    }
    case AUTH.LOGOUT_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        loggingOut: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default authReducer;

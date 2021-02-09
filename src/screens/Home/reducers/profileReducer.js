import PROFILE from "../constants";

const initialState = {
  profile: null,
  fetchingProfile: false,
  updatingProfile: false,
  errors: [],
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.FETCH_PROFILE_STARTED: {
      return {
        ...state,
        fetchingProfile: true,
      };
    }
    case PROFILE.FETCH_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        fetchingProfile: false,
      };
    }
    case PROFILE.FETCH_PROFILE_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        fetchingProfile: false,
      };
    }
    case PROFILE.UPDATE_PROFILE_STARTED: {
      return {
        ...state,
        updatingProfile: true,
      };
    }
    case PROFILE.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        updatingProfile: false,
      };
    }
    case PROFILE.UPDATE_PROFILE_FAILURE: {
      return {
        ...state,
        errors: action.errors,
        updatingProfile: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default profileReducer;

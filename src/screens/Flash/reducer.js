import FLASH from "./constants";

const initialState = {
  flashOn: null,
  text: "",
};
const flashReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLASH.FLASH_ON: {
      return {
        ...state,
        flashOn: true,
        text: action.payload,
      };
    }
    case FLASH.FLASH_OFF: {
      return {
        ...state,
        flashOn: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default flashReducer;

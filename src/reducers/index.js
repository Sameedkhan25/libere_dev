import { combineReducers } from "redux";
import authReducer from "../screens/Auth/reducers/authReducer";
import flashReducer from "../screens/Flash/reducer";
import shopReducer from "../screens/Shopkepper/reducers/shopsReducer";
import {
  productReducer,
  profileReducer,
  walletReducer,
} from "../screens/Home/reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  flash: flashReducer,
  product: productReducer,
  profile: profileReducer,
  wallet: walletReducer,
  shop: shopReducer,
});

export default rootReducer;

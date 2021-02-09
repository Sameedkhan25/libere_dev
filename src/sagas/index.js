import { all } from "redux-saga/effects";
import {
  watchFetchUser,
  watchUserSignup,
  watchUserLogin,
  watchUserLogout,
} from "../screens/Auth/sagas";
import { watchChangeFlash } from "../screens/Flash/saga";
import {
  watchAddProduct,
  watchFetchProducts,
  watchFetchProfile,
  watchUpdateProfile,
  watchFetchWallet,
  watchUpdateWallet,
} from "../screens/Home/sagas";
import { watchAddShop, watchFetchShops } from "../screens/Shopkepper/sagas";
import { watchMakePayment } from "../screens/Scanner/sagas";

export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchUserSignup(),
    watchUserLogin(),
    watchUserLogout(),
    watchChangeFlash(),
    watchAddProduct(),
    watchFetchProducts(),
    watchFetchProfile(),
    watchUpdateProfile(),
    watchFetchWallet(),
    watchUpdateWallet(),
    watchAddShop(),
    watchFetchShops(),
    watchMakePayment(),
  ]);
}

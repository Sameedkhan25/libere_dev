import { put, call, takeLatest } from "redux-saga/effects";
import SHOPS from "./constants";
import FLASH from "../Flash/constants";

import { fetchShops, addShop } from "./helpers";

/** Add Shop*/
function* addShopAsync(action) {
  yield put({ type: SHOPS.REGISTER_SHOP_STARTED });

  try {
    const userToken = yield call(addShop, action.payload);
    yield put({ type: SHOPS.REGISTER_SHOP_SUCCESS, payload: userToken });
  } catch (err) {
    console.log(err);
    yield put({
      type: SHOPS.REGISTER_SHOP_FAILURE,
      errors: [err.toString()],
    });
    yield put({ type: FLASH.FLASH, payload: "ERROR FETCHING USER TOKEN" });
  }
}

function* watchAddShop() {
  yield takeLatest(SHOPS.REGISTER_SHOP, addShopAsync);
}

/** Fetch Shops */

function* fetchShopsAsync(action) {
  yield put({ type: SHOPS.FETCH_SHOPS_STARTED });
  try {
    const shops = yield call(fetchShops, action.payload);
    yield put({ type: SHOPS.FETCH_SHOPS_SUCCESS, payload: shops });
    yield put({ type: FLASH.FLASH, payload: "Signed up!" });
  } catch (err) {
    yield put({ type: SHOPS.FETCH_SHOPS_FAILURE, errors: [err.toString()] });
    yield put({ type: FLASH.FLASH, payload: err.toString() });
  }
}

function* watchFetchShops() {
  yield takeLatest(SHOPS.FETCH_SHOPS, fetchShopsAsync);
}

export { watchAddShop, watchFetchShops };

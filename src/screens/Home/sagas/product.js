import { put, call, takeLatest } from "redux-saga/effects";
import { PRODUCTS, WALLET } from "../constants";
import { fetchProducts, addOwnerToProduct } from "../helpers";
import FLASH from "../../Flash/constants";

/** fetch product */
function* fetchProductsAsync(action) {
  yield put({ type: PRODUCTS.FETCH_PRODUCTS_STARTED });

  try {
    const products = yield call(fetchProducts, action.payload);
    yield put({ type: PRODUCTS.FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (err) {
    console.log(err);
    yield put({
      type: PRODUCTS.FETCH_PRODUCTS_FAILURE,
      errors: [err.toString()],
    });

    yield put({
      type: FLASH.FLASH,
      payload: err.toString(),
    });
  }
}

function* watchFetchProducts() {
  yield takeLatest(PRODUCTS.FETCH_PRODUCTS, fetchProductsAsync);
}

/** add product*/

function* addProductAsync(action) {
  yield put({ type: PRODUCTS.ADD_PRODUCT_STARTED });
  try {
    const response = yield call(addOwnerToProduct, action.payload);
    yield put({
      type: PRODUCTS.ADD_PRODUCT_SUCCESS,
      payload: response.product,
    });
    yield put({ type: WALLET.FETCH_WALLET, payload: action.payload.ownerId });

    yield put({
      type: FLASH.FLASH,
      payload: `Added Successfull! Reward ${response.reward} Coins`,
    });
  } catch (err) {
    yield put({
      type: PRODUCTS.ADD_PRODUCT_FAILURE,
      errors: [err.toString()],
    });

    yield put({
      type: FLASH.FLASH,
      payload: err.toString(),
    });
  }
}

function* watchAddProduct() {
  yield takeLatest(PRODUCTS.ADD_PRODUCT, addProductAsync);
}

export { watchFetchProducts, watchAddProduct };

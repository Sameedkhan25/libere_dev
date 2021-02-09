import { put, call, takeLatest } from "redux-saga/effects";
import { WALLET } from "../constants";
import { fetchWallet, updateWallet } from "../helpers";

/** fetch wallet */
function* fetchWalletAsync(action) {
  yield put({ type: WALLET.FETCH_WALLET_STARTED });

  try {
    const profile = yield call(fetchWallet, action.payload);
    yield put({ type: WALLET.FETCH_WALLET_SUCCESS, payload: profile });
  } catch (err) {
    console.log(err);
    yield put({
      type: WALLET.FETCH_WALLET_FAILURE,
      errors: ["ERROR FETCHING USER WALLET"],
    });
  }
}

function* watchFetchWallet() {
  yield takeLatest(WALLET.FETCH_WALLET, fetchWalletAsync);
}

/** update wallet*/

function* updateWalletAsync(action) {
  yield put({ type: WALLET.UPDATE_WALLET_STARTED });
  try {
    const response = yield call(updateWallet, action.payload.id);
    yield put({ type: WALLET.UPDATE_WALLET_SUCCESS, payload: response });
  } catch (err) {
    yield put({
      type: WALLET.UPDATE_WALLET_FAILURE,
      errors: ["Error Signing user up"],
    });
  }
}

function* watchUpdateWallet() {
  yield takeLatest(WALLET.UPDATE_WALLET, updateWalletAsync);
}

export { watchFetchWallet, watchUpdateWallet };

import { put, call, takeLatest } from "redux-saga/effects";
import PAYMENT from "./constants";
import FLASH from "../Flash/constants";
import { WALLET } from "../Home/constants";
import { makePayment } from "./helpers";

/** Make Payment*/
function* makePaymentAsync(action) {
  yield put({ type: PAYMENT.PAYMENT_STARTED });

  try {
    const updatedWallet = yield call(makePayment, action.payload);
    console.log(updatedWallet, "payment success");
    yield put({ type: PAYMENT.PAYMENT_SUCCESS });
    yield put({ type: WALLET.UPDATE_WALLET_SUCCESS, payload: updatedWallet });
    yield put({ type: FLASH.FLASH, payload: "Successfully Paid!" });
    if (action.successCb) {
      action.successCb();
    }
  } catch (err) {
    console.log(err);
    yield put({
      type: PAYMENT.PAYMENT_FAILURE,
      errors: [err.toString()],
    });
    yield put({ type: FLASH.FLASH, payload: err.toString() });
  }
}

function* watchMakePayment() {
  yield takeLatest(PAYMENT.PAYMENT, makePaymentAsync);
}

export { watchMakePayment };

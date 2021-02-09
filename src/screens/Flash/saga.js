import { put, call, takeLatest } from "redux-saga/effects";
import FLASH from "./constants";

const timeOut = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      return;
    }, 5000);
  });
};

/** change flash */
function* changeFlashAsync(action) {
  yield put({ type: FLASH.FLASH_ON, payload: action.payload });
  yield call(timeOut, action.payload);
  yield put({ type: FLASH.FLASH_OFF });
}

function* watchChangeFlash() {
  yield takeLatest(FLASH.FLASH, changeFlashAsync);
}

export { watchChangeFlash };

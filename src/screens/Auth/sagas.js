import { put, call, takeLatest } from "redux-saga/effects";
import AUTH from "./constants";
import FLASH from "../Flash/constants";

import { getCurrentUser, userLogin, userSignup, userLogout } from "./helpers";

/** FETCH USER TOKEN */
function* fetchUserAsync() {
  yield put({ type: AUTH.FETCH_AUTH_STARTED });

  try {
    const userToken = yield call(getCurrentUser);
    yield put({ type: AUTH.FETCH_AUTH_SUCCESS, payload: userToken });
  } catch (err) {
    console.log(err);
    yield put({
      type: AUTH.FETCH_AUTH_FAILURE,
      errors: [err.toString()],
    });
    yield put({ type: FLASH.FLASH, payload: "ERROR FETCHING USER TOKEN" });
  }
}

function* watchFetchUser() {
  yield takeLatest(AUTH.FETCH_AUTH, fetchUserAsync);
}

/** User SIGN UP */

function* userSignupAsync(action) {
  yield put({ type: AUTH.SIGNUP_STARTED });
  try {
    yield call(userSignup, action.payload);
    yield put({ type: AUTH.SIGNUP_SUCCESS });
    yield put({ type: FLASH.FLASH, payload: "Signed up!" });
  } catch (err) {
    yield put({ type: AUTH.SIGNUP_FAILURE, errors: [err.toString()] });
    yield put({ type: FLASH.FLASH, payload: err.toString() });
  }
}

function* watchUserSignup() {
  yield takeLatest(AUTH.SIGNUP, userSignupAsync);
}

/** User Login */

function* userLoginAsync(action) {
  yield put({ type: AUTH.LOGIN_STARTED });
  try {
    const loginUserRes = yield call(userLogin, action.payload);
    yield put({ type: AUTH.LOGIN_SUCCESS, payload: loginUserRes });
    yield put({ type: FLASH.FLASH, payload: "Logged In Successful" });
  } catch (err) {
    console.log("login error", err.toString());
    yield put({
      type: AUTH.LOGIN_FAILURE,
      errors: [err.toString()],
    });

    yield put({ type: FLASH.FLASH, payload: err.toString() });
  }
}

function* watchUserLogin() {
  yield takeLatest(AUTH.LOGIN, userLoginAsync);
}

/** User Logout */
function* userLogoutAsync() {
  yield put({ type: AUTH.LOGOUT_STARTED });
  try {
    const response = yield call(userLogout);
    yield put({ type: AUTH.LOGOUT_SUCCESS, payload: response });
    yield put({ type: FLASH.FLASH, payload: "Logged Out!" });
  } catch (err) {
    yield put({ type: AUTH.LOGOUT_FAILURE, errors: [err.toString()] });
    yield put({ type: FLASH.FLASH, payload: err.toString() });
  }
}

function* watchUserLogout() {
  yield takeLatest(AUTH.LOGOUT, userLogoutAsync);
}

export { watchFetchUser, watchUserSignup, watchUserLogin, watchUserLogout };

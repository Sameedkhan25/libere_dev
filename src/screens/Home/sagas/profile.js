import { put, call, takeLatest } from "redux-saga/effects";
import PROFILE from "../constants";
import FLASH from "../../Flash/constants";
import { fetchProfile, updateProfile } from "../helpers";

/** fetch profile */
function* fetchProfileAsync(action) {
  yield put({ type: PROFILE.FETCH_PROFILE_STARTED });

  try {
    const profile = yield call(fetchProfile, action.payload);
    yield put({ type: PROFILE.FETCH_PROFILE_SUCCESS, payload: profile });
  } catch (err) {
    console.log(err);
    yield put({
      type: PROFILE.FETCH_PROFILE_FAILURE,
      errors: ["ERROR FETCHING USER TOKEN"],
    });
  }
}

function* watchFetchProfile() {
  yield takeLatest(PROFILE.FETCH_PROFILE, fetchProfileAsync);
}

/** update profile*/

function* updateProfileAsync(action) {
  yield put({ type: PROFILE.UPDATE_PROFILE_STARTED });
  try {
    yield call(updateProfile, action.payload);
    yield put({
      type: PROFILE.UPDATE_PROFILE_SUCCESS,
      payload: action.payload,
    });

    yield put({
      type: FLASH.FLASH,
      payload: "Profile Updated!",
    });
  } catch (err) {
    yield put({
      type: PROFILE.UPDATE_PROFILE_FAILURE,
      errors: [err.toString()],
    });

    yield put({
      type: FLASH.FLASH,
      payload: err.toString(),
    });
  }
}

function* watchUpdateProfile() {
  yield takeLatest(PROFILE.UPDATE_PROFILE, updateProfileAsync);
}

export { watchFetchProfile, watchUpdateProfile };

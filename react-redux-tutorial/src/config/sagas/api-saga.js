import { takeEvery, call, put } from "redux-saga/effects";
import AuthService from '../services/AuthService';
export default function* watcherSaga() {
  yield takeEvery("DATA_REQUESTED", workerSaga);
}
const Auth = new AuthService();

function* workerSaga() {
  try {
    const payload = yield call(getData);
    yield put({ type: "DATA_LOADED", payload });
  } catch (e) {
    yield put({ type: "API_ERRORED", payload: e });
  }
}
function getData() {
  /* return fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response =>
    response.json()
  ); */
  return fetch('http://localhost:11003/v1/mylist',{
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': Auth.getToken()
    }
  }) 
  .then(response => response.json())
  // .then(response => response.json())
}
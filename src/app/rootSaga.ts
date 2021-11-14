
import {  } from 'redux-saga';
import { all, takeEvery } from 'redux-saga/effects';
import { watchUserAuthSaga } from '../features/user/authSaga';
import { watchOrderSaga } from '../features/user/orderSaga';
export default function* rootSaga(){
    yield all([watchUserAuthSaga(), watchOrderSaga()])
}

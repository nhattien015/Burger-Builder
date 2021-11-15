import {takeLatest, put, call} from 'redux-saga/effects'
import { 
  checkoutFailedHandle,
  checkoutSuccessHandle
} 
from './orderSlice'
import API from '../../api';
import { PayloadAction } from '@reduxjs/toolkit';
import { ingredientsEnpoint, ordersEndpoint, signinEndpoint, signupEndpoint} from '../../contants/APIEnpoint';
import {CheckoutPayload, checkout} from './orderSlice';


interface UserOrderPayload{
  tokenId: string
}



function* requestCheckout(action: PayloadAction<CheckoutPayload>) : Generator<any>{
  try{
    let res = yield call(API.post,`${ordersEndpoint}?auth=${action.payload.tokenId}`,action.payload);
    let perfectRes = res as any;
    if(perfectRes.error){
      yield put(checkoutFailedHandle(perfectRes.error))
    }
    else{
      yield put(checkoutSuccessHandle())
    }
 }catch(err){

 }
}
export function* watchOrderSaga(){
     yield takeLatest(checkout.type, requestCheckout)

}

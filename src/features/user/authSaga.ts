import {take, takeEvery, takeLatest, put, call, fork} from 'redux-saga/effects'
import { 
  signin, 
  signup, 
  signinFailedHandle, 
  signinSuccessHandle, 
  signupFailedHandle, 
  signupSuccessHandle,
  signout } 
from './authSlice'
import API from '../../api';
import { PayloadAction } from '@reduxjs/toolkit';
import { ingredientsEnpoint, ordersEndpoint, signinEndpoint, signupEndpoint} from '../../contants/APIEnpoint';
interface LoginPayload{
    email: string,
    password: string,
    returnSecureToken?: boolean
}

interface SignupPayload{
    email: string,
    password: string,
    repeatpassword: string
}



function* requestSignin(action: PayloadAction<LoginPayload>): Generator<any>{
 try{
     let res = yield call(API.post,signinEndpoint,action.payload);
     let perfectRes = res as any;
     if(perfectRes.error){
       yield put(signinFailedHandle(perfectRes.error))
     }
     else{
       yield put(signinSuccessHandle(perfectRes))
     }
  }catch(err){

  }
    
}

function* requestSignup(action: PayloadAction<SignupPayload>) : Generator<any>{
  if(action.payload.password !== action.payload.repeatpassword){
    console.log(action)
    console.log(action.payload.password,action.payload.repeatpassword);
    yield put(signupFailedHandle({message: "Password not same"}))
  }
  else{
try{
    let res = yield call(API.post, signupEndpoint,action.payload);
    let perfectRes = res as any;
      if(perfectRes.error){
       yield put(signupFailedHandle(perfectRes.error))
     }
     else{
       yield put(signupSuccessHandle())
     }

 } 
  catch(err){

  }

  }
}

export function* watchUserAuthSaga(){
     yield takeLatest(signin.type,requestSignin)
     yield takeLatest(signup.type, requestSignup)
}

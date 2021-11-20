import { createSlice, PayloadAction} from '@reduxjs/toolkit';

import { message } from 'antd';
import { User } from '../../types/'
interface authState{
  user: User,
  error: authError | null,
  isLoading: boolean,
  isLogin: boolean
}
  interface authError{
      code?: number,
      message: string,
      errors?: [
            {
                message?: string,
                domain?: string,
                reason?: string
            }
        ]
    

  }
const initialAuthState : authState = {
   user: {
    kind: null,
    localId: null,
    email: null,
    displayName: "",
    idToken: null,
    registered: false,
    refreshToken: null,
    },
    error: null,
    isLoading: false,
    isLogin: false
}


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

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        signin: (state, action: PayloadAction<LoginPayload>) => {
          state.isLoading = true;
          
        },
        signup: (state, action: PayloadAction<SignupPayload>) => {
          state.isLoading = true;
        },
        signout: (state)=>{
           localStorage.removeItem('tokenId');
           state.user = initialAuthState.user;
           state.isLogin = false;
        },
        signinSuccessHandle: (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.error = initialAuthState.error;
          state.isLoading = false;
          localStorage.setItem('tokenId',`${state.user.idToken}`);
          localStorage.setItem('localId',`${action.payload.localId}`)
          localStorage.setItem('user',JSON.stringify(state.user));
          message.success("Login success",10)
          state.isLogin = true;

       },
        signinFailedHandle: (state, action: PayloadAction<authError>) => {
          console.log(state, action.payload);
          state.error = action.payload;
          state.user = initialAuthState.user;
          message.error(state.error.message,10)
          state.isLoading = false
        },
        signupFailedHandle: (state, action: PayloadAction<authError>) => {
          console.log(state, action.payload);
          state.error = action.payload;
          state.user = initialAuthState.user;
          message.error(state.error.message,10)
          state.isLoading = false
        },
        signupSuccessHandle: (state) => {
          message.success("Sign up success!", 10)
          state.isLoading = false;
        }

    }
})

export const { signin, signup, signinFailedHandle, signout, signinSuccessHandle, signupFailedHandle, signupSuccessHandle } = authSlice.actions

export default authSlice.reducer

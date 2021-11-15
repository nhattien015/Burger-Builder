import { message } from 'antd';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AmountOfIngredients{
   ["bacon"]: number,
   ["cheese"]: number,
   ["meat"]: number,
   ["salad"]: number
}
interface OrderData{
  address: string,
  email: string,
  name: string,
  phone: string,
  note?: string
}
interface UserOrderState{
    userOrder: {
    [k: string]: {
        ingredients: AmountOfIngredients,
        orderData: OrderData,
        price: number,
        userId: string
}
    },
    error: string | null
}
interface UserOrderResponseFailed{
    error: string
}

interface UserOrderPayload{
  tokenId: string | null
}

interface UserOrderResponseSuccess{
    [k: string | number]: {
        ingredients: AmountOfIngredients,
        orderData: OrderData,
        price: number,
        userId: string
}

}

interface EmptyUserOrder{
  userOrder: null, 
  error: string | null
}

const initialUserOrderState : UserOrderState | EmptyUserOrder = {userOrder: {}, error: null};

export interface CheckoutPayload{
  ingredients: {
    bacon: number,
    cheese: number,
    meat: number,
    salad: number
  },
  orderData: {
    name: string,
    phone: string,
    email: string,
    address: string,
    note?: string,
  },
  price: number,
  userId: string,
  tokenId: string
}

interface CheckoutResponseFailed{
  error: string
}

interface CheckoutResponseSuccess{
  
}

const orderSlice = createSlice({
  name: 'order',
  initialState: initialUserOrderState,
  reducers: {
     checkout: (state, action: PayloadAction<CheckoutPayload>) => {
      
     },
     checkoutFailedHandle: (state,action: PayloadAction<CheckoutResponseFailed>) => {
       message.error(action.payload.error);
     },
     checkoutSuccessHandle: (state) => {
        message.success("Order success");
     }
  }
})

export const { checkout, checkoutFailedHandle, checkoutSuccessHandle} = orderSlice.actions;

export default orderSlice.reducer;

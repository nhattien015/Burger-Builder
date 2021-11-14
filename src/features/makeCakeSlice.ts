import { Order } from './../types/Order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {FoodPartSchemaObject} from '../utils/schema';
import { FoodPart } from '../types/Product';
type Orders = {value : Array<Order>};
const {Salad, Cheese, Bacon, Meat} = FoodPartSchemaObject.type;
const initialValues : Orders = {
    value: [
        {name: 'Salad', amount: 1, totalPrice: Salad.price, currency: Salad.currency},
        {name: 'Cheese', amount: 1, totalPrice: Cheese.price, currency: Cheese.currency},
        {name: 'Bacon', amount: 1, totalPrice: Bacon.price, currency: Bacon.currency},
        {name: 'Meat', amount: 1, totalPrice: Meat.price, currency: Meat.currency}
    ]
}
const makeCakeSlice = createSlice({
    name: "make",
    initialState: initialValues,
    reducers: {
        more: (state, action: PayloadAction<FoodPart>) => {
            state.value.forEach((value)=>{
                if(value.name === action.payload){
                    value.amount++;
                    value.totalPrice = value.amount * FoodPartSchemaObject.type[value.name].price;
                }
            })
        },
        less: (state, action: PayloadAction<FoodPart>) => {
            state.value.forEach((value)=>{
                if(value.name === action.payload && value.amount > 0){
                    value.amount--;
                    value.totalPrice = value.amount * FoodPartSchemaObject.type[value.name].price;
                }
            })
        }
    }
})

export const {more, less} = makeCakeSlice.actions;

export default makeCakeSlice.reducer;

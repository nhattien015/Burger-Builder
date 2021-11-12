import { FoodPart } from "./Product"
export type Order = {
    name: FoodPart,
    amount: number,
    totalPrice: number,
    currency: string
}
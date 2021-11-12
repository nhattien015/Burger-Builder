import { FoodPart } from './../types/Product';
const FoodPartSchemaObject : FoodPartSchemaObjectType = {
    type: {
        Salad: {name: "Salad", price: 5, currency: "$"},
        Bacon: {name: "Bacon", price: 10, currency: "$"},
        Cheese: {name: "Cheese", price: 4, currency: "$"},
        Meat: {name: "Meat", price: 100, currency: "$"}
    }
}

interface FoodPartSchemaObjectType {
    type: {
        Salad: {name: FoodPart, price: number, currency: string},
        Bacon: {name: FoodPart, price: number, currency: string},
        Cheese: {name: FoodPart, price: number, currency: string},
        Meat: {name: FoodPart, price: number, currency: string},   
    }
}
const FoodPartSchemaArray : FoodPartSchemaArrayType = [
    {type: {name: "Salad", price: 5, currency: "$"}},
    {type: {name: "Cheese", price: 4,currency: "$"}},
    {type: {name: "Bacon", price: 10, currency: "$"}},
    {type: {name: "Meat", price: 100, currency: "$"}}
]
type FoodPartSchemaArrayType = Array<{
    type: {name: FoodPart, price: number, currency: string},
}>;

export {FoodPartSchemaArray, FoodPartSchemaObject};
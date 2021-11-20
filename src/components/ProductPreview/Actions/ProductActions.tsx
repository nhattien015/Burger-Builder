import {FC, useState, useEffect, useCallback, memo} from 'react';
import ProductActionsStyles from './ProductActions.module.css';
import {FoodPartSchemaArray} from '../../../utils/schema';
import {Button} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app';
import { Order } from '../../../types/Order';
import {CheckoutActions, OrderActions} from '.'


let ProductActions : FC = ()=>{
    const [isShowCheckoutForm, setIsShowCheckoutForm] = useState<boolean>(false);
    function orderHandle(){
        setIsShowCheckoutForm(true);
    }
    function goBackOrder(){
        setIsShowCheckoutForm(false);
    }
    const orders = useSelector((state: RootState) => state.makeCake.value);
    const dispatch = useDispatch();
    const [total, setTotal] = useState<number>(0);
    const getTotalPayment = useCallback((orders)=>{
        let toalPayment = Array.from<Order>(orders).map((order)=> {
            return order.totalPrice;
        }).reduce((a, b)=>{
            return a+b;
        });

        return toalPayment;

    },[orders])
    useEffect(()=>{
       setTotal(getTotalPayment(orders));
    },[orders])
    return(
        <div className={ProductActionsStyles.container}>
            <div className={ProductActionsStyles.paymentTotalBox}>
                <span>Price</span>
                <span>{total} {orders[0].currency}</span>
            </div>
            {
              !isShowCheckoutForm ? <OrderActions orderHandle={orderHandle} /> : <CheckoutActions total={total} goBackOrder={goBackOrder}/>
            }
            
            
        </div>
    )
}
ProductActions = memo(ProductActions);
export {ProductActions};
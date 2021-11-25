import {FC, useEffect, useState, useCallback} from 'react';
import ProductActionsStyles from './ProductActions.module.css';
import {FoodPartSchemaArray} from '../../../utils/schema';
import { Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

import {useSelector, useDispatch} from 'react-redux'
import { RootState } from '../../../app/';
import {more, less} from '../../../features/makeCakeSlice'
import { Order } from '../../../types/Order';

import {useSpring, animated} from 'react-spring';

interface Props{
    orderHandle : () => void
}
export const OrderActions : FC<Props> = ({orderHandle}) =>{
    const orders = useSelector((state: RootState) => state.makeCake.value);
    const dispatch = useDispatch();
    // Array.from(orders.values()).forEach(({totalPrice}) => {
    //     payTotal += totalPrice;
    // })
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
    const stylesAnimate = useSpring({
        from:{
            transform: "translateX(-200px)"
        },
        to: {
            transform: "translateX(0px)"
        }
    })         
    return(
        <animated.div style={stylesAnimate}>
            <div className={ProductActionsStyles.actionsContainer}>
            {/* Get state from Redux */}
             
            {FoodPartSchemaArray.map((value, index) => {
                return <div key={index} className={ProductActionsStyles.actionBox}>
                    <div style={{width: "50%"}}>
                    {value.type.name} ({value.type.price}{value.type.currency})
                    </div>
                    <ButtonGroup style={{width: "50%", display: "flex", justifyContent: "space-around"}}>
                        <Button onClick={()=>{dispatch(less(value.type.name))}} type='primary'>
                            Less
                        </Button>
                        <span style={{alignSelf: "center"}}>
                            {orders.filter(({name}) => name === value.type.name)[0].amount}
                        </span>
                        <Button type='primary' onClick={()=>{dispatch(more(value.type.name))}}>
                            More
                        </Button>
                    </ButtonGroup>
                </div>
            })}
            
            </div>
            <Button type='primary' onClick={orderHandle} style={{width: "100%", maxWidth: "500px", marginTop: "20px"}} size='large'>
                  Checkout
            </Button>
        </animated.div>
    )
}

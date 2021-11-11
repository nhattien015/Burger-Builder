import {FC} from 'react';
import ProductActionsStyles from './ProductActions.module.css';
import productSchema from '../utils/schema';
import {Button} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
const ProductActions : FC = ()=>{

    
    return(
        <div className={ProductActionsStyles.container}>
            <div className={ProductActionsStyles.paymentTotalBox}>
                <span>Price</span>
                <span>$50</span>
            </div>
            <div className={ProductActionsStyles.actionsContainer}>
            {/* Get state from Redux */}
             
            {Object.keys(productSchema.type).map((key) => {
                return <div className={ProductActionsStyles.actionBox}>
                    <div style={{width: "50%"}}>
                    {key}
                    </div>
                    <ButtonGroup style={{width: "50%", display: "flex", justifyContent: "space-around"}}>
                        <Button type='primary'>
                            Less
                        </Button>
                        <Button type='primary'>
                            More
                        </Button>
                    </ButtonGroup>
                </div>
            })}
            
            </div>
            <Button type='primary' style={{marginTop: "20px"}} size='large'>
                  Checkout
            </Button>
        </div>
    )
}

export {ProductActions};
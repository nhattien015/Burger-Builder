import React, {FC, useState, useEffect} from 'react';
import productPreviewStyles from './ProductPreview.module.css';
import {FoodPart} from '../../types/Product';
import {FoodPartSchemaObject} from '../../utils/schema';
import {useSelector} from 'react-redux';
import {Badge} from 'antd';
import { RootState } from '../../app/';
import {useSpring, animated, Transition} from 'react-spring';
import {AnimatedComponent} from '../AnimatedComponent';
type ProductPreviewInfo = Array<{
    name: FoodPart,
    amount: number
  }>


  

export const ProductPreview : FC = () => {
  const orders = useSelector((state : RootState) => {return state.makeCake.value})
  const initialProductPreviewInfo : ProductPreviewInfo = orders;
  const [productPreviewInfo, setProductPreviewInfo] = useState<ProductPreviewInfo>(initialProductPreviewInfo);
  const stylesAnimateArray = [];
  
  useEffect(()=>{
    console.log("Product Preview");
  })
 
  const animateStyles = useSpring({
    from: {
      transform: "scaleX(0) scaleZ(0)"
    },
    to: {
      transform: "scaleX(1) scaleZ(1)"
    } 
  })
  const [isShowThisCake, toggleShowThisCake] = useState<boolean>(true);
    return(
      <animated.div style={animateStyles} className={productPreviewStyles.container}>
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread1}`}></div>
        {
          initialProductPreviewInfo.map((info, index) => {
            if(info.name === FoodPartSchemaObject.type.Salad.name && info.amount > 0){
              
              return <Badge.Ribbon key={index} text={info.amount}><div className={`${productPreviewStyles.salad} ${productPreviewStyles.cakefilling}`}>Salad</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Bacon.name && info.amount > 0){
              return <Badge.Ribbon key={index} text={info.amount}><div className={`${productPreviewStyles.bacon} ${productPreviewStyles.cakefilling}`}>Bacon</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Cheese.name && info.amount > 0){
              return <Badge.Ribbon key={index} text={info.amount}><div className={`${productPreviewStyles.cheese} ${productPreviewStyles.cakefilling}`}>Cheese</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Meat.name && info.amount > 0){
              return <Badge.Ribbon key={index} text={info.amount}><div className={`${productPreviewStyles.meat} ${productPreviewStyles.cakefilling}`}>Meat</div></Badge.Ribbon>
            }
          })
        }
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread2}`}></div>
      </animated.div>
    )
}

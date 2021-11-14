import {FC, useState, useEffect} from 'react';
import productPreviewStyles from './ProductPreview.module.css';
import {FoodPart} from '../../types/Product';
import {FoodPartSchemaObject} from '../../utils/schema';
import {useSelector} from 'react-redux';
import {Badge} from 'antd';
import { RootState } from '../../app';
type ProductPreviewInfo = Array<{
    name: FoodPart,
    amount: number
  }>


export const ProductPreview : FC = () => {
  const orders = useSelector((state : RootState) => {return state.makeCake.value})
  const initialProductPreviewInfo : ProductPreviewInfo = orders;
  const [productPreviewInfo, setProductPreviewInfo] = useState<ProductPreviewInfo>(initialProductPreviewInfo);
  useEffect(()=>{
    console.log("Product Preview");
  })
    return(
      <div className={productPreviewStyles.container}>
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread1}`}></div>
        {
          initialProductPreviewInfo.map((info, index) => {
            if(info.name === FoodPartSchemaObject.type.Salad.name && info.amount > 0){
              return <Badge.Ribbon  text={info.amount}><div className={`${productPreviewStyles.salad} ${productPreviewStyles.cakefilling}`}>Salad</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Bacon.name && info.amount > 0){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.bacon} ${productPreviewStyles.cakefilling}`}>Bacon</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Cheese.name && info.amount > 0){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.cheese} ${productPreviewStyles.cakefilling}`}>Cheese</div></Badge.Ribbon>
            }
            else if(info.name === FoodPartSchemaObject.type.Meat.name && info.amount > 0){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.meat} ${productPreviewStyles.cakefilling}`}>Meat</div></Badge.Ribbon>
            }
          })
        }
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread2}`}></div>
      </div>
    )
}

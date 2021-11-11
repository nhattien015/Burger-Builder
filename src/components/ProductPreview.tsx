import {FC, useState} from 'react';
import productPreviewStyles from './ProductPreview.module.css';
import {FoodPart} from '../types/Product';
import productSchema from '../utils/schema';

import {Badge} from 'antd';
type ProductPreviewInfo = Array<{
    name: FoodPart,
    amount: number
  }>


export const ProductPreview : FC = () => {
    
  const initialProductPreviewInfo : ProductPreviewInfo = [
      {name: productSchema.type.SALAD,amount: 1},
      {name: productSchema.type.MEAT,amount: 1},
      {name: productSchema.type.BACON,amount: 1},
      {name: productSchema.type.CHEESE,amount: 1},
  ]

    const [productPreviewInfo, setProductPreviewInfo] = useState<ProductPreviewInfo>(initialProductPreviewInfo);
    
    
    return(
      <div className={productPreviewStyles.container}>
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread1}`}></div>
        {
          initialProductPreviewInfo.map((info, index) => {
            if(info.name === productSchema.type.SALAD){
              return <Badge.Ribbon  text={info.amount}><div className={`${productPreviewStyles.salad} ${productPreviewStyles.cakefilling}`}>Salad</div></Badge.Ribbon>
            }
            else if(info.name === productSchema.type.BACON){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.bacon} ${productPreviewStyles.cakefilling}`}>Bacon</div></Badge.Ribbon>
            }
            else if(info.name === productSchema.type.CHEESE){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.cheese} ${productPreviewStyles.cakefilling}`}>Cheese</div></Badge.Ribbon>
            }
            else if(info.name === productSchema.type.MEAT){
              return <Badge.Ribbon text={info.amount}><div className={`${productPreviewStyles.meat} ${productPreviewStyles.cakefilling}`}>Meat</div></Badge.Ribbon>
            }
          })
        }
        <div className={`${productPreviewStyles.bread} ${productPreviewStyles.bread2}`}></div>
      </div>
    )
}

import {FC} from 'react';
import {ProductPreview} from '../../ProductPreview/';
import {ProductActions} from '../../ProductPreview/Actions/ProductActions';
import homePageStyles from './HomePage.module.css';
export const HomePage : FC = () => {
    return(
      <div className={homePageStyles.container}>
        <ProductPreview />
        <ProductActions />
      </div>
    )
}

import {FC, useCallback, useEffect, useState} from 'react';
import {Table} from 'antd';
import './OrderPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app';
import { useNavigate } from 'react-router';
import {getUserOrder} from '../../../features/user/orderSlice';
interface row{
    ingredients: string,
    price: string
}
type rowsData = Array<row> | [];

const columns : any = [
    {

        title: "Ingredients",
        dataIndex: "ingredients",
        key: "ingredients",
        className: "theading"
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        defaultSortOrder: 'ascend',
        sorter: (a: any, b: any) => {
            const comparer = new Intl.Collator([],{numeric: true});
            return comparer.compare(a.price, b.price);
        },
        className: "theading"
    },
]

const rowsData : any = [

]
const OrdersPage : FC = () => {

    // const orders = useSelector((state: RootState) => state.order.value );
    // const rowData : rowsData = orders.map((order) => {
    //     return {
            
    //     }
    // })
    const userOrder = useSelector((state: RootState) => state.order.userOrder)
    const navigate = useNavigate();
    const getOrderFromState : () => rowsData =  useCallback(() => {
      if(userOrder !== null){
        return Object.keys(userOrder).map((orderKey: string | number ) => {
          
          const currentOrder =  userOrder[orderKey];
          let ingredientsData = "";
          if(currentOrder.ingredients){
            Object.keys(currentOrder.ingredients).forEach((ingre)=>{
              ingredientsData+= `${ingre}(${(currentOrder.ingredients as any)[ingre]}) `;
            })
          }
          return {ingredients: ingredientsData, price: `${currentOrder.price}`}
        })
      }
      else{
        return []
      }
    },[userOrder])
    const [userOrderRow, setUserOrderRow] = useState<rowsData>();
    const dispatch = useDispatch();
    const fetchData = useCallback(()=>{
    if(localStorage.getItem("tokenId") !== null){
      dispatch(getUserOrder({tokenId: localStorage.getItem("tokenId")}));
      const rowData = getOrderFromState();
      setUserOrderRow(rowData);
    }
      else{
        navigate("/login");
      }
    }, [navigate, getUserOrder, dispatch, setUserOrderRow, userOrder])

    useEffect(()=>{
      //  fetchData();
    },[userOrder])
    return(
      <>
      
       <Table
       
       rowClassName={(record, index) => {
           if(index%2 === 0){
             return "even";
           }
           else{
            return "odd";
           }
       }}
       bordered={true}

       dataSource={userOrderRow} 
       columns={columns}>

       </Table>
       </>
    )
}

export {OrdersPage}

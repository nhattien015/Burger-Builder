import {FC, useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {message, Table} from 'antd';
import './OrderPage.css';
import { useNavigate } from 'react-router';
import { ordersEndpoint } from '../../../contants/APIEnpoint';
import {useSpring, animated} from 'react-spring';
import { Skeleton } from 'antd';

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

const OrdersPage : FC = () => {
    const animateProps = useSpring({
      from: {
        transform: "scaleX(0)"
      },
      to: {
        transform: "scaleX(1)"
      }
    })
    const navigate = useNavigate();
    const doFormatToRowDatas : (userOrder: any) => rowsData = (userOrder) => {
      if(userOrder !== null){
        console.log(userOrder)
        return Object.keys(userOrder).map((orderKey: string | number ) => {
          
          const currentOrder =  userOrder[orderKey];
          console.log(currentOrder, orderKey);
          let ingredientsData = "";
          if(currentOrder.ingredients){
            Object.keys(currentOrder.ingredients).forEach((ingre)=>{
              ingredientsData+= `${ingre}(${(currentOrder.ingredients as any)[ingre]}) `;
            })
          }
          return {ingredients: ingredientsData, price: `${currentOrder.price} $`}
        })
      }
      else{
        return []
      }
    }
    const [userOrderRow, setUserOrderRow] = useState<rowsData>([]);
    const fetchOrders = useCallback(()=>{
      fetch(`${ordersEndpoint}?auth=${localStorage.getItem("tokenId")}`).then(res=>{
        return res.json();
      }).then(dataRes=>{
        if(dataRes.error){
          message.error(dataRes.error);
          localStorage.removeItem("tokenId");
          navigate('/login');
        }
        else{
          const formatedRowData = doFormatToRowDatas(dataRes);
          setUserOrderRow(formatedRowData);
        }
      })
      
    }, [localStorage.getItem("tokenId")]);

    const verifyUser = useCallback(()=>{
        if(localStorage.getItem("tokenId") !== null){
        }
        else{
          navigate("/login");
        }
    }, [localStorage.getItem("tokenId")])

    useEffect(()=>{
      verifyUser();
      fetchOrders();
    },[fetchOrders, verifyUser])
    return(
      <>
      {userOrderRow.length < 0 ? <Skeleton/> : <animated.div style={animateProps}>
              
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
              </animated.div>
              
      }
      
    
       </>
    )
}

export {OrdersPage}

import {FC, useCallback, useEffect, useState} from 'react';
import {message, Table} from 'antd';
import './OrderPage.css';
import { useNavigate } from 'react-router';
import { ordersEndpoint } from '../../../constant/APIEnpoint';
import {useSpring, animated} from 'react-spring';
import { Skeleton } from 'antd';
import {BiLeftArrow, BiDownArrow} from 'react-icons/bi'
interface row{
    key: number,
    ingredients: string,
    price: string
}
interface OrderDataType{
  address: string,
  email: string,
  name: string,
  phone: string,
  note?: string
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
        return Object.keys(userOrder).map((orderKey: string | number, index: number ) => {
          
          const currentOrder =  userOrder[orderKey];

          let ingredientsData = "";
          if(currentOrder.ingredients){
            Object.keys(currentOrder.ingredients).forEach((ingre)=>{
              ingredientsData+= `${ingre}(${(currentOrder.ingredients as any)[ingre]}) `;
            })
          }
          console.log(currentOrder.orderData);
          return {ingredients: ingredientsData, price: `${currentOrder.price} $`, details: currentOrder.orderData, key: index}
        })
      }
      else{
        return []
      }
    }
    const [userOrderRow, setUserOrderRow] = useState<rowsData>([]);
    const initialExpandableState = {expandedRowRender: (record: any) => {
        return <div>
           <p><strong>Email:</strong> {record.details.email}</p>
           <p><strong>Phone:</strong> {record.details.phone}</p>
           <p><strong>Address:</strong> {record.details.address} </p>
           <p><strong>Name:</strong> {record.details.name}</p>
           {record.details.note ? <p><strong>Note:</strong> {record.details.note}</p> : ""}
        </div>
      }}

    const [expandable, toggleExpandable] = useState(initialExpandableState);
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
          console.log(dataRes);
          const formatedRowData = doFormatToRowDatas(dataRes);
          setUserOrderRow(formatedRowData);
        }
      })
      
    }, [navigate]);
  
    const verifyUser = useCallback(()=>{
        if(localStorage.getItem("tokenId") == null){
            navigate("/login");
        }
        
    },[navigate])

    useEffect(()=>{
      verifyUser();
      if(localStorage.getItem("tokenId")){
         fetchOrders();
      }
      
    },[localStorage])
    return(
      <>
      {userOrderRow.length <= 0 ? <Skeleton/> : <animated.div style={animateProps}>
              
              <Table
              style={{cursor: "pointer", userSelect: "none"}}
              pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '20', '30']}}
              rowKey={(record) => record.key}
              expandable={expandable}     
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
              columns={columns}
              expandRowByClick={true}
              expandIcon={({expanded, onExpand, record}) => {
                  return expanded ? 
                  (<BiDownArrow size={"20px"} cursor={"pointer"} onClick={(ev: any) => onExpand(record, ev)} />) : 
                  (<BiLeftArrow size={"20px"} fill={"#000000"} cursor={"pointer"} onClick={(ev: any) => onExpand(record, ev)}/>) 

                }}
              >
       
              </Table>
              </animated.div>
              
      }
      
    
       </>
    )
}

export {OrdersPage}

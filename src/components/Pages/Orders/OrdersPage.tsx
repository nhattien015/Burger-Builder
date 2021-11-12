import {FC, useState} from 'react';
import {Table} from 'antd';
import './OrderPage.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app';
interface row{
    ingredients: string,
    price: string
}
type rowsData = Array<row>;
const datas : rowsData = [
    {
        ingredients: "Salad(1) Bacon(2) Cheese(1) Meat(1)",
        price: "10$"
    },
    {
        ingredients: "Salad(1) Bacon(2) Cheese(1) Meat(1)",
        price: "9$"
    },
    {
        ingredients: "Salad(1) Bacon(2) Cheese(1) Meat(1)",
        price: "5$"
    },
    {
        ingredients: "Salad(1) Bacon(2) Cheese(1) Meat(1)",
        price: "4$"
    },
]

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
    const [rowsData, setRowsData] = useState({})
    return(
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

       dataSource={datas} 
       columns={columns}>

       </Table>
    )
}

export {OrdersPage}
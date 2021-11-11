import {FC} from 'react';
import {Table} from 'antd';
import './OrderList.css';
const datas : any = [
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
const OrdersList : FC = () => {
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

export {OrdersList}
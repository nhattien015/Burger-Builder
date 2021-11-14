import { FC, useState } from 'react';
import {Form, Input, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import ProductActionsStyles from './ProductActions.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkout } from '../../../features/user/orderSlice'
import { RootState } from '../../../app';
import { Order } from '../../../types/Order';
import {CheckoutPayload } from '../../../features/user/orderSlice';
interface Props{
    cancelOrderHandle: () => void,
    total: number
}


interface CheckoutFields{
    name: string,
    phone: string,
    email: string,
    address: string, 
    note: string
}


export const CheckoutActions : FC<Props> = ({cancelOrderHandle, total}) => {
    const [form] = useForm<CheckoutFields>()
    const [isValidForm, setValidForm] = useState<boolean>(true);
    const dispatch = useDispatch();
    const orders = useSelector((state: RootState) => state.makeCake.value);
    const navigate = useNavigate();
    const checkoutHandle = () => {
        if(isValidForm){
            if(localStorage.getItem("tokenId")){
                const actionPayload : CheckoutPayload = {
                    ingredients: {
                       bacon: orders.filter(v=>v.name.toLowerCase()==="bacon")[0].amount,
                       cheese: orders.filter(v=>v.name.toLowerCase()==="cheese")[0].amount,
                       salad: orders.filter(v=>v.name.toLowerCase()==="salad")[0].amount,
                       meat:orders.filter(v=>v.name.toLowerCase()==="meat")[0].amount,
                    },
                    orderData: {
                        email: form.getFieldValue("email"),
                        name: form.getFieldValue("name"),
                        address: form.getFieldValue("address"),
                        phone: form.getFieldValue("phone"),
                        note: form.getFieldValue("")
                    },
                    price: total,
                    userId: localStorage.getItem("localId") as string,
                    tokenId: localStorage.getItem("tokenId") as string
                  }
                  dispatch(checkout(actionPayload))
            }
            else{
               navigate("/login");
            }  
        }
    }
    
    const verifyForm = () => {
        let errorsFields = form.getFieldsError();
        console.log(errorsFields);
        console.log(errorsFields.every(({errors}) => errors.length !== 0));
        let field = form.getFieldsValue();
        if(
            errorsFields.every(({errors}) => errors.length === 0) 
            && field.address != "" && field.email != "" && field.name != "" && field.phone != ""
            ){
           setValidForm(true);
        }
        else if(
            errorsFields.some(({errors})=> errors.length !== 0) 
            || (field.address == "" || field.email == "" || field.name == "" || field.phone == "")
        ){
            setValidForm(false);
        }
    }
    return (
        <>
        
        <Form
        onFieldsChange={verifyForm}
       form={form}
       scrollToFirstError={true}
       name="Login"
       wrapperCol={{span: 24, offset: 0}}
       initialValues={{
           remember: true,
           note: "",
           address: ""
           
       }}
       autoComplete="off"
       >
            <fieldset>
                <legend style={{color: "rgba(10,10,10,1)"}}>
                    Contact Data
                </legend>
                <Form.Item name="name" rules={[{required: true, message: "Name is required!"}]}>
                    <Input onChange={verifyForm} size="large" placeholder='Name'>
                    </Input>
                </Form.Item>
                <Form.Item name="phone" rules={[{required: true, message: "Phone is required!"}]}>
                    <Input onChange={verifyForm} size="large" placeholder='Phone'>
                    </Input>
                </Form.Item>
                <Form.Item name="email" rules={
                    [{required: true, message: "Email is required!", type:"email"}]
                    }>
                    <Input onChange={verifyForm} size="large" placeholder='Email'>
                    </Input>
                </Form.Item>
                <Form.Item name="address" rules={[{required: true, message: "Address is required!"}]}>
                    <Input onChange={verifyForm} size="large" placeholder='Address'>
                    </Input>
                </Form.Item>
                <Form.Item name="note">
                    <Input onChange={verifyForm} size="large" placeholder='Note'>
                    </Input>
                </Form.Item>
            </fieldset>
            
            <Button disabled={!isValidForm} block={true} type='primary' onClick={checkoutHandle} style={{marginTop: "20px"}} size='large'>
                Order
            </Button>
            <Button type='primary' danger={true} onClick={cancelOrderHandle} style={{marginTop: "20px"}} size='large'>
                Go back
            </Button>
        </Form>
        </>
    )
}



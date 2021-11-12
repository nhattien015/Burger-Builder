import { FC } from 'react';
import {Form, Input, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import ProductActionsStyles from './ProductActions.module.css';
interface Props{
    cancelOrderHandle: () => void
}
interface CheckoutFields{
    name: string,
    phone: string,
    email: string,
    address: string, 
    note: string
}
export const CheckoutActions : FC<Props> = ({cancelOrderHandle}) => {
    const [form] = useForm<CheckoutFields>()
    const checkoutHandle = () => {

    }
    return (
        <>
        
        <Form
        
       form={form}
       name="Login"
       wrapperCol={{span: 24, offset: 0}}
       initialValues={{remember: true}}
       autoComplete="off"
       >
            <fieldset>
                <legend style={{color: "rgba(10,10,10,1)"}}>
                    Contact Data
                </legend>
                <Form.Item name="name" rules={[{required: true, message: "Name is required!"}]}>
                    <Input size="large" placeholder='Name'>
                    </Input>
                </Form.Item>
                <Form.Item name="phone" rules={[{required: true, message: "Phone is required!"}]}>
                    <Input size="large" placeholder='Phone'>
                    </Input>
                </Form.Item>
                <Form.Item name="email" rules={[{required: true, message: "Email is required!"}]}>
                    <Input size="large" placeholder='Email'>
                    </Input>
                </Form.Item>
                <Form.Item name="address" rules={[{required: true, message: "Address is required!"}]}>
                    <Input size="large" placeholder='Address'>
                    </Input>
                </Form.Item>
                <Form.Item name="note">
                    <Input size="large" placeholder='Note'>
                    </Input>
                </Form.Item>
            </fieldset>
            
            <Button block={true} type='primary' onClick={checkoutHandle} style={{marginTop: "20px"}} size='large'>
                Order
            </Button>
            <Button type='primary' danger={true} onClick={cancelOrderHandle} style={{marginTop: "20px"}} size='large'>
                Go back
            </Button>
        </Form>
        </>
    )
}


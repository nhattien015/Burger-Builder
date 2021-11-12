import React, { FC, memo } from 'react';
import {Form, Modal, Input, Button} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import LoginPageStyles from './AuthForm.module.css';
interface Props{
    isShowSignUp: boolean,
    setIsShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setIsShowSignUp: React.Dispatch<React.SetStateAction<boolean>>,
}
interface SignUpField{
    email: string,
    password: string,
    repeatPassword: string
}
let SignupFormModal: FC<Props> = ({isShowSignUp, setIsShowLogin, setIsShowSignUp}) => {
    const [form] = useForm<SignUpField>();
    const onFinish = (values: any) => {
        
    }
    const onFinishFailed = ()=> {

    }
    const closeModal = ()=>{
        setIsShowSignUp(false);
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log(ev.target.name)
        form.setFieldsValue({
            [ev.target.name]: ev.target.value
        })    
    }
    return (
        <Modal title="Signup" footer={null} visible={isShowSignUp} onCancel={closeModal}>
            <Form
                className={LoginPageStyles.form}
                form={form}
                name="Login"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 19 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Email is required !' }]}
                >
                    <Input onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Password is required !" }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Retype"
                    name="repeatpassword"
                    rules={[{ required: true, message: "RepeatPassword is required !" }]}
                >
                    <Input.Password />
                </Form.Item>
                

                <Form.Item wrapperCol={{ offset: 10, span: 19 }}>
                    <Button type="primary" htmlType='submit' size="large">
                        Signup
                    </Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

SignupFormModal = memo<Props>(SignupFormModal)

export {SignupFormModal};
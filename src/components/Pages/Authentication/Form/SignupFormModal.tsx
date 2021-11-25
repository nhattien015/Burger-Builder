import React, { FC, memo } from 'react';
import {Form, Modal, Input, Button, Spin} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import {signup} from '../../../../features/user/authSlice'
import LoginPageStyles from './AuthForm.module.css';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../app/';

interface Props{
    isShowSignUp: boolean,
    setIsShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setIsShowSignUp: React.Dispatch<React.SetStateAction<boolean>>,
}
interface SignUpField{
    email: string,
    password: string,
    repeatpassword: string
}
let SignupFormModal: FC<Props> = ({isShowSignUp, setIsShowLogin, setIsShowSignUp}) => {
    const [form] = useForm<SignUpField>();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)
        console.log(isLoading)
    let dispatch = useDispatch();
    const onFinishFailed = ()=> {

    }
    const closeModal = ()=>{
        setIsShowSignUp(false);
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        form.setFieldsValue({
            [ev.target.name]: ev.target.value
        })    
    }
    return (
        <Modal destroyOnClose={true} title="Signup" footer={null} visible={isShowSignUp} onCancel={closeModal}>
            <Form
                className={LoginPageStyles.form}
                form={form}
                name="Login"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 19 }}
                initialValues={{ remember: true }}
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
               <Button style={{minWidth: "86.27px"}} onClick={()=>{dispatch(signup(form.getFieldsValue()))}} type="primary" htmlType='submit' size="large">
                         {isLoading ? <Spin /> : "Signup"}
                    </Button>
                  </Form.Item>
            </Form>

        </Modal>
    )
}

SignupFormModal = memo<Props>(SignupFormModal)

export {SignupFormModal};

import { FC, memo } from 'react';
import {Form, Modal, Input, Button, Checkbox, Spin} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import LoginPageStyles from './AuthForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {signin} from '../../../../features/user/authSlice'
import { RootState } from '../../../../app';
interface LoginField{
    email: string,
    password: string
}
interface Props{
    isShowLogin: boolean,
    setIsShowLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setIsShowSignUp: React.Dispatch<React.SetStateAction<boolean>>,
}

let LoginFormModal : FC<Props> = ({isShowLogin, setIsShowLogin, setIsShowSignUp}) => {
    const [form] = useForm<LoginField>();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log(ev.target.name)
        form.setFieldsValue({
            [ev.target.name]: ev.target.value
        })    
    }
    const closeModal = ()=>{
        setIsShowLogin(false);
    }
    const dispatch = useDispatch();
    const dispatchLogin = () => {
        dispatch(signin({email: form.getFieldValue("email"), password: form.getFieldValue("password"),returnSecureToken: true}))
    }
    return (
        <Modal title="Login" footer={null} visible={isShowLogin} onCancel={closeModal}>
           <Form
           className={LoginPageStyles.form}
       form={form}
       name="Login"
       labelCol={{span: 4}}
       wrapperCol={{span: 19}}
       initialValues={{remember: true}}
       autoComplete="off"
       >
           <Form.Item
           label="Email"
           name="email"
           rules={[{required: true, message: 'Email is required !'}]}
           >
               <Input onChange={handleChange} />
           </Form.Item>

           <Form.Item 
           label="Password"
           name="password"
           rules={[{required: true, message: "Password is required !"}]}
           >
               <Input.Password />
           </Form.Item>
           
           <Form.Item name="remember" valuePropName='checked' wrapperCol={{offset: 4, span: 16}}>
                  <Checkbox>Remember</Checkbox>
           </Form.Item>

           <Form.Item wrapperCol={{offset: 10, span: 19}}>
                <Button style={{minWidth: "86.27px"}} onClick={()=>{dispatchLogin();}} type="primary" htmlType='submit' size={"large"}>
                    {isLoading ? <Spin /> : "Sign In"}
                </Button>
           </Form.Item>
           <h4 className={"horizontalStyles"}>Or</h4>
           <Form.Item wrapperCol={{offset: 10, span: 19}}>
           <Button onClick={()=>{setIsShowSignUp(true); setIsShowLogin(false)}} type="primary" htmlType="button" size={'large'}>
                Signup
           </Button>
           </Form.Item>
       </Form>

        </Modal>
    )
}
LoginFormModal = memo<Props>(LoginFormModal);
export {LoginFormModal};

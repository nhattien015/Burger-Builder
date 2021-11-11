import { FC, memo } from 'react';
import {Form, Modal, Input, Button, Checkbox} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useMemo } from 'react';
import LoginPageStyles from './LoginPage.module.css';
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
    const onFinish = (values: any) => {
        
    }
    const onFinishFailed = ()=> {

    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        console.log(ev.target.name)
        form.setFieldsValue({
            [ev.target.name]: ev.target.value
        })    
    }
    const closeModal = ()=>{
        setIsShowLogin(false);
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
       onFinish={onFinish}
       onFinishFailed={onFinishFailed}
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
                <Button type="primary" htmlType='submit' size={"large"}>
                    Sign In
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
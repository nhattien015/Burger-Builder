import React, { ChangeEvent, useState, FC } from 'react';
import { Form, Modal, Input, Button, Checkbox } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import LoginPageStyles from './LoginPage.module.css';
import { LoginFormModal, SignupFormModal } from '.'

export const AuthenticationPage: FC = () => {
    const [isShowLogin, setIsShowLogin] = useState<boolean>(true);
    const [isShowSignUp, setIsShowSignUp] = useState<boolean>(false);
    // const onFinish = (values: any) => {

    // }
    // const onFinishFailed = ()=> {

    // }

    // function closeMoal(){
    //     setIsShowLogin(false);
    // }

    return (
        <div className={LoginPageStyles.container}>

            <LoginFormModal
                setIsShowSignUp={setIsShowSignUp}
                isShowLogin={isShowLogin}
                setIsShowLogin={setIsShowLogin}
            />



            <SignupFormModal
                isShowSignUp={isShowSignUp}
                setIsShowSignUp={setIsShowSignUp}
                setIsShowLogin={setIsShowLogin}
            />


            <Button onClick={() => { setIsShowLogin(true) }} type="primary" htmlType="button" size={'large'}>
                Login to see your orders
            </Button>

        </div>
    )
}

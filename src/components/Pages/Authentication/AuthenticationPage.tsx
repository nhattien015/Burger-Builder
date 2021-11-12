import React, { FC, memo, useState } from 'react';
import { Button } from 'antd';
import LoginPageStyles from './Form/AuthForm.module.css';
import { useForm } from 'antd/lib/form/Form';
import { LoginFormModal, SignupFormModal } from '.'

let AuthenticationPage: FC = () => {
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

AuthenticationPage = memo(AuthenticationPage)
export { AuthenticationPage } 

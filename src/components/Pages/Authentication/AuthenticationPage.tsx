import React, { FC, memo, useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom'
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import LoginPageStyles from './Form/AuthForm.module.css';
import { useForm } from 'antd/lib/form/Form';
import { LoginFormModal, SignupFormModal } from '.'
import { RootState } from '../../../app/';
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
    
    const navigate = useNavigate();
    const isLogin = useSelector((state: RootState) => state.auth.isLogin);
    const redirectLoginHandle = useCallback(() => {
      if(isLogin){
         navigate('/');
      }
    },[navigate, isLogin])
    const verifyLogined = useCallback(() => {
      if(String(localStorage.getItem('tokenId')) != "null"){
        navigate('/')
      }
    },[navigate])
    
  

    useEffect(()=>{
        verifyLogined();   
        redirectLoginHandle();
    })
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

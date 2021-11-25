import { message } from 'antd';
import {FC, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import { HomePage, AuthenticationPage, OrdersPage } from '.';
import {getUserProfileEndpoint, IdentifyTookitAPIKEY} from '../../constant/APIEnpoint'
import {signout} from '../../features/user/authSlice';
import {User} from '../../types';
import axios from 'axios';
import { useDispatch } from 'react-redux';
export const Main : FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const checkTokenExpires = () => {
        const targetUrl = `${getUserProfileEndpoint}?key=${IdentifyTookitAPIKEY}&idToken=${localStorage.getItem("tokenId")}`;
        fetch(targetUrl,{
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            } 
          }).then(res=>{
              return res.json();
            }).catch((err)=>{
                
            }).then((dataRes: any)=>{
              //Expires in 3600 second
              
              const lastLogin = dataRes.users[0].lastLoginAt;
              if(Number(new Date().getTime()) > Number(lastLogin) + 3600000){
                localStorage.removeItem("tokenId");
                dispatch(signout());
              }
              

            })

        
    }
    useEffect(()=>{
        // if(localStorage.getItem("tokenId") === "undefined"){
        //   localStorage.setItem("tokenId", "null")
        // }
         if(localStorage.getItem("tokenId")){

            checkTokenExpires();
          }
        
      })
    return (
       <div style={{marginTop: "2em"}}>
       <Routes>
           <Route path={'/'} element={<HomePage/>}>
           </Route>

           <Route path ='/login' element={<AuthenticationPage/>}>
           </Route>

           <Route path ='/orders' element={<OrdersPage/>}>
           </Route>
           </Routes>
       </div>

    )
}

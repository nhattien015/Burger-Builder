import {FC, useEffect, useState} from 'react'
import HeaderBarStyles from './HeaderBar.module.css';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom'
import {signout} from '../../features/user/authSlice'
import {useDispatch, useSelector} from 'react-redux';
import {Button} from 'antd'
import { useNavigate } from 'react-router';
import { RootState } from '../../app';
import { getUserProfileEndpoint, IdentifyTookitAPIKEY } from '../../constant/APIEnpoint';
export const HeaderBar : FC = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [usernameInfo, setUsernameInfo] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);
  const getUserName = ()=>{
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
          
          console.log(dataRes);
          if(!dataRes.error){
              setUsernameInfo(dataRes.users[0].email)
          }

        })
  }
  useEffect(()=>{
      getUserName();
  })
    return (
        <div className={HeaderBarStyles.header}>
            <Menu mode={"horizontal"}>
               <Menu.Item key={1}>
                   <NavLink to={'/'}> 
                        Burger Builder
                   </NavLink>
               </Menu.Item>
               <Menu.Item key={2}>
                <NavLink to={'/orders'}>
                Orders
                </NavLink>
               </Menu.Item>
               {String(localStorage.getItem("tokenId")) == "null" && <Menu.Item key={3}>
                   <NavLink to={'/login'}>
                   Login
                   </NavLink>
               </Menu.Item>}
               {String(localStorage.getItem("tokenId")) != "null" && <Menu.Item key={4}>
                   {/* Show when login      */}
                   <Button type="link" danger={true} onClick={()=>{ dispatch(signout()); navigate("/login")}}>
                   Logout
                   </Button>
               </Menu.Item>}
            </Menu>
            <h4>
                   {usernameInfo}
            </h4>
        </div>
    )
}

import {FC} from 'react'
import HeaderBarStyles from './HeaderBar.module.css';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom'
import {signout} from '../../features/user/authSlice'
import {useDispatch} from 'react-redux';
import {Button} from 'antd'
import { useNavigate } from 'react-router';
export const HeaderBar : FC = ()=>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        </div>
    )
}

import {FC} from 'react'
import HeaderBarStyles from './HeaderBar.module.css';
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom'
export const HeaderBar : FC = ()=>{
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
               <Menu.Item key={3}>
                   <NavLink to={'/login'}>
                   Login
                   </NavLink>
               </Menu.Item>
               <Menu.Item key={4}>
                   {/* Show when login      */}
                   <NavLink to={'/logout'}> 
                   Logout
                   </NavLink>
               </Menu.Item>
            </Menu>
        </div>
    )
}
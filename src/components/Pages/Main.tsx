import {FC, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import { HomePage, AuthenticationPage, OrdersPage } from '.';
export const Main : FC = () => {
    useEffect(()=>{
        if(localStorage.getItem("tokenId") === "undefined"){
          localStorage.setItem("tokenId", "null")
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

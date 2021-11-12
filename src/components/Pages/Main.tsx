import {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import { HomePage, AuthenticationPage, OrdersPage } from '.';
export const Main : FC = () => {
    return (
       <div style={{marginTop: "2em"}}>
       <Routes>
           <Route path={'/'} element={<HomePage></HomePage>}>

           </Route>

           <Route path = '/login' element={<AuthenticationPage></AuthenticationPage>}>

           </Route>

           <Route path = '/orders' element={<OrdersPage></OrdersPage>}>

           </Route>
       </Routes>
       </div>

    )
}
import {FC} from 'react';
import {Routes, Route} from 'react-router-dom';
import { HomePage, AuthenticationPage, OrdersList } from '.';
export const Main : FC = () => {
    return (
       <div style={{marginTop: "2em"}}>
       <Routes>
           <Route path={'/'} element={<HomePage></HomePage>}>

           </Route>

           <Route path = '/login' element={<AuthenticationPage></AuthenticationPage>}>

           </Route>

           <Route path = '/orders' element={<OrdersList></OrdersList>}>

           </Route>
       </Routes>
       </div>

    )
}
import {FC, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import { HomePage, AuthenticationPage, OrdersPage } from '.';
import {getUserProfileEndpoint, IdentifyTookitAPIKEY} from '../../constant/APIEnpoint'
import {User} from '../../types';
export const Main : FC = () => {
  

    
//     const checkTokenExpires = () => {
//    let user: User | null = null;
//     try{
//       user = JSON.parse(localStorage.getItem("user") as string);
//     }
//     catch(err){
//         console.log(err);
//     }
//     if(user){
//       const targetUrl = `${getUserProfileEndpoint}?key=${IdentifyTookitAPIKEY}&idToken=${localStorage.getItem("tokenId")}`;
//       fetch(targetUrl,{
//           method: "POST",
//           headers: {
//             "Accept": "application/json",
//             "Conten-type": "application/json"
//           },
//           body: JSON.stringify(
//           {
// 
//           }
//           )
// 
//         }).then((res)=>{
//           return res.json();
//         }).then(dataRes=>{
//            console.log(dataRes);
//         })
// 
//       }
//     }
    useEffect(()=>{
        // if(localStorage.getItem("tokenId") === "undefined"){
        //   localStorage.setItem("tokenId", "null")
        // }
        // if(localStorage.getItem("tokenId")){
        //   }
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

import React from 'react';
import { logout } from '../auth/auth'



 const Testing = (props)=>{
     console.log(props)
     return(

        <div>
            <button onClick={()=>{
                logout()
                props.history.push('/login')
            }}>
                Log out</button>
        <img src ="/images/Mombasa/1.jpg" alt="testing"/>

    </div>
       )
     
   
 }
 
export  default Testing

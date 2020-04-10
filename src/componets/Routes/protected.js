import React from 'react' 
import {Route,Redirect} from 'react-router-dom'
import { loginau } from  '../auth/auth'
// import auth from '../auth/auth'

export const ProtectedRouter = ({component:Component,...rest})=>{
    return(
   
        <Route {...rest}

        render={props =>{
            if(loginau()){
                return <Component {...props} />
            }else{
               return <Redirect to={
                    {
                      pathname: '/',
                      state: {
                        from: props.location
                      }
                    }
                  } />
            }
           
        }}   
        />
    )

    
}

export default ProtectedRouter
import React from  'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
  import Home  from  '../Home/home'
  import Location  from  '../Location/location'
  import Register from '../sign/register/register'
  import Login from '../sign/login/login'
import Protected from '../Routes/protected'
import  Error from '../Error/error'
import Test  from '../testing/TestingI'


function Routes(){
    return(
        <Router>
            <Switch >
                <Route path='/' component={Home}  exact />   
                <Route path='/login' component={Login} exact />
                <Route path='/register' component={Register}  exact />
                <Protected path ='/test/:id' component={Test} exact/>
                <Route path='/location/:id' component={Location} exact/>

              
                <Route component={Error} />
         
            </Switch>
            

        </Router>

    )
}
export default Routes

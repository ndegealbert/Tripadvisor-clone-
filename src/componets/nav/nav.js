import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import './nav.css'
import {Link}  from 'react-router-dom'
import {logout } from '../auth/auth'
import {withRouter} from 'react-router-dom'


const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  //modal  
  return (
    //modal  to search 
    <div >
      <Navbar color="light" light expand="md" fixed="top">
        <NavbarBrand >Accomodationfaider</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/**include a searching link this  Point */}
            
             < NavbarText 
             
             ><span className="home" ><Link to="/">Home</Link></span></NavbarText>
            </NavItem>
           
          </Nav>

         
          <NavbarText ><span className="sign_up" ><Link to="register">Sign up</Link></span></NavbarText>
          <NavbarText ><span className="login" ><Link  style={{ textDecoration: 'none' }}  to="login">Log in</Link></span></NavbarText>
          
          <span onClick={()=>{
                logout()
                props.history.push('/login')
            }}
            className="log_out" >
              Log out
            </span>      
        </Collapse>
      </Navbar>
    </div>
  );
}
export default withRouter(Navigation)
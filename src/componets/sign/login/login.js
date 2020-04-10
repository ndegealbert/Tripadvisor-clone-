import React,{Component} from 'react'
import {Container,Col,Row}  from  "reactstrap"
import Nav from '../../nav/nav'
import './login.css'
import {  Button, Form, FormGroup, Label, Input} from 'reactstrap';
import axios  from  'axios'
import http from '../.././helper'
import { loginau } from '../../auth/auth'

class Login extends Component{
      state = {
        password: "",
        email:"",
        error:''
  
        };
  
        changehandler = (event) =>{
          this.setState({
      
              [event.target.name]: event.target.value
          })  }   
          
       onShandler =(event) =>{
        event.preventDefault()
        const  user = {
          password: this.state.password,
          email:this.state.email
        }
        axios.post(http+`/api/user/login`,user)
        .then(res =>{
              this.setState({
                error:res.data
              })
               localStorage.setItem("Authoraization", res.data) //set local storage
           }).catch(err =>{
             console.log(err)
             if(err){
              this.props.history.push("/login");  
                
             }
           })
    }
  
  render(){
    loginau()
      console.log(this.state.error)
     var message = this.state.error === '' ? null :this.state.error.error 
     console.log(message)
    return(
      <Container >   
      <Nav/>
      <Row>
        <Col lg={12}>
        <div className="login2">
        
        <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name='email' id="email"  onChange={this.changehandler} placeholder="email"  />
        </FormGroup>
        <FormGroup>
          <Label for="Password">password</Label>
          <Input type="password" name='password' id="Password" onChange={this.changehandler} placeholder="password"  required/>
          <Label style={{
              marginTop:'15px',
              color:'red'
          }} >
          {message}
       </Label>
         
        </FormGroup>
        <Button 
        style={{
          backgroundColor:'green'
        }}    
        onClick={this.onShandler} >Sign in</Button> 
        
    </Form>  
  
            </div>
        
        </Col>
      </Row>
    
    </Container>
    )
  }     
}
export default Login
import React,{Component} from 'react'
import {Container,Col,Row}  from  "reactstrap"
import './register.css'
import Nav from '../../nav/nav'
import {  Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios  from  'axios'
import http  from  '../.././helper'

class Register extends Component{
    state = {
        name: "",
        email:"",
        phone_number:"",
        password:'',
        error:''
        };
        changehandler = (event) =>{
          this.setState({
      
              [event.target.name]: event.target.value
          })  }
  
       onShandler = async (event) =>{
           event.preventDefault()
           const user = {
              name:this.state.name,
              email:this.state.email,
              phone_number:this.state.phone_number,
              password:this.state.password
           }
           console.log(user)
          await axios.post(http+`/api/user/register`,user)
           .then(res =>{
                  console.log(res.data)
                  this.setState({
                    error:res.data
                  })
              }).catch(err =>{
                console.log(err)
              })
          
       }
 
  render(){
    //error  massage
    var message = this.state.error === '' ? null :this.state.error.error 
    console.log(this.state)
    return(
        <Container >
          <Nav/>
          <Row>
            <Col lg={12}>
            <div className="register">
            <Form>
            <FormGroup>
              <Label className="label" for="username">Username</Label>
              <Input type="username" onChange={this.changehandler} name="name" id="username" placeholder="username" />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email"  id="email" name="email" onChange={this.changehandler} placeholder="email"  />
            </FormGroup>
            <FormGroup>
              <Label for="phone_numbert">phone_number</Label>
              <Input type="phone" name="phone_number" onChange={this.changehandler}  id="phone" placeholder="phone_number"  />
            </FormGroup>
            <FormGroup>
              <Label for="Password">password</Label>
              <Input type="password" id="Password" name="password" onChange={this.changehandler} placeholder="password"  required/>
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
            onClick={this.onShandler}>Sign in</Button>  
        </Form>            
                </div>
            </Col>
          </Row>
          
        </Container>
    )
  }
      
}
export default Register
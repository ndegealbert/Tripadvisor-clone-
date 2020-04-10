import React, { useState ,useEffect} from 'react';
import { Container, Row, Col } from 'reactstrap';
import './location.css'
import Nav from '.././nav/nav'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import axios  from 'axios'
import http from '.././helper'
import Caleder from '../caleder/caleder'
import {loginau} from '../auth/auth'
import './loading.css'

 const Location = (props)=>{
    const {
        className
      } = props;
    
      const [modal, setModal] = useState(false);

      const [hotel ,setHotel] =useState() //set  hotel  

        const [state , setState] = useState({  //payment
            amount : "",
            phoneNumber: ""
            
        })
        const [postComment, setPostcomment] = useState([])  //postcommnet 
        const [retriveCommnet, setretriveCommet] = useState([])
        //User Message
        const  [Message,setMessage] =useState('')
        const  [loading,setLoading] =useState(false)

        
  
            
      const toggle = () => setModal(!modal);

//Componet will  Mount
      useEffect(() => {
        // Your code here
     axios.get(`http://localhost:4000/Mombasa/`+ props.match.params.id)
        .then(res =>{
                setHotel({
                    hotel:res.data
                })
      
        
            
        }).catch(err =>{
            console.log(err)
        })
        

      }, []);

      useEffect(()=>{
          //get the comments
       setLoading(true)
       let isCancelled = false;
       async function fetchdata(){
       await axios.get(http + '/api/comments/nairobi')  //retrive commnent from  Db
       .then(res =>{
         if(!isCancelled){
            setretriveCommet({
                retriveCommnet:res.data
            })
         }
          
       }).then(err=>{
           console.log(err)
       })
       setLoading(false)
      }
      fetchdata()
       return () => {
        isCancelled = true;
      };

      },[])

    

 
     const handleChange = e => {         //take the details from  the user
        const {name , value} = e.target
        setState(prev => ({ 
            ...prev,
            [name] : value,
        }))
     }

  //call  mpesa Api for payment 
  const pay= ()=>{
    axios.post(http+`/api/payment/payment`,state)  //perform payment
    .then((res)=>{
        console.log(res.data)
        setMessage({
            Message:res.data
        })
    })
    
  }
  //comment Api login
  const handleChangeco = e => {
    const {name , value} = e.target
    setPostcomment(prev => ({ 
        ...prev,
        [name] : value,
    }))
 }

 const commentSubmit =(e)=>{
        e.preventDefault()
        axios.post(http+`/api/comments/nairobi`,postComment)
        .then(res =>{
            console.log(res.data)
        }).then(err=>{
            console.log(err)
        })
 }

    if(retriveCommnet.retriveCommnet === undefined){
        return null
    }

      console.log(retriveCommnet.retriveCommnet)

    //   console.log(hotel.hotel.image)
 
        console.log(hotel)
        console.log(postComment)
       const erroMessage = Message.Message===undefined ? null : Message.Message.errorMessage ||  Message.Message.CustomerMessage
       console.log(erroMessage)
       console.log(loading)
        function  loader(){
          if(loading){
            return <div class="loader">Loading...</div>
           }
        } 
      

        return(
  
            <Container>
                <Nav/>
           <div className="bodyl">
                    {
                      loader()
                    }
                    <Row>
                        <Col>
                    <div className="imagesl"
            
                    style={{
                        backgroundImage:`url(/images/Mombasa/${hotel.hotel.image})`,
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat',
                          }}
                        > 

                      
                    </div>
                    
                    </Col>
                     <Col>
                     <div className="map"
                     style={{
                        backgroundImage:`url(https://c1.staticflickr.com/4/3896/14550191836_cc0675d906.jpg)`,
                        backgroundSize:'cover',
                        backgroundRepeat:'no-repeat'
                       
                          }}     
                     >
                     </div>
                     </Col>
                    </Row>
                    <Row>
                        <Col>
                        <div className="comments">
                    
                        <p> {postComment.comment}</p>
                        <p className="com">Comments</p>
                            <Form>
                                <FormGroup> 
                              <Input type="textarea" placeholder="Enter comment here" name="comment" onChange={handleChangeco} />  
                              <button className='commentbu'
                               onClick={()=>{
                                 if(loginau()){
                                  commentSubmit()
                                 }else{
                                  props.history.push('/login')
                                 }
                    
                               }}
                              >comment</button> 
                              </FormGroup> 
                   
    
                            </Form>
                                {
                                  retriveCommnet.retriveCommnet.map(data =>(
                                    <div >
                                   <p className="itsealf">{data.comment}</p>
       
                              </div>
                                     
                                  ))                  
                                }
                        </div>

                        </Col>
                        <Col>
                        <div className='pay'>

                          <div className="booking">
                            <p>Make Bokings</p>
                            <Caleder />
                          </div>
                           
                            <div className="mpesa">

                 
                            <Button 
                             style={{
                                backgroundColor:'green'
                              }}

                              
                            onClick={()=>{
                             if (loginau()){
                              toggle()
                             }else{
                              props.history.push('/login')
                             }

                            }}>make payment</Button>
                                <Modal isOpen={modal} toggle={toggle} className={className}>
                                    <ModalHeader toggle={toggle}>Check your phone to complete request</ModalHeader>   
                                  <p style={{
                                   color:'green',
                                  }}   
                                >{ erroMessage }</p>
                                    <ModalBody>
                                    <Form>
                                        <FormGroup>
                                        <Label for="exampleText">Amount</Label>
                                        <Input type="number" name='amount' placeholder="Amount" onChange={handleChange}  />
                                        <Label for="exampleText">Phone_number</Label>
                                        <Input type="number" name='phoneNumber'placeholder="Amount" onChange={handleChange}  />
                                        
                                        </FormGroup>
                                    </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="primary" onClick={pay}> Pay</Button>
                                    <button onClick={toggle}>Cancel</button>
                                    </ModalFooter>
                                </Modal>

                            </div>
                        </div>
                        </Col>
                    </Row>
    
           </div>
           </Container>
               
        )
}
 
export  default Location

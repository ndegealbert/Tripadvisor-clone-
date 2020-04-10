import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import './home.css'
import Nav  from '../nav/nav'
import axios from  'axios'
import  Startdata from '../caleder/caleder'
import Hotel from '../hotels/hotels'
import Pagination from "../hotels/pagination"
import { search } from './utils'

class Home extends Component {
    state ={
      hotel:[],
      currentPage:1,
      postPerPage:6,
        loading:true

    }
async componentWillMount(){
    this.setState({loading:true})
   await axios.get('http://localhost:4000/Mombasa')
    .then(res =>{
        this.setState({
            hotel:res.data,
                  })
    }) 

    this.setState({loading:false})

}
     paginate =(pageNumber) =>{
         this.setState({
             currentPage:pageNumber
         })
     }
           //Search functionality 
           Search = async (event)=>{
            event.preventDefault()
            console.log(event.target.value)
           const value = event.target.value
            await axios.get(`http://localhost:4000/${value}`)
           .then(res =>{
                this.setState({
                    hotel:res.data,
                          })
            }) 
        }
    render() {
        var hotels = this.state.hotel
       console.log(hotels)
        const indexOfLastPost = this.state.currentPage * this.state.postPerPage;
        const indexOfFirstPost =indexOfLastPost - this.state.postPerPage;
        const currentPosts =hotels.slice(indexOfFirstPost,indexOfLastPost);
        console.log(currentPosts)
  
        return (
            <Container >
                 <Nav/>
                <Row>
                    <Col>
                    <div className="booking">
                     < Startdata />
                   </div> 
                    </Col>
               
                    <Col>
                    <div className="booking"  >       
                       
                        <input type="text" className="input" placeholder="search place" name='search' onChange={this.Search} required/>
                            <button className="search" onClick={this.earch} >Search</button>
                            </div>

              
                    
                     </Col>
                </Row>    
                <Hotel hotel={currentPosts} loading={this.state.loading}/> 
                <Pagination postPerPage={this.state.postPerPage} totalPosts={hotels.length} paginate={this.paginate} />
            </Container>
        )

    }
}
export default Home
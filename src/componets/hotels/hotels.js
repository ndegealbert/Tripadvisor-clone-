import React  from 'react'
import  {Link } from  'react-router-dom'
import './hotel.css'
import './loader.css'
const Hotel = ({hotel,loading}) =>{
    if(loading){
       return <div class="loader">Loading...</div>
    }
    return(
       hotel.map((data) =>
                        <div key={data.id} className="hotel">
                                <div className="img2"
                                style={{
                                    backgroundImage:`url(images/Mombasa/${data.image})`,
                                    backgroundSize:'cover',
                                    backgroundRepeat:'no-repeat'
                                    
                                      }}
                                    >  
                                </div>
                                <div className="price">
                                    <p className="name">{data.name}</p>
                                      {
                                          console.log(data.Amenities)
                                      }
                                    <p className="kes">{data.price} kes</p>
    
    
                                </div>
                                <div className="details">
                                    <p className="detail"> Property amenities </p>
                                      {
                                          data.Amenities.map(am =>(
                                
                                              <ul key={am.id}>
                                                    <li className="list"> 
                                                    {am.Amenitie}
                                                    </li>
                                              </ul>
                                          ))
                                      }
                                    
                                </div>
                                <div className="details">
                                    <p className="detail">Languages</p>

                                    {
                                          data.Lnaguages.map(la =>(
                                
                                              <ul key={la.id}>
                                                    <li className="list"> 
                                                    {la.language}
                                                    </li>
                                              </ul>
                                          ))
                                      }
                                  
                                </div>
                                <div className="details">
    
                             <p  className="location"><Link style={{ textDecoration:'none'}} to={"location/" + data.id} >Show More</Link></p>
    
                             <p> <Link to ={"/test/" + data.id}>testImage</Link></p>
                            
                                </div>
                            </div>
                        )
    )
   
                                }
 
export default Hotel 
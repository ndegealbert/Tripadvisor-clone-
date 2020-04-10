import React from 'react'
import './paginate.css'

const PaginationC =({postPerPage,totalPosts,paginate} )=>{
    const pageNumber =[]
    for(let i =1;i<=Math.ceil(totalPosts/postPerPage);i++){
        pageNumber.push(i)
    }
    return(
        <div id="menu-outer">
        <div className="table">
        <ul id="horizontal-list">
        {pageNumber.map(number =>(  
        <li key={number}> 
          <button 
          className="activebtn" onClick={(()=> paginate(number))}>{number}</button>
        </li>

    ))}</ul> 
        </div>
        </div>
    )
}
export default PaginationC
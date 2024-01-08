import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'cookies-js'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Searched.css"
import LoaderSearch from "./LoaderSearch.jsx"
function SearchedProductsCard(props){
  const randomDecimal = (min, max) => {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(1); 
  };
  const navi = useNavigate()
  const show = useRef();
  
  const randomValue = randomDecimal(3, 5);
  return(
    <>
        <div className="container_for_SearchedProducts " key={props.items._id} onClick={()=>{
            navi(`/productdetails/${props.items._id}`,{state:{DATA:props.items}})
        }} 

        onMouseEnter={()=>{
          show.current.style.display="block"
        }}
        onMouseLeave={()=>{
          show.current.style.display="none"
        }}
        >

          <button className="searched_page_offer_button" ref={show}>Hot deal</button>
              <center className="search_page_product_image">
                  <img src={`http://localhost:3030/${props.items.image}`} alt="image" height={'100%'}  />
              </center>
          <div className="search_page_product_dat_container">
          <p>{props.items.desc}</p>
          <h1>{props.items.name}</h1>
          <h1>
            <span>Cost:</span>₹
            {props.items.price}/-
          </h1>
          <h1>
            <span>Offer :</span>
             {props.items.offer}
          </h1>
          <h1>Rating : {randomValue}</h1>
          
           

          </div>
        </div>
    </>
  )
}


function Searched() {
  const [Fetch,Setfetch] = useState([]);
  const [Filter,SetFilter] = useState([]);
  async function GetProducts() {
    try {
      const Resp = await axios.get('http://localhost:3030/apis/getProducts');
      const fill  = Cookies.get('search')
      const Datass = Resp.data;
      const FilterData = Datass.filter((item)=>{
        return(
          item.name.toLowerCase().includes(fill.toLowerCase()) ||
          item.desc.toLowerCase().includes(fill.toLowerCase()) ||
          item.cate.toLowerCase().includes(fill.toLowerCase()) ||
          item.recomend.toLowerCase().includes(fill.toLowerCase())
        )
      })
      SetFilter(FilterData)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
  
  useEffect(()=>{
    GetProducts()
  },[ Cookies.get('search')])

  return (
    <>
      <div className="Searching_page_total_container">
      {Filter.length > 0 ? (
            Filter.map((product,index) => (
              <SearchedProductsCard key={index} items={product} />
            ))
          ) : (
            
           <>
           <LoaderSearch/>
            <p style={{fontSize:'25px'}}>No matching products found.</p>
           </>
          )}

      </div>
    </>
  );
  
}

export default Searched
import React, { useEffect, useState } from 'react'
import "./MyOrders.css"
import axios from 'axios'
import Cookies from 'cookies-js'
import LoaderForOrder from './LoaderForOrder'
function MyOrders() {
    const [Order,SetOrders] = useState(true)
    const [UserData,SetUserData] = useState([]);
    const [UserOrders,SetUserOrders] = useState([]);

   async function GetOrders ()
   {
    const email = Cookies.get('Email')
    const respData = await axios.get(`http://localhost:3030/apis/getTheOrder/${email}`)
    console.log(respData.data)
    SetUserData(respData.data[0])
    SetUserOrders(respData.data[0].orders)
    SetOrders(false)
    }

    useEffect(
        ()=>{
           GetOrders()
    },[])
  return (
    
        
            Order  ?(<LoaderForOrder/>) :
        (
        <div className='Main-container-for-orders'>
        <h1>Profile / My Orders</h1>
        <div className="userDetails-for-orders">
            
                <div className="cookieCard">
  <p className="cookieHeading">Your Details.</p>

  <p className="cookieDescription">Name : {UserData.name}</p>
  <p className="cookieDescription">Phone Number :{UserData.phno}</p>
  <p className="cookieDescription">House No : {UserData.apt}</p>
  <p className="cookieDescription">Street : {UserData.street}</p>
  <p className="cookieDescription">Town/City : {UserData.tc}</p>
  {/* <p className="cookieDescription">Email : {UserData.email}</p> */}

</div>

            
        </div>
        <h1 style={{marginTop:'40px',marginBottom:'40px',marginLeft:'80px'}}>Your Order History</h1>
        <div className="user-client-order-details">
            
            {
               UserOrders.length > 0 ?(

                UserOrders.map((data,index)=>(
                    <div className="card" key={index}>
                        <img src={`http://localhost:3030/${data.image}`} className="card__image" width={'200px'} alt="image" />
                        <div className="card__overlay">
                          <div className="card__header">
                            <div className="card__header-text">
                              <h3 className="card__title">Product : {data.name}</h3>            
                              <span className="card__status">price : ₹{data.price}/-</span>
                            </div>
                          </div>
                          <p className="card__description">Arrival : Estimated on Monday</p>
                          <p className="card__description">Status : <span className='Order-Shpping'>Shipping</span></p>
                        </div>
                    </div>

                ))
             
                ):(
                    <p>No orders</p>
                )
               
            }
        </div>
    </div>)
        
  )
}

export default MyOrders


     
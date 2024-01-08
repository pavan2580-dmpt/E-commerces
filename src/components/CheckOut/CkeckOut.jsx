import React,{useEffect} from 'react'
import "./CheckOut.css"
import { useLocation,useNavigate } from 'react-router-dom'
import Cookies from 'cookies-js';
function CheckOut() {
  
 const location = useLocation();
 const product = location.state?.product;
 const productData = location.state.product;
 const updatedprice = location.state.changedprice

const ArrayOfItems = location.state?.List;

  const Redirect = useNavigate();
  const isUserLogged = Cookies.get('Logged') === "true"; 
  // (!product||)
  useEffect(() => {
    if (!isUserLogged  ) {
      Redirect('/signin');
    }
  }, [isUserLogged, product, Redirect]);

  function HandlePlaceOrders(){
    let Orders = [];
    let productArray;
  if (!Array.isArray(productData)) {
    productArray = productData ? [productData] : [];
  }
  
  Orders = [...productArray, ...ArrayOfItems];
  const Email = Cookies.get('Email')



  fetch('http://localhost:3030/apis/PlaceOrders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orders:Orders, email: Email }),
  })
    .then((response) => response.json())
    .then((data) => {
     
      console.log('Order placed successfully:', data);

    })
    .catch((error) => {
      console.error('Error placing order:', error);
    
    });
}

  

  return (
    <>
    
   {
      isUserLogged   ?(
        <div className="CheckOut_page_container">
        <div className="billing_details">
          <h1>Billing Details</h1>
          <div className="billing_data">
            <p> Name</p>
            <input type="text"  className="bill_data_from" />
          </div>
          <div className="billing_data">
            <p>Phone Number</p>
            <input type="tel"  className="bill_data_from" />
          </div>
  
          <div className="billing_data">
            <p>Street Address Name</p>
            <input type="text"  className="bill_data_from" />
          </div>
  
          <div className="billing_data">
            <p>Apartment,floor,etc..</p>
            <input type="text"  className="bill_data_from" />
          </div>
  
          <div className="billing_data">
            <p>Town/City </p>
            <input type="text"  className="bill_data_from" />
          </div>
  
          <div className="billing_data">
            <p>Email Address</p>
            <input type="text"  className="bill_data_from" />
          </div>
  
         <div>
         <input type="checkbox"  />
          <span>Save this information for faster check-out next time</span>
         </div>
        </div>
  
        <div className="checkOutProductData_container">
  
         {
          ArrayOfItems ?
       (
          ArrayOfItems.map((item,index)=>(
            <div className="checkOutProduct_container" key={index} >
          <img src={`http://localhost:3030/${item.image}`}  height={'130px'} />
          <div className="checkout_display_Card">
            {/* <h3>Name :{productData.name}</h3> */}
            <p>Total price : {item.price}</p>
            <p>No of items : {item.itemCount} </p>
          </div>
        </div>
          ))
       )
        
        
        :(
            <div className="checkOutProduct_container">
            <img src={`http://localhost:3030/${productData.image}`}  height={'130px'} />
            <div className="checkout_display_Card">
              <h3>Name :{productData.name}</h3>
              <p>Total price : {updatedprice}</p>
              <p>No of items : {parseInt(updatedprice)/parseInt(productData.price.replace(',',''),10)}</p>
            </div>
          </div>
          )
         }
        </div>
  
          <div className="checkOut_page_place_order_button">
            <button onClick={HandlePlaceOrders}>Place Order</button>
          </div>
      </div>
    
      ):(Redirect('/signin'))
        
      

   }
    
    
    </>
  )
}

export default CheckOut
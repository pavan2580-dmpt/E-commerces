import React, { useEffect, useState ,useContext} from 'react';
import './Cart.css';
import { MdDelete } from "react-icons/md";
import CartLoader from './CartLoad';
import Cookies from 'cookies-js';
import CartContext from '../Context/CartContext';
import { useNavigate } from 'react-router-dom';


function ShowCartItemFromLocal({SetCost}) {
   
    const [CartCtn,SetCartCtn] = useContext(CartContext)
  const [items, setItems] = useState([]);
  const [Total,SetTotal] = useState(0);

  useEffect(() => {
    const myArray = JSON.parse(localStorage.getItem('AddToCart')) || [];
    setItems(myArray); 
    Cookies.set("length", myArray.length)
    SetCartCtn(myArray.length)
  }, [SetCartCtn]);

  useEffect(() => {
    let total = 0;
    items.forEach(item => {
      total =total+ (parseInt(item.price) * parseInt(item.itemCount)  );

    });
    SetTotal(total);
    SetCost(total)
  }, [items]);

  function RemoveItem(index){
    const updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
    setItems(updatedItems);
    localStorage.setItem('AddToCart', JSON.stringify(updatedItems));
  }

  return (
    <div className="cart_items_container">
      {
        items.length === 0 ? (<CartLoader/>) :(
          items.map((item, index) => (
            
            <div key={index} className="cart_items_Product_container">
                
              <img src={`http://localhost:3030/${item.image}`} alt="Product" height={'160vh'} />
              <p>Price: {item.price}</p>
              <p>Items : {item.itemCount}</p>
              <button className='RemoveFromCartButtoninCart' onClick={()=>{RemoveItem(index)}}>
                Remove <MdDelete/>
              </button>
            </div>
          ))
        )
      }

    </div>
  );
}

function Cart() {
  const NAvigation  = useNavigate();
  const [Cost,SetCost] = useState(0);
  return (
    <div className="cart_main_container">
      <p style={{marginLeft:'50px',fontSize:'30px'}} >Home/ <span style={{color:'gray'}}>cart</span></p>
      <ShowCartItemFromLocal SetCost={SetCost}/>
            <div className="cart_bottom_container_for_going_to_payment_section">
               {
                  (Cost !=0)&&( <div className="ShowTheTotalCostAnd_Shipping_details">
                  <h1>Cart Total</h1>

                 <div className="inner_div_odthe_cart_price_data">
                 <p>Subtotal:</p> <p>₹{Cost}</p>
                 </div>

                 <div className="inner_div_odthe_cart_price_data">
                 <p>Shipping:</p> <p>Free</p>
                 </div>

                 <div className="inner_div_odthe_cart_price_data">
                 <p>Total:</p> <p>₹{Cost}</p>
                 </div>

                  <button onClick={()=>{
                      NAvigation('/checkout',{state:{List: JSON.parse(localStorage.getItem('AddToCart'))}})
                  }}>Process to checkout</button>

                </div>)
               }
            </div>
    </div>
  );
}

export default Cart;

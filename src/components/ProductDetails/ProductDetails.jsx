import React, { useState } from 'react'
import "./ProductDetails.css"
import game from "../Home/products/gamepad.png"
import {GrSubtract} from "react-icons/gr"
import {IoMdAdd}  from "react-icons/io"
import {AiOutlineHeart,AiOutlineShoppingCart,AiOutlineUser,AiFillStar} from "react-icons/ai"
import {TbTruckDelivery} from "react-icons/tb"
import {HiOutlineRefresh} from"react-icons/hi"
import { useLocation,useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Cookies from 'cookies-js';
function ProductDetails() {



    function AddToLocalCart(img,val){
        let existingCart = JSON.parse(localStorage.getItem('AddToCart')) || [];
        if (!Array.isArray(existingCart)) {
          existingCart = [];
        }
        const newData = { image:img, price:val };
        existingCart.push(newData);
        localStorage.setItem('AddToCart', JSON.stringify(existingCart));
        toast('Added to cart',{
          theme: "dark"
        })
      }
   
    const location =useLocation();
    const GetData = location.state.DATA
    const[updateRate,SetupdateRate] = useState(1)
    const navigate = useNavigate();
  return (
    <>
            <div className="product_page_container">
                <div className="product_page_image">
                    <img src={`http://localhost:3030/${GetData.image}`} alt="game" width={'100%'}/>
                </div>
               

               <div className="product_righthand_side">



               <div className="product_page_productData">
                <h1>{`Product Name : ${GetData.name}`}</h1>
                        <h2 style={{color:'red'}}>Offer : {GetData.offer}</h2>
                    <h2 style={{color:'red'}}>{`Price : ${GetData.price}`}</h2>
                    <h2 style={{marginBottom:'5px'}}>{`About The Product :`}</h2>
                    <h2>{GetData.desc}</h2>
                    <div className='Select_product_sizes_main_container'>
                        {
                         
                       ( (GetData.cate) !== "Electronics" &&(GetData.cate) !== "laptop")  &&(
                            <>
                            <p> size :</p> 
                       <div className='select_size_container'>
                                <div className="select_size">
                                    <p>XS</p>
                                </div>

                                <div className="select_size">
                                    <p>S</p>
                                </div>

                                <div className="select_size">
                                    <p>M</p>
                                </div>

                                <div className="select_size">
                                    <p>L</p>
                                </div>

                                <div className="select_size">
                                    <p>XL</p>
                                </div>
                       </div>
                       </>
                        )
                        }
                       
                    
  

                    </div>
                    
                </div>

               <div className="shopping_options_for_products">
                        <div className="product_count_divsion">
                             <div className="count_sub" onClick={()=>{updateRate <=1 ? SetupdateRate(1) : SetupdateRate(updateRate-1)}}
                                
                             
                             ><GrSubtract/></div>
                             <div className="count_val">{updateRate}</div>
                             <div className="count_add" onClick={()=>{SetupdateRate(updateRate+1)   
                                        
                                         
                             }
                            }><IoMdAdd/></div>
                         </div>
                         {/* <h1>Total cost is :{(GetData.price)*updateRate}</h1> */}
                         <div className="product_buyNowButton">
                             {/* <Link to={'/checkout'}>   */}
                                    <button onClick={()=>{
                                       if(Cookies.get("Logged") !=="false"){
                                        
                                        navigate('/checkout',{state:{product:GetData,changedprice:( parseInt(GetData.price.replace(',', ''),10)*updateRate)}})
                                       }
                                       else{
                                        navigate('/signin')
                                       }
                                    }}  >Buy Now</button>
                             {/* </Link> */}
                         </div>
                         <div className="product_add_to_wishlist_btn">
                             <AiOutlineHeart size={30} className='change_the_color_of_product_heart'/>
                         </div>
                         <div className="add_to_cart_button_for_detailed_product">
                                 <AiOutlineShoppingCart size={30}  onClick={()=>{
                                    AddToLocalCart(GetData.image,GetData.price)
                                 }}  />
                         </div>
               </div>

                <div className="about_product_shipping_details_main">
                    <div className="shipping_the_product">
                        <div className="shipping_image">
                            <TbTruckDelivery size={50}/>
                        </div>
                        <div>
                            <h2>Free Delivery</h2>
                            <p>Enter your postal code for Delivery Availability</p>
                        </div>

                    </div> 
                    <div className="easy_return_policy shipping_the_product">

                    <div className="shipping_image">
                            <HiOutlineRefresh size={50}/>
                        </div>
                        <div>
                            <h2>Free Delivery</h2>
                            <p>Free 30 Days Delivery Returns. Details</p>

                        </div>
                    </div>

                </div>
               

               </div>
{/* --------------------------------------------- */}

<div className="about_theProduct_data">
             
                    
                 <h1>About Product</h1>
                    <ul>
                        <li>
                        - The 46.48mm (1.83-inch) HD display makes the display clear and true-to-life, 
                        with vivid colours ensuring smooth readability and keeping the
                         watch as exquisite to look at as when you first lay your eyes 
                         on it. The watch has a 280 NITS Peak Brightness
                        </li>
                        <li>
                        This fashion smart watch will work on a single charge for
                         about 8 days (without Bluetooth calling)
                         and about 5 Days with Bluetooth calling.
                        </li>
                        <li>
                        Charging Specs - The watch needs to be charged for 2 hours to
                         reach 100%. The charger should be a 3.7V to 5V adapter or any
                          laptop output. For a bare minimum 
                        of 20% charge the watch needs to be charged for about 30-40 
                        mins
                        </li>

                        <li>
                        There is no volume control, however when connected to bt
                         calling you can control the volume of the call. 
                         【Bluetooth Calling Watch】- Fire-Boltt Ninja Call Pro 
                         Plus Smartwatch enables you to make and receive calls 
                         directly
                         from your watch via the built-in speaker and microphone.
                        </li>
                        <li>
                        Supported Applications - Notifcations from all social media 
                        channels (Instagram, Whatsapp, Facebook), Call Notifications,
                         HealthTracking (SpO2, Heart Rate, Sleep), Sports Tracking &
                          many more
                        </li>
                    </ul>
                    
</div>


{/* ------------------------------------------------ */}

        <div className="products_review_section_main_container">
            <h1>Top Ratings form India </h1>
            <div className="reviwer_container_section">
               <div className="review_user_data">
                <div className="review_user_logo">
                    <AiOutlineUser size={30}/>
                </div>
                <h2>Yashwanth_mca</h2>
               </div>
               <div className='user_ratting_section'><h1>Ratting :</h1>
               <div>
                <AiFillStar size={30} color='gold'/>
                <AiFillStar size={30} color='gold'/>
                <AiFillStar size={30} color='gold'/>
                <AiFillStar size={30} color='gold'/>
                <AiFillStar size={30} color='gold'/>
               </div>
               </div>
               <h3>
                Review:
               </h3>
                <p>
                Used this modern smartwatch for 10 days, and found that it's a reliable for your daily life
                Design: The watch looks stylish and sleek.
                Display: The screen is clear and bright, so you can see things on it easily.
                Battery: It charges quickly in just 2 hours and lasts 4-5 days with normal use, so you don't need to charge it often.
                Operating System: The watch's system lets you change the way it looks with different faces and widgets, so you can make it your own.
                All in all, this smartwatch gives you a lot for your money and is a great choice if you want a stylish and useful wearable device.
                </p>
            </div>

        </div>














            </div>
    
    </>
  )
}

export default ProductDetails
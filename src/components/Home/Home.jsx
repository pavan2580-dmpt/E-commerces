import React,{useState,useEffect,useContext} from 'react'
import {useNavigate} from "react-router-dom"
import "./Home.css"
import axios from 'axios';

import Carousel from './Carousel/Carousel';
import iphoneCarousel from "../Home/assets/iphoneCasourel.jpg"//img -start
import laptopcarousel from "../Home/assets/laptopCarosuel.avif"
import projectorcarousel from "../Home/assets/laptopCarosuel.avif"
import headphonescarsouel from "../Home/assets/headPhoneCarousel.webp"
import mobilePs from "../Home/products/sony_ps_mobile.jpeg"
import womesEdit from "../Home/assets/womensCollection_Edited.png"
import speakerArrival from "../Home/assets/speakerArrivals.png"
import perfume from "../Home/assets/perfume.png"//img-end

import {FaArrowDown,FaArrowUp} from "react-icons/fa"// icons -- Start
import {TbTruckDelivery} from "react-icons/tb"
import {BsHeadset} from "react-icons/bs"
import {BiCheckShield} from "react-icons/bi"
import {AiOutlineEye,AiOutlineHeart,AiFillHeart} from "react-icons/ai"

import {FaHeadphonesAlt} from "react-icons/fa"
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { CiCamera } from "react-icons/ci";
import { IoWatchOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";//icons -- End

import { LuGamepad } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';//toast
import 'react-toastify/dist/ReactToastify.css';//toast

// import CartContext from '../Context/CartContext';// context

import HomeLoader from './HomePageLoader/HomeLoader';//loader

const Data = [
  {
    id :1,
    image:'src/components/Home/products/dogFood.png',
    name:'Breed Dry Dog Food',
    price:'$100'
  },
  {
    id :2,
    image:'src/components/Home/products/cam.png',
    name:'CANON EOS DSLR Camera',
    price:'$360'
  },
  {
    id :3,
    image:'src/components/Home/products/ideapadgaming.png',
    name:'ASUS FHD Gaming Laptop',
    price:'$700'
  },
  {
    id :4,
    image:'src/components/Home/products/ideapadgaming.png',
    name:'Curology Product Set ',
    price:'$500'
  },
  {
    id :5,
    image:'src/components/Home/products/ideapadgaming.png',
    name:'Kids Electric Car',
    price:'$960'
  },
  {
    id :6,
    image:'src/components/Home/products/car.png',
    name:'Jr. Zoom Soccer Cleats',
    price:'$1160'
  },
  {
    id :7,
    image:'src/components/Home/products/gamepad.png',
    name:'GP11 Shooter USB Gamepad',
    price:'$660'
  },
  {
    id :8,
    image:'src/components/Home/products/coat.png',
    name:'Quilted Satin Jacket',
    price:'$660'
  },
]


function Cards(props){
  return(
    <>
      <div className="Homepage_product_cards_expore">
        <img src={props.value.image} alt="alt" width={"150px"} />
        <h4>{props.value.name}</h4>
        <h3>Price <span style={{color:'red'}}>{props.value.price}</span> </h3>
      </div>
    </>
  )
}

function Products(props){
  const [heart,Setheart] = useState(false);//heart icon
  const navigate = useNavigate();//routing

  function AddToLocalCart(img,val,id){
    let existingCart = localStorage.getItem('AddToCart');
    existingCart = existingCart ? JSON.parse(existingCart) : [];
    if (!Array.isArray(existingCart)) {
      existingCart = [];
    }
    const itemIndex = existingCart.findIndex(item => item.id === id);

  if (itemIndex !== -1) {
    
    existingCart[itemIndex].itemCount += 1;
  } else {
    
    const newData = { id, image: img, price: val, itemCount: 1 };
    existingCart.push(newData);
  }

  localStorage.setItem('AddToCart', JSON.stringify(existingCart));
  toast('Added to cart', {
    theme: "dark"
  });
  }



  return(
    <>
      <div className='homepage_product_api_container'>
           <div className='inner_image_and_love_icons'>
                <img src={`http://localhost:3030/${props.product.image}`} alt="alt" width={'150px'}  onClick={()=>{
        navigate(`/productdetails/${props.product._id}`,{state:{DATA:props.product}})
      }}
      style={{cursor:'pointer'}}
      />
                <div style={{display:'flex',flexDirection:'column'  }}>
             <AiOutlineEye size={30} style={{cursor:'pointer'}}  onClick={()=>{
        navigate(`/productdetails/${props.product._id}`,{state:{DATA:props.product}})
      }}/>
             {
                heart ?<AiFillHeart size={30} style={{cursor:'pointer',color:'red'}}  onClick={()=>Setheart(!heart)}/> :<AiOutlineHeart size={30} style={{cursor:'pointer'}} onClick={()=>Setheart(!heart)}/>
             
             }
             
           </div>
               
           </div>
              <div>
              <h3>{props.product.name}</h3>
                <h4>price:<span style={{color:'red'}}>{props.product.price}</span></h4>
                <button onClick={()=>{AddToLocalCart(props.product.image,props.product.price,props.product._id)
                 
                 
                }} >Add to Cart</button>
              </div>
          
      </div>
    </>
  )
}
// -------------------------------------------------main------------------------------------------------------
function Home() {


  const navigate = useNavigate();

  const navigateToCategory = (category) => {
    navigate(`/Categories/${category}`);
  };

  const [countdown, setCountdown] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [showCat,SetshoeCat] = useState(false)
  const [GETS,SetGet] = useState([]);
  const [allPosts,SetallPosts] = useState([]);
  const [Loader,SetLoader] = useState(true);
  

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + countdown.days);
    targetDate.setHours(targetDate.getHours() + countdown.hours);
    targetDate.setMinutes(targetDate.getMinutes() + countdown.minutes);
    targetDate.setSeconds(targetDate.getSeconds() + countdown.seconds);

    const interval = setInterval(() => {
      const now = new Date();
      const timeRemaining = Math.max(0, targetDate - now);
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });

      if (timeRemaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
    
  }, [countdown]);

// -----------------------------------------------------------------------------------------
   useEffect(
    ()=>{
      async function GETApi(){
        const response = await axios.get('http://localhost:3030/apis/getProducts');
        SetGet(response.data.slice(0,8))
        // 
        SetallPosts(response.data)
       }
       GETApi()
       SetLoader(false)
    }
  ,[])

 const GETALL = GETS.map((post)=>(
  <Products 
  key={post._id}
  product={post}
/>

 ))

// -------------------------------------------
 
  const ProductData = Data.map((data)=>(
    
    <Cards
      key = {data.id}
      value = {data}
    />

  ))
// ---------------------------------------------

 
const images = [
  iphoneCarousel,
  laptopcarousel,
  projectorcarousel,
  headphonescarsouel,
 
];


// --------------------------------------------------


  


  return (
   (
    Loader ? (<HomeLoader/> ):(
      <>
      <div className="home_page_Container">
        <ToastContainer/>
        <div className="homePage_content_Area">
          {/* --------------------- mobile----------------------- */}
           
           
           <div className="homePage_Show_categories_for_mobile" onClick={()=>SetshoeCat(!showCat)}>
                <h1>Categories</h1>
                <h1>{showCat?<FaArrowUp/> :<FaArrowDown/>}</h1>
           </div>
           
           {
  
              showCat&&(
                <div className="homepage_mobile_categories">
                <p onClick={() => { 
                  navigateToCategory('WomansFashion');
                   }}>Woman's Fashion</p>
                <p onClick={() => { 
                  navigateToCategory('Mens Fashion');
                   }}>Men's Fashion</p>
                <p onClick={() => { 
                  navigateToCategory('Electronics');
                   }}>Electronics</p>
                <p onClick={() => { 
                  navigateToCategory('Home & Lifestyle');
                   }}>Home & Lifestyle</p>
                <p onClick={() => { 
                  navigateToCategory('Medicine');
                   }}>Medicine</p>
                <p onClick={() => { 
                  navigateToCategory('Sports & Outdoor');
                   }}>Sports & Outdoor</p>
                <p onClick={() => { 
                  navigateToCategory('Babys & Toys');
                   }}>Baby's & Toys</p>
                <p onClick={() => { 
                  navigateToCategory('Groceries & Pets');
                   }}>Groceries & Pets</p>
                <p onClick={() => { 
                  navigateToCategory('Health & Beauty');
                   }}>Health & Beauty</p>
              </div>
              
              )
            }
  
  
  
          {/* --------------mobile End--------------------------- */}
  
  
  
  
          {/* --------------- Desktop -------------- */}
          <div className="Home_page_Starting_Scetion">
                 <div className="Home_page_Category_scetion">
                   <p onClick={() => { 
                  navigateToCategory('Womans Fashion');
                   }}>Woman's Fashion </p>
                   <p onClick={() => { 
                  navigateToCategory('Mens Fashion');
                   }}>Men's Fashion</p>
                   <p onClick={() => { 
                  navigateToCategory('Electronics');
                   }}>Electronics</p>
                   <p onClick={() => { 
                  navigateToCategory('Home & Lifestyle');
                   }}>Home & Lifestyle</p>
                   <p onClick={() => { 
                  navigateToCategory('Medicine');
                   }}>Medicine</p>
                   <p onClick={() => { 
                  navigateToCategory('Sports & Outdoo');
                   }}>Sports & Outdoor</p>
                   <p onClick={() => { 
                  navigateToCategory('Babys & Toys');
                   }}>Baby's & Toys</p>
                   <p onClick={() => { 
                  navigateToCategory('Groceries & Pets');
                   }}>Groceries & Pets</p>
                   <p onClick={() => { 
                  navigateToCategory('Health & Beauty');
                   }}>Health & Beauty</p>
                 </div>
            {/* --------------------------------------- */}
           
   
  
            <div className="Home_page_sliders_section">
  
              <Carousel images = {images} interval={1000}/>
        
          
            </div>
          </div>

          {/* -------------------Timer goes here ---------------------- */}
                  <div className="homePage_discount_timer_setup_here______container">
                    <div className="homePage_redBlockcontainer">
                        <div className="homePage_timer_redBlock_here"></div>
                        <h2>Today's</h2>
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:'30px',flexWrap:'wrap'}}>
                        <h2>Flash Sales</h2>
                        <div className='Home_flash_sales_timer'>
                        <span style={{display:'flex',flexDirection:'column'}}><p style={{fontSize:'15px'}}>Days</p>{countdown.days} :</span>
                        <span style={{display:'flex',flexDirection:'column'}}><p style={{fontSize:'15px'}}>hours</p>{countdown.hours} :</span>

                        <span style={{display:'flex',flexDirection:'column'}}><p style={{fontSize:'15px'}}>min</p>{countdown.minutes} :</span>

                        <span style={{display:'flex',flexDirection:'column'}}><p style={{fontSize:'15px'}}>sec</p>{countdown.seconds} </span>

                        </div>
                    </div>
                  </div>





  {/* --------------------Apis here goes ------------------------------------ */}
  
              <div className="apis_data_container_for_all_products">
                {GETALL}
              </div>
  
        {/* ---------------- Desktop end-------------------------- */}
        <div className="speaker_container">
         <div>
         <h2>Categories</h2>
          <h1>Enhance Your </h1>
          <h1>Music Experience</h1>
          <div style={{display:'flex',gap:'10px'}}>
            <div className='timer_outline'>{countdown.days} <span>Days</span></div>
            <div className='timer_outline'>{countdown.hours} <span>Hours</span></div>
            <div className='timer_outline'>{countdown.minutes} <span> Minutes</span></div>
            <div className='timer_outline'>{countdown.seconds} <span>Seconds</span></div>
          </div>
          <button>Buy Now!</button>
         </div>
        </div>
  
  
  {/* -------------------------------- */}
  
  <div>
      <span style={{display:'flex',alignItems:'center',marginTop:'60px',fontSize:'30px'}}>
        <div style={{width:"20px", height:'40px',backgroundColor:"red",borderRadius:'5px'}}/>
        Our Products
      </span>
      <h1 style={{marginTop:'20px',fontSize:'40px'}}>Explore Our Products</h1>
    </div>
  <div className="products_display_section">
    
  {ProductData}
  </div>
  {/* ----------------------------------------------- */}
            <div className="Home_page_browse_byCate_container_main">
              <h3>Categories</h3>
              <h1>Browse by Category</h1>
             <div className="home_page_browseBtIcons_main_container">
             <div className="home_page_browse_icon_container">
                  <HiOutlineDevicePhoneMobile size={100}/>
              </div>
  
              <div className="home_page_browse_icon_container">
                  <CiCamera size={100}/>
              </div>
              <div className="home_page_browse_icon_container">
                  <IoWatchOutline size={100}/>
              </div>
              <div className="home_page_browse_icon_container">
                  <RiComputerLine size={100}/>
              </div>
              <div className="home_page_browse_icon_container">
                  <FaHeadphonesAlt size={100}/>
              </div>
              <div className="home_page_browse_icon_container">
                  <LuGamepad size={100}/>
              </div>
  
             </div>
  
  
  
            </div>
  
          {/* -------------------------------- */}
          <div className="home_page_new_arrivals_container">
            <div className="home_page_new_arrival_content">
              <h2>Featured</h2>
              <h1>New Arrival</h1>
              <div className="home_page_new_arrival_images">
                <div className="home_page_new_aarival_left">
                  <img src={mobilePs} alt="ps" className='playstation_homepage'/>
                </div>
                <div className="home_page_new_aarival_right">
                  <div className="new_arrivals_top">
  
                    <div className="womens_fasion_homePage_content">
                      <h1>Women's Collections</h1>
                      <p>Featured women collections that give you another vibe</p>
                    </div>
                    <img src={womesEdit} alt="women" className='new_arrival_women' />
                  </div>
                  <div className="new_arrivasl_bottom">
                
                        <div className='new_aarival_bottom_imag1_1' >
                            <img src={speakerArrival} alt="speaker" width={'270px'} height={'280px'} />
                        </div>
                
                
                        <div className='new_aarival_bottom_imag1_1'>
                            <img src={perfume} alt="perfume" width={'270px'} height={'280px'}/>
                        </div>
               
                  </div>
                </div>
              </div>
            </div>
          </div>
  
  
  
  
  
  
  
  {/* -------------------------------------- */}
      <div className="home_page_services_sction">
  {/* card1 */}
        <div className="home_page_services_card">
  
             <div className="home_page_outer_circle">
               <div className="home_page_inner_circle">
                 <TbTruckDelivery size={40}/>
               </div>
             </div>
             <h4>FREE AND FAST DELIVERY</h4>
             <p>Free delivery for all orders over $140</p>
        </div>
        {/* card2 */}
        <div className="home_page_services_card">
        <div className="home_page_outer_circle">
               <div className="home_page_inner_circle">
                 <BsHeadset size={40}/>
               </div>
             </div>
             <h4>24/7 CUSTOMER SERVICE</h4>
             <p>Friendly 24/7 customer support</p>
  
        </div>
        {/* card3 */}
        <div className="home_page_services_card">
        <div className="home_page_outer_circle">
               <div className="home_page_inner_circle">
                 <BiCheckShield size={40}/>
               </div>
             </div>
             <h4>MONEY BACK GAURANTEE</h4>
            <p>We return money within 3 days</p>
  
        </div>
      </div>

        </div>
      </div>
      </>
    )
  )
  )
}

export default Home




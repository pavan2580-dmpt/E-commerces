import React,{useRef,useContext, useState,useEffect} from 'react'
import "./Navbar.css"
import {AiOutlineHeart} from "react-icons/ai"
import {BsCart3} from "react-icons/bs"
import {BiSearch} from "react-icons/bi"
import { Link, Outlet ,useNavigate,useLocation} from 'react-router-dom'
import {RxHamburgerMenu} from "react-icons/rx"
import Cookies from 'cookies-js'
import { FaUserCircle } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import CartContext from '../Context/CartContext'




 function NavBar() {

  const Logined = Cookies.get("Logged")
  const myElementRef = useRef(null);
  const location = useLocation();
  const ShowLogin = useRef()
  const getval = useRef(null);
  const [Cartlen,setCartlen] = useState(0);
  const [ CartCtn,SetCartCtn] = useContext(CartContext)
  const handleToggle = () => {
    if (myElementRef.current) {
      myElementRef.current.classList.toggle('animation_for_sideBar');
    }
  };

  const [Search,SetSearch] = useState('')
  const navigation = useNavigate();
 
  useEffect(
    ()=>{
      const myArray = JSON.parse(localStorage.getItem('AddToCart')) || [];
      const itemlength = myArray.length
      SetCartCtn(itemlength)

    },[CartCtn]
  )
  

  return (
    <>
    <div className="mobile_navigation_sideBar" ref={myElementRef}>
      <Link  className='link' onClick={handleToggle}  to={'/'} ><h1>Home</h1></Link>
      <Link  className='link' onClick={handleToggle} to={'/contact'} ><h1>Contact</h1></Link>
      <Link  className='link' onClick={handleToggle} to={'/about'} ><h1>About</h1></Link>
      <Link  className='link' onClick={handleToggle} to={'/cart'} ><h1>Cart</h1></Link>
      <Link  className='link' onClick={handleToggle} to={'/wishlist'} ><h1>Wish list</h1></Link>
      <Link  className='link' onClick={handleToggle} to={'/signup'} ><h1>Sign Up</h1></Link>
      

    </div>
    <div className="navigation_container">
          <div className="navBar">
                <div className="logo">
                  <Link to={'/'} className='link' >
                      <h1>Exclusive</h1>
                  </Link>
                </div>
                {/* -------------  Mobile Navigation ---------------------- */}
                <div>
                    <RxHamburgerMenu className='ShowInMobile' size={40} onClick={handleToggle}/>
                </div>
                {/* ------------- DeskTop Navigation ----------------------- */}
                       <div className="navBar_options">
                            <Link to={'/'} className='link'>
                            <span>Home</span>
                            </Link>
                            <Link to={'/contact'} className='link' >
                            <span>Contact</span>
                            </Link>
                            <Link to={'/about'} className='link' >
                            <span>About</span>
                            </Link>
                            <Link to={'/signup'} className='link' >
                            <span>Sign Up</span>
                            </Link>
                          </div>
                      <div className="navbar_icons">
                            <div className='navbar_Search'>
                              <input type="text" placeholder='Search' value={Search} ref={getval} onChange={(e)=>{
                                  SetSearch(e.target.value)
                                  Cookies.set("search",getval.current.value)                                
                                  if((getval.current.value).length === 0){
                                    navigation('/')
                                  }else if(location.pathname ==="/search" && (getval.current.value).length !== 0 ){
                                    
                                      
                                  }
                                  else{
                                    navigation('/search')
                                  }

                                  
                                 
                              }} /> <BiSearch/>
                            </div>
                            <Link to={'/wishlist'} className='link' >
                                  <AiOutlineHeart size={30}/>
                            </Link>

                            <Link to={'/cart'} className='link' >
                               <div style={{display:'flex'}}>
                               <BsCart3 size={30}/><span 
                                style={{background:'red',
                                padding:'5px 10px',
                                borderRadius:'50%',
                                color:'white'}}
                                >{CartCtn}</span>
                               </div>
                            </Link>
    
                             <>
                             {/* place for login user displaying */}
                              {
                                Logined === "true" && (
                                  <FaUserCircle size={35} onMouseEnter={()=>{
                                    ShowLogin.current.style.display="block"
                                   }}
                                   onMouseLeave={()=>{
                                    ShowLogin.current.style.display="none"
                                   }}
                                   />
                                )
                              }

                            

                             <div className="Loggined_User_Options" ref={ShowLogin}  
                             onMouseEnter={()=>{
                              ShowLogin.current.style.display="block"
                             }}
                             onMouseLeave={()=>{
                              ShowLogin.current.style.display="none"
                             }}
                             
                             >
                              <div className='options_for_loged_users'>
                               <Link to={'/account'} className='link'>
                                    <FaUserCircle size={35}/> Manage My Account
                               </Link>
                              </div>
                              <div className='options_for_loged_users'>
                                <RiShoppingBag3Line/> My Order
                              </div>
                              <div className='options_for_loged_users'onClick={()=>{
                                Cookies.set('Logged',false)
                                Cookies.set('token', null, { expires: new Date(0) });
                                window.location.reload();
                              }}>
                                  <TbLogout2/> Logout
                              </div>
                             </div>
                             </>
                          
                      </div>
        
          </div>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar
import React, { useRef } from 'react'
import image from "../assets/Side Image.png"
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'cookies-js';
function Login() {
  const SendToHome = useNavigate();
  const EMail = useRef();
  const Pass = useRef();
 async function HandleLogin(e){
    e.preventDefault();
    if(EMail.current.value.length === 0 ||Pass.current.value.length === 0){
      EMail.current.style.borderColor="red"
      Pass.current.style.borderColor="red"
      toast.error("All are required")
    }
    else{
      EMail.current.style.borderColor="black"
      Pass.current.style.borderColor="black"
      const resp = await axios.post('http://localhost:3030/apis/loginUser',{
      email:EMail.current.value,
      password : Pass.current.value
    })
    if(resp.data === "Wrong Password.."){
      toast.error("Invalid Password")
      Pass.current.style.borderColor = "red"
    }
      else if(resp.data === "In valid email"){
        toast.error("Invalid Email")
        EMail.current.style.borderColor="red"
      }
      else{
        Cookies.set("token",resp.data)
        Cookies.set("Logged",true)
        Cookies.set('Email',EMail.current.value)
        SendToHome('/')
      }
    }
  }
  return (
   <>
    <div className="Register_page_main_container">
    <ToastContainer/>
      <div className="register_page_container_left_part_image_for_desktop">
        <img src={image} alt="" width={'100%'} height={'100%'}/>
      </div>
      <div className="register_page_right_part">

        <h1>Log in to Exclusive</h1>
        <p>Enter your details below</p>
        <input type="email" placeholder='Enter Email' className="register_name" required ref={EMail}/>
        <input type="password" placeholder="Password" className="register_name" required ref={Pass}/>
        <button className='Create_account_button' onClick={HandleLogin} >Log In</button>
        <p>Don,t have a Account ? 
          <Link to={'/signup'}>
          <span>Create Account</span>
          </Link>
          </p>
      </div>


    </div>
   
   </>
  )
}

export default Login
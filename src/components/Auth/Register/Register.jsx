import React, { useRef } from 'react'
import "./Register.css"
import image from "../assets/Side Image.png"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Register() {
  const sendToLogin = useNavigate();
  const Name = useRef();
  const Email = useRef();
  const Pass = useRef();

 async function HandleSubmit(e){
    e.preventDefault();
   const resp = await axios.post('http://localhost:3030/apis/createAccount',{
      name:Name.current.value,
      email:Email.current.value,
      password:Pass.current.value
    })

    if(resp.data === "user Created"){
      sendToLogin('/signin')
    }else{
      toast("Email in Use",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        width:'80%'
        });
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

        <h1>Create an account</h1>
        <p>Enter your details below</p>
                <form onSubmit={HandleSubmit}  >
                       <input type="text" placeholder='Name' className='register_name'  ref={Name}  required/>
                       <input type="email" placeholder='Enter Email' className="register_name" ref={Email} required />
                       <input type="password" placeholder="Password" className="register_name" ref={Pass} required />
                       <button className='Create_account_button'>Create Account</button>
                </form>
        <p className='register_page_p'>Aleady have account ?
        <Link to={'/signin'}>
         <span>Log in</span> 
         </Link>
        </p>
      </div>


    </div>
    
    </>
  )
}

export default Register
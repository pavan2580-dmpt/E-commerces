import React, { useEffect, useState } from 'react'
import Cookies from 'cookies-js'
import axios from 'axios'
import { useNavigate } from 'react-router'
import "./Account.css"
function Account() {
  const navigate = useNavigate();
  const [fname,Setfname] = useState('');
  const [lname,SetlName] = useState('')
  const [Email,SetEmail] = useState('');
  const [Address,SetAddress] = useState('');
  const [chgPAss,SetChgPass] = useState('');
  const [Conform,Setconfrom] = useState('');
  const [userId,SetUserId] = useState('');
  const [Pass,SetPass] = useState('');
  const CheckLogin = Cookies.get("Logged")

  useEffect(() => {
    const CheckLogin = Cookies.get("Logged");
    if (CheckLogin !== "false") {
      HandelUserGetDat(); 
    } else {
      navigate('/signin');
    }
  }, [navigate]);
  const HandleUpdateUser =async()=>{
      if(chgPAss !== Conform){
        alert("pass")
      }
      else{
        const SendData =await axios.post("http://localhost:3030/apis/updateUser",{
          fname:fname,
          lname:lname,
          email:Email,
          ChgPass:Conform,
          address:Address,
          userId:userId
        })
        Cookies.set('token',SendData.data.token)
        window.location.reload();
      }

    
  }
  const HandelUserGetDat = async () => {
    const token = Cookies.get('token');
    try {
      const GetResp = await axios.post(
        "http://localhost:3030/apis/validateToken",
        null,
        {
          headers: {
            'x-token': token
          }
        }
      );
      Setfname(GetResp.data.name);
      SetlName(GetResp.data.lname);
      SetEmail(GetResp.data.email);
      SetUserId(GetResp.data.id);
      SetAddress(GetResp.data.address);
      SetPass(GetResp.data.password);

      


    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(()=>{
    HandelUserGetDat();
  },[])
  return (
    <>
    
     
        <div className="accounts_management_section_main_container">
      <h1 style={{fontSize:'20px'}}>Home/ <span>My Account</span></h1>
      <h1 className='Edit_you_profile_text'>Edit Your Profile</h1>
      <div className="account_management_content_section">
        
        <div className="account_naming_sction">
          <div className="fisrt_name">
            <label htmlFor="fname">First Name</label><br />
            <input type="text"  id="fname"  value={fname} onChange={(e)=>{Setfname(e.target.value)}}/> 
            {/* placeholder='First Name' */}
          </div>

          <div className="last_name">
            <label htmlFor="lname">Last Name</label><br />
            <input type="text"  id="lname"  value={lname} onChange={(e)=>{SetlName(e.target.value)}} />
            {/* placeholder='Last Name' */}
          </div>
        

      </div>

      <div className="accounts_email_sec">
            <div className="email_section">
              <label htmlFor="email">Email</label><br />
              <input type="email"  id="email" placeholder='Email' value={Email} onChange={(e)=>{SetEmail(e.target.value)}} />
            </div>

            <div className="email_section">
              <label htmlFor="address">Address</label><br />
              <input type="email"  id="address"  value={Address} onChange={(e)=>{SetAddress(e.target.value)}} />
              {/* placeholder='Address' */}
            </div>
          </div>


        <div>
          <label htmlFor="chgPass">Password Change</label>
        <div className="account_change_password_section">
          
          <input type="password" placeholder='Current Password' value={Pass} readOnly/> 
          <input type="password" placeholder='New Password' onChange={(e)=>{SetChgPass(e.target.value)}}/>
          <input type="password" placeholder='Confirm New Password' onChange={(e)=>{Setconfrom(e.target.value)}}/>

        </div>

        </div>







    <div className="account_page_changes_section">
       <button className='cancel_account_btn' onClick={()=>{navigate('/')}}>Cancel</button>
      <button className='save_changes_account_btn' onClick={HandleUpdateUser}>Save Changes</button>
    </div>



        </div>
    </div>
      
    </>
  )
}

export default Account
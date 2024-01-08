import React from 'react'
import "./Footer.css"
import {CiPaperplane} from "react-icons/ci"
import {AiOutlineCopyrightCircle,AiFillApple} from "react-icons/ai"
import {FaGooglePlay} from "react-icons/fa"
function Footer() {
  return (
    <>
    <div className="footer_container">
      <div className="footer_content_1">
        {/* card1 */}
        <div className="footer_card_1">
          <h2>Exclusive</h2>
          <h3>Subscribe</h3>
          <p>Get 10% off your first order</p>
          <div className='footer_mail'>
          <input type="email" placeholder='Enter mail' /> <CiPaperplane size={25}/>
          </div>
        </div>
        {/* card2 */}
        <div className="footer_card_2">
          <h2>Support</h2>
          <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
          <p>Company@gmail.com</p>
          <p>+91 1234567898</p>
        </div>
        {/* card3 */}
        <div className="footer_card_3">
        <h2>Account</h2>
        <p>My Account</p>
        <p>Login/Register</p>
        <p>Cart</p>
        <p>Wishlist</p>
        <p>Shop</p>
        </div>
        {/* card4 */}
        <div className="footer_card_4">
          <h2>Quick Link</h2>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </div>
        {/* card5 */}
        <div className="footer_card_5">
          <h2>Download App</h2>
          <p>Saves $3 with App New User only </p>
          <button className='footer_googleplay_btn'>
            <FaGooglePlay size={50}/>
            <span>
             <p> Get It on</p>
             <h1>Google Play</h1>
            </span>
          </button>
          <button className='footer_googleplay_btn'>
            <AiFillApple size={50}/>
            <span>
             <p> Get It on</p>
             <h1>Apple Store</h1>
            </span>
          </button>
   
        </div>

      </div>
      {/* -------------------------------------------------------------------------- */}
      <div className="footer_content_2">
      <AiOutlineCopyrightCircle color='grey' size={30} />
        <p style={{fontSize:'20px'}}>
         Copyright XXXXX 2023.All right reserved</p>
      </div>
    </div>
    </>
  )
}

export default Footer
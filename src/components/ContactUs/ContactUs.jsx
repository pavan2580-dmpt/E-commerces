import React from 'react'
import "./Contact.css"
import {BsTelephone} from "react-icons/bs"
import {AiOutlineMail}  from "react-icons/ai"
function ContactUs() {
  return (
    <>
    <div className="contactUs_page_container">
      <div className="contact_leftside_data">
        <div className="contact_left1">
            <div className="contact_left_header">
              <span><BsTelephone size={25} color='white'/></span> <h2>Call To Us</h2>
            </div>
            <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +8801611112222</p>
        </div>

        <div className="contact_left1">
            <div className="contact_left_header">
              <span><AiOutlineMail size={25} color='white'/></span> <h2>Call ato Us</h2>
            </div>
            <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
        </div>
      </div>
      <div className="contacrUs_part_right_side_data">
        <div className="contactUs_inputArea">
        <input type="text" className="contactUs_name" placeholder='Your Name' />
        <input type="email" className="contactUs_name" placeholder='Your Email' />
        <input type="tel" className="contactUs_name" placeholder='Your Phone' />
        </div>
        <textarea className="contactUs_textArea"  cols="30" rows="10"placeholder='Your Message'></textarea>
        <div className='ContactUs_button_div'>
          <button>Send Message</button>
        </div>
      </div>
    </div>
    
    
    </>
  )
}

export default ContactUs
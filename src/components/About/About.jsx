import React from 'react'
import "./Aboout.css"
import story from "../About/assets/Side Image.png"
import {GiShop} from "react-icons/gi"
import {AiOutlineDollar} from "react-icons/ai"
import {BsHandbagFill} from "react-icons/bs"
import {TbMoneybag} from "react-icons/tb"
import {TbTruckDelivery} from "react-icons/tb"
import {BsHeadset} from "react-icons/bs"
import {BiCheckShield} from "react-icons/bi"
import chairmen from "../About/assets/Frame 874.png"
import ManagingDirector from "../About/assets/Frame 875.png"
import {AiOutlineInstagram}  from "react-icons/ai"
import {CiTwitter,CiLinkedin} from "react-icons/ci"
import ProductDesigner from "../About/assets/Frame 876.png"
function About() {
  return (
    <>
    <div className="About_page_container">
         <div className="about_start_main_part">
              <div className="about_start_leftside_part">
                    <h1>
                    Our Story
                    </h1>
                    <p>
                    Launced in 2015, Exclusive is South Asia’s premier online 
                    shopping makterplace with an active presense in Bangladesh.
                    Supported by wide range of tailored marketing, data and 
                    service solutions, Exclusive has 10,500 sallers and 300
                     brands and serves 3 millioons customers across the region. 
                    </p>
                    <p>
                    Exclusive has more than
                     1 Million products to offer, growing at a very fast. 
                     Exclusive offersa diverse assotment in categories ranging 
                      from consumer.
                    </p>
              </div>
              <div className="about_start_rightside_part">
                  <img src={story} alt="story" width={'95%'} />
              </div>

         </div>


          <div className="about_page_website_story_icons_container">
                  <div className="about_page_story_icons_1_container">
                      <div className="about_page_outter">
                        <div className="about_page_inner">
                          <GiShop size={40} color='white'/>
                        </div>
                      </div>
                      <h1>10.5k</h1>
                      <p>Sellers active our site</p>
                  </div>


                  <div className="about_page_story_icons_1_container">
                      <div className="about_page_outter">
                        <div className="about_page_inner">
                          <AiOutlineDollar size={40} color='white'/>
                        </div>
                      </div>
                      <h1>33k</h1>
                      <p>Mopnthly Products Sale</p>
                  </div>

                  <div className="about_page_story_icons_1_container">
                      <div className="about_page_outter">
                        <div className="about_page_inner">
                          <BsHandbagFill size={40} color='white'/>
                        </div>
                      </div>
                      <h1>45.5k</h1>
                      <p>Customer active in our site</p>
                  </div>

                  <div className="about_page_story_icons_1_container">
                      <div className="about_page_outter">
                        <div className="about_page_inner">
                          <TbMoneybag size={40} color='white'/>
                        </div>
                      </div>
                      <h1>25k</h1>
                      <p>Anual gross sale in our site</p>
                  </div>
          </div>

    <div className="about_page_comapany_members_details_container">

      <div className="about_company_member">
        <div className="about_company_image">
          <img src={chairmen} alt="chairmen" width={'100%'}/>
        </div>
        <h1>Tom Cruise</h1>
        <p>Founder & chairman</p>
        <div>
            <AiOutlineInstagram size={30} className='insta'/>
            <CiTwitter size={30} className='twitter'/>
            <CiLinkedin size={30} className='linkdin'/>
        </div>
      </div>

      <div className="about_company_member">
        <div className="about_company_image">
          <img src={ManagingDirector} alt="ManagingDirector" width={'100%'}/>
        </div>
        <h1>Emma Watson</h1>
        <p>Managing Director</p>
        <div>
            <AiOutlineInstagram size={30} className='insta'/>
            <CiTwitter size={30} className='twitter'/>
            <CiLinkedin size={30} className='linkdin'/>
        </div> 
      </div>


      <div className="about_company_member">
        <div className="about_company_image">
          <img src={ProductDesigner} alt="ProductDesigner" width={'100%'}/>
        </div>
        <h1>Will Smith</h1>
        <p>Product Designerr</p>
        <div>
            <AiOutlineInstagram size={30} className='insta'/>
            <CiTwitter size={30} className='twitter'/>
            <CiLinkedin size={30} className='linkdin'/>
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
    </>
  )
}

export default About
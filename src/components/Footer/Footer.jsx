import React from 'react'
import "./Footer.css"
import logo_big from "../../assets/logo_big.png"
import whatsapp_icon from "../../assets/whatsapp_icon.png"
import pintester_icon from "../../assets/pintester_icon.png"
import instagram_icon from "../../assets/instagram_icon.png"

const Footer = () => {

  return (

    <div className='footer'>
        <div className="footer-img">
            <img src={logo_big} alt="biglogo" />
            <p>PRIME Collection</p>
        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-icon">
          <div className="footer_icon_container">
            <img src={instagram_icon} alt="instagram" />
          </div>
          <div className="footer_icon_container">
            <img src={pintester_icon} alt="pintester" />
          </div>
          <div className="footer_icon_container">
            <img src={whatsapp_icon} alt="whatsapp" />
          </div>             
        </div>
        <div className="footer_copyright">
          <hr />
          <p>Copyright @ 2023 - All Right Reserved </p>
        </div>

    </div>
  )
}

export default Footer
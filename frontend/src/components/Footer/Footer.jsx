import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-logo-content">
            <div className="footer-content">
                <img src={assets.logo} alt="" />
            </div>

            <div className="footer-content">
                <div className="footer-content-left">
                    <h1 className='footer-titles'>
                        Description
                    </h1>
                    <p>The online store Shopo has been under development for several years. Initially, it grew as a group project and later evolved individually. The purpose of this project is to make tasks, especially shopping, easier and more convenient. For this reason, Shopo is not only focused on the food industry but is also striving to expand into various other fields. With the efforts that have been planned, this vision will one day become a reality.</p>
                </div>
                <div className="footer-content-center">
                    <h1 className='footer-titles'>
                        Company
                    </h1>
                    <div className="footer-titles-text">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </div>
                </div>
                <div className="footer-content-right">
                    <h1 className='footer-titles'>
                        GET IN TOUCH
                    </h1>
                    <div className="footer-titles-text">
                        <ul>
                            <li>+98-914-241-0247</li>
                            <li>la3t.masoud11@gmail.com</li>
                        </ul>
                    </div>
                </div>
                
            </div>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
      <hr/>
      <p className="footer-copyright">Copyright 2025 © Shopo.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer

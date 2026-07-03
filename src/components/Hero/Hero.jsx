import React from 'react'
import "./Hero.css"
import hand_icon from "../../assets/hand_icon.png";
import arrow from "../../assets/arrow.png";
import hero_img from "../../assets/hero_img.png";

const Hero = () => {
  return (
    <div className='hero'>
        <div className='hero-left'>
            <h2>NEW ARRIVALS HERE</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>NEW</p>
                    <img src={hand_icon} alt="hand" />
                </div>
                <p>Collections</p>
                <p>For Everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>
                    Latest Collections
                </div>
                <img src={arrow} alt="arrow" />
            </div>
        </div>

        <div className='hero-right'>
            <img src={hero_img} alt="hero" />
        </div>
        
    </div>
  )
}

export default Hero
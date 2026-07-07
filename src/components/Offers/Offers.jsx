import React from 'react'
import './Offers.css'
import exclusive_image from '../../assets/exclusive_image.png'

const Offers = () => {
  return (
<div className="offers">
    <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY FOR BEST SELLER PRODUCTS </p>
        <button className="offers-button">Check Now</button>
    </div>
    <div className="offers-right">
        <img src={exclusive_image} alt="Exclusive Offers" />
    </div>
</div>   
  )
}

export default Offers
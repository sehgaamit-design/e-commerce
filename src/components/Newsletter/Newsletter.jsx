import React from 'react'
import "./Newsletter.css"

const Newsletter = () => {
  return (
    <div className='Newsletter'>
        <h1>Get Exclusive offers on your Email </h1>
        <p>Subscribe to our Newletter and stay Updated </p>
        <div className="input-mail">
            <input type="email" placeholder='enter mail id ' />
            <button className='btn-sbs'>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter
import React from 'react'
import "./Item.css"

const Item = (props) => {

  return (
    <div className='item'>
        <img src={props.image} alt="item" />
        <p>{props.name}</p>
        <div className="item-price">
            <div className="item-new-price">
                <p>${props.new_price}</p>
            </div>
            <div className="item-old-price">
                <p>${props.old_price} </p>
            </div>

        </div>

    </div>
  )
}

export default Item
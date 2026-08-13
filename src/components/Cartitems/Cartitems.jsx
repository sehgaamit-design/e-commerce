import React from 'react'
import "./Cartitems.css"
import remove_icon from "../../assets/cart_cross_icon.png"
import { ShopContext } from "../Context/ShopContext";

const Cartitems = () => {
  const { all_product, cartitem, removefromcart } = React.useContext(ShopContext);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartitem[e.id] > 0) {
          return (
            <div className="cartitems-format" key={e.id}>
              <img src={e.image} alt="carticonimage" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <button className='cartitemqty'>{cartitem[e.id]}</button>
              <p>${e.new_price * cartitem[e.id]}</p>
              <img src={remove_icon} alt="removeicon" onClick={() => removefromcart(e.id)} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Cartitems
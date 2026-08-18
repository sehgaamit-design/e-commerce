import React from "react";
import "./Cartitems.css";
import remove_icon from "../../assets/cart_cross_icon.png";
import { ShopContext } from "../Context/ShopContext";

const Cartitems = () => {
  const { all_product, cartitem, removefromcart, getTotalCartAmount,} =
    React.useContext(ShopContext);

  return (
    <div className="cartitems">
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
              <button className="cartitemqty">{cartitem[e.id]}</button>
              <p>${e.new_price * cartitem[e.id]}</p>
              <img
                src={remove_icon}
                alt="removeicon"
                onClick={() => removefromcart(e.id)}
              />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>${getTotalCartAmount()}</h3>
          </div>
        </div>
        <button>Proceed to Checkout</button>
      </div>
      <div className="cartitems_promocode">
        <p>If you have a promo code, Enter it here</p>
        <div className="cartitems_promobox">
          <input type="text" placeholder="Enter your code" />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Cartitems;

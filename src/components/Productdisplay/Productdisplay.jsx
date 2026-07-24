import React from "react";
import "./Productdisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";

const Productdisplay = (props) => {
  const { product } = props;

  return (
    <div className="product-display">
      <div className="productdisplayleft">
        <div className="productdisplay-imglist">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>
        <div className="productdisplay-img">
          <img className="product-display-mainimg" src={product.image} alt="" />
        </div>
      </div>

      <div className="productdisplayright">
        <h1>{product.name}</h1>
        <div className="productdisplayrightstar">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(135)</p>
        </div>
        <div className="productdisplay-rightprice">
          <div className="productdisplay-right-oldprice">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-newprice">
            ${product.new_price}
          </div>
        </div>

        <div className="productdisplay-right-discription">
          Premium quality clothing designed for comfort, style, and everyday
          wear. Made with comfortable fabrics and a modern design, this product
          is a perfect addition to your wardrobe.Stylish, comfortable, and
          high-quality clothing made for your everyday fashion needs.
        </div>
        <div className="right_size">
          <h1>Select size</h1>
          <div className="right_sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button className="right-btn">ADD TO CART</button>
        <p className="right-category">
          <span>Category:</span>Women, T-Shirt, Crop Top
        </p>
        <p className="right-category">
          <span>Tag:</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default Productdisplay;

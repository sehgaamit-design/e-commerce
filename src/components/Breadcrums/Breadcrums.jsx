import React from "react";
import "./Breadcrum.css";
import breadcrum_arrow from "../../assets/breadcrum_arrow.png";

const Breadcrums = (props) => {
  const { product } = props;

  return (
    <div className="Breadcrum">
      HOME <img src={breadcrum_arrow} alt="arrow" /> SHOP <img src={breadcrum_arrow} alt="arrow" />
      {product.category} <img src={breadcrum_arrow} alt="" /> {product.name}
    </div>
  );
}; 

export default Breadcrums;

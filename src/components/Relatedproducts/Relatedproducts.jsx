import React from "react";
import "./Relatedproducts.css";
import data from "../../assets/data";
import Item from "../items/Item.jsx";

const Relatedproducts = () => {
  return (
    <div className="Relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-items">
        {data.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Relatedproducts;

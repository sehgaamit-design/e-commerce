import React from "react";
import "./Popular.css";
import data from "../../assets/data.js";
import Item from "../items/Item.jsx";

const Popular = () => {
  return (
    <div className="popular">
      <h2>Top Picks for Women</h2>
      <hr />
      <div className="top-items">
        
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

export default Popular;

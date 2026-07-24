import React, { useContext } from "react";
import "./Css/Shopctg.css";
import Item from "../components/items/Item.jsx";
import { ShopContext } from "../components/Context/ShopContext.jsx";
import dropdown_icon from "../assets/dropdown_icon.png";

const Shopctg = (props) => {
  const { all_product } = useContext(ShopContext);

  return (
    <div className="ShopCategory">
      <img className="banner" src={props.banner} alt="banner" />
      <div className="shopcategory_indexsort">
        <p>
          <span>Showing 1-12</span>out of the 36 products{" "}
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="dropdown" />
        </div>
      </div>

      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          console.log(props.category === item.category);
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">EXPLORE MORE</div>
    </div>
  );
};

export default Shopctg;

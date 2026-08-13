import React, { createContext, useState } from "react";
import all_product from "../../assets/all_product";

export const ShopContext = createContext(null);

const getdefaultcart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {

  const [cartitem, setCartitem] = useState(getdefaultcart()); 

  const addtocart = (itemId) =>  {
    setCartitem ((prev)=>({...prev,[itemId]:prev[itemId]+1}))
  }

  const removefromcart = (itemId) =>   {
    setCartitem ((prev)=> ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : 0,
    }))
  }

  const contextValue = { all_product, cartitem, addtocart, removefromcart};

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

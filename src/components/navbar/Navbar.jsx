import React from "react";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {

  // track which tab is open 
  const [menu, setMenu] = useState("");

  return (
    
    <div className="navbar">
      <div className="navlogo">
        <img src={logo} alt="logo" />
        <p>PRIME Collection</p>
      </div>

      <ul className="navmenu">

        <li onClick={() => setMenu("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("mens")}>
          <Link style={{ textDecoration: "none" }} to="/mens">
            Mens
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("womens")}>
          <Link style={{ textDecoration: "none" }} to="/womens">
            Womens
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
        
      </ul>

      <div className="login">
        
          <Link style={{ textDecoration: "none" }} to="/login">
           <button>Login</button> 
          </Link>

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>

        <div className="nav-cart-count">0</div>
      </div>
    </div>
  );
};

export default Navbar;

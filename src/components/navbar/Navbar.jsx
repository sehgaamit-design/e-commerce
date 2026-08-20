import React from "react";
import { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import cart_icon from "../../assets/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("");
  const navigate = useNavigate();

  const { getTotalCartItems, loggedInUser, logoutUser } = useContext(ShopContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navlogo">
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={logo} alt="logo" />
          <p>PRIME Collection</p>
        </Link>
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
        {loggedInUser ? (
          <div className="nav-user-container" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Link to="/account" style={{ textDecoration: "none", color: "#333", fontWeight: "600" }}>
              <span>Hi, {loggedInUser.name}</span>
            </Link>
            <button className="nav-btn" onClick={handleLogout}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button className="nav-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </button>
          </Link>
        )}

        <Link style={{ textDecoration: "none" }} to="/admin/login">
          <button className="nav-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Admin
          </button>
        </Link>

        <Link style={{ textDecoration: "none" }} to="/cart">
          <img src={cart_icon} alt="cart" />
        </Link>

        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;

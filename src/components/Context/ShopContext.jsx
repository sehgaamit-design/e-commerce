import React, { createContext, useState, useEffect } from "react";
import all_product_static from "../../assets/all_product";
import { generateToken, verifyAndDecodeToken } from "../../utils/jwt";

export const ShopContext = createContext(null);

// Initial default data if not present in localStorage
const initializeLocalStorage = () => {
  if (!localStorage.getItem("shippingMethods")) {
    const defaultShipping = [
      { id: 1, name: "Standard Delivery", charge: 50, time: "4-6 Days", active: true },
      { id: 2, name: "Express Delivery", charge: 100, time: "1-2 Days", active: true },
      { id: 3, name: "Free Delivery", charge: 0, time: "5-7 Days", active: true }
    ];
    localStorage.setItem("shippingMethods", JSON.stringify(defaultShipping));
  }
  if (!localStorage.getItem("paymentMethods")) {
    const defaultPayments = [
      { id: 1, name: "Cash on Delivery", active: true },
      { id: 2, name: "UPI", active: true },
      { id: 3, name: "Credit / Debit Card", active: true },
      { id: 4, name: "Net Banking", active: true }
    ];
    localStorage.setItem("paymentMethods", JSON.stringify(defaultPayments));
  }
  if (!localStorage.getItem("adminCoupons")) {
    const defaultCoupons = [
      { id: 1, code: "PRIME20", discount: 20, minAmount: 1000, expiry: "2026-09-30", active: true },
      { id: 2, code: "WELCOME10", discount: 10, minAmount: 0, expiry: "2026-12-31", active: true }
    ];
    localStorage.setItem("adminCoupons", JSON.stringify(defaultCoupons));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  if (!localStorage.getItem("orders")) {
    localStorage.setItem("orders", JSON.stringify([]));
  }
  if (!localStorage.getItem("adminProducts")) {
    localStorage.setItem("adminProducts", JSON.stringify([]));
  }
};

export const ShopContextProvider = (props) => {
  // Run initialization
  initializeLocalStorage();

  // Load products dynamically by combining static all_product and adminProducts from localStorage
  const getCombinedProducts = () => {
    const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
    // Convert adminProducts structure to match static (ensuring image is present)
    const formattedAdmin = adminProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      image: p.image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop", // high quality fallback placeholder
      new_price: p.price - (p.price * (p.discount || 0)) / 100,
      old_price: p.price,
      discount: p.discount || 0
    }));
    return [...all_product_static, ...formattedAdmin];
  };

  const [products, setProducts] = useState(getCombinedProducts());

  // Cart state initialization
  const [cartitem, setCartitem] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error(e);
      }
    }
    // Default empty cart
    let cart = {};
    return cart;
  });

  // User state
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      const decoded = verifyAndDecodeToken(token);
      return decoded ? { name: decoded.name, email: decoded.email } : null;
    }
    return null;
  });

  // Save cart to localStorage when changed
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartitem));
  }, [cartitem]);

  // Sync products when adminProducts changes
  const refreshProducts = () => {
    setProducts(getCombinedProducts());
  };

  const addtocart = (itemId) => {
    setCartitem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removefromcart = (itemId) => {
    setCartitem((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartitem({});
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartitem[item] * itemInfo.new_price;
        }
      }
    }
    return Math.round(totalAmount * 100) / 100;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartitem) {
      if (cartitem[item] > 0) {
        totalItems += cartitem[item];
      }
    }
    return totalItems;
  };

  // Auth Functions
  const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email && u.email.toLowerCase() === userData.email.toLowerCase())) {
      return { success: false, message: "Email already exists" };
    }
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  };

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      const payload = {
        name: user.name,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      };
      const token = generateToken(payload);
      localStorage.setItem("auth-token", token);
      setLoggedInUser({ name: user.name, email: user.email });
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const logoutUser = () => {
    localStorage.removeItem("auth-token");
    setLoggedInUser(null);
  };

  const contextValue = {
    all_product: products,
    cartitem,
    addtocart,
    removefromcart,
    clearCart,
    getTotalCartAmount,
    getTotalCartItems,
    loggedInUser,
    registerUser,
    loginUser,
    logoutUser,
    refreshProducts
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};


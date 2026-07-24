import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Shophome from "./pages/Shophome";
import Shopctg from "./pages/Shopctg";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Loginsignup from "./pages/Loginsignup";
import Footer from "./components/Footer/Footer";
import banner_mens from "./assets/banner_mens.png";
import banner_women from "./assets/banner_women.png";
import banner_kids from "./assets/banner_kids.png";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shophome />} />
          <Route
            path="/mens"
            element={<Shopctg banner={banner_mens} category="men" />}
          />
          <Route
            path="/womens"
            element={<Shopctg banner={banner_women} category="women" />}
          />
          <Route
            path="/kids"
            element={<Shopctg banner={banner_kids} category="kid" />}
          />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Loginsignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

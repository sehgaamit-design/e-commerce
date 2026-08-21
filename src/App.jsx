import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Shophome from "./pages/Shophome";
import Shopctg from "./pages/Shopctg";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Loginsignup from "./pages/Loginsignup";
import Footer from "./components/Footer/Footer";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Account from "./pages/Account";

import banner_mens from "./assets/banner_mens.png";
import banner_women from "./assets/banner_women.png";
import banner_kids from "./assets/banner_kids.png";

// Admin
import AdminLogin from "./Admin/AdminLogin";
import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminCoupons from "./Admin/AdminCoupons";
import AdminShipping from "./Admin/AdminShipping";
import AdminUsers from "./Admin/AdminUsers";
import AdminPaymentMethods from "./Admin/AdminPaymentMethods";

import { ShopContext } from "./components/Context/ShopContext";

// Customer Route Protection Guard
const ProtectedRoute = () => {
  const { loggedInUser } = React.useContext(ShopContext);
  const location = useLocation();
  return loggedInUser ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

const ShopLayout = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className={isAdminPage ? "admin-app" : "shop-app-wrapper"}>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* SHOP ROUTES */}

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

        {/* PROTECTED CLIENT ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/account" element={<Account />} />
        </Route>

        {/* ADMIN LOGIN */}

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="orders" element={<AdminOrders />} />

          <Route path="coupons" element={<AdminCoupons />} />

          <Route path="shipping" element={<AdminShipping />} />

          <Route path="users" element={<AdminUsers />} />

          <Route path="payment-methods" element={<AdminPaymentMethods />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ShopLayout />
    </BrowserRouter>
  );
};

export default App;

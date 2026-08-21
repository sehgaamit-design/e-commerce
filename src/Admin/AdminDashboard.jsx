import React from "react";
import { Link } from "react-router-dom";
import all_product_static from "../assets/all_product";
import "./Admin.css";

const AdminDashboard = () => {
  const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];
  const totalProducts = all_product_static.length + adminProducts.length;

  const coupons = JSON.parse(localStorage.getItem("adminCoupons")) || [];
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const users = JSON.parse(localStorage.getItem("users")) || [];
  
  const shippingMethods = JSON.parse(localStorage.getItem("shippingMethods")) || [];
  const paymentMethods = JSON.parse(localStorage.getItem("paymentMethods")) || [];

  const activeShipping = shippingMethods.filter((m) => m.active).length;
  const activePayments = paymentMethods.filter((p) => p.active).length;

  
  const deliveredOrders = orders.filter((o) => o.status === "Delivered");
  const totalRevenue = deliveredOrders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to PRIME Collection Admin Panel</p>
        </div>
      </div>

      <div className="dashboard-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{totalProducts}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <h2>{orders.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <h2>{users.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Coupons</h3>
          <h2>{coupons.length}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <h2>₹{totalRevenue}</h2>
          <small style={{ color: "#777" }}>From delivered orders</small>
        </div>

        <div className="dashboard-card">
          <h3>Active Delivery</h3>
          <h2>{activeShipping}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Active Payments</h3>
          <h2>{activePayments}</h2>
        </div>
      </div>

      <div className="admin-welcome">
        <h2>Quick Actions</h2>

        <div className="quick-actions">
          <Link to="/admin/products">
            <button>Manage Products</button>
          </Link>

          <Link to="/admin/orders">
            <button>View Orders</button>
          </Link>

          <Link to="/admin/coupons">
            <button>Manage Coupons</button>
          </Link>

          <Link to="/admin/shipping">
            <button>Shipping Methods</button>
          </Link>

          <Link to="/admin/payment-methods">
            <button>Payment Methods</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
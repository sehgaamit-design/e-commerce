import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/");
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-logo">
        <h2>PRIME</h2>
        <span>ADMIN PANEL</span>
      </div>

      <ul>
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>

        <li>
          <Link to="/admin/products">Products</Link>
        </li>

        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>

        <li>
          <Link to="/admin/users">Users</Link>
        </li>

        <li>
          <Link to="/admin/coupons">Coupons</Link>
        </li>

        <li>
          <Link to="/admin/shipping">Shipping</Link>
        </li>

        <li>
          <Link to="/admin/payment-methods">Payment Methods</Link>
        </li>
      </ul>

      <button className="admin-logout" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
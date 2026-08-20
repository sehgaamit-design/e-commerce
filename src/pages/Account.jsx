import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../components/Context/ShopContext";
import "./Css/Account.css";

const Account = () => {
  const { loggedInUser, logoutUser } = useContext(ShopContext);
  const navigate = useNavigate();

  // If not logged in, redirect to login
  if (!loggedInUser) {
    navigate("/login");
    return null;
  }

  // Get orders from localStorage
  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  const userOrders = allOrders.filter(
    (order) => order.email.toLowerCase() === loggedInUser.email.toLowerCase()
  );

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <div className="account-page">
      <div className="account-sidebar">
        <h2>My Account</h2>
        <div className="account-info-item">
          <label>Name</label>
          <p>{loggedInUser.name}</p>
        </div>
        <div className="account-info-item">
          <label>Email Address</label>
          <p>{loggedInUser.email}</p>
        </div>
        <button className="account-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="orders-section">
        <h2>My Orders</h2>
        {userOrders.length === 0 ? (
          <p style={{ color: "#666", fontSize: "16px", marginTop: "20px" }}>
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Delivery</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td style={{ fontWeight: "600", color: "#edb017" }}>
                      #{order.orderId}
                    </td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>
                      <div className="order-products">
                        {order.products.map((p, idx) => (
                          <div className="order-product-item" key={idx}>
                            {p.name} <span style={{ color: "#888" }}>x{p.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: "600" }}>₹{order.totalAmount}</td>
                    <td style={{ fontSize: "14px" }}>{order.paymentMethod}</td>
                    <td style={{ fontSize: "14px" }}>{order.deliveryMethod}</td>
                    <td>
                      <span className={getStatusClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;

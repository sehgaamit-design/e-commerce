import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import "./Css/OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  // If no order data, redirect to home
  if (!order) {
    return <Navigate to="/" />;
  }

  return (
    <div className="order-success-page">
      <div className="success-icon">✓</div>
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for shopping with PRIME Collection.</p>

      <div className="order-details-box">
        <div className="order-detail-row">
          <span>Order ID</span>
          <span style={{ fontWeight: "600", color: "#edb017" }}>
            #PRIME{order.orderId}
          </span>
        </div>
        <div className="order-detail-row">
          <span>Payment Method</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div className="order-detail-row">
          <span>Delivery Method</span>
          <span>{order.deliveryMethod}</span>
        </div>
        <div className="order-detail-row">
          <span>Total Amount</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      <div className="order-success-actions">
        <Link to="/account" className="order-success-btn btn-primary">
          View My Orders
        </Link>
        <Link to="/" className="order-success-btn btn-secondary">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;

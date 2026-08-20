import React, { useState } from "react";
import "./Admin.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  const handleStatusChange = (orderId, newStatus) => {
    const updated = orders.map((order) => {
      if (order.orderId === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    alert(`Order #${orderId} status updated to ${newStatus}`);
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Orders</h1>
          <p>Manage customer orders and update shipping statuses</p>
        </div>
      </div>

      <div className="admin-table-card">
        {orders.length === 0 ? (
          <p style={{ padding: "20px", color: "#666" }}>No orders placed yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Products</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Delivery</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td style={{ fontWeight: "600", color: "#edb017" }}>#{order.orderId}</td>
                  <td>{order.customerName}</td>
                  <td>{order.email}</td>
                  <td>
                    <div style={{ fontSize: "14px" }}>
                      {order.products.map((p, idx) => (
                        <div key={idx}>
                          {p.name} (x{p.quantity})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontWeight: "600" }}>₹{order.totalAmount}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.deliveryMethod}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ddd",
                        fontWeight: "600",
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
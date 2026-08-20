import React, { useState } from "react";
import "./Admin.css";

const AdminUsers = () => {
  const [users] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Customers</h1>
          <p>View registered user accounts</p>
        </div>
      </div>

      <div className="admin-table-card">
        <h2>Registered Users ({users.length})</h2>
        {users.length === 0 ? (
          <p style={{ padding: "20px", color: "#666" }}>No users registered yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Address</th>
                <th>Simulated Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: "600" }}>{user.name}</td>
                  <td>{user.email}</td>
                  <td style={{ fontFamily: "monospace", color: "#888" }}>{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

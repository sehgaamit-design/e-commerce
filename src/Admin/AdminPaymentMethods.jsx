import React, { useState } from "react";
import "./Admin.css";

const AdminPaymentMethods = () => {
  const [methods, setMethods] = useState(() => {
    return JSON.parse(localStorage.getItem("paymentMethods")) || [];
  });

  const [name, setName] = useState("");

  const addMethod = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter a payment method name");
      return;
    }

    const newMethod = {
      id: Date.now(),
      name,
      active: true,
    };

    const updated = [...methods, newMethod];
    setMethods(updated);
    localStorage.setItem("paymentMethods", JSON.stringify(updated));
    setName("");
  };

  const toggleMethod = (id) => {
    const updated = methods.map((m) => {
      if (m.id === id) {
        return { ...m, active: !m.active };
      }
      return m;
    });
    setMethods(updated);
    localStorage.setItem("paymentMethods", JSON.stringify(updated));
  };

  const deleteMethod = (id) => {
    const updated = methods.filter((m) => m.id !== id);
    setMethods(updated);
    localStorage.setItem("paymentMethods", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="admin-header">
        <div>
          <h1>Payment Methods</h1>
          <p>Manage active customer checkout payment options</p>
        </div>
      </div>

      <div className="admin-form-card">
        <h2>Add Payment Method</h2>
        <form onSubmit={addMethod} className="product-form">
          <input
            type="text"
            placeholder="Payment Method Name (e.g. UPI, Card)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Add Method</button>
        </form>
      </div>

      <div className="admin-table-card">
        <h2>Available Payment Methods</h2>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {methods.map((method) => (
              <tr key={method.id}>
                <td style={{ fontWeight: "600" }}>{method.name}</td>
                <td>
                  <button
                    onClick={() => toggleMethod(method.id)}
                    className="status-btn"
                    style={{
                      backgroundColor: method.active ? "#d4edda" : "#f8d7da",
                      color: method.active ? "#155724" : "#721c24",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {method.active ? "Active" : "Disabled"}
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMethod(method.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaymentMethods;

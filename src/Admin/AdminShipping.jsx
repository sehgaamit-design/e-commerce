import React, { useState } from "react";
import "./Admin.css";

const AdminShipping = () => {
  const [methods, setMethods] = useState(() => {
    return JSON.parse(localStorage.getItem("shippingMethods")) || [];
  });

  const [name, setName] = useState("");
  const [charge, setCharge] = useState("");

  const addShipping = (e) => {
    e.preventDefault();

    if (!name) {
      alert("Enter shipping method");
      return;
    }

    const newMethod = {
      id: Date.now(),
      name,
      charge: Number(charge) || 0,
    };

    const updatedMethods = [...methods, newMethod];

    setMethods(updatedMethods);

    localStorage.setItem(
      "shippingMethods",
      JSON.stringify(updatedMethods)
    );

    setName("");
    setCharge("");
  };

  const deleteShipping = (id) => {
    const updatedMethods = methods.filter(
      (method) => method.id !== id
    );

    setMethods(updatedMethods);

    localStorage.setItem(
      "shippingMethods",
      JSON.stringify(updatedMethods)
    );
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Shipping Methods</h1>
      </div>

      <div className="admin-form-card">
        <h2>Add Shipping Method</h2>

        <form onSubmit={addShipping} className="product-form">

          <input
            type="text"
            placeholder="Shipping Method"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Shipping Charge"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
          />

          <button type="submit">Add Shipping</button>

        </form>
      </div>

      <div className="admin-table-card">

        <h2>Shipping Methods</h2>

        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Charge</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {methods.map((method) => (
              <tr key={method.id}>
                <td>{method.name}</td>
                <td>
                  {method.charge === 0
                    ? "FREE"
                    : `₹${method.charge}`}
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteShipping(method.id)}
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

export default AdminShipping;
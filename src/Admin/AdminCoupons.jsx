import React, { useState } from "react";
import "./Admin.css";

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState(() => {
    return JSON.parse(localStorage.getItem("adminCoupons")) || [];
  });

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const addCoupon = (e) => {
    e.preventDefault();

    if (!code || !discount) {
      alert("Please enter coupon code and discount");
      return;
    }

    const newCoupon = {
      id: Date.now(),
      code: code.toUpperCase(),
      discount: Number(discount),
    };

    const updatedCoupons = [...coupons, newCoupon];

    setCoupons(updatedCoupons);

    localStorage.setItem(
      "adminCoupons",
      JSON.stringify(updatedCoupons)
    );

    setCode("");
    setDiscount("");
  };

  const deleteCoupon = (id) => {
    const updatedCoupons = coupons.filter(
      (coupon) => coupon.id !== id
    );

    setCoupons(updatedCoupons);

    localStorage.setItem(
      "adminCoupons",
      JSON.stringify(updatedCoupons)
    );
  };

  return (
    <div>
      <div className="admin-header">
        <h1>Coupons & Discounts</h1>
      </div>

      <div className="admin-form-card">
        <h2>Create Coupon</h2>

        <form onSubmit={addCoupon} className="product-form">
          <input
            type="text"
            placeholder="Coupon Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />

          <button type="submit">Create Coupon</button>
        </form>
      </div>

      <div className="admin-table-card">
        <h2>Available Coupons</h2>

        <table>
          <thead>
            <tr>
              <th>Coupon</th>
              <th>Discount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>{coupon.discount}%</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteCoupon(coupon.id)}
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

export default AdminCoupons;
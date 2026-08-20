import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../components/Context/ShopContext";
import "./Css/Checkout.css";

const Checkout = () => {
  const { all_product, cartitem, getTotalCartAmount, loggedInUser, clearCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  // If not logged in, redirect to login page
  useEffect(() => {
    if (!loggedInUser) {
      alert("Please login to proceed to checkout");
      navigate("/login", { state: { from: "/checkout" } });
    }
  }, [loggedInUser, navigate]);

  // Load active shipping methods
  const [shippingMethods] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("shippingMethods")) || [];
    return saved.filter((m) => m.active);
  });

  // Load active payment methods
  const [paymentMethods] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("paymentMethods")) || [];
    return saved.filter((m) => m.active);
  });

  // Local state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: loggedInUser?.name || "",
    email: loggedInUser?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [selectedShipping, setSelectedShipping] = useState(
    shippingMethods[0] || { id: 0, name: "No shipping methods available", charge: 0 }
  );

  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethods[0] || { id: 0, name: "No payment methods available" }
  );

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Card payment simulated details
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  // UPI simulated details
  const [upiId, setUpiId] = useState("");

  const subtotal = getTotalCartAmount();

  // Update discount if subtotal changes or coupon applies
  useEffect(() => {
    if (appliedCoupon) {
      if (subtotal >= appliedCoupon.minAmount) {
        const discount = (subtotal * appliedCoupon.discount) / 100;
        setDiscountAmount(Math.round(discount * 100) / 100);
      } else {
        setAppliedCoupon(null);
        setDiscountAmount(0);
        alert(`Coupon removed. Subtotal must be at least ₹${appliedCoupon.minAmount}`);
      }
    }
  }, [subtotal, appliedCoupon]);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      alert("Please enter a coupon code");
      return;
    }
    const adminCoupons = JSON.parse(localStorage.getItem("adminCoupons")) || [];
    const coupon = adminCoupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.active
    );

    if (!coupon) {
      alert("Invalid or expired coupon");
      return;
    }

    if (subtotal < coupon.minAmount) {
      alert(`Minimum order amount of ₹${coupon.minAmount} is required for this coupon`);
      return;
    }

    setAppliedCoupon(coupon);
    const discount = (subtotal * coupon.discount) / 100;
    setDiscountAmount(Math.round(discount * 100) / 100);
    alert(`Coupon ${coupon.code} applied successfully!`);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Check cart items
    const cartProducts = [];
    for (const id in cartitem) {
      if (cartitem[id] > 0) {
        const prod = all_product.find((p) => p.id === Number(id));
        if (prod) {
          cartProducts.push({
            id: prod.id,
            name: prod.name,
            price: prod.new_price,
            quantity: cartitem[id],
          });
        }
      }
    }

    if (cartProducts.length === 0) {
      alert("Your cart is empty");
      return;
    }

    // Validate inputs
    if (
      !shippingInfo.fullName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    // Validate payment info
    if (selectedPayment.name === "Credit / Debit Card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        alert("Please enter all card details");
        return;
      }
    } else if (selectedPayment.name === "UPI") {
      if (!upiId) {
        alert("Please enter your UPI ID");
        return;
      }
    }

    const deliveryCharge = selectedShipping ? selectedShipping.charge : 0;
    const totalAmount = Math.round((subtotal - discountAmount + deliveryCharge) * 100) / 100;

    const newOrder = {
      orderId: Math.floor(100000 + Math.random() * 900000), // generated random order id
      userId: loggedInUser.email, // using email as identifier
      customerName: shippingInfo.fullName,
      email: shippingInfo.email,
      products: cartProducts,
      subtotal,
      discount: discountAmount,
      coupon: appliedCoupon ? appliedCoupon.code : "None",
      deliveryMethod: selectedShipping ? selectedShipping.name : "None",
      deliveryCharge,
      paymentMethod: selectedPayment ? selectedPayment.name : "None",
      totalAmount,
      address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

    // Save order
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    allOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(allOrders));

    // Clear cart and redirect
    clearCart();
    navigate("/order-success", { state: { order: newOrder } });
  };

  const deliveryCharge = selectedShipping ? selectedShipping.charge : 0;
  const finalTotal = Math.round((subtotal - discountAmount + deliveryCharge) * 100) / 100;

  if (!loggedInUser) return null;

  return (
    <div className="checkout-page">
      <div>
        <form onSubmit={handlePlaceOrder}>
          {/* Customer Information Card */}
          <div className="checkout-card">
            <h2 className="checkout-section-title">Delivery Details</h2>
            <div className="form-grid">
              <div className="form-group-full">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="checkout-input"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="checkout-input"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-full">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="checkout-input"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group-full">
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  className="checkout-input"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input
                type="text"
                name="city"
                placeholder="City"
                className="checkout-input"
                value={shippingInfo.city}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="checkout-input"
                value={shippingInfo.state}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="checkout-input"
                value={shippingInfo.pincode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Delivery Methods Card */}
          <div className="checkout-card">
            <h2 className="checkout-section-title">Delivery / Shipping Methods</h2>
            <div className="shipping-methods-list">
              {shippingMethods.map((method) => (
                <div
                  key={method.id}
                  className={`method-option ${selectedShipping.id === method.id ? "selected" : ""}`}
                  onClick={() => setSelectedShipping(method)}
                >
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={selectedShipping.id === method.id}
                    onChange={() => setSelectedShipping(method)}
                  />
                  <div className="method-details">
                    <h4>{method.name}</h4>
                    <p>Estimated Delivery: {method.time || "4-6 days"}</p>
                  </div>
                  <span className="method-price">
                    {method.charge === 0 ? "Free" : `₹${method.charge}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods Card */}
          <div className="checkout-card">
            <h2 className="checkout-section-title">Payment Methods</h2>
            <div className="payment-methods-list">
              {paymentMethods.map((payment) => (
                <div
                  key={payment.id}
                  className={`method-option ${selectedPayment.id === payment.id ? "selected" : ""}`}
                  onClick={() => setSelectedPayment(payment)}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={selectedPayment.id === payment.id}
                    onChange={() => setSelectedPayment(payment)}
                  />
                  <div className="method-details">
                    <h4>{payment.name}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment inputs simulation */}
            {selectedPayment.name === "Cash on Delivery" && (
              <div className="payment-details-box">
                <p style={{ color: "#155724", fontWeight: "600", margin: 0 }}>
                  ✓ Cash on Delivery selected. Pay when order is delivered.
                </p>
              </div>
            )}

            {selectedPayment.name === "UPI" && (
              <div className="payment-details-box">
                <p style={{ margin: "0 0 10px 0", fontWeight: "500" }}>Enter UPI ID</p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="e.g. mobile@upi"
                    className="checkout-input"
                    style={{ marginBottom: 0 }}
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                  <button
                    type="button"
                    className="coupon-apply-btn"
                    onClick={() => {
                      if (upiId) alert(`UPI ID "${upiId}" verified!`);
                    }}
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {selectedPayment.name === "Credit / Debit Card" && (
              <div className="payment-details-box">
                <div className="form-grid">
                  <div className="form-group-full">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="checkout-input"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Expiry Date (MM/YY)"
                    className="checkout-input"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    className="checkout-input"
                    maxLength="3"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  />
                  <div className="form-group-full">
                    <input
                      type="text"
                      placeholder="Card Holder Name"
                      className="checkout-input"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedPayment.name === "Net Banking" && (
              <div className="payment-details-box">
                <p style={{ margin: "0 0 10px 0", fontWeight: "500" }}>Select Bank</p>
                <select className="checkout-input" style={{ width: "100%", padding: "12px" }}>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Order Summary & Coupon Panel */}
      <div>
        <div className="checkout-card">
          <h2 className="checkout-section-title">Order Summary</h2>

          {/* Cart Products List */}
          <div style={{ maxHeight: "250px", overflowY: "auto", marginBottom: "20px" }}>
            {all_product.map((e) => {
              if (cartitem[e.id] > 0) {
                return (
                  <div className="order-summary-item" key={e.id}>
                    <div>
                      <p style={{ fontWeight: "600" }}>{e.name}</p>
                      <p style={{ fontSize: "14px", color: "#888" }}>
                        Qty: {cartitem[e.id]} x ₹{e.new_price}
                      </p>
                    </div>
                    <span style={{ fontWeight: "600" }}>₹{e.new_price * cartitem[e.id]}</span>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Pricing Totals */}
          <div className="order-summary-item">
            <p>Subtotal</p>
            <span>₹{subtotal}</span>
          </div>

          <div className="order-summary-item">
            <p>Discount (Coupon: {appliedCoupon ? appliedCoupon.code : "None"})</p>
            <span style={{ color: "#cd3232" }}>-₹{discountAmount}</span>
          </div>

          <div className="order-summary-item">
            <p>Delivery Fee ({selectedShipping ? selectedShipping.name : "None"})</p>
            <span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
          </div>

          <div className="order-summary-item" style={{ borderBottom: "none", marginTop: "10px" }}>
            <h3 style={{ margin: 0 }}>Total</h3>
            <h3 style={{ margin: 0, color: "#edb017" }}>₹{finalTotal}</h3>
          </div>

          {/* Coupon Entry */}
          <div style={{ marginTop: "20px" }}>
            <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>Have a coupon code?</p>
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon"
                className="coupon-input"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button type="button" className="coupon-apply-btn" onClick={handleApplyCoupon}>
                Apply
              </button>
            </div>
            {appliedCoupon && (
              <p style={{ color: "green", fontSize: "14px", margin: "5px 0 0 0" }}>
                ✓ Coupon "{appliedCoupon.code}" applied! Save {appliedCoupon.discount}%
              </p>
            )}
          </div>

          {/* Submit Action */}
          <button type="submit" className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

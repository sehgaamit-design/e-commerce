import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../components/Context/ShopContext";
import "./Css/Loginsignup.css";

const Loginsignup = () => {
  const [state, setState] = useState("Login"); // "Login" or "Sign Up"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [agree, setAgree] = useState(false);

  const { registerUser, loginUser } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = () => {
    if (state === "Sign Up") {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        alert("Please fill all fields");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      if (!agree) {
        alert("Please agree to the terms and conditions");
        return;
      }

      const result = registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        alert("Account created successfully! Please login.");
        setState("Login");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      } else {
        alert(result.message);
      }
    } else {
      if (!formData.email || !formData.password) {
        alert("Please enter email and password");
        return;
      }

      const result = loginUser(formData.email, formData.password);
      if (result.success) {
        alert("Login successful!");
        const origin = location.state?.from || "/";
        navigate(origin);
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeHandler}
          />
          {state === "Sign Up" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={changeHandler}
            />
          )}
        </div>
        <button onClick={handleAuth}>Continue</button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an Account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Don't have an Account?{" "}
            <span onClick={() => setState("Sign Up")}>Create account</span>
          </p>
        )}
        {state === "Sign Up" && (
          <div className="loginsignup-agree">
            <input
              type="checkbox"
              id="agree-checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="agree-checkbox">
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loginsignup;


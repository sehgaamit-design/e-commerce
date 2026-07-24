import React from "react";
import "./Css/Loginsignup.css";

const Loginsignup = () => {
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
          <input type="email" placeholder="Email address" />
          <input type="password" placeholder="Enter the password" />
        </div>
        <button>Sign up</button>
        <p className="loginsignup-login">
          Already have an Account? <span>Login here</span>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Loginsignup;

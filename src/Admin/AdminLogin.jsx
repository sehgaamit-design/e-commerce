import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Username:", username);
    console.log("Password:", password);

    if (username.trim() === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");

      console.log("Login successful");

      navigate("/admin");
    } else {
      alert("Wrong username or password");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">

        <h1>Admin Login</h1>

        <p>Login to PRIME Collection Admin Panel</p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <small>
          Username: admin | Password: admin123
        </small>

      </div>
    </div>
  );
};

export default AdminLogin;
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />

      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
import React from "react";
import { useAuth } from "../context/authContext";
import AdminSideBar from "../components/dashboard/AdminSideBar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";


const AdminDashboard = () => {
  const {user, loading} = useAuth();
  return (
    <div className="flex">
        <AdminSideBar />
        <div className="flex-1 ml-64 bg-gray-100 h-screen">
            <Navbar />
            <Outlet />
        </div>
    </div>
  );
}

export default AdminDashboard;

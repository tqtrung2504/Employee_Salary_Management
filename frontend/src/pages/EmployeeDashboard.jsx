import React from "react";
import { useAuth } from "../context/authContext";
import SideBar from '../components/EmployeeDashboard/Sidebar'
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  const {user} = useAuth();
  return (
    <div className="flex">
        <SideBar />
        <div className="flex-1 ml-64 bg-gray-100 h-screen">
            <Navbar />
            <Outlet />
        </div>
    </div>
  );
}

export default EmployeeDashboard;

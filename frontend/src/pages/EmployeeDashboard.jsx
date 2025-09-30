import React from "react";
import { useAuth } from "../context/authContext";

const EmployeeDashboard = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1>EmployeeDashboard</h1>
    </div>
  );
}

export default EmployeeDashboard;

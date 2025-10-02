import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';

function LeaveList() {

  const {user} = useAuth()
  const [leaves, setLeaves] = useState([])
  let sno = 1

    const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leave/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.success) {
        setLeaves(response.data.leaves ?? []);
      }
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.message)
      }
    } 
  };

  useEffect(() => {
    fetchSalaries();
  }, []);


  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>

      <div className="flex justify-between items-center ">
        <input
          type="text"
          placeholder="Search by Dep Name"
          className="px-4 py-0.5 border"
        />
        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500 mt-6">
          <thead className="text-xs uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">LEAVE TYPE</th>
              <th className="px-6 py-3">FROM</th>
              <th className="px-6 py-3">TO</th>
              <th className="px-6 py-3">DESCRIPTION</th>
              <th className="px-6 py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
                <tr key={leave._id} className="bg-white border-b">
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{leave.leaveType}</td>
                  <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3">{leave.reason}</td>
                  <td className="px-6 py-3">{leave.status}</td>
                </tr>
              ))}
          </tbody>
        </table>



    </div>
  );
}

export default LeaveList
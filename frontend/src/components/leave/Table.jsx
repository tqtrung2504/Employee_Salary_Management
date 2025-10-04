import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utils/LeaveHelper';
import axios from 'axios';

const Table = () => {
    const [leaves, setLeaves] = useState(null)
    const fetchLeaves = async() =>{
        try {
        const res = await axios.get("http://localhost:5000/api/leave", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (res.data?.success) {
          let sno = 1;
          const data = res.data.leaves
            .filter(leave => leave.employeeId) // Filter out leaves with null employeeId
            .map((leave) => ({
              _id: leave?._id,
              sno: sno++,
              employeeId: leave.employeeId?.employeeId || 'N/A',
              name: leave.employeeId?.userId?.name || 'N/A',
              leaveType: leave.leaveType || 'N/A',
              department: leave.employeeId?.department?.dep_name || 'N/A',
              days: leave.endDate && leave.startDate 
                ? new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate() + 1
                : 0,
              status: leave.status || 'N/A',
              action: <LeaveButtons Id={leave._id}/>
            }));
          setLeaves(data)
        }
        } catch (error) {
            const msg =
            error.response?.data?.error ||
            error.response?.data?.message ||
            error.message;
            alert(msg);
        }
    }
    useEffect(() => {
        fetchLeaves()
    }, [])
  return (
    <>
        {leaves ? (
            <div className='p-6'>
                <div className="text-center">
                    <h3 className="text-2xl font-bold">Manage Leaves</h3>
                </div>

                <div className="flex justify-between items-center ">
                    <input
                    type="text"
                    placeholder="Search by Dep Name"
                    className="px-4 py-0.5 border"
                    />
                    <div className='space-x-3'>
                        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Pending</button>
                        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Approved</button>
                        <button className='px-2 py-1 bg-teal-600 text-white hover:bg-teal-700'>Rejected</button>
                    </div>
                </div>
                <div className='mt-3'>
                    <DataTable columns={columns} data={leaves} pagination/>
                </div>
            </div>
        ) : ( 
            <div>Loading...</div>
        )}
    </>
  )
}

export default Table
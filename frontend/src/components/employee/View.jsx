import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const View = () => {
    const {id} = useParams() 
    const [employee, setEmployee] = useState(null)
    useEffect(() => {
    const fetchEmployee = async() =>{
      try{
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`,
        {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          setEmployee(response.data.employee)
        }
      }catch(error){
        if(error.response && !error.response.data.success){
                alert(error.response.data.error);
        }
      }
    }
    fetchEmployee();
    }, [id])
  return (
    <>{employee ? (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md ">
        <h2 className="text-2xl font0bold mb-8 text-center">
            Employee Details
        </h2>
        <div className="flex items-center gap-8">
            <div>
                <img 
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                className="rounded-full border w-72"
                
                />
            </div>
            <div className="flex-1 pl-20"> 
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Name:</p>
                    <p className="font-medium">{employee.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Employee Id:</p>
                    <p className="font-medium">{employee.employeeId}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Data of birth:</p>
                    <p className="font-medium">{new Date(employee.dob).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Gender:</p>
                    <p className="font-medium">{employee.gender}</p>
                </div>
                <div className="flex space-x-3 mb-5">
                    <p className="text-lg font-bold">Department:</p>
                    <p className="font-medium">{employee.department.dep_name}</p>
                </div>
            </div>
        </div>
        
    </div>
    ): <div>Loading...</div>}</>
  )
}

export default View
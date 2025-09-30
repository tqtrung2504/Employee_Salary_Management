import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
    const [employee, setEmployee] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,
    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState(null)
    const navigate = useNavigate();
    const {id} = useParams()

    useEffect(() =>{
        const getDepartments = async () =>{
        const departments = await fetchDepartments()
        setDepartments(departments)
        }
        getDepartments()
    }, [])    

    const handleDepartment = async(e) => {
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

    useEffect(() =>{
        const fetchEmployee = async() =>{
        try{
            const response = await axios.get(`http://localhost:5000/api/employee/${id}`,
            {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
            })
            if(response.data.success){
                const employee = response.data.employee
                setEmployee((prev) => ({
                    ...prev, 
                    name: employee.userId.name, 
                    maritalStatus: employee.maritalStatus,
                    designation: employee.designation,
                    salary: employee.salary,
                    department: employee.department
                }))
            }
            }catch(error){
            if(error.response && !error.response.data.success){
                    alert(error.response.data.error);
            }
        }
    }
        fetchEmployee()
    }, [])

    const handleChange = (e) =>{
        const {name, value, files} = e.target;
        setEmployee((prevData) => ({...prevData, [name] : value}))
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()

        try{
            const response = await axios.post(`http://localhost:5000/api/salary/add`, employee,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            if(response.data && response.data.success){
                navigate("/admin-dashboard/employees")
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        }
    }
    return (
    <>{departments && employees ? (
    <div className="max-w-6xl mx-auto mt-8 bg-white p-8 rounded-md shadow-md">
        <h3 className="text-2xl font-bold mb-6 text-center" >Add Salary</h3>
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <select 
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md" 
                    name="department"
                    onChange={handleDepartment}
                    value={employee.department}
                    required
                    >
                        <option value="">Select Department</option>
                        {departments.map(dep=>(
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>  
                
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Employee</label>
                    <select 
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md" 
                    name="employeeId"
                    onChange={handleChange}
                    required
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp)=>(
                            <option key={emp._id} value={emp._id}>{emp.employeeId}</option>
                        ))}
                    </select>
                </div> 
                <div>
                    <label className="block text-sm font-medium text-gray-700">Basic Salary</label>
                    <input 
                    type="number" 
                    name="basicSalary"
                    onChange={handleChange}
                    placeholder="Basic Salary"
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Allowances</label>
                    <input 
                    type="number"
                    name="allowances"
                    onChange={handleChange}
                    placeholder="allowances" 
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md"
                    required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Deductions</label>
                    <input 
                    type="number"
                    name="deductions"
                    onChange={handleChange}
                    placeholder="deductions" 
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md"
                    required
                    />
                </div>        
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pay Date</label>
                    <input 
                    type="date"
                    name="payDate"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full block 2-full border border-gray-300 rounded-md"
                    required
                    />
                </div>           
            </div>
            <button type="submit" className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded" >Edit Employee</button>
        </form>
    </div>
    ) : <div>Loading... </div>}</>
  );
}

export default Add;

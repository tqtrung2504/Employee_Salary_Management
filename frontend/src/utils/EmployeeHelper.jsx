import axios from "axios"
import { useNavigate } from "react-router-dom"

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
    center: "true"
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "180px",
    center: "true"
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "100px",
    center: "true"
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "120px",
    center: "true"
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "130px",
    center: "true"
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  }
]


export const fetchDepartments = async() =>{
  let departments
    try{
      const response = await axios.get('http://localhost:5000/api/department',{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        departments = response.data.departments
      }
    }catch(error){
      if(error.response && !error.response.data.success){
              alert(error.response.data.error);
      }
    } 
    return departments
}

export const fetchEmployees = async(id) =>{
  let employees
    try{
      const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
        employees = response.data.employees
      }
    }catch(error){
      if(error.response && !error.response.data.success){
              alert(error.response.data.error);
      }
    } 
    return employees
}



export const EmployeeButtons = ({Id, onEmployeeDelete}) => {
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this employee?")
    if(confirm){
      try{
        const response = await axios.delete(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onEmployeeDelete(id)
        }
      }catch(error){
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
    }
  }

  return (
    <div className="flex space-x-3">
      <button
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
        className="px-4 py-1 bg-green-600 text-white"
      >
        View
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employee/edit/${Id}`)}
        className="px-4 py-1 bg-blue-600 text-white"
      >
        Edit
      </button>
      <button
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
        className="px-4 py-1 bg-yellow-600 text-white"
      >
        Salary
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white"
      >
        Leave
      </button>
    </div>
  );
};
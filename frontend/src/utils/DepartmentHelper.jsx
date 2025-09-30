import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true"
  },
];

export const DepartmentButtons = ({Id, onDepartmentDelete}) => {
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this?")
    if(confirm){
          try{
        const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          onDepartmentDelete(id)
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
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
        className="px-4 py-1 bg-teal-600 text-white"
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600 text-white"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};

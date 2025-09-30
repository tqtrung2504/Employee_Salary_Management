import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utils/EmployeeHelper";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    let alive = true;
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/employee", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (res.data?.success && alive) {
          let sno = 1;
          const data = res.data.employees.map((emp) => ({
            _id: emp?._id,
            sno: sno++,
            dep_name: emp?.department?.dep_name ?? "(No dept)",
            name: emp?.userId?.name ?? "(No name)",
            dob: emp?.dob ? new Date(emp.dob).toLocaleDateString() : "",
            profileImage: (
              <img
                width={50}
                className="rounded"
                alt={emp?.userId?.name ?? "avatar"}
                src={
                  emp?.userId?.profileImage
                    ? `http://localhost:5000/${emp.userId.profileImage}`
                    : "/placeholder.png"
                }
              />
            ),
            action: (
              <EmployeeButtons Id={emp?._id} onEmployeeDelete={onEmployeeDelete} />
            ),
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        const msg =
          error.response?.data?.error ||
          error.response?.data?.message ||
          error.message;
        alert(msg);
      } finally {
        if (alive) setEmpLoading(false);
      }
    };
    fetchEmployees();
    return () => {
      alive = false;
    };
  }, []);

  const onEmployeeDelete = (id) => {
    const data = employees.filter((emp) => emp._id !== id);
    setEmployees(data);
    setFilteredEmployees(data);
  };

  const filterEmployees = (e) => {
    const q = e.target.value.toLowerCase();
    const records = employees.filter(
      (emp) =>
        (emp.name || "").toLowerCase().includes(q) ||
        (emp.dep_name || "").toLowerCase().includes(q)
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-5">
      <div className="text-center mb-3">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center mb-3 gap-3">
        <input
          type="text"
          placeholder="Search employee by name or department"
          className="px-4 py-1 border rounded max-w-3xl w-full"
          onChange={filterEmployees}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination
        progressPending={empLoading}
      />
    </div>
  );
};

export default List;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ViewSalary() {
  const { id } = useParams(); // employee id
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data?.success) {
        const list = Array.isArray(response.data.salary)
          ? response.data.salary
          : (response.data.salaries || []);
        setSalaries(list);
        setFilteredSalaries(list);
      }
    } catch (error) {
      alert(error?.response?.data?.error || error.message || "Failed to load salaries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, [id]);

  const handleSearch = (value) => {
    setQ(value);
    const kw = value.toLowerCase();
    const next = salaries.filter((s) => {
      // nếu populate: employeeId là object { employeeId: 'EMP001', ... }
      const empCode =
        (typeof s.employeeId === "object" && s.employeeId?.employeeId) ||
        String(s.employeeId || "");
      return empCode.toLowerCase().includes(kw);
    });
    setFilteredSalaries(next);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="border px-2 rounded-md py-1 border-gray-300"
          value={q}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {filteredSalaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Emp ID</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Allowance</th>
              <th className="px-6 py-3">Deduction</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalaries.map((s) => {
              const empCode =
                (typeof s.employeeId === "object" && s.employeeId?.employeeId) ||
                String(s.employeeId || "");
              return (
                <tr key={s._id} className="bg-white border-b">
                  <td className="px-6 py-3">{sno++}</td>
                  <td className="px-6 py-3">{empCode}</td>
                  <td className="px-6 py-3">{s.basicSalary}</td>
                  <td className="px-6 py-3">{s.allowances}</td>
                  <td className="px-6 py-3">{s.deductions}</td>
                  <td className="px-6 py-3">{s.netSalary}</td>
                  <td className="px-6 py-3">
                    {s.payDate ? new Date(s.payDate).toLocaleDateString() : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No Record</div>
      )}
    </div>
  );
}

export default ViewSalary;

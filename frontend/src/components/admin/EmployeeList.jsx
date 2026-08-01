import { useEffect, useState } from "react";
import axios from "axios";
import EditEmployeeModal from "./EditEmployeeModal";
import api from "../../services/api";

const EmployeeListTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await api.get("/employee/get");

      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?",
    );

    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/employee/delete/${id}`);

      alert(response.data.message);

      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3">Employee ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Department</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id} className="border-b text-center">
                <td className="p-3">{emp.employeeId}</td>
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.department}</td>
                <td className="p-3">₹{emp.salary}</td>
                <td className="p-3">{emp.phone}</td>
                <td className="p-3">{emp.email}</td>

                <td className="p-3">
                  {emp.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>

                <td className="p-3">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 mr-2 rounded"
                    onClick={() => {
                      setSelectedEmployee(emp);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(emp._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditOpen && (
          <EditEmployeeModal
            employee={selectedEmployee}
            onClose={() => setIsEditOpen(false)}
            getEmployees={getEmployees}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeListTable;

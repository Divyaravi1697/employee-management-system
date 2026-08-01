import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaUserCheck, FaUserTimes, FaBuilding } from "react-icons/fa";
import EmployeeChart from "./EmployeeChart";

const DashboardCards = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get(
        "https://employee-management-system-wjus.onrender.com/api/employee/get",
      );

      setEmployees(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const inactiveEmployees = employees.filter((emp) => !emp.isActive).length;
  const totalDepartments = [...new Set(employees.map((emp) => emp.department))]
    .length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow">
          <FaUsers className="text-3xl mb-2" />
          <h3>Total Employees</h3>
          <h1 className="text-3xl font-bold">{totalEmployees}</h1>
        </div>

        <div className="bg-green-600 text-white p-6 rounded-lg shadow">
          <FaUserCheck className="text-3xl mb-2" />
          <h3>Active Employees</h3>
          <h1 className="text-3xl font-bold">{activeEmployees}</h1>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg shadow">
          <FaUserTimes className="text-3xl mb-2" />
          <h3>Inactive Employees</h3>
          <h1 className="text-3xl font-bold">{inactiveEmployees}</h1>
        </div>

        <div className="bg-purple-600 text-white p-6 rounded-lg shadow">
          <FaBuilding className="text-3xl mb-2" />
          <h3>Departments</h3>
          <h1 className="text-3xl font-bold">{totalDepartments}</h1>
        </div>
      </div>
      <EmployeeChart employees={employees} />
    </>
  );
};

export default DashboardCards;

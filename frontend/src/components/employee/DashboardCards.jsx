import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaIdBadge,
  FaBuilding,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

const DashboardCards = () => {
  const [employee, setEmployee] = useState({});

 useEffect(() => {
   const user = JSON.parse(localStorage.getItem("user"));
   if (user) {
     setEmployee(user);
   }
 }, []);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Welcome, {employee?.name} 👋</h2>

        <p className="text-gray-500 mt-2">Here's your employee dashboard.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <FaIdBadge className="text-blue-600 text-3xl mb-3" />
          <h3 className="text-gray-500">Employee ID</h3>
          <h2 className="text-2xl font-bold">{employee?.employeeId}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaBuilding className="text-purple-600 text-3xl mb-3" />
          <h3 className="text-gray-500">Department</h3>
          <h2 className="text-2xl font-bold">{employee?.department}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaEnvelope className="text-green-600 text-3xl mb-3" />
          <h3 className="text-gray-500">Email</h3>
          <h2 className="text-lg font-bold break-all">{employee?.email}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <FaCheckCircle className="text-emerald-600 text-3xl mb-3" />
          <h3 className="text-gray-500">Status</h3>

          <h2
            className={`text-2xl font-bold ${
              employee?.isActive ? "text-green-600" : "text-red-600"
            }`}
          >
            {employee?.isActive ? "Active" : "Inactive"}
          </h2>
        </div>
      </div>
    </>
  );
};

export default DashboardCards;

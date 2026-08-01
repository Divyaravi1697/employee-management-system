import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Navbar = ({ setIsSidebarOpen }) => {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const pageTitles = {
    // Admin
    "/": "Dashboard",
    "/employees": "Employee List",
    "/add-employee": "Add Employee",

    // Employee
    "/employee/dashboard": "Dashboard",
    "/employee/profile": "My Profile",
    "/employee/change-password": "Change Password",
  };

  const title = pageTitles[location.pathname] || "Employee Management";

  return (
    <header className="h-16 bg-white shadow-sm border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
          <FaBars />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-gray-600 hover:text-blue-600 transition">
          <FaBell size={20} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <FaUserCircle size={34} className="text-gray-600" />

          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">
              {user?.name}
            </p>

            <p className="text-xs text-gray-500">
              {role === "admin" ? "Administrator" : "Employee"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
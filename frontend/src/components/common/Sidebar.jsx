import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../services/api";
import {
  FaTimes,
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaLock,
  FaPowerOff,
} from "react-icons/fa";

const Sidebar = ({ role, isOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();

  const adminMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin",
    },
    {
      name: "Employee List",
      icon: <FaUsers />,
      path: "/admin/employees",
    },
    {
      name: "Add Employee",
      icon: <FaUserPlus />,
      path: "/admin/add-employee",
    },
    {
      name: "Logout",
      icon: <FaPowerOff />,
    },
  ];

  const employeeMenu = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/employee/dashboard",
    },
    {
      name: "My Profile",
      icon: <FaUsers />,
      path: "/employee/profile",
    },

    {
      name: "Logout",
      icon: <FaPowerOff />,
    },
  ];

  const menuItems = role === "admin" ? adminMenu : employeeMenu;

  const handleLogout = async () => {
    try {
      await api.post(
        "/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );

      localStorage.removeItem("user");

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  const sidebarBg =
    role === "admin"
      ? "bg-gradient-to-b from-[#0B1120] via-[#172554] to-[#1D4ED8]" // Admin - Blue
      : "bg-gradient-to-b from-[#4C0519] via-[#9D174D] to-[#DB2777]"; // Employee - pink
  const activeClass =
    role === "admin" ? "bg-blue-600 text-white" : "bg-pink-600 text-white";

  const hoverClass =
    role === "admin" ? "hover:bg-blue-600" : "hover:bg-pink-600";

  return (
    <div
      className={`fixed top-0 left-0 h-screen w-64 ${sidebarBg} text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
        <h2 className="text-xl font-bold">
          {role === "admin" ? "EMS Admin" : "EMS Employee"}
        </h2>

        <button className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
          <FaTimes />
        </button>
      </div>

      <nav className="mt-6">
        {menuItems.map((item, index) =>
          item.name === "Logout" ? (
            <button
              key={index}
              onClick={handleLogout}
              className={`w-full flex items-center gap-4 px-6 py-4 text-left cursor-pointer ${hoverClass}`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ) : (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-6 py-4 ${
                  isActive ? activeClass : hoverClass
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ),
        )}
      </nav>
    </div>
  );
};

export default Sidebar;

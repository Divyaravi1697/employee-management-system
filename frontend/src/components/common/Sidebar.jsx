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
      await api.post("/auth/logout", {}, {
        withCredentials: true,
      });

      localStorage.removeItem("user");

      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ${
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
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-blue-600 text-left cursor-pointer"
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
                  isActive ? "bg-blue-600 text-white" : "hover:bg-blue-600"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ),
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;

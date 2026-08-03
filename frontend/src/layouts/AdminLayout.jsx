import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        role="admin"
        isOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 lg:ml-64 min-w-0">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />

        <main className="flex-1 w-full p-4 sm:p-6 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

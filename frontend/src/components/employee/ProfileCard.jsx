import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
  FaPhoneAlt,
} from "react-icons/fa";
import EditProfileModal from "./EditProfileModal";

const ProfileCard = () => {
  const [employee, setEmployee] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);

const getProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    setEmployee(user);
  }
};

useEffect(() => {
  getProfile();
}, []);
  return (
    <>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">My Profile</h2>

          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <FaUser className="text-blue-600 text-xl" />
            <div>
              <p className="text-gray-500">Name</p>
              <h3 className="font-semibold">{employee.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaIdBadge className="text-purple-600 text-xl" />
            <div>
              <p className="text-gray-500">Employee ID</p>
              <h3 className="font-semibold">{employee.employeeId}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaBuilding className="text-green-600 text-xl" />
            <div>
              <p className="text-gray-500">Department</p>
              <h3 className="font-semibold">{employee.department}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-orange-600 text-xl" />
            <div>
              <p className="text-gray-500">Phone</p>
              <h3 className="font-semibold">{employee.phone}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-600 text-xl" />
            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="font-semibold">{employee.email}</h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-gray-500">Status</p>

            <span
              className={`px-3 py-1 rounded-full text-white ${
                employee.isActive ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {employee.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      {isEditOpen && (
        <EditProfileModal
          employee={employee}
          onClose={() => setIsEditOpen(false)}
          getProfile={getProfile}
        />
      )}
    </>
  );
};

export default ProfileCard;

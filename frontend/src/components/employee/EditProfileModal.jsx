import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";

const EditProfileModal = ({ employee, onClose, getProfile }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        phone: employee.phone || "",
        email: employee.email || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      // Safety check
      if (!employee?.id) {
        alert("Employee ID not found");
        return;
      }

      const response = await api.put(
        `/employee/update/${employee.id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      // Keep all existing fields (id, role, employeeId...)
      const updatedUser = {
        ...employee,
        ...response.data.data,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      getProfile();

      alert(response.data.message);

      onClose();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Edit Profile</h2>

          <button onClick={onClose} className="text-red-500 text-xl font-bold">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;

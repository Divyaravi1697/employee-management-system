import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../services/api";

const EditEmployeeModal = ({ employee, onClose, getEmployees }) => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    salary: "",
    phone: "",
    email: "",
    isActive: true,
  });
  const departments = ["HR", "Design", "Finance", "Marketing"];

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        department: employee.department,
        salary: employee.salary,
        phone: employee.phone,
        email: employee.email,
        isActive: employee.isActive,
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
      const response = await api.put(
        `/employee/update/${employee._id}`,
        formData,
      );

      alert("Updated Successfully");

      await getEmployees(); // Refresh table

      onClose(); // Close modal
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-xl font-bold mb-4">Edit Employee</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Name"
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border mb-3 rounded p-2"
        >
          <option value="">Select Department</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Salary"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          placeholder="Phone"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          placeholder="Email"
        />

        <select
          name="isActive"
          value={formData.isActive.toString()}
          onChange={(e) =>
            setFormData({
              ...formData,
              isActive: e.target.value === "true",
            })
          }
          className="w-full border mb-3 rounded p-2"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;

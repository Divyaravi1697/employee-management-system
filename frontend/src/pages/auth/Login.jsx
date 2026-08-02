import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData, {
        withCredentials: true,
      });

      // Save logged-in user details
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert(response.data.message);

      if (response.data.role === "admin") {
          document.body.className = "bg-blue-100";
        navigate("/admin");
      } else {
        document.body.className = "bg-green-100";
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-[400px]"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Employee Management
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border rounded p-3 mb-6"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

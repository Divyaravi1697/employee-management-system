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
        navigate("/admin");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#0b1120_0%,#1e3a8a_50%,#3b82f6_100%)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[380px]"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 bg-linear-to-r from-sky-500 via-blue-800 to-indigo-700 bg-clip-text text-transparent">
          Employee Management
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3 mb-6"
        />

        <button
          type="submit"
          className="w-full rounded-lg py-3 text-white font-semibold bg-linear-to-r from-sky-500 to-blue-700 hover:from-sky-600 hover:to-blue-800 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

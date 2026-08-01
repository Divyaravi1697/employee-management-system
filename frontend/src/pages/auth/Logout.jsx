import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(
          "http://localhost:5000/api/auth/logout",
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

    logout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-xl font-semibold">Logging out...</h2>
    </div>
  );
};

export default Logout;

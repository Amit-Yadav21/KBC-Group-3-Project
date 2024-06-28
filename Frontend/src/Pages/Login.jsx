import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUserRole }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUserRole(userData.role);
      if (userData.role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/UserDashboard");
      }
    }
  }, [navigate, setUserRole]);

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    setErrorMessage(Object.values(errors).join(". "));
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("https://kbc-backend-code.onrender.com/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data.user));
          setUserRole(data.user.role);

          if (data.user.role === "admin") {
            navigate("/AdminDashboard");
          } else {
            navigate("/UserDashboard");
          }
        } else {
          console.error("Login failed");
          toast.error("Login failed. Please try again.");
          setErrorMessage("Login failed. Please try again.");
        }

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center p-6 bg-slate-300 min-h-screen">
      <ToastContainer />
      <div className="container max-w-md mx-auto p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1">{errors.email}</div>
            )}
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
            />
            <span
              onClick={toggleShowPassword}
              className="absolute right-3 top-3 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg cursor-pointer hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition duration-300"
          >
            Login
          </button>
          <p className="mt-4 text-center">
            Create an account{" "}
            <Link
              to="/signup"
              className="text-blue-700 underline font-semibold"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

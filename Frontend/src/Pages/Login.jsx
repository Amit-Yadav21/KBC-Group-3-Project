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
          setErrorMessage("Login failed. Please try again.");
        }

        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Check Email and Passqord...?");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen"
      style={{
        backgroundImage: "url('https://wallpaperset.com/w/full/5/5/9/521100.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <ToastContainer />
      <div className="container max-w-md mx-auto p-8 shadow-lg rounded-lg" style={{
        backgroundImage: "url('https://navbharattimes.indiatimes.com/thumb/69355236/kbc-69355236.jpg?imgsize=428966&width=1200&height=900&resizemode=75')",
        backgroundSize:"cover",
        // backgroundPosition: "center"
      }}>
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
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
              className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"
            />
            {errors.email && (
              <div className="text-white text-xl mt-1">{errors.email}</div>
            )}
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg bg-transparent text-white"
            />
            <span
              onClick={toggleShowPassword}
              className="absolute right-3 cursor-pointer text-white bg-gray-500 hover:bg-black p-2 rounded-s-full"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <div className="text-white text-xl mt-1">{errors.password}</div>
            )}

          </div>
          {errorMessage && (
            <div className="mb-4 text-white text-xl text-center">{errorMessage}</div>
          )}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white text-2xl py-2 rounded-lg cursor-pointer focus:ring-4 focus:ring-white transition duration-300"
          >
            Login
          </button>
          <p className="mt-1 text-1xl text-center text-white">
            Create an account{" "}
            <Link
              to="/signup"
              className="text-white text-xl underline font-semibold"
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

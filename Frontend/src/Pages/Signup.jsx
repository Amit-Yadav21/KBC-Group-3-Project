import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile_number: "",
    terms: false,
    role: "user",
    adminToken: ""
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    if (!formData.mobile_number.trim()) {
      errors.mobile_number = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile_number)) {
      errors.mobile_number = "Invalid mobile number format (should be 10 digits)";
    }
    if (!formData.role) {
      errors.role = "Role is required";
    }
    if (formData.role === 'admin' && !formData.adminToken) {
      errors.adminToken = "Admin token is required";
    }
    if (!formData.terms) {
      errors.terms = "Please agree to the terms and conditions";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : type === "tel" ? value.replace(/\D/, '') : value;
    setFormData({ ...formData, [name]: inputValue });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("https://kbc-backend-code.onrender.com/post", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          mobile_number: formData.mobile_number,
          role: formData.role,
          adminToken: formData.role === 'admin' ? formData.adminToken : undefined
        });

        console.log("Signup Successful:", response.data);
        toast.success("Signup successful!");

        navigate("/login");
        setFormData({
          name: "",
          email: "",
          password: "",
          mobile_number: "",
          terms: false,
          role: "user",
          adminToken: ""
        });
      } catch (error) {
        console.error("Signup Error:", error);
        toast.error("Signup failed. Please try again.");
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-screen" style={{
      backgroundImage: "url('https://wallpaperset.com/w/full/5/5/9/521100.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="container max-w-md mx-auto p-8 shadow-lg rounded-lg" style={{
        backgroundImage: "url('https://navbharattimes.indiatimes.com/thumb/69355236/kbc-69355236.jpg?imgsize=428966&width=1200&height=900&resizemode=75')",
        backgroundSize: "cover",
        // backgroundPosition: "center",
      }}>
        <h1 className="text-4xl font-bold text-center mb-6 text-white">
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              autoComplete="off"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
            />
            {errors.name && (
              <div className="text-white text-xl mt-1">{errors.name}</div>
            )}
          </div>
          <div className="mb-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
            />
            {errors.email && (
              <div className="text-white text-xl mt-1">{errors.email}</div>
            )}
          </div>
          <div className="mb-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
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
          <div className="mb-2">
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleInputChange}
              placeholder="Mobile Number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
            />
            {errors.mobile_number && (
              <div className="text-white text-xl mt-1">
                {errors.mobile_number}
              </div>
            )}
          </div>
          <div className="mb-2">
            <label className="block text-white text-xl font-bold mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && (
              <div className="text-white text-xl mt-1">{errors.role}</div>
            )}
          </div>
          {formData.role === 'admin' && (
            <div className="mb-2">
              <input
                type={showPassword ? "text" : "password"}
                name="adminToken"
                value={formData.adminToken}
                onChange={handleInputChange}
                placeholder="Admin Token"
                autoComplete="off"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 bg-transparent text-white"
              />
              {errors.adminToken && (
                <div className="text-white text-xl mt-1">{errors.adminToken}</div>
              )}
            </div>
          )}
          <div className="mb-2 flex items-center">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleInputChange}
              id="terms"
              className="mr-2"
            />
            <label htmlFor="terms" className="text-white">
              I agree to the terms and conditions
            </label>
            {errors.terms && (
              <div className="text-white text-xl mt-1">{errors.terms}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white text-2xl py-2 rounded-lg cursor-pointer focus:ring-4 focus:ring-white transition duration-300"
          >
            Signup
          </button>
          <p className="mt-1 text-center text-white text-1xl">
            Already have an account?{" "}
            <Link to="/login" className="text-white text-xl underline font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

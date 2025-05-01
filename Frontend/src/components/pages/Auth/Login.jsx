import React, { useState, memo } from "react";
import Input from "../../common/Input";
import { IoMdPerson } from "react-icons/io";
import { RiAdminFill, RiParentFill } from "react-icons/ri";
import Logo from "../../../assets/logo.png";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ParentDashboard from "../Parent/Dashboard";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(""); // Initially no role
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    role: "", // Add role to login info
  });
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setLoginInfo((prev) => ({ ...prev, role: selectedRole })); // Update role in login info
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRoleDashboardPath = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "/admin/dashboard";
      case "teacher":
        return "/teacher/dashboard";
      case "parent":
        return "/Parent/Dashboard";
      default:
        return "/login";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, role } = loginInfo;

    if (!email || !password || !role) {
      return handleError("All fields are required");
    }

    setIsLoading(true);

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (response.ok && result.success) {
        handleSuccess("Login successful! Redirecting to dashboard...");
        localStorage.setItem("token", result.token);
        localStorage.setItem("userRole", result.user.role);
        localStorage.setItem("userEmail", result.user.email);
        localStorage.setItem("userName", result.user.name);

        // Redirect based on role
        setTimeout(() => {
          navigate(getRoleDashboardPath(result.user.role));
        }, 1500);
      } else {
        handleError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      handleError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 transition-colors duration-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="Logo" className="h-24 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Login to SSM</h1>
        </div>

        {/* Role Selector */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {role ? "Selected Role:" : "Please Select Your Role:"}
          </label>
          <div className="flex justify-around mb-6">
            <span
              onClick={() => handleRoleSelect("Teacher")}
              className={`flex flex-col items-center cursor-pointer transition ${
                role === "Teacher"
                  ? "text-blue-600 font-bold scale-110"
                  : "text-gray-700 hover:text-black hover:scale-105"
              }`}
            >
              <IoMdPerson size={28} />
              <span className="text-sm mt-1">Teacher</span>
            </span>

            <span
              onClick={() => handleRoleSelect("Parent")}
              className={`flex flex-col items-center cursor-pointer transition ${
                role === "Parent"
                  ? "text-blue-600 font-bold scale-110"
                  : "text-gray-700 hover:text-black hover:scale-105"
              }`}
            >
              <RiParentFill size={28} />
              <span className="text-sm mt-1">Parent</span>
            </span>

            <span
              onClick={() => handleRoleSelect("Admin")}
              className={`flex flex-col items-center cursor-pointer transition ${
                role === "Admin"
                  ? "text-blue-600 font-bold scale-110"
                  : "text-gray-700 hover:text-black hover:scale-105"
              }`}
            >
              <RiAdminFill size={28} />
              <span className="text-sm mt-1">Admin</span>
            </span>
          </div>
        </div>

        {/* Form - Show only after role is selected */}
        {role && (
          <form onSubmit={handleLogin} className="flex flex-col w-full gap-4">
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={loginInfo.email}
              required
            />
            <Input
              name="password"
              type="password"
              minLength="6"
              placeholder="Password"
              onChange={handleChange}
              value={loginInfo.password}
              required
            />

            {/* Submit Button */}
            <div className="mt-6 bg-blue-500 hover:bg-blue-600 rounded-2xl flex justify-center text-white transition-colors duration-300">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-lg md:text-xl py-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                {isLoading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>

            {/* Link to Register */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default memo(Login);

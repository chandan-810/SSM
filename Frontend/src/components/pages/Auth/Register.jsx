import React, { useState, memo } from "react";
import Input from "../../common/Input";
import { IoMdPerson } from "react-icons/io";
import { RiAdminFill, RiParentFill } from "react-icons/ri";
import Logo from "../../../assets/logo.png";
import { handleError, handleSuccess } from "../../utils/utils";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [role, setRole] = useState(""); // Initially no role
  const [isLoading, setIsLoading] = useState(false);
  const [SignupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Changed back to role
  });
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setSignupInfo((prev) => ({ ...prev, role: selectedRole })); // Keep original case
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({
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
        return "/parent/dashboard";
      default:
        return "/login";
    }
  };

  const hendleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = SignupInfo;

    // Validation
    if (!name || !email || !password || !role) {
      return handleError("All fields are required");
    }

    if (password.length < 6) {
      return handleError("Password must be at least 6 characters long");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return handleError("Please enter a valid email address");
    }

    setIsLoading(true);

    try {
      const requestBody = {
        name,
        email,
        password,
        role, // Send role with original case
      };

      console.log("Attempting signup with body:", requestBody);

      const url = "https://test-repo-ten-lilac.vercel.app/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();
      console.log("Full API Response:", result);

      if (response.ok) {
        handleSuccess("Registration successful! Redirecting to dashboard...");
        // Store role in localStorage with original case
        localStorage.setItem("userRole", role);
        localStorage.setItem("userEmail", email);

        setTimeout(() => {
          navigate(getRoleDashboardPath(role));
        }, 1500);
      } else {
        console.error("Error details:", result);
        if (result.error?.details) {
          console.log("API validation schema:", result.error.details);
          const errorMessages = result.error.details
            .map((detail) => detail.message)
            .join(", ");
          handleError(errorMessages || result.message);
        } else {
          handleError(result.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error("Full error:", err);
      handleError("An error occurred during registration. Please try again.");
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
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
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
          <form onSubmit={hendleSignup} className="flex flex-col w-full gap-4">
            <Input
              name="name"
              type="text"
              minLength="3"
              placeholder="Full Name"
              onChange={handleChange}
              value={SignupInfo.name}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={SignupInfo.email}
              required
            />
            <Input
              name="password"
              type="password"
              minLength="6"
              placeholder="Password"
              onChange={handleChange}
              value={SignupInfo.password}
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
                {isLoading ? "REGISTERING..." : "REGISTER"}
              </button>
            </div>

            {/* Link to Login */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default memo(Register);

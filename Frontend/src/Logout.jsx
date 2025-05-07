import React from "react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "./components/utils/utils";
import { IoLogOut } from "react-icons/io5";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center max-w-40 px-2 sm:px-4 py-2 text-lg font-figtree text-gray-300 hover:bg-red-600 bg-red-500 hover:text-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 gap-2 "
    >
      <IoLogOut className="text-xl" />
      <span className="hidden md:inline-block">Logout</span>
    </button>
  );
};

export default memo(Logout);

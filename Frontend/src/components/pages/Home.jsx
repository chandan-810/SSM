import React from "react";
import { memo } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils/utils";
import { ToastContainer } from "react-toastify";
import { CgProfile } from "react-icons/cg";

const Home = () => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  return (
    <>
      <div className="bg-blue-100 flex ">
        <div
          onClick={Logout}
          className="flex justify-center items-center mt-2 ml-2 text-xl hover:text-blue-500 cursor-pointer gap-2"
        >
          <CgProfile />
          Logout
        </div>
      </div>
      <div className="flex flex-col bg-blue-100 items-center justify-center min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
        <div className=" shadow-md outline-black bg-white outline-2 rounded-lg px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome!</h1>
          <p className="text-gray-700dark:text-gray-300 mb-4">
            This page is currently under development.
          </p>
          <p className="text-gray-700  mb-2">Check out these routes:</p>
          <nav className="flex space-x-4">
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 hover:bg-green-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </Link>
            <Link
              to="/sidebar"
              className="bg-indigo-500 hover:bg-indigo-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sidebar
            </Link>
          </nav>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default memo(Home);

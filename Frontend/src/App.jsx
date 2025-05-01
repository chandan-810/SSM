import React, { useState } from "react";
import Home from "./components/pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import RefreshHandler from "./components/common/RefreshHandler";
import AdminDashboard from "../src/components/pages/Admin/Dashboard";
import TeacherDashboard from "../src/components/pages/Teacher/Dashboard";
import ParentDashboard from "../src/components/pages/Parent/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="font-figtree min-w-screen bg-blue-100 min-h-screen flex flex-col transition-colors duration-300">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/Teacher/Dashboard" element={<TeacherDashboard />}></Route>
        <Route path="/Admin/Dashboard" element={<AdminDashboard />}></Route>
        <Route path="/Parent/Dashboard" element={<ParentDashboard />}></Route>
        <Route index element={<PrivateRoute element={<Home />} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/sidebar" element={<Sidebar />}></Route>
      </Routes>
    </div>
  );
}

export default App;

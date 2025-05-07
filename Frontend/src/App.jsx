import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import RefreshHandler from "./components/common/RefreshHandler";
import NotFound from "./components/common/NotFound";
import { TeacherProvider } from "./components/context/TeacherContext";
import Teacher from "./components/pages/Teacher/Teacher";
import Parent from "./components/pages/Parent/Parent";
import Admin from "./components/pages/Admin/Admin";
import Home from "./components/pages/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const role = localStorage.getItem("role");

  // PrivateRoute component to protect routes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  // DefaultRoute to handle redirects based on role
  const DefaultRoute = () => {
    if (isAuthenticated) {
      if (role === "Teacher") {
        return <Navigate to="/teacher/dashboard" />;
      } else if (role === "Parent") {
        return <Navigate to="/parent/dashboard" />;
      } else if (role === "Admin") {
        return <Navigate to="/admin/dashboard" />;
      }
    }
    return <Navigate to="/login" />;
  };

  return (
    <div className="font-figtree min-w-screen bg-blue-50 min-h-screen flex flex-col transition-colors duration-300">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Index route redirects based on role */}
        <Route index element={<DefaultRoute />} />

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/teacher/:route"
          element={
            <PrivateRoute>
              <TeacherProvider>
                <Teacher />
              </TeacherProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/:route"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/parent/:route"
          element={
            <PrivateRoute>
              <Parent />
            </PrivateRoute>
          }
        />

        {/* Sidebar (optional, consider if it needs protection) */}
        <Route path="/sidebar" element={<Sidebar />} />

        {/* Catch-all for 404 */}
        <Route path="*" element={<NotFound redirectTo="/" />} />
      </Routes>
    </div>
  );
}

export default App;

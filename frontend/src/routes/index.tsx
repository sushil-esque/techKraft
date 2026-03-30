import React from "react";
import { Routes, Route, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "@/components/PublicRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <div className="p-20 text-center font-bold text-2xl">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

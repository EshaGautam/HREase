import React from "react";
import {Routes, Route } from "react-router-dom";
import { LoginPage } from "../page";
// import { ProtectedRoute, RoleProtectedRoute } from "./ProtectedRoutes";

const Navigation: React.FC = () => {
  return (

      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>

  );
};

export default Navigation;

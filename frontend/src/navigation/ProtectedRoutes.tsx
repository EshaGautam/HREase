import React from "react";
import type { ReactNode, JSX } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { loginSliceValue } from "../redux/reducers/loginsSlice";

interface ProtectedRouteProps {
  // children: JSX.Element;
    children: React.ReactElement
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userDetails } = useSelector(loginSliceValue);
  const token = userDetails?.data?.token;

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

interface RoleProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { userDetails } = useSelector(loginSliceValue);
  const token = userDetails?.data?.token;
  const role = userDetails?.data?.user?.role;

  if (!token || !role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

import type React from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/authApi";

type UserRole = "user" | "admin" | "test-admin";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role: UserRole[];
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { data: authUser, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && !role.includes(authUser?.role as UserRole)) {
    const message = encodeURIComponent(
      "You are not authorized to view this kitchen!",
    );
    return <Navigate to={`/error?status=403&message=${message}`} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

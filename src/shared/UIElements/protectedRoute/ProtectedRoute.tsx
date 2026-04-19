import type React from "react";
import { Navigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../services/authApi";

type UserRole = "user" | "admin" | "test-admin";

type ProtectedRouteProps = {
  children: React.ReactNode;
  role: UserRole[];
};

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { data: authUser, isLoading, isFetching } = useGetCurrentUserQuery();

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

  const hasAccess = role.includes(authUser.role as UserRole);

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import React, { useEffect, useState, useRef } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { JWTContextType } from "../@types/authenticate";
// hooks
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const [auth, error] = useAuth();

  if (auth) {
    if (auth.isAuthenticated) {
      return <Navigate to="/app" />;
    }
  }

  return <>{children}</>;
}

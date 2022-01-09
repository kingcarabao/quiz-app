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
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  const blockAccess = () => {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    navigate("/login");
  };

  if (auth) {
    if (!auth.isAuthenticated) {
      blockAccess();
    }
  } else {
    blockAccess();
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}

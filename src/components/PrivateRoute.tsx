import { useEffect } from "react";
import { Redirect } from "react-router";
import { useAuth } from "../providers/AuthProvider";

export const PrivateRoute = ({ children }: any) => {
  const { getAccessToken, isAuthenticated } = useAuth();

  // Calling `getAccessToken()` will check if the session is valid,
  // and update `isAuthenticated` accordingly.
  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  if (!isAuthenticated) return <Redirect to="/login" />;
  return children;
};

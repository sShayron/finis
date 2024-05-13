import { PropsWithChildren } from "react";
import { Redirect } from "react-router";
import { useAuth } from "@providers";

export const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Redirect to="/login" />;
  return children;
};

import { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate } from "react-router-dom";

interface IRequireAuth {
  children: JSX.Element;
}

const RequireAuth = ({ children }: IRequireAuth) => {
  const { user } = useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default RequireAuth;

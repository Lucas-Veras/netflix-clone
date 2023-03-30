import React, { useContext } from "react";
import { AuthContext } from "./authContext";
import { Navigate } from "react-router-dom"

const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) return <Navigate to="/login" replace />;
    return children;
};

export default RequireAuth;
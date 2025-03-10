import React from "react";
import {useAuth} from "./AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectTo } : {redirectTo: string}) => {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export default ProtectedRoute;``
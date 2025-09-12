import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
import { ring2 } from 'ldrs'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, token, loading, role } = useAuth();
    ring2.register()


    if (loading) return (
        <div className="carregamento">
            <l-ring-2
                size="80"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8"
                color="#C47D69"
            ></l-ring-2>
        </div>
    )

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />
    }

    const isAuthorized = allowedRoles ? allowedRoles.includes(role) : true;

     if (!isAuthorized) {
        return <Navigate to="/home" replace />;
    }


    return children;
}

export default ProtectedRoutes;
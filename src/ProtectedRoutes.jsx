import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
import { ring2 } from 'ldrs'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, token, loading } = useAuth();
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
    
    // ---- ADICIONE ESTE BLOCO DE DEBUG AQUI fds ----
    console.log("--- DEBUG DE AUTORIZAÇÃO ---");
    console.log("1. Roles permitidas (allowedRoles):", allowedRoles);
    console.log("2. Role do usuário (user?.role):", user?.role);
    console.log("3. Objeto 'user' completo:", user); // Muito importante para ver a estrutura dos dados cu
    // -----------------------------------------


    const isAuthorized = allowedRoles ? allowedRoles.includes(user?.role) : true;

    console.log("4. Resultado (isAuthorized):", isAuthorized);
    console.log("------------------------------");

    if (!isAuthorized) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoutes;
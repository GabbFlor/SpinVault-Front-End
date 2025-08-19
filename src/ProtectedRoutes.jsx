import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
import { ring2 } from 'ldrs'

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, token } = useAuth();
    const [carregando, setCarregando] = useState(true);
    ring2.register()

    useEffect(() => {
        // Verificar se o token ainda é válido, se não, usar a função logout para tirar o login do usuário

        setCarregando(false);
    }, []);

    if (carregando) return (
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

    
    const isAuthorized = allowedRoles ? allowedRoles.includes(user?.role) : true;

    if (!isAuthorized) {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoutes;
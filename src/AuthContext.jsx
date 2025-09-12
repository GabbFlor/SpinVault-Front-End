import axios from "axios";
import { apiUrl } from "./API";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [role, setRole] = useState("")

    const [loading, setLoading] = useState(true);


    // essa função recebe o token e armazena ele em cache
    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
        setRole("");
    }

    useEffect(() => {
        const recuperarRole = (token) => {
            axios.get(`${apiUrl}/auth/pegarRole`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                let role = response.data.role;
                setRole(role)
            })
            .catch((error) => {
                console.error(`Erro ao recuperar a sua role. ${error}`);
                setRole("");
                logout();
            })
            .finally(() =>{
                setLoading(false);
            });
        }

        if (token) {
            recuperarRole(token);
        }else {
            setLoading (false);
        }
    }, [token])

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, role, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
import axios from "axios";
import { apiUrl } from "./API";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [role, setRole] = useState("")

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
    }

    useEffect(() => {
        const recuperarRole = async() => {
            try {
                let response = axios.get(`${apiUrl}/auth/pegarRole`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.status === 200) {
                    let role = response.data.role;

                    console.warn(response.data);

                    setRole(role)
                }
            } catch (error) {
                console.error("Erro ao recuperar a sua role.");

                setRole("");
            }
        }

        if (isAuthenticated = true) {
            recuperarRole();

            console.log(role);
        }
    }, [])

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, role}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
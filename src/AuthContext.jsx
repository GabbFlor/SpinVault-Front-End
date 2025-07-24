import axios from "axios";
import { apiUrl } from "./API";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [role, setRole] = useState("")

    // essa função recebe o token e armazena ele em cache
    const recuperarRole = async (token) => {
        try {
            let response = axios.get(`${apiUrl}/auth/pegarRole`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                let role = response.data.role;

                setRole(role)
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "info",
                    title: "Mensagem",
                    text: `Sua sessão expirou, faça login novamente para continuar a usar os nossos serviços.`,
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonText: "Login"
                }).then((result) => {
                    console.warn("vc e um fudido q foi tirado do nosso sistemas");
                    
                })
            }

            setRole("")
        }
    }

    const login = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setIsAuthenticated(true);

        recuperarRole(newToken)
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setIsAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout, role}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
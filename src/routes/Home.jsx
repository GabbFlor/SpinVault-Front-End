import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Grid_home from "../components/Grid_home";
import Header from "../components/Header";
import Home_Style from "../styles/Home_style";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { apiUrl } from "../API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { token, isAuthenticated, logout } = useAuth();
    const queryClient = useQueryClient(); 
    const navigate = useNavigate();

    const catchUserProfile = async () => {
        try {
            let response = await axios.get(`${apiUrl}/auth/info`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                let perfil = response.data;

                return perfil;
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
                    logout(token);
                
                    navigate(`/auth/login`);
                })
            } 

            console.error(`Erro ao buscar peril do usuário: ${error.message}`)
            throw error;
        }
    };

    const { data: userProfile, isLoading, error } = useQuery({
        queryKey: ['userProfile', token],

        queryFn: () => catchUserProfile(),

        retry: false,

        staleTime: 1000 * 60 * 5,
    });

    if (error) {
        // console.error(`Erro ao buscar perfil do usuário: ${error.message}`)
    }
    
    useEffect(() => {
        if (userProfile) {
            if (userProfile.role == "DESATIVADO") {
                Swal.fire({
                    icon: "warning",
                    title: "Aviso",
                    text: "Sua conta atualmente ainda não foi ativada, para usar todas as funcionalidades, primeiro assine um de nossos planos.",
                    showConfirmButton: true,
                    confirmButtonText: "Planos",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar"
                })
                .then(result => {
                    if (result.isConfirmed) {
                        navigate("/planos");
                    }
                })
            }
        }
    }, [userProfile])

    return (
        <div className="Pag-Home">
            <Home_Style />

            <Header />
            
            <main>
                <h1>Controle de discos de vinil</h1>

                <Grid_home />
            </main>

            <Footer />
        </div>
    )
}

export default Home;
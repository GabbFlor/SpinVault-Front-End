import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Grid_home from "../components/Grid_home";
import Header from "../components/Header";
import Home_Style from "../styles/Home_style";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { apiUrl } from "../API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsTerra_style from "../styles/AdsTerra_style";
import { useMediaQuery } from "react-responsive";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";
import AdsterraBanner from "../components/AdsterraBanner";

const Home = () => {
    const { token, isAuthenticated, logout, role } = useAuth();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

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

    useEffect(() => {
        const verificarSeTemPlanoPendente = async () => {
            try {
                let response = await axios.get(`${apiUrl}/payment/verificarPagamentoPendente`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    Swal.fire({
                        icon: "warning",
                        title: "Aviso",
                        text: "Verificamos que você possui um pagamento pendente referente a algum plano de assinatura, após você receber o email de confirmação, liberaremos o acesso aos nossos serviços.",
                        showConfirmButton: true,
                        confirmButtonText: "Ok",
                        showCancelButton: false,
                    })
                } else if (response.status === 204) {
                    // console.log("nao possui plano pendente")
                }
            } catch (error) {
                console.error(`Erro ao buscar peril do usuário: ${error.message}`)
                throw error;
            }
        }

        verificarSeTemPlanoPendente();
    }, [])

    if (isNormalScreen) {
        return (
            <div className="Pag-Home">
                <Home_Style />
                <AdsTerra_style />

                <Header />
                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <h1>Controle de discos de vinil</h1>
                        <Grid_home />
                    </main>
                    
                </div>

                <Footer />
            </div>
        )
    }else {
        return (
            <div className="Pag-Home">
                <Home_Style />
                <AdsTerra_style />

                <Header />
                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <h1>Controle de discos de vinil</h1>
                        <Grid_home />
                    </main>
                    
                </div>

                <Footer />
            </div>
        )
    }
}

export default Home;
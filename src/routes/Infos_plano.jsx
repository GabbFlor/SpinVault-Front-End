import Footer from "../components/Footer";
import Header from "../components/Header";
import Perfil_style from "../styles/Perfil_style";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tailChase } from 'ldrs';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { apiUrl } from '../API';

const Infos_plano = () => {
    const [ carregando, setCarregando ] = useState(false);
    const queryClient = useQueryClient();
    tailChase.register()
    const { logout, token } = useAuth();
    const [ status, setStatus ] = useState("Carregando...");
    const [ dataCriacao, setDataCriacao ] = useState("Carregando...");
    const [ nextPaymentDate, setNextPaymentDate ] = useState("Carregando...");
    const navigate = useNavigate();

    // função para pegar o perfil do usuario logado
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
            // quando o token de acesso do usuário expira
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
            } else if (error.response && error.response.status === 403) {
                navigate("/not-found")
            } else {
                console.error(`Erro ao buscar peril do usuário: ${error.response.status}`)
                throw error;
            }
        }
    };

    const { data: userProfile, isLoading, error } = useQuery({
        queryKey: ['userProfile', token],

        queryFn: () => catchUserProfile(),

        retry: false,

        staleTime: 1000 * 60 * 5
    });

    // pegar infos do plano
    const catchUserPlan = async () => {
        try {
            let response = await axios.get(`${apiUrl}/payment/obterInformacoesPlano`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                let plano = response.data;

                return plano;
            }
        } catch (error) {
            // quando o token de acesso do usuário expira
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
            } else if (error.response && error.response.status === 403) {
                navigate("/not-found")
            } else {
                console.error(`Erro ao buscar peril do usuário: ${error.message}`)
                throw error;
            }
        }
    };

    const { data: userPlan, isLoadingPlan, errorPlan } = useQuery({
        queryKey: ['userPlan', token],

        queryFn: () => catchUserPlan(),

        retry: false,

        staleTime: 1000 * 60 * 5
    });

    useEffect(() => {
        if (userPlan) {
            if (userPlan.status == "authorized") {
                setStatus("Ativo");
            } else if (userPlan.status == "cancelled") {
                setStatus("Cancelado");
            } else {
                setStatus("Carregando...");
            }
            

            setDataCriacao(new Date(userPlan.data_criacao).toLocaleDateString('pt-BR'));
            setNextPaymentDate(new Date(userPlan.next_payment_date).toLocaleDateString('pt-BR'));
        }
    }, [userPlan])

    if (isLoading || isLoadingPlan) return (
        <div className="carregamento-perfil-page">
            <l-tail-chase
                size="80"
                speed="1.75" 
                color="#fff"  
            ></l-tail-chase>
        </div>
    );

    if (error || errorPlan) return (
        <div style={{ textAlign: "center" }}>
            <h1>Ocorreu um erro desconhecido</h1>
            <Link to={'/home'} style={{ textDecoration: "underline" }}>Clique aqui para voltar para a página inicial</Link>
        </div>
    );

    const handleCancelPlan = async () => {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Ao cancelar o seu plano o pagamento recorrente será interrompido, porém você ainda terá acesso a todos os nossos serviços até a data do próximo pagamento, após isso, sua conta perderá os benefícios e não poderá mais utilizar os nossos serviços.",
            confirmButtonText: "Cancelar plano",
            icon: "warning",
            denyButtonText: `Não`,
            showDenyButton: true,
        }).then(async (result) => { // Transformamos essa função em async
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${apiUrl}/payment/cancelar`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    })

                    Swal.fire({
                        title: "Plano cancelado com sucesso! Acesse o seu email para mais informações.",
                        icon: "success"
                    }).then (() => { 
                        queryClient.clear();
    
                        navigate(`/home`)
                    })
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
                    } else {
                        console.error(error);
                        Swal.fire("Erro ao deletar", "Tente novamente mais tarde.", "error");
                    }
                }
            } else if (result.isDenied) {
                // console.log(`Ação "deletar disco" cancelada.`)
            }
        });
    }

    if (userPlan && userProfile) return (
        <div className="Pag-info-planos Pag-perfil">
            <Perfil_style />

            <Header />

            <main>
                <section className='perfil-infos'>
                    <div className="img-temporario">
                        .
                    </div>
                    {/* IMAGEM DO PERFIL */}

                    <div className='infos-up'>
                        <h1>{userProfile.user_name}</h1>
                        <p className='destaque'>{userProfile.cidade}. {userProfile.estado}</p>
                    </div>
                </section>

                <section className='perfil-info-planos'>
                    <h1>Informações do plano</h1>

                    <form className="form-edit-perfil">
                        <div>
                            <label htmlFor="statusPlan">Status do plano</label>
                            <input 
                                type="text" 
                                placeholder={"Carregando..."} 
                                value={status}
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="criacaoPlan">Data de criação</label>
                            <input 
                                type="text" 
                                placeholder={"Carregando..."} 
                                value={dataCriacao}
                                disabled
                            />
                        </div>

                        <div>
                            <label htmlFor="nextPaymentDatePlan">
                                {status == "Ativo" ? (
                                    "Próximo pagamento em"
                                ) : (
                                    "Plano válido até"
                                )}
                                
                            </label>
                            <input 
                                type="text" 
                                placeholder={"Carregando..."} 
                                value={nextPaymentDate}
                                disabled
                            />
                        </div>

                        <div className="div-btns-form-edit btn-info-plano">
                            {status == "Ativo" ? (
                                <button type='button' onClick={() => handleCancelPlan()}>Cancelar plano</button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </form>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Infos_plano;
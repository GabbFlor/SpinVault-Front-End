import { useQuery, useQueryClient } from '@tanstack/react-query';
import { tailChase } from 'ldrs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card_img from '../assets/card-img.webp'
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { apiUrl } from '../API';

const Perfil_logado = () => {
    const [diferencaData, setDiferencaData] = useState(0);
    const [carregando, setCarregando] = useState(false);
    const [ultimosDiscos, setUltimosDiscos] = useState([]);
    const queryClient = useQueryClient();
    tailChase.register()
    const { logout, token } = useAuth();

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
            } else {
                console.error(`Erro ao buscar peril do usuário: ${error.message}`)
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

    const contadorDeDiscos = async () => {
        try {
            let response = await axios.get(`${apiUrl}/discos/contar`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                let qtdDiscos = response.data.qtdDiscos;

                return qtdDiscos;
            }
        } catch (error) {
            if (error.response.status === 403) {
                return 0;
            }

            console.error(`Erro ao contar discos do usuário: ${error.message}`)
            throw error;
        }
    }

    // adiciona a quantidade de discos ao cache
    const { data: countDisks, isLoadingDisks, errorDisks } = useQuery({
        // TROCAR OS VALORES "10" PELO ID DO USUÁRIO NO BANCO DE DADOS
        queryKey: ['countDisks', token],

        queryFn: () => contadorDeDiscos(),

        staleTime: 1000 * 60 * 5,
    });

    const pegarUltimosDiscos = async () => {
        try {
            setCarregando(true)

            let response = await axios.get(`${apiUrl}/discos/pegarTresRecentes`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                let discos = response.data;

                return setUltimosDiscos(discos);
            }
        } catch (error) {
            if (error.response.status === 403) {
                let discos = []

                return discos;
            }

            console.log(error)
            throw error;
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        const calcularDiferenca = () => {
            if (!userProfile) return null;

            // calculando tempo de criacao da conta em dias
            const data = new Date(userProfile.criado_em);
            const agora = new Date();

            const diferencaEmMs = agora - data;
            const diferencaEmDias = Math.floor(diferencaEmMs / (1000 * 60 * 60 * 24));

            if (diferencaEmDias < 0) {
                setDiferencaData(0);
            } else {
                setDiferencaData(diferencaEmDias);
            }
        };

        calcularDiferenca();

        pegarUltimosDiscos();
    }, [userProfile]);

    if (isLoading) return (
        <div className="carregamento-perfil-page">
            <l-tail-chase
                size="80"
                speed="1.75"
                color="#fff"
            ></l-tail-chase>
        </div>
    );

    if (error) return (
        <div style={{ textAlign: "center" }}>
            <h1>Ocorreu um erro desconhecido</h1>
            <Link to={'/home'} style={{ textDecoration: "underline" }}>Clique aqui para voltar para a página inicial</Link>
        </div>
    );

    const handleLogout = () => {
        Swal.fire({
            icon: "question",
            title: "Confirmação",
            text: "Você tem certeza que deseja sair da sua conta?",
            showConfirmButton: true,
            showCancelButton: true,
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    // Remove qualquer cache relacionado a discos que tiver no navegador do usuário
                    queryClient.clear();

                    logout();
                }
            })
    }

    return (
        <section className='section-perfil'>
            <div>
                {userProfile.role == "BANIDO" ?
                    (<div className='alert-perfil'>
                        <h2>
                            A sua conta foi suspensa por causa de violações, contate a equipe de desenvolvimento para mais informações
                        </h2>
                    </div>)
                    : userProfile.role == "USER_FREE" ? (<div className='alert-perfil alert-perfil-free'>
                        <h2>
                            A sua conta atualmente está com o plano gratuito (com limitações).<br />
                            Assine um de nossos <Link to={`/planos`}>planos</Link> para liberar todas as funcionalidades.
                        </h2>
                    </div>
                    ) :
                        (<div></div>)
                }
            </div>

            <section className='perfil-infos'>
                <div className="img-temporario">
                    .
                </div>
                {/* IMAGEM DO PERFIL. */}

                <div className='infos-up'>
                    <h1>{userProfile.user_name}</h1>
                    <p className='destaque'>{userProfile.cidade}. {userProfile.estado}</p>

                    <div className='div-infos-btns'>
                        <button onClick={() => handleLogout()} className='btn-logout'>Logout</button>
                        <Link to={'/perfil/editar'} className='btn-logout'>Editar</Link>

                        {userProfile.role == "BANIDO" || userProfile.role == "USER_FREE" ?
                            (<div></div>)
                            :
                            (<Link to={"/perfil/plano"} className='btn-logout'>Plano</Link>)
                        }
                        <Link></Link>
                    </div>
                </div>

                <div className='sub-perfil-info'>
                    <div>
                        <p>Tempo de conta</p>

                        <p><span>{diferencaData}</span> {diferencaData > 1 ? ("dias") : ("dia")}</p>
                    </div>

                    <div>
                        <p>Adicionados</p>

                        <span>{isLoadingDisks ? "Carregando..." : countDisks}</span>
                    </div>
                </div>
            </section>

            <section className='perfil-add-disks'>
                <h1>Adicionados</h1>

                <section className="cards-disks">
                    {ultimosDiscos.map((disco) => (
                        <div className="card" key={disco.id}>
                            <div>
                                <img src={Card_img} alt="Imagem do cartão" />

                                <h1 className='card-title'>{disco.titulo_album}</h1>
                            </div>

                            <Link className='btn-card' to={`/editar-disco/${disco.id}`}>Editar</Link>
                        </div>
                    ))}
                </section>
            </section>
        </section>
    )
}

export default Perfil_logado;
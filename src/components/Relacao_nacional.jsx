import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dotWave } from "ldrs";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Pop_up_disco from "./Pop_up_disco";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrl } from "../API";
import { useAuth } from "../AuthContext";

const Relacao_nacional = () => {
    const [carregando, setCarregando] = useState(false);
    const [sumirBtn, setSumirBtn] = useState(false);
    const queryClient = useQueryClient();
    dotWave.register();
    // coisas do pop-up responsividade
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    const navigate = useNavigate();

    // comunicacao com a API
    const { token, logout } = useAuth();
    
    // responsividade
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    const abrirPopUp = (dado) => {
        setDadosSelecionados(dado);
        setMostrarPopUp(true);
    }

    const pegarDadosIniciaisDiscosNacionais = async () => {
        setCarregando(true);

        try {
            const response = await axios.get(`${apiUrl}/discos/pegarVinteDiscosArtistasNacionais/0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            queryClient.setQueryData(["ultimoDocNacionais"], response.data[response.data.length - 1]);
        
            const discosNacionais = response.data;

            return discosNacionais;
        } catch (error) {
            if (error.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `A sua conta ainda não foi ativada para visualizar os discos nacionais! Assine um de nossos planos e tente novamente.`,
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    showConfirmButton: true,
                    confirmButtonText: "Planos"
                }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/planos`);
                    }
                })
            } else if (error.response && error.response.status === 401) {
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
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `Erro interno no servidor, tente novamente mais tarde ou entre em contato com um administrador.`,
                    showConfirmButton: true,
                })
            }
            
            throw error;
        } finally {
            setCarregando(false)
        }
    };

    const carregarProximaPagina = async () => {
        const ultimoDocCache = queryClient.getQueryData(['ultimoDocNacionais']);
    
        if (!ultimoDocCache) {
            return;
        }
    
        setCarregando(true);
    
        try {
            const response = await axios.get(`${apiUrl}/discos/pegarVinteDiscosArtistasNacionais/${ultimoDocCache.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const discosNacionais = response.data;

            if (discosNacionais.length === 0) {
                alert("Não há mais nenhum conteúdo para ser carregado");
                setSumirBtn(true);
            } else {
                queryClient.setQueryData(['discosNacionais'], (oldDiscos = []) => {
                    return [...oldDiscos, ...discosNacionais];
                })

                queryClient.setQueryData(['ultimoDocNacionais'], response.data[response.data.length - 1]);
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

            console.error("Erro ao carregar dados da próxima página:", error);
        } finally {
            setCarregando(false);
        }
    };

    // executa a query e armazena os discos no cache
    const { data: discosNacionais, isLoading, error } = useQuery({
        queryKey: ['discosNacionais'],
        queryFn: pegarDadosIniciaisDiscosNacionais,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false
    })

    const handleUpdate = () => {
        queryClient.invalidateQueries(['discosNacionais']);
        queryClient.invalidateQueries(['ultimoDocNacionais']);
        setSumirBtn(false)
    }

    if (isLoading) return <div className="carregamento">
                            <l-dot-wave
                                size="60"
                                speed="1" 
                                color="white" 
                            ></l-dot-wave>
                        </div>;

    if (error) {
        if (isNormalScreen) {
            return (
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="14">
                                Artistas Nacionais
                            </th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Tamanho</th>
                            <th>Ano(P)</th>
                            <th>Ano Tiragem (P)</th>
                            <th>Origem Artista</th>
                            <th>Origem Disco</th>
                            <th>Situação Disco</th>
                            <th>Situação Capa</th>
                            <th>Estilo</th>
                            <th>Tipo</th>
                            <th>Encarte</th>
                            <th>Obs.</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="14" style={{ color: "red" }}>
                                {error.status === 403 ? 
                                    ("Você não tem permissão para visualizar os discos nacionais.") 
                                        :
                                    (`Erro interno no servidor: "${error.message}", se preciso, contate algum administrador.`)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        } else {
            return (
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="5">
                                Artistas Nacionais
                            </th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Ano(P)</th>
                            <th>Origem Artista</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5" style={{ color: "red" }}>
                                {error.status === 403 ? 
                                    ("Você não tem permissão para visualizar os discos nacionais.") 
                                        :
                                    (`Erro interno no servidor: "${error.message}", se preciso, contate algum administrador.`)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }
    }

    if (isNormalScreen) {
        return (
            <div className="div-da-table">
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="14">
                                Artistas nacionais
                            </th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Tamanho</th>
                            <th>Ano(P)</th>
                            <th>Ano Tiragem (P)</th>
                            <th>Origem Artista</th>
                            <th>Origem Disco</th>
                            <th>Situação Disco</th>
                            <th>Situação Capa</th>
                            <th>Estilo</th>
                            <th>Tipo</th>
                            <th>Encarte</th>
                            <th>Obs.</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discosNacionais.length > 0 ? (
                                discosNacionais.map((discoFiltrado) => (
                                    <tr key={discoFiltrado.id}>
                                        <td>{discoFiltrado.nome_artista}</td>
                                        <td>{discoFiltrado.titulo_album}</td>
                                        <td>{discoFiltrado.tamanho}</td>
                                        <td>{discoFiltrado.ano}</td>
                                        <td>{discoFiltrado.ano_tiragem}</td>
                                        <td>{discoFiltrado.origem_artista}</td>
                                        <td>{discoFiltrado.origem_disco}</td>
                                        <td>{discoFiltrado.situacao_disco}</td>
                                        <td>{discoFiltrado.situacao_capa}</td>
                                        <td>{discoFiltrado.estilo}</td>
                                        <td>{discoFiltrado.tipo}</td>
                                        <td>{discoFiltrado.encarte == true ? "Sim" : "Não"}</td>
                                        <td>{discoFiltrado.observacoes.length > 10 ? discoFiltrado.observacoes.slice(0, 10) + "..." : discoFiltrado.observacoes}</td>
                                        <td><Link to={`/editar-disco/${discoFiltrado.id}`} className="btn-ver-mais">Editar</Link></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="14">
                                        "Você ainda não adicionou nenhum disco nacional."
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
    
                <div className="div-btns">
                    <button onClick={handleUpdate} className="btn-carregar">Atualizar</button>
    
                    {sumirBtn == false ? (
                        <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
                    ) : ("")}
                </div>
    
                {carregando && (
                    <div className="carregamento">
                        <l-dot-wave
                            size="60"
                            speed="1" 
                            color="white" 
                        ></l-dot-wave>
                    </div>
                )}
            </div>
        )
    } else {
        return (
            <div className="div-da-table">
                {mostrarPopUp && (
                    <Pop_up_disco dados={dadosSelecionados} fechar={() => setMostrarPopUp(false)}/>
                )}

                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="5">Artistas nacionais</th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Ano(P)</th>
                            <th>Origem Artista</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discosNacionais.length > 0 ? (
                                discosNacionais.map((discoFiltrado) => (
                                    <tr key={discoFiltrado.id}>
                                        <td>{discoFiltrado.nome_artista}</td>
                                        <td>{discoFiltrado.titulo_album}</td>
                                        <td>{discoFiltrado.ano}</td>
                                        <td>{discoFiltrado.origem_artista}</td>
                                        <td><button type="button" className="btn-ver-mais" onClick={() => abrirPopUp(discoFiltrado)}>Ver mais</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        "Você ainda não adicionou nenhum disco nacional."
                                    </td>
                                </tr>
                            )
                        }  
                    </tbody>
                </table>
    
                <div className="div-btns">
                    <button onClick={handleUpdate} className="btn-carregar">Atualizar</button>
    
                    {sumirBtn == false ? (
                        <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
                    ) : ("")}
                </div>
    
                {carregando && (
                    <div className="carregamento">
                        <l-dot-wave
                            size="60"
                            speed="1" 
                            color="white" 
                        ></l-dot-wave>
                    </div>
                )}
            </div>
        )
    }
}

export default Relacao_nacional;
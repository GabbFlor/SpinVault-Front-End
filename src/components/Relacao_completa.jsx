import { useEffect, useState } from "react";
import { dotWave } from "ldrs";
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Pop_up_disco from "./Pop_up_disco";
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrl } from "../API";
import { useAuth } from "../AuthContext";

const Relacao_completa = ({ consulta }) => {
    const [carregando, setCarregando] = useState(false);
    const [ sumirBtn, setSumirBtn] = useState(false);
    const queryClient = useQueryClient();
    // coisas do pop-up responsividade
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    const { token, logout } = useAuth();
    dotWave.register();
    const navigate = useNavigate();
    
    const abrirPopUp = (dado) => {
        setDadosSelecionados(dado);
        setMostrarPopUp(true);
    }

    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    const pegarDadosIniciais = async () => {
        setCarregando(true);

        try {
            const response = await axios.get(`${apiUrl}/discos/pegarVinteDiscos/0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            queryClient.setQueryData(['ultimoDoc'], response.data[response.data.length - 1]);
        
            const discos = response.data;

            return discos;
        } catch (error) {
            if (error.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `A sua conta ainda não foi ativada para visualizar os discos! Assine um de nossos planos e tente novamente.`,
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

    // executa a query e armazena os discos no cache
    const { data: discos, isLoading, error } = useQuery({
        queryKey: ['discos'],
        queryFn: pegarDadosIniciais,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false
    })

    const carregarProximaPagina = async () => {
        const ultimoDocCache = queryClient.getQueryData(['ultimoDoc']);
    
        if (!ultimoDocCache) {
            return;
        }
    
        setCarregando(true);
    
        try {
            const response = await axios.get(`${apiUrl}/discos/pegarVinteDiscos/${ultimoDocCache.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const discos = response.data;

            if (discos.length === 0) {
                alert("Não há mais nenhum conteúdo para ser carregado");
                setSumirBtn(true);
            } else {
                queryClient.setQueryData(['discos'], (oldDiscos = []) => {
                    return [...oldDiscos, ...discos];
                })

                queryClient.setQueryData(['ultimoDoc'], response.data[response.data.length - 1]);
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

    const handleUpdate = () => {
        queryClient.invalidateQueries(['discos']);
        queryClient.invalidateQueries(['ultimoDoc']);
        setSumirBtn(false)
    }

    // ADAPTAR ESSES CÓDIGOS PARA A MINHA API (mudando o "nome_artista" para o que estiver retornando)
    useEffect(() => {
        if (consulta === "Nome_artista") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.nome_artista.localeCompare(b.nome_artista);
                });
            });
        }
    
        if (consulta === "Titulo_album") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.titulo_album.localeCompare(b.titulo_album);
                });
            });
        }
    
        if (consulta === "Origem_disco") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return a.origem_disco.localeCompare(b.origem_disco);
                });
            });
        }
    
        if (consulta === "Ano") {
            queryClient.setQueryData(['discos'], (oldData = []) => {
                return [...oldData].sort((a, b) => {
                    return b.ano - a.ano;
                });
            });
        }
    }, [consulta, discos]);    


    if (isLoading) return <p>Carregando...</p>;

    if (error) {
        if (isNormalScreen) {
            return (
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="14">Relação completa de discos 
                                {consulta == "Titulo_album" ? (
                                    " (Titulo)"
                                ) : consulta == "Origem_disco" ? (
                                    " (Origem dos discos)"
                                ) : consulta == "Nome_artista" ? (
                                    " (Artista)"
                                ) : consulta == "Ano" ? (
                                    " (Ano)"
                                ) : ("")}
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
                                    ("Você não tem permissão para visualizar os discos.") 
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
                            <th colSpan="5">Relação completa de discos 
                                {consulta == "Titulo_album" ? (
                                    " (Titulo)"
                                ) : consulta == "Origem_disco" ? (
                                    " (Origem dos discos)"
                                ) : consulta == "Nome_artista" ? (
                                    " (Artista)"
                                ) : consulta == "Ano" ? (
                                    " (Ano)"
                                ) : ("")}
                            </th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Ano(P)</th>
                            <th>Origem Disco</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5" style={{ color: "red" }}>
                                {error.status === 403 ? 
                                    ("Você não tem permissão para visualizar os discos.") 
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

    // is normal é tela de PC e o else é o de cell
    if (isNormalScreen) {
        return (
            <div className="div-da-table">
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="14">Relação completa de discos 
                                {consulta == "Titulo_album" ? (
                                    " (Titulo)"
                                ) : consulta == "Origem_disco" ? (
                                    " (Origem dos discos)"
                                ) : consulta == "Nome_artista" ? (
                                    " (Artista)"
                                ) : consulta == "Ano" ? (
                                    " (Ano)"
                                ) : ("")}
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
                            discos.length > 0 ? (
                                discos.map((disco) => (
                                    <tr key={disco.id}>
                                        <td>{disco.nome_artista}</td>
                                        <td>{disco.titulo_album}</td>
                                        <td>{disco.tamanho}</td>
                                        <td>{disco.ano}</td>
                                        <td>{disco.ano_tiragem}</td>
                                        <td>{disco.origem_artista}</td>
                                        <td>{disco.origem_disco}</td>
                                        <td>{disco.situacao_disco}</td>
                                        <td>{disco.situacao_capa}</td>
                                        <td>{disco.estilo}</td>
                                        <td>{disco.tipo}</td>
                                        <td>{disco.encarte == true ? "Sim" : "Não"}</td>
                                        <td>{disco.observacoes.length > 10 ? disco.observacoes.slice(0, 10) + "..." : disco.observacoes}</td>
                                        <td><Link className="btn-ver-mais" to={`/editar-disco/${disco.id}`}>Editar</Link></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="14">Você ainda não tem nenhum disco adicionado.</td>
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
                            <th colSpan="5">Relação completa de discos 
                                {consulta == "Titulo_album" ? (
                                    " (Titulo)"
                                ) : consulta == "Origem_disco" ? (
                                    " (Origem dos discos)"
                                ) : consulta == "Nome_artista" ? (
                                    " (Artista)"
                                ) : consulta == "Ano" ? (
                                    " (Ano)"
                                ) : ("")}
                            </th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Artista</th>
                            <th>Título</th>
                            <th>Ano(P)</th>
                            <th>Origem Disco</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discos.length > 0 ? (
                                discos.map((disco) => (
                                    <tr key={disco.id}>
                                        <td>{disco.nome_artista}</td>
                                        <td>{disco.titulo_album}</td>
                                        <td>{disco.ano}</td>
                                        <td>{disco.origem_disco}</td>
                                        <td><button type="button" className="btn-ver-mais" onClick={() => abrirPopUp(disco)}>Ver mais</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">Você ainda não tem nenhum disco adicionado.</td>   
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
            </div>
        )
    }
}

export default Relacao_completa;
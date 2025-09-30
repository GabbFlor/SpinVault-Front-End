import { useEffect, useState } from "react";
import { dotWave } from "ldrs";
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Pop_up_migracao from "./Pop_up_migracao"; 
import Swal from "sweetalert2";
import axios from "axios";
import { apiUrl } from "../API"; 
import { useAuth } from "../AuthContext";

const Ver_tabela_excel = () => {
    const [carregando, setCarregando] = useState(false);
    const [sumirBtn, setSumirBtn] = useState(false);
    const queryClient = useQueryClient();
    // Estados para o pop-up responsivo
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    const { token, logout } = useAuth();
    dotWave.register();
    const navigate = useNavigate();

    const abrirPopUp = (dado) => {
        setDadosSelecionados(dado);
        setMostrarPopUp(true);
    }

    const isNormalScreen = useMediaQuery({ minWidth: 800 });

    const pegarDadosIniciais = async () => {
        setCarregando(true);

        try {
            // ATENÇÃO: Altere o endpoint para o correto da sua API de migrações
            const response = await axios.get(`${apiUrl}/migracoes/pegarVinteMigracoes/0`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.length > 0) {
                 queryClient.setQueryData(['ultimoDocMigracao'], response.data[response.data.length - 1]);
            }

            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "info",
                    title: "Sessão Expirada",
                    text: "Sua sessão expirou, faça login novamente para continuar.",
                    confirmButtonText: "Login"
                }).then(() => {
                    logout(token);
                    navigate(`/auth/login`);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro no Servidor",
                    text: "Erro ao buscar os dados. Tente novamente mais tarde.",
                });
            }
            throw error;
        } finally {
            setCarregando(false);
        }
    };

    const { data: migracoes, isLoading, error } = useQuery({
        queryKey: ['migracoes'], // Chave de query alterada para 'migracoes'
        queryFn: pegarDadosIniciais,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: false
    });

    const carregarProximaPagina = async () => {
        const ultimoDocCache = queryClient.getQueryData(['ultimoDocMigracao']);

        if (!ultimoDocCache) {
            return;
        }

        setCarregando(true);

        try {
            // ATENÇÃO: Altere o endpoint para o correto da sua API de migrações
            const response = await axios.get(`${apiUrl}/migracoes/pegarVinteMigracoes/${ultimoDocCache.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const novasMigracoes = response.data;

            if (novasMigracoes.length === 0) {
                Swal.fire("Aviso", "Não há mais registros para carregar.", "info");
                setSumirBtn(true);
            } else {
                queryClient.setQueryData(['migracoes'], (oldMigracoes = []) => {
                    return [...oldMigracoes, ...novasMigracoes];
                });
                queryClient.setQueryData(['ultimoDocMigracao'], novasMigracoes[novasMigracoes.length - 1]);
            }

        } catch (error) {
             if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "info",
                    title: "Sessão Expirada",
                    text: "Sua sessão expirou, faça login novamente para continuar.",
                    confirmButtonText: "Login"
                }).then(() => {
                    logout(token);
                    navigate(`/auth/login`);
                });
            } else {
                 console.error("Erro ao carregar dados da próxima página:", error);
                 Swal.fire("Erro", "Ocorreu um erro ao carregar mais itens.", "error");
            }
        } finally {
            setCarregando(false);
        }
    };

    const handleUpdate = () => {
        queryClient.invalidateQueries(['migracoes']);
        queryClient.invalidateQueries(['ultimoDocMigracao']);
        setSumirBtn(false);
    };

    if (isLoading) return <p>Carregando...</p>;

    if (error) {
        return (
            <div className="div-da-table">
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="5">Histórico de Migrações</th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Data de Criação</th>
                            <th>Arquivo</th>
                            <th>Mensagem</th>
                            <th>Observações</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="5" style={{ color: "red" }}>
                                Erro ao carregar os dados: {error.message}. Se o problema persistir, contate um administrador.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    if (isNormalScreen) {
        return (
            <div className="div-da-table">
                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="5">Histórico de Migrações</th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Data de Criação</th>
                            <th>Arquivo</th>
                            <th>Mensagem da Migração</th>
                            <th>Observações</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {migracoes && migracoes.length > 0 ? (
                            migracoes.map((migracao) => (
                                <tr key={migracao.id}>
                                    <td>{new Date(migracao.criado_em).toLocaleString('pt-BR')}</td>
                                    <td>{migracao.arquivo_path}</td>
                                    <td>{migracao.msg_migracao}</td>
                                    <td>{migracao.observacoes}</td>
                                    {/* Supondo que 'estado' possa ser exibido diretamente */}
                                    <td>{migracao.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">Nenhum registro de migração encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="div-btns">
                    <button onClick={handleUpdate} className="btn-carregar">Atualizar</button>
                    {!sumirBtn && (
                        <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
                    )}
                </div>

                {carregando && (
                    <div className="carregamento">
                        <l-dot-wave size="60" speed="1" color="white"></l-dot-wave>
                    </div>
                )}
            </div>
        );
    } else { // Versão Mobile
        return (
            <div className="div-da-table">
                {mostrarPopUp && (
                    // Você precisará criar este componente Pop_up_migracao
                    <Pop_up_migracao dados={dadosSelecionados} fechar={() => setMostrarPopUp(false)} />
                )}

                <table>
                    <thead>
                        <tr className="cell-title">
                            <th colSpan="4">Histórico de Migrações</th>
                        </tr>
                        <tr className="cabecalho">
                            <th>Data de Criação</th>
                            <th>Arquivo</th>
                            <th>Estado</th>
                            <th>Detalhes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {migracoes && migracoes.length > 0 ? (
                            migracoes.map((migracao) => (
                                <tr key={migracao.id}>
                                    <td>{new Date(migracao.criado_em).toLocaleDateString('pt-BR')}</td>
                                    <td>{migracao.arquivo_path}</td>
                                    <td>{migracao.estado}</td>
                                    <td><button type="button" className="btn-ver-mais" onClick={() => abrirPopUp(migracao)}>Ver mais</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Nenhum registro de migração encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="div-btns">
                    <button onClick={handleUpdate} className="btn-carregar">Atualizar</button>
                    {!sumirBtn && (
                        <button onClick={carregarProximaPagina} className="btn-carregar">Carregar mais</button>
                    )}
                </div>
                 {carregando && (
                    <div className="carregamento">
                        <l-dot-wave size="60" speed="1" color="white"></l-dot-wave>
                    </div>
                )}
            </div>
        );
    }
}

export default Ver_tabela_excel;
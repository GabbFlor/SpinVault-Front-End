import { useEffect, useState } from "react";
import { dotWave } from "ldrs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Pop_up_disco from "./Pop_up_disco";
import axios from "axios";
import { apiUrl } from "../API";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";

const Relacao_pesquisa = ({ qBusca, qAnoDisco, qTamanhoDisco, qSituacaoDisco, qSituacaoCapa, qEstilo }) => {
    const [carregando, setCarregando] = useState(false);
    const [ discos, setDiscos ] = useState([]);
    dotWave.register();
    // coisas do pop-up responsividade
    const [mostrarPopUp, setMostrarPopUp] = useState(false);
    const [dadosSelecionados, setDadosSelecionados] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { token, logout } = useAuth();
        
    const abrirPopUp = (dado) => {
        setDadosSelecionados(dado);
        setMostrarPopUp(true);
    }

    // responsividade
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    const pesquisarDados = async () => {
        setCarregando(true);

        // limpando valores q sejam nulos ou 0 para evitar enviar consulta errada para API
        const nomeArtistaParam = qBusca ? qBusca : "";
        const anoParam = qAnoDisco !== null && qAnoDisco !== undefined && qAnoDisco !== "" && Number(qAnoDisco) !== 0 ? qAnoDisco : "";
        const tamanhoParam = qTamanhoDisco !== null && qTamanhoDisco !== undefined && qTamanhoDisco !== "" && Number(qTamanhoDisco) !== 0 ? qTamanhoDisco : "";
        const situacaoDiscoParam = qSituacaoDisco ? qSituacaoDisco : "";
        const situacaoCapaParam = qSituacaoCapa ? qSituacaoCapa : "";
        const estiloParam = qEstilo ? qEstilo : "";

        axios.get(`${apiUrl}/discos/discoFiltro?nome_artista=${nomeArtistaParam}&ano=${anoParam}&tamanho=${tamanhoParam}&situacao_disco=${situacaoDiscoParam}&situacao_capa=${situacaoCapaParam}&estilo=${estiloParam}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setDiscos(response.data);
            } else if (response.status === 204) {
                setDiscos([]);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `A sua conta ainda não foi ativada para adicionar um disco! Assine um de nossos planos e tente novamente.`,
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
        })
        .finally(() => {
            setCarregando(false);
        })
    };

    useEffect(() => {
        if(qBusca || qAnoDisco || qTamanhoDisco || qSituacaoDisco || qSituacaoCapa || qEstilo) {
            pesquisarDados()
        }
    }, [qBusca, qAnoDisco, qTamanhoDisco, qSituacaoDisco, qSituacaoCapa, qEstilo])

    if(isNormalScreen) {
        return (
            <div className="div-da-table">
                {mostrarPopUp && (
                    <Pop_up_disco dados={dadosSelecionados} fechar={() => setMostrarPopUp(false)}/>
                )}

                <table>
                    <thead>
                        <tr className="cabecalho">
                            <th>Artista e Álbum</th>
                            <th>Estilo</th>
                            <th>Tamanho</th>
                            <th>Situação Capa</th>
                            <th>Situação Disco</th>
                            <th>Visualização completa</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        qBusca || qAnoDisco || qTamanhoDisco || qSituacaoDisco || qSituacaoCapa || qEstilo ? (
                            discos.length > 0 ? (
                                discos.map((disco) => (
                                    <tr key={disco.id}>
                                    <td>
                                        <span>{disco.nome_artista}</span><br />
                                        {disco.titulo_album}
                                    </td>
                                    <td>{disco.estilo}</td>
                                    <td>{disco.tamanho}</td>
                                    <td>{disco.situacao_capa}</td>
                                    <td>{disco.situacao_disco}</td>
                                    <td><button type="button" className="btn-table" onClick={() => abrirPopUp(disco)}>Ver mais</button></td>
                                    <td><Link to={`/editar-disco/${disco.id}`} className="btn-table">Editar</Link></td>
                                    </tr>
                                ))
                            ) : (
                            <tr>
                                <td colSpan="7">Nenhum resultado foi encontrado com esses filtros, verifique-os e tente novamente.</td>
                            </tr>
                            )
                        ) : (
                            <tr>
                                <td colSpan="14">Aguardando pesquisa...</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
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
                        <tr className="cabecalho">
                            <th>Artista e Álbum</th>
                            <th>Estilo</th>
                            <th>Tamanho</th>
                            <th>Situação Capa</th>
                            <th>Situação Disco</th>
                            <th>Visualização completa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            qBusca || qAnoDisco || qTamanhoDisco || qSituacaoDisco || qSituacaoCapa || qEstilo ? (
                                discos.length > 0 ? (
                                    discos.map((disco) => (
                                        <tr key={disco.id}>
                                        <td>
                                            <span>{disco.nome_artista}</span><br />
                                            {disco.titulo_album}
                                        </td>
                                        <td>{disco.estilo}</td>
                                        <td>{disco.tamanho}</td>
                                        <td>{disco.situacao_capa}</td>
                                        <td>{disco.situacao_disco}</td>
                                        <td><button type="button" className="btn-table" onClick={() => abrirPopUp(disco)}>Ver mais</button></td>
                                        </tr>
                                    ))
                                ) : (
                                <tr>
                                    <td colSpan="6">Nenhum resultado foi encontrado com esses filtros, verifique-os e tente novamente.</td>
                                </tr>
                                )
                            ) : (
                                <tr>
                                    <td colSpan="6">Aguardando pesquisa...</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }    
}

export default Relacao_pesquisa;
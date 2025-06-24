import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ring2 } from "ldrs";
import axios from "axios";
import { apiUrl } from "../API";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Form_informacoes_gerais = () => {
    const queryClient = useQueryClient();
    ring2.register()
    const [inputDesativado, setInputDesativado] = useState(false);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

        const carregarDados = async () => {
            try {
                const response = await axios.get(`${apiUrl}/discos/informacoesGerais`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                if (response.status === 200) {
                    return response.data;
                }
            } catch (error) {
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
                }

                let responseVazia = {
                    qtdDiscos: 0,
                    qtdDiscosArtistasNacionais: 0,
                    qtdDiscosArtistasInternacionais: 0,
                    qtdDiscosSimples: 0,
                    qtdDiscosDuplos: 0,
                    qtdDiscosTriplos: 0,
                    qtdDiscosDecada50: 0,
                    qtdDiscosDecada60: 0,
                    qtdDiscosDecada70: 0,
                    qtdDiscosDecada80: 0,
                    qtdDiscosDecada90: 0,
                    qtdDiscosAnos2000: 0
                }

                return responseVazia;
            }
        };

    // armazenando os dados em cache (ADAPTAR PARA O MEU BANCO DE DADOS DEPOIS)
        const { data: infosGerais, isLoading, error } = useQuery({
            queryKey: ['infosGerais', token],
            queryFn: () => carregarDados(),
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        })

        if (isLoading) return (
            <form className="form-direita" style={{
                height: "90vh",
            }}>
                <div className="carregamento2">
                <l-ring-2
                    size="80"
                    stroke="5"
                    stroke-length="0.25"
                    bg-opacity="0.1"
                    speed="0.8" 
                    color="#C47D69" 
                ></l-ring-2>
            </div>
            </form>
        );

        if (error) return <p>Erro ao carregar os dados.</p>;

    const handleRefetch = () => {
        queryClient.invalidateQueries(['infosGerais', token]);
    }

    return (
        <form className="form-direita">
            <h1 className='title-mobile'>Edição ou descarte de discos do Spin Vault</h1>

            <div>
                <button type="button" className="btn-refetch" onClick={() => handleRefetch()} disabled={inputDesativado}>Atualizar</button>
            </div>

            <div>
                <label htmlFor="qtd_discos">Quantidade de discos:</label>
                <input 
                    type="text" 
                    name="qtd_discos"
                    value={infosGerais?.qtdDiscos}
                    disabled
                />
            </div>

            <div>
                <label htmlFor="qtd_discos_artistas_nacionais">Discos de artistas nacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_nacionais" 
                    value={infosGerais?.qtdDiscosArtistasNacionais}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_artistas_internacionais">Discos de artistas internacionais:</label>
                <input 
                    type="text" 
                    name="qtd_discos_artistas_internacionais" 
                    value={infosGerais?.qtdDiscosArtistasInternacionais}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_simples">Quantidade de discos simples:</label>
                <input 
                    type="text" 
                    name="qtd_discos_simples" 
                    value={infosGerais?.qtdDiscosSimples}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_duplos">Quantidade de discos duplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_duplos" 
                    value={infosGerais?.qtdDiscosDuplos}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="qtd_discos_triplos">Quantidade de discos triplos:</label>
                <input 
                    type="text" 
                    name="qtd_discos_triplos" 
                    value={infosGerais?.qtdDiscosTriplos}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_50">Década de 50:</label>
                <input 
                    type="text" 
                    name="decada_50" 
                    value={infosGerais?.qtdDiscosDecada50}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_60">Década de 60:</label>
                <input 
                    type="text" 
                    name="decada_60" 
                    value={infosGerais?.qtdDiscosDecada60}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_70">Década de 70:</label>
                <input 
                    type="text" 
                    name="decada_70" 
                    value={infosGerais?.qtdDiscosDecada70}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_80">Década de 80:</label>
                <input 
                    type="text" 
                    name="decada_80" 
                    value={infosGerais?.qtdDiscosDecada80}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="decada_90">Década de 90:</label>
                <input 
                    type="text" 
                    name="decada_90" 
                    value={infosGerais?.qtdDiscosDecada90}
                    disabled
                />
            </div>
            
            <div>
                <label htmlFor="anos_2000">Anos 2000:</label>
                <input 
                    type="text" 
                    name="anos_2000"
                    value={infosGerais?.qtdDiscosAnos2000}
                    disabled
                />
            </div>
            
        </form>
    )
}

export default Form_informacoes_gerais;
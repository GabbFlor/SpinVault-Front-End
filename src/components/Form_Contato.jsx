import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { apiUrl } from '../API'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'

const Form_Contato = () => {
    // Estados para o formulário de contato
    const [motivo, setMotivo] = useState("");
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    // Estados para controle de fluxo
    const [carregando, setCarregando] = useState(false);
    const [inputDesativado, setInputDesativado] = useState(false);
    const navigate = useNavigate();
    const { token, logout } = useAuth();

    // Efeito para a tela de carregamento (SweetAlert2)
    useEffect(() => {
        if (carregando) {
            Swal.fire({
                icon: "info",
                title: "Enviando...",
                text: "Aguarde enquanto sua mensagem é enviada.",
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
        } else {
            Swal.close();
        }
    }, [carregando]);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        // Validação para os novos campos
        if (motivo !== "" && email !== "" && mensagem !== "") {

            setCarregando(true);
            setInputDesativado(true);

            
            axios.post(`${apiUrl}/contato`, {
                motivoContato: motivo,
                email: email,
                mensagem: mensagem
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (response.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Sucesso!",
                            text: "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
                            timer: 2000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })
                            .then(() => {
                                // Limpa o formulário
                                setMotivo("");
                                setEmail("");
                                setMensagem("");
                            })
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 403) {
                        Swal.fire({
                            icon: "error",
                            title: "Erro de Permissão!",
                            text: `Você não tem permissão para realizar esta ação. Considere verificar seu plano ou contatar o suporte.`,
                            showCancelButton: true,
                            cancelButtonText: "Fechar",
                            showConfirmButton: true,
                            confirmButtonText: "Ver Planos"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate(`/planos`);
                            }
                        })
                    } else if (error.response && error.response.status === 401) {
                        Swal.fire({
                            icon: "info",
                            title: "Sessão Expirada",
                            text: `Sua sessão expirou, faça login novamente para continuar.`,
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonText: "Login"
                        }).then(() => {
                            logout(token);
                            navigate(`/auth/login`);
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erro no Servidor!",
                            text: `Não foi possível enviar sua mensagem. Tente novamente mais tarde ou entre em contato com um administrador.`,
                            showConfirmButton: true,
                        })
                    }
                })
                .finally(() => {
                    setCarregando(false);
                    setInputDesativado(false);
                })
        } else {
            Swal.fire({
                icon: "error",
                title: "Campos Vazios!",
                text: `Por favor, preencha todos os campos: motivo, E-mail e Mensagem.`,
                showConfirmButton: true,
            })
        }
    };

    return (
        <form className='form-direita' onSubmit={HandleSubmit}>
            <h1 className='title-mobile'>Formulário de Contato</h1>

            <div className='div-type'>
                <label htmlFor="motivo">motivo</label>
                <input
                    type="text"
                    name="motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder='Digite o motivo do contato'
                    disabled={inputDesativado}
                />
            </div>

            <div className='div-type'>
                <label htmlFor="email">E-mail</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='seu.email@exemplo.com'
                    disabled={inputDesativado}
                />
            </div>
            

            <div className='div-type'>
                <label htmlFor="mensagem">Mensagem</label>
                <textarea
                    name="mensagem"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder='Digite sua mensagem aqui...'
                    disabled={inputDesativado}
                    rows="6"
                    style={{ resize: 'vertical' }}
                />
            </div>

            <button type="submit" className="btn-submit-contato" disabled={inputDesativado || carregando}>
                {carregando ? "Enviando..." : "Enviar Mensagem"}
            </button>
        </form>
    )
}

export default Form_Contato;
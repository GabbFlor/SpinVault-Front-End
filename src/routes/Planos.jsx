import Footer from '../components/Footer';
import Header from '../components/Header';
import { BsCheck2 } from "react-icons/bs";
import Planos_style from '../styles/Planos_style';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { apiUrl } from '../API';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Planos = () => {
    const { token, logout } = useAuth();
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const pegarLinkDoPlano = (id_plan) => {
        // alerta de aviso
        Swal.fire({
            icon: "info",
            title: "Aviso",
            text: `Ao concordar, você será redirecionado a página de pagamento referente ao plano selecionado.`,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            showConfirmButton: true,
            confirmButtonText: "Vamos lá!"
        }).then((result) => {
            if (result.isConfirmed) {
                setCarregando(true);

                axios.get(`${apiUrl}/payment/criar/${id_plan}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 201) {
                        setCarregando(false);
                        
                        window.location.href = `${response.data}`;
                    }
                })
                .catch(error => {
                    if(error.response && error.response.status === 404) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: `O plano escolhido não foi encontrado em nosso sistema, contate um administrador.`,
                            showCancelButton: false,
                            showConfirmButton: true,
                        })
                    } else if (error.response && error.response.status === 403) {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: `Identificamos que a sua conta já possui uma assinatura ativa, se isso está errado, contate um administrador ou tente novamente mais tarde.`,
                            showCancelButton: false,
                            showConfirmButton: true,
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
                    } else if (error.response && error.response.status === 409) {
                        Swal.fire({
                            icon: "warning",
                            title: "Aviso",
                            text: `Identificamos que a sua conta possui um pagamento pendente, para evitar problemas, aguarde o final do pagamento atual e tente novamente mais tarde se necessário.`,
                            showCancelButton: false,
                            showConfirmButton: true,
                            confirmButtonText: "Ok"
                        })
                    } 
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: `Erro interno no servidor, contate um administrador ou tente novamente mais tarde.`,
                            showCancelButton: false,
                            showConfirmButton: true,
                        })
                        console.error(error);
                   }
                })
                .finally(() => {
                    setCarregando(false);
                })
            }
        })
    }

    useEffect(() => {
        if (carregando == true) {
            Swal.fire({
                icon: "info",
                title: "Estamos gerando o seu link de pagamento.",
                showCancelButton: false,
                showConfirmButton: false
            })
        }
    }, [carregando])

    return (
        <div className="Pag-Planos">
            <Planos_style />

            <Header />

            <main>
                <div className='title'>
                    <h1>Escolha seu plano</h1>
                    <h2>Sem surpresa. Planos simples e diretos.</h2>
                </div>

                <section className="cards-section">
                    <div className='card'>
                        <div>
                            <h2>Mensal</h2>
                            <h2>R$14,99/<span>mes</span></h2>
                        </div>

                        <ul>
                            <li><BsCheck2 className="icon-card"/> Essencial</li>
                            <li><BsCheck2 className="icon-card"/> Assinatura mensal</li>
                            <li><BsCheck2 className="icon-card"/> Cancele quando quiser</li>
                        </ul>

                        <button onClick={() => pegarLinkDoPlano(1)}>Assinar agora</button>
                    </div>

                    <div className='card'>
                        <div>
                            <h2>TriMensal</h2>
                            <h2>R$39,90/<span>³meses</span></h2>
                        </div>

                        <ul>
                            <li><BsCheck2 className="icon-card"/> 3 meses</li>
                            <li><BsCheck2 className="icon-card"/> Assinatura Trimensal</li>
                            <li><BsCheck2 className="icon-card"/> Cancele quando quiser</li>
                        </ul>

                        <button onClick={() => pegarLinkDoPlano(2)}>Assinar agora</button>
                    </div>

                    <div className='card'>
                        <div>
                            <h2>Anual</h2>
                            <h2>R$149,90/<span>ano</span></h2>
                        </div>

                        <ul>
                            <li><BsCheck2 className="icon-card"/> 12 meses</li>
                            <li><BsCheck2 className="icon-card"/> Assinatura anual</li>
                            <li><BsCheck2 className="icon-card"/> Cancele quando quiser</li>
                        </ul>

                        <button onClick={() => pegarLinkDoPlano(3)}>Assinar agora</button>
                    </div>

                </section>
            </main>

            <Footer />
        </div>
    )
} 

export default Planos;
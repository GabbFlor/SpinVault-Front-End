import { Link, useNavigate } from 'react-router-dom';
import Select from "react-select"
import axios from "axios"
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Profile_default from "../assets/img-profile-default.webp"
import { apiUrl } from '../API';
import { useAuth } from '../AuthContext';

const Form_edit_perfil = () => {
    const [userName, setUserName] = useState("");
    const [telefone, setTelefone] = useState("");
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [carregando, setCarregando] = useState(false);
    const { token, logout } = useAuth();

    // useState para seleção de localidade
    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState(null);
    const [cidadeSelecionado, setCidadeSelecionado] = useState(null);

    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const isMediumScreen = useMediaQuery('(min-width: 370px) and (max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 370px)');
    const fontSize = isSmallScreen ? "3vw" : isMediumScreen ? '2.5vw' : isLargeScreen ? '0.75vw' : '1vw';

    const customStyleSelect = {
        // se refere ao Select no estado padrao, sem nada selecionado
        control: (base, { isFocused }) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            border: isFocused ? '1px solid #C47D69' : '1px solid #ccc',
            boxShadow: isFocused ? ' 0 0 0 1px #C47D69' : 'none',
            '&:hover': {
                border: '1px solid #C47D69',
            }
        }),
        // se refere a quando tem um valor selecionado no select
        singleValue: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: 'black',
        }),
        placeholder: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: '#888',
        }),
        option: (base, { isSelected }) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            backgroundColor: isSelected ? '#C47D69' : 'white',
            color: isSelected ? 'black' : '#333',
            ':hover': {
                backgroundColor: '#c47d699a',
                color: 'black',
                boxShadow: '0 0 0 1px #c47d699a'
            },
        }),
        input: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: '#4a4a4a',
        }),
    };

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

        staleTime: 1000 * 60 * 5,
    });

    // Carregar os estados e as cidades da API do IBGE
    useEffect(() => {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
            .then(response => {
                // formatando os etados para o React Select poder ler
                const estadosFormatados = response.data.map(estado => ({
                    value: estado.sigla,
                    label: estado.nome
                }));
                setEstados(estadosFormatados);
            })
            .catch(err => console.error(`Erro ao carregar os estados: ${err}`))
    }, [userProfile])

    useEffect(() => {
        if(estadoSelecionado) {
            axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoSelecionado}/municipios`)
            .then(response => {
                const cidadesFormatadas = response.data.map(cidade => ({
                    value: cidade.nome,
                    label: cidade.nome
                }));
                setCidades(cidadesFormatadas)
                
                if(userProfile?.cidade) {
                    const cidadeEncontrada = cidadesFormatadas.find(cidade => cidade.value === userProfile.cidade);
                    setCidadeSelecionado(cidadeEncontrada ? cidadeEncontrada.value : null)
                }
            })
            .catch(err => console.error(`Erro ao carregar as cidades: ${err}`));
        } else {
            setCidades([]);
        }
    }, [estadoSelecionado, userProfile]);

    // setando as informações para os valores já existentes do perfil do usuário
    useEffect(() => {
        if (userProfile) {
            setUserName(userProfile.user_name || isLoading);
            setTelefone(userProfile.telefone || isLoading)
            setEstadoSelecionado(userProfile.estado || isLoading);
            setCidadeSelecionado(userProfile.cidade || isLoading);
        }
    }, [userProfile]);

    // telinha de carregamento
    useEffect(() => {
        if (carregando == true) {
            Swal.fire({
                icon: "info",
                title: "Carregando...",
                showCancelButton: false,
                showConfirmButton: false
            })
        }
    }, [carregando])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userName != null && telefone != null && estadoSelecionado != null && cidadeSelecionado != null) {
            setCarregando(true);

            axios.put(`${apiUrl}/users/editarPerfil`, {
                user_name: userName,
                cidade: cidadeSelecionado,
                estado: estadoSelecionado,
                telefone: telefone
            } , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Sucesso!",
                        text: "Os dados da sua conta foram atualizados com sucesso.",
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    .then(() => {
                        // atualiza as infos direto no cache para economizar requests do firebase
                        queryClient.setQueryData(['userProfile'], (oldData) => ({
                            ...oldData,
                            user_name: userName,
                            telefone: telefone,
                            estado: estadoSelecionado,
                            cidade: cidadeSelecionado
                        }));

                        // invalida o cache anterior de userProfile
                        queryClient.invalidateQueries(['userProfile', token]);

                        navigate('/perfil')
                    })
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                        icon: "error",
                        title: "Erro!",
                        text: "O seu número de telefone excede o limite de caracteres, revise-o e tente novamente.",
                        showCancelButton: false,
                        showConfirmButton: true
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
                    text: "Erro ao editar o seu perfil, tente novamente mais tarde ou contate algum administrador!",
                    showCancelButton: false,
                    showConfirmButton: true
                })
                }
                console.error(error);
            })
            .finally(() => {
                setCarregando(false);
            })
        }
    }
    
    return (
        <section className="perfil-infos edit-perfil-section">

            <div className='img-temporario'>
                .
            </div>

            <form className='form-edit-perfil' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="NomeUser">Nome de usuário</label>
                    <input 
                        type="NomeUser" 
                        placeholder={"Digitar nome de usuário..."} 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="Tell">Telefone</label>
                    <input 
                        type="text" 
                        placeholder={"Digitar telefone..."} 
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                    />
                </div>

                <div className='div-select'>
                    <label htmlFor="Estado">Estado</label>
                    <Select
                        options={estados}
                        value={estados.find(option => option.value === estadoSelecionado) || null}
                        onChange={(e) => setEstadoSelecionado(e ? e.value : null)}
                        placeholder={"Selecione..."} 
                        styles={customStyleSelect}
                    />
                </div>

                <div className='div-select'>
                    <label htmlFor="Cidade">Cidade</label>
                    <Select
                        options={cidades}
                        value={cidades.find(option => option.value === cidadeSelecionado) || null}
                        onChange={(e) => setCidadeSelecionado(e ? e.value : null)}
                        placeholder={"Selecione..."}
                        styles={customStyleSelect}
                    />
                </div>

                <div className="div-btns-form-edit">
                    <Link to={'/perfil'}>Voltar</Link>

                    <button type='submit'>Pronto</button>
                </div>
            </form>
        </section>
    )
}

export default Form_edit_perfil;
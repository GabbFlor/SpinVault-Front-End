import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMediaQuery } from '@mui/material'
import Swal from 'sweetalert2'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ring2 } from 'ldrs'
import axios from 'axios'
import { apiUrl } from '../API'
import { useAuth } from '../AuthContext'

const Tamanhos = [
    { value: 12, label: 12 },
    { value: 10, label: 10 },
    { value: 7, label: 7 }
]

const Origem_artista = [
    { value: "internacional", label: "Internacional" },
    { value: "nacional", label: "Nacional" },
    { value: "outra", label: "Outra" }
]

const Origem_disco = [
    { value: "internacional", label: "Internacional" },
    { value: "nacional", label: "Nacional" },
]

const Situacao_disco = [
    { value: "perfeito (m)", label: "Perfeito (M)" },
    { value: "quase perfeito (nm)", label: "Quase Perfeito (NM)" },
    { value: "excelente (ex)", label: "Excelente (EX)" },
    { value: "muito bom (vg)", label: "Muito Bom (VG)" },
    { value: "bom (g)", label: "Bom (G)" },
    { value: "ruim (p)", label: "Ruim (P)" },
    { value: "muito ruim (vp)", label: "Muito Ruim (VP)" },
]

const Situacao_capa = [
    { value: "selado (se)", label: "Selado (SE)" },
    { value: "perfeito (m)", label: "Perfeito (M)" },
    { value: "quase perfeito (nm)", label: "Quase Perfeito (NM)" },
    { value: "excelente (ex)", label: "Excelente (EX)" },
    { value: "muito bom (vg)", label: "Muito Bom (VG)" },
    { value: "bom (g)", label: "Bom (G)" },
    { value: "regular (f)", label: "Regular (F)" },
    { value: "ruim (p)", label: "Ruim (P)" },
    { value: "muito ruim (vp)", label: "Muito Ruim (VP)" },
]

const Estilo = [
    { value: "rock", label: "Rock (todos os estilos)" },
    { value: "clássica", label: "Música Clássica" },
    { value: "MPB", label: "MPB" },
    { value: "eletronico", label: "Eletrônico" },
    { value: "jazz", label: "Jazz" },
    { value: "samba", label: "Samba" },
    { value: "blues", label: "Blues" },
    { value: "black music", label: "Black Music" },
    { value: "outro", label: "Outro" },
]

const Tipo = [
    { value: "simples", label: "Simples" },
    { value: "duplo", label: "Duplo" },
    { value: "triplo", label: "Triplo" },
]

const Encarte = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
]

const Form_edit_discos = ({ id_disco }) => {
    const [nomeArtista, setNomeArtista] = useState("");
    const [nomeArtistaToLower, setNomeArtistaToLower] = useState("");
    const [tituloAlbum, setTituloAlbum] = useState("");
    const [tituloAlbumToLower, setTituloAlbumToLower] = useState("");
    const [tamanhoDisco, setTamanhoDisco] = useState(null);
    const [anoDisco, setAnoDisco] = useState("");
    const [anoDiscoTiragem, setAnoDiscoTiragem] = useState("");
    const [origemArtista, setOrigemArtista] = useState(null);
    const [origemDisco, setOrigemDisco] = useState(null);
    const [situacaoDisco, setSituacaoDisco] = useState(null);
    const [situacaoCapa, setSituacaoCapa] = useState(null);
    const [estilo, setEstilo] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [encarte, setEncarte] = useState(null);
    const [observacoes, setObservacoes] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [ carregando, setCarregando ] = useState(false);
    const [carregandoEdicao, setCarregandoEdicao] = useState(false);
    const [inputDesativado, setInputDesativado] = useState(false);
    ring2.register()
    const { token, logout } = useAuth();

    // Telinha de carregamento
    useEffect(() => {
        if (carregandoEdicao == true) {
            Swal.fire({
                icon: "info",
                title: "Carregando...",
                showCancelButton: false,
                showConfirmButton: false
            })
        }
        }, [carregandoEdicao])

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (nomeArtista !== "" && tituloAlbum !== "" && anoDisco !== "" && tamanhoDisco !== null && origemArtista !== null &&
            origemDisco !== null && situacaoDisco !== null && situacaoCapa !== null && estilo !== null && tipo !== null && encarte !== null && anoDiscoTiragem !== "") {
                    
            setCarregandoEdicao(true);

            axios.put(`${apiUrl}/discos/${id_disco}`, {
                nome_artista: nomeArtista,
                titulo_album: tituloAlbum,
                tamanho: tamanhoDisco,
                ano: anoDisco,
                ano_tiragem: anoDiscoTiragem,
                origem_artista: origemArtista,
                origem_disco: origemDisco,
                situacao_disco: situacaoDisco,
                situacao_capa: situacaoCapa,
                estilo: estilo,
                tipo: tipo,
                encarte: encarte,
                observacoes: observacoes
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
                        text: `O álbum ${tituloAlbum} foi editado com sucesso!`,
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    }) 
                    .then(() => {
                        queryClient.clear();
    
                        navigate(`/relacao/titulo-album`)
                    })
                }
            })
            .catch(error => {
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

                console.error(`Erro ao editar disco: ${error.message}`);
            })
            .finally(() => {
                setCarregando(false);
            })
        } else {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: `Todos os campos do formulário devem estar preenchidos!`,
                showConfirmButton: true,
            })
        }
    };

    const handleDeleteDisk = async (id) => {
        Swal.fire({
            title: "Você tem certeza?",
            text: "Após deletar, não será possível recuperar os dados do álbum.",
            confirmButtonText: "Deletar",
            icon: "question",
            denyButtonText: `Não`,
            showDenyButton: true,
        }).then(async (result) => { // Transformamos essa função em async
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${apiUrl}/discos/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    Swal.fire({
                        title: "Disco deletado com sucesso!",
                        icon: "success"
                    }).then (() => { 
                        queryClient.clear();
    
                        navigate(`/relacao/titulo-album`)
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
                console.log(`Ação "deletar disco" cancelada.`)
            }
        });
    };

    // usando o media query para ajustar a fonte
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
        singleValue: (base, isDisabled) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: isDisabled ? 'rgb(134, 134, 134)' : 'rgb(74, 74, 74)',
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
    };

    // recupera os dados do disco da URL
    const buscarDisco = async (disco) => {
        setCarregando(true);

        axios.get(`${apiUrl}/discos/${disco}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setNomeArtista(response.data.nome_artista);
                setTituloAlbum(response.data.titulo_album);
                setTamanhoDisco(response.data.tamanho);
                setAnoDisco(response.data.ano);
                setAnoDiscoTiragem(response.data.ano_tiragem);
                setOrigemArtista(response.data.origem_artista);
                setOrigemDisco(response.data.origem_disco);
                setSituacaoDisco(response.data.situacao_disco);
                setSituacaoCapa(response.data.situacao_capa);
                setEstilo(response.data.estilo);
                setTipo(response.data.tipo);
                setEncarte(response.data.encarte);
                setObservacoes(response.data.observacoes);
            }
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    icon: "error",
                    title: "Erro!",
                    text: `A sua conta ainda não foi ativada para editar um disco! Assine um de nossos planos e tente novamente.`,
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    showConfirmButton: true,
                    confirmButtonText: "Planos"
                }).then((result) => {
                if (result.isConfirmed) {
                        navigate(`/planos`);
                    }
                })
            } 
            else if (error.response && error.response.status === 404) {
                navigate(`/disco-nao-encontrado`);
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
    }

    useEffect(() => {
        buscarDisco(id_disco);
    }, [id_disco])


    if (carregando) return (
        <form className="form-direita-carregando" 
            style={{ 
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: "50%"
            }}>
            <l-ring-2
                size="80"
                stroke="5"
                stroke-length="0.25"
                bg-opacity="0.1"
                speed="0.8" 
                color="#C47D69" 
            ></l-ring-2>
        </form>
    )

    return (
        <form className='form-direita' onSubmit={HandleSubmit}>
            <h1 className='title-mobile'>Edição ou descarte de discos do Spin Vault</h1>

            <div className='div-type'>
                <label htmlFor="Nome-artista">Nome do Artista</label>
                <input 
                    type="text" 
                    name="Nome-artista" 
                    value={nomeArtista}
                    onChange={(e) => {
                        setNomeArtista(e.target.value);
                        setNomeArtistaToLower(e.target.value.toLocaleLowerCase());
                    }
                }
                    placeholder='Digite...'
                    disabled={inputDesativado}
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Titulo-album">Titulo do Álbum</label>
                <input 
                    type="text" 
                    name="Titulo-album" 
                    value={tituloAlbum}
                    onChange={(e) => {
                        setTituloAlbum(e.target.value);
                        setTituloAlbumToLower(e.target.value.toLocaleLowerCase());
                    }
                }
                    placeholder='Digite...'
                    disabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Tamanho-disco">Tamanho(Polegadas)</label>
                <Select 
                    options={Tamanhos} 
                    value={Tamanhos.find(option => option.value === tamanhoDisco) || null}
                    onChange={(e) => setTamanhoDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Ano-disco">Ano</label>
                <input 
                    type="number" 
                    name="Ano-disco" 
                    value={anoDisco}
                    onChange={(e) => setAnoDisco(e.target.value)}
                    placeholder='Digite...'
                    disabled={inputDesativado}
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Ano-disco-tiragem">Ano (Tiragem)</label>
                <input 
                    type="number" 
                    name="Ano-disco-tiragem" 
                    value={anoDiscoTiragem}
                    onChange={(e) => setAnoDiscoTiragem(e.target.value)}
                    placeholder='Digite...'
                    disabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Origem-artista">Origem do Artista</label>
                <Select 
                    options={Origem_artista} 
                    value={Origem_artista.find(option => option.value === origemArtista) || null}
                    onChange={(e) => setOrigemArtista(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Origem-disco">Origem do Disco</label>
                <Select 
                    options={Origem_disco} 
                    value={Origem_disco.find(option => option.value === origemDisco) || null}
                    onChange={(e) => setOrigemDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Situacao-disco">Situação do Disco</label>
                <Select 
                    options={Situacao_disco} 
                    value={Situacao_disco.find(option => option.value === situacaoDisco) || null}
                    onChange={(e) => setSituacaoDisco(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Situacao-capa">Situação da Capa</label>
                <Select 
                    options={Situacao_capa} 
                    value={Situacao_capa.find(option => option.value === situacaoCapa) || null}
                    onChange={(e) => setSituacaoCapa(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Estilo">Estilo</label>
                <Select 
                    options={Estilo} 
                    value={Estilo.find(option => option.value === estilo) || null}
                    onChange={(e) => setEstilo(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Tipo">Tipo</label>
                <Select 
                    options={Tipo} 
                    value={Tipo.find(option => option.value === tipo) || null}
                    onChange={(e) => setTipo(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-select'>
                <label htmlFor="Encarte">Encarte</label>
                <Select 
                    options={Encarte} 
                    value={Encarte.find(option => option.value === encarte) || null}
                    onChange={(e) => setEncarte(e ? e.value : null)}
                    styles={customStyleSelect}
                    placeholder="Selecione..."
                    isDisabled={inputDesativado}
                />
            </div>

            <div className='div-type'>
                <label htmlFor="Observacoes">Observações</label>
                <input 
                    type="text" 
                    name="Observacoes" 
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder='Digite...'
                    disabled={inputDesativado}
                />
            </div>

            <div className="div-buttons-form">
                <button type="button" className="btn-submit-disk delete-disk" onClick={() => handleDeleteDisk(id_disco)} disabled={inputDesativado}>Deletar disco</button>

                <button type="submit" className="btn-submit-disk" disabled={inputDesativado}>Aplicar mudanças</button>
            </div>
        </form>
    )
}

export default Form_edit_discos;
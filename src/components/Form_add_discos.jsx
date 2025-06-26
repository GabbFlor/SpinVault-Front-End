import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useMediaQuery } from '@mui/material'
import Swal from 'sweetalert2'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { apiUrl } from '../API'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import { BsDiscFill } from "react-icons/bs";

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

const Form_add_discos = () => {
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
    const [inputDesativado, setInputDesativado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();
    const { token, logout } = useAuth();

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

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (nomeArtista !== "" && tituloAlbum !== "" && anoDisco !== "" && tamanhoDisco !== null && origemArtista !== null &&
            origemDisco !== null && situacaoDisco !== null && situacaoCapa !== null && estilo !== null && tipo !== null && encarte !== null && anoDiscoTiragem !== "") {
    
            setCarregando(true)

            axios.post(`${apiUrl}/discos`, {
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
                        text: `O álbum ${tituloAlbum} foi adicionado com sucesso!`,
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    }) 
                    .then(() => {
                        setNomeArtista("");
                        setNomeArtistaToLower("");
                        setTituloAlbum("");
                        setTituloAlbumToLower("");
                        setTamanhoDisco(null);
                        setAnoDisco("");
                        setAnoDiscoTiragem("");
                        setOrigemArtista(null)
                        setOrigemDisco(null);
                        setSituacaoDisco(null);
                        setSituacaoCapa(null);
                        setEstilo(null);
                        setTipo(null);
                        setEncarte(null);
                        setObservacoes("")

                        queryClient.invalidateQueries(['countDisks', token]);
                    })
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
        } else {
            Swal.fire({
                icon: "error",
                title: "Erro!",
                text: `Todos os campos do formulário devem estar preenchidos!`,
                showConfirmButton: true,
            })
        }
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
        input: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: '#4a4a4a',
        }),
    };

    const gerarLinkNoDiscogs = (titulo) => {
        if (!titulo) return "#";

        const query = titulo.trim().replace(/\s+/g, '+');
        return `https://www.discogs.com/pt_BR/search?q=${query}&type=all`;
    }

    return (
        <form className='form-direita' onSubmit={HandleSubmit}>
            <h1 className='title-mobile'>Cadastro de discos do Spin Vault</h1>

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

                {/* link para o discogs */}
                {tituloAlbum.trim() && (
                    <a 
                        href={gerarLinkNoDiscogs(tituloAlbum)}
                        target='_blank'
                        rel='noopener noreferrer'
                        title='Buscar no discogs'
                    >
                        <BsDiscFill />
                    </a>
                )}
            </div>

            <div className='div-select'>
                <label htmlFor="Tamanho-disco">Tamanho (Polegadas)</label>
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

            <button type="submit" className="btn-submit-disk" disabled={inputDesativado}>Cadastrar disco</button>
        </form>
    )
}

export default Form_add_discos;
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

    //Estados para o fluxo do Discogs
    const [catalogNumber, setCatalogNumber] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [discogsLoading, setDiscogsLoading] = useState(false);
    const [discogsError, setDiscogsError] = useState(null);

    // telinha de carregamento
    useEffect(() => {
        if (carregando || discogsLoading) { // MODIFICADO: Também mostra ao carregar do Discogs
            Swal.fire({
                icon: "info",
                title: "Carregando...",
                text: discogsLoading ? "Buscando dados no Discogs..." : "Enviando para o Spin Vault...",
                showCancelButton: false,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
        } else {
            Swal.close();
        }
    }, [carregando, discogsLoading]);

    const HandleSubmit = async (e) => {
        e.preventDefault();

        // ======================= INÍCIO DA LÓGICA DE VALIDAÇÃO ATUALIZADA =======================
        const camposObrigatorios = {
            nomeArtista: 'Nome do Artista',
            tituloAlbum: 'Título do Álbum',
            anoDisco: 'Ano',
            origemArtista: 'Origem do Artista',
            estilo: 'Estilo'
        };

        const camposVazios = [];

        if (!nomeArtista.trim()) camposVazios.push(camposObrigatorios.nomeArtista);
        if (!tituloAlbum.trim()) camposVazios.push(camposObrigatorios.tituloAlbum);
        if (!anoDisco.trim()) camposVazios.push(camposObrigatorios.anoDisco);
        if (origemArtista === null) camposVazios.push(camposObrigatorios.origemArtista);
        if (estilo === null) camposVazios.push(camposObrigatorios.estilo);

        if (camposVazios.length > 0) {
            Swal.fire({
                icon: "error",
                title: "Campos Obrigatórios",
                html: `Por favor, preencha os seguintes campos para continuar:<br><b>${camposVazios.join(', ')}</b>`,
                showConfirmButton: true,
            });
            return; // Interrompe o envio do formulário
        }
        // ======================= FIM DA LÓGICA DE VALIDAÇÃO ATUALIZADA =======================

        // Se a validação passar, o código continua para o envio
        setCarregando(true);

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
                        timer: 1500,
                        showCancelButton: false,
                        showConfirmButton: false,
                    })
                        .then(() => {
                            // Limpa o formulário completo
                            setCatalogNumber("");
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
    };

    const handleSearchByCatalogNumber = async () => {
        if (!catalogNumber) {
            setDiscogsError('Por favor, insira um número de catálogo.');
            return;
        }
        setDiscogsLoading(true);
        setDiscogsError(null);
        setSearchResults([]);

        try {
            const response = await axios.get(`${apiUrl}/discos/pesquisarNoDiscogs?catalogoId=${catalogNumber}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            
            if (response.status === 200) {
                setSearchResults(response.data.results);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setDiscogsError('Nenhum lançamento encontrado com este número de catálogo.');
            } else {
                setDiscogsError('Erro ao buscar no Discogs. Verifique sua conexão ou o token da API.');
                console.error(err);
            }
        } finally {
            setDiscogsLoading(false);
        }
    };

    const handleSelectRelease = async (releaseId) => {
        setDiscogsLoading(true);
        setDiscogsError(null);
        setSearchResults([]);

        try {
            const response = await axios.get(`${apiUrl}/discos/recuperarDiscoDiscogs/${releaseId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            const data = response.data;

            // Preenchendo os estados do seu formulário
            setNomeArtista(data.artists?.map(a => a.name).join(', ') || "");
            setTituloAlbum(data.title || "");
            setAnoDisco(data.year ? String(data.year) : "");
            setAnoDiscoTiragem(data.year ? String(data.year) : ""); // Para um lançamento, o ano da tiragem é o mesmo

            // Mapeamento de dados complexos
            const size = extractRecordSize(data.formats);
            setTamanhoDisco(size);

            const countryOrigin = data.country === 'Brazil' ? 'nacional' : 'internacional';
            setOrigemDisco(countryOrigin);

            const discType = extractDiscType(data.formats);
            setTipo(discType);

            // Campos que o usuário deve preencher manualmente
            setEstilo(null);
            setOrigemArtista(null);

        } catch (err) {
            setDiscogsError('Erro ao obter os detalhes do lançamento.');
            console.warn(releaseId)
            console.error(err);
        } finally {
            setDiscogsLoading(false);
        }
    };

    // NOVO: Funções auxiliares para extrair dados
    const extractRecordSize = (formats) => {
        if (!formats || formats.length === 0) return null;
        const format = formats[0];
        if (format.descriptions) {
            const sizeDesc = format.descriptions.find(desc => desc.includes('"'));
            if (sizeDesc) {
                const sizeNumber = parseInt(sizeDesc.replace('"', ''));
                if ([7, 10, 12].includes(sizeNumber)) {
                    return sizeNumber;
                }
            }
        }
        return null; // Retorna null se não encontrar um tamanho válido
    };

    const extractDiscType = (formats) => {
        if (!formats || formats.length === 0) return null;
        const formatQty = parseInt(formats[0].qty);
        if (formatQty === 3) return 'triplo';
        if (formatQty === 2) return 'duplo';
        return 'simples';
    }

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

            {/* NOVO: Seção de busca do Discogs */}

            <fieldset style={{ border: '1px solid #C47D69', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', width: '100%' }}>
                <legend style={{ padding: '0 0.5rem' }}>Buscar no Discogs</legend>
                <div className='div-type'>
                    <label htmlFor="catalog-number">Número de Catálogo</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="text"
                            name="catalog-number"
                            value={catalogNumber}
                            onChange={(e) => setCatalogNumber(e.target.value)}
                            placeholder='Ex: 31C 064 422901'
                            disabled={inputDesativado}
                        />
                        <button type="button" onClick={handleSearchByCatalogNumber} className='btn-submit-disk' style={{ width: '100px', margin: 0 }}>Buscar</button>
                    </div>
                    {discogsError && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{discogsError}</p>}
                </div>

                {searchResults.length > 0 && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
                        <label>Selecione o lançamento correto:</label>
                        <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
                            {searchResults.map(result => (
                                <li
                                    key={result.id}
                                    onClick={() => handleSelectRelease(result.id)}
                                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '5px', borderRadius: '4px', hover: { backgroundColor: '#f0f0f0' } }}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c47d694d'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <img src={result.thumb} alt="capa" width="50" height="50" style={{ marginRight: '10px', borderRadius: '4px' }} />
                                    <div>
                                        <strong style={{ display: 'block' }}>{result.title}</strong>
                                        <span style={{ fontSize: '0.8rem' }}>{result.year} - {result.country} - {result.label?.join(', ')}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </fieldset>

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
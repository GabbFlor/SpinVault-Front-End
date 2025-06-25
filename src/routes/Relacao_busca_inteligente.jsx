import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Relacao_pesquisa from "../components/Relacao_pesquisa";
import Footer from "../components/Footer";
import Select from 'react-select'
import { useMediaQuery } from '@mui/material';
import Pesquisa_inteligente_style from "../styles/Pesquisa_inteligente_style";

// Listas para pesquisas mais aprofundadas
const Ano_disco = [
    { value: 50, label: "Década de 50" },
    { value: 60, label: "Década de 60" },
    { value: 70, label: "Década de 70" },
    { value: 80, label: "Década de 80" },
    { value: 90, label: "Década de 90" },
    { value: 2000, label: "Anos 2000" },
]

const Tamanhos = [
    { value: 12, label: 12 },
    { value: 10, label: 10 },
    { value: 7, label: 7 }
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

const Relacao_busca_inteligente = () => {
    const navigate = useNavigate();
    const [pesquisa, setPesquisa] = useState("");

    const [anoDisco, setAnoDisco] = useState(0);
    const [tamanhoDisco, setTamanhoDisco] = useState("");
    const [situacaoDisco, setSituacaoDisco] = useState("");
    const [situacaoCapa, setSituacaoCapa] = useState("");
    const [estilo, setEstilo] = useState("");
    const [inputDesativado, setInputDesativado] = useState(false);

    // capturando parâmetros de pesquisa da URL
    const [searchParams] = useSearchParams();

    // armazenando em variaveis:
    const qBusca = searchParams.get("nomeArtista");    
    const qAnoDisco = searchParams.get("anoDisco");
    const qTamanhoDisco = searchParams.get("tamanhoDisco");
    const qSituacaoDisco = searchParams.get("situacaoDisco");
    const qSituacaoCapa = searchParams.get("situacaoCapa");
    const qEstilo = searchParams.get("estilo");
    

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate(`/busca-inteligente?nomeArtista=${pesquisa}&anoDisco=${anoDisco}&tamanhoDisco=${tamanhoDisco}&situacaoDisco=${situacaoDisco}&situacaoCapa=${situacaoCapa}&estilo=${estilo}`)
    }

    const handleLimparFiltros = () => {
        navigate(`/busca-inteligente?nomeArtista=&anoDisco=&tamanhoDisco=&situacaoDisco=&situacaoCapa=&estilo=`)

        setPesquisa("");
        setAnoDisco("");
        setTamanhoDisco("");
        setSituacaoDisco("");
        setSituacaoCapa("");
        setEstilo("");
    }

    useEffect(() => {
        if (
                qBusca !== null && qBusca !== "" ||
                qAnoDisco !== null && qAnoDisco !== "" ||
                qTamanhoDisco !== null && qTamanhoDisco !== "" ||
                qSituacaoDisco !== null && qSituacaoDisco !== "" ||
                qSituacaoCapa !== null && qSituacaoCapa !== "" ||
                qEstilo !== null && qEstilo !== ""
              ) {
                setPesquisa(qBusca);
                setAnoDisco(Number(qAnoDisco));
                setTamanhoDisco(Number(qTamanhoDisco));
                setSituacaoDisco(qSituacaoDisco);
                setSituacaoCapa(qSituacaoCapa);
                setEstilo(qEstilo);
              }
    }, [searchParams])

    // usando o media query para ajustar a fonte
    const isLargeScreen = useMediaQuery('(min-width:1500px)');
    const isMediumScreen = useMediaQuery('(min-width: 370px) and (max-width: 800px)')
    const isSmallScreen = useMediaQuery('(max-width: 500px)');
    const fontSize = isSmallScreen ? "3vw" : isMediumScreen ? '2.5vw' : isLargeScreen ? '0.75vw' : '1vw';

    const customStyleSelect = {
        // se refere ao Select no estado padrao, sem nada selecionado
        control: (base, { isFocused }) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            border: isFocused ? '1px solidrgb(117, 86, 77)' : '1px solid rgb(51, 51, 51)',
            boxShadow: isFocused ? ' 0 0 0 1px #C47D69' : 'none',
            '&:hover': {
                border: '1px solid #C47D69',
            }
        }),
        container: (base) => ({
            ...base,
            width: "100%",
          }),
        // se refere a quando tem um valor selecionado no select
        singleValue: (base) => ({
            ...base,
            fontFamily: 'Michroma, sans-serif',
            fontSize,
            color: 'rgb(74, 74, 74)',
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

    return(
        <div className="Div-busca-inteligente Pag-relacao-discos">
            <Pesquisa_inteligente_style />

            <Header />

            <main>
                <h1 className="title">Pesquisa inteligente</h1>

                <section className="section-geral">
                    <nav className="nav-classificacoes">
                        <div>
                            <form className="form-pesquisar-artista" onSubmit={handleSubmit}>
                                <h2 className="title-section">Filtros</h2>

                                <div>
                                    <input 
                                        type="text"
                                        value={pesquisa}
                                        onChange={(e) => {
                                                setPesquisa(e.target.value);
                                            }
                                        }
                                        className="input-pesquisa"
                                        placeholder="Procure pelo nome do artista..."
                                        disabled={inputDesativado}
                                    />
                                </div>

                                <div className='div-select-pesquisa-inteligente'>
                                        <Select 
                                            options={Ano_disco} 
                                            value={Ano_disco.find(option => option.value === anoDisco) || null}
                                            onChange={(e) => setAnoDisco(e ? e.value : null)}
                                            styles={ customStyleSelect }
                                            placeholder="Ano do Disco"
                                            isDisabled={inputDesativado}
                                        />
                                </div>

                                <div className='div-select-pesquisa-inteligente'>
                                        <Select 
                                            options={Tamanhos} 
                                            value={Tamanhos.find(option => option.value === tamanhoDisco) || null}
                                            onChange={(e) => setTamanhoDisco(e ? e.value : null)}
                                            styles={ customStyleSelect }
                                            placeholder="Tamanho"
                                            isDisabled={inputDesativado}
                                        />
                                </div>

                                <div className='div-select-pesquisa-inteligente'>
                                        <Select 
                                            options={Situacao_disco} 
                                            value={Situacao_disco.find(option => option.value === situacaoDisco) || null}
                                            onChange={(e) => setSituacaoDisco(e ? e.value : null)}
                                            styles={customStyleSelect}
                                            placeholder="Situação do disco"
                                            isDisabled={inputDesativado}
                                        />
                                </div>

                                <div className='div-select-pesquisa-inteligente'>
                                        <Select 
                                            options={Situacao_capa} 
                                            value={Situacao_capa.find(option => option.value === situacaoCapa) || null}
                                            onChange={(e) => setSituacaoCapa(e ? e.value : null)}
                                            styles={customStyleSelect}
                                            placeholder="Situação da capa"
                                            isDisabled={inputDesativado}
                                        />
                                </div>

                                <div className='div-select-pesquisa-inteligente'>
                                        <Select 
                                            options={Estilo} 
                                            value={Estilo.find(option => option.value === estilo) || null}
                                            onChange={(e) => setEstilo(e ? e.value : null)}
                                            styles={customStyleSelect}
                                            placeholder="Estilo"
                                            isDisabled={inputDesativado}
                                        />
                                </div>

                                <button type="submit" className="btn-buscar" disabled={inputDesativado}>Aplicar Filtro</button>

                                <button type="button" className="btn-buscar" onClick={() => handleLimparFiltros()}>Limpar todos os filtros</button>
                            </form>
                        </div>
                    </nav>
                    <section className="section-table">
                        <h2 className="title-section">Resultado</h2>

                        <Relacao_pesquisa 
                            qBusca={qBusca === null ? "" : qBusca.toLowerCase()}
                            qAnoDisco={qAnoDisco}
                            qTamanhoDisco={qTamanhoDisco}
                            qSituacaoDisco={qSituacaoDisco}
                            qSituacaoCapa={qSituacaoCapa}
                            qEstilo={qEstilo}
                        />
                    </section>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Relacao_busca_inteligente;
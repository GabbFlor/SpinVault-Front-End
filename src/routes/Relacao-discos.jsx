import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Relacao_completa from "../components/Relacao_completa";
import Tabelas_style from "../styles/Tabelas_style";
import { useEffect } from "react";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import AdsTerra_style from "../styles/AdsTerra_style";
import AdsterraBanner from "../components/AdsterraBanner";

const Relacao_discos = () => {
    const { argumento } = useParams();
    const navigate = useNavigate();
    const { token, isAuthenticated, logout, role } = useAuth();

    useEffect(() => {
        if (argumento != "titulo-album" && argumento != "origem-disco" && argumento != "artista" && argumento != "ano" && argumento != "busca-inteligente") {
            navigate(`/error-not-found`)
        }
    })

    return (
        <div className="Pag-relacao-discos">
            <Tabelas_style />
            <AdsTerra_style />

            <Header />

            <main>
                <section className="ads-pag-banner">
                    <div >
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                </section>
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/home'}>HOME</Link>
                    </div>

                    <div>
                        <Link to={'/relacao/artista'} title="Nome do artista (A - Z)">Classificar <br />Artista</Link>

                        <Link to={'/relacao/titulo-album'} title="Titulo do album (A - Z)">Classificar <br />Titulo</Link>

                        <Link to={'/relacao/ano'} title="Ano (mais atual primeiro)">Classificar <br />Ano (p)</Link>

                        <Link to={'/relacao/origem-disco'} title="Internacionais primeiro">Classificar <br />Inter/Nac</Link>
                    </div>
                </nav>

                {argumento == "titulo-album" ? (
                    <Relacao_completa consulta={"Titulo_album"} />
                ) : argumento == "origem-disco" ? (
                    <Relacao_completa consulta={"Origem_disco"} />
                ) : argumento == "artista" ? (
                    <Relacao_completa consulta={"Nome_artista"} />
                ) : argumento == "ano" ? (
                    <Relacao_completa consulta={"Ano"} />
                ) : (
                    <Relacao_completa consulta={"busca-inteligente"} />
                )}
            </main>

            <Footer />
        </div>
    )
}

export default Relacao_discos;
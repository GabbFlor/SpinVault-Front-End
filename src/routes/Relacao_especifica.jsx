import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import Tabelas_style from "../styles/Tabelas_style";
import Relacao_nacional from "../components/Relacao_nacional";
import Footer from "../components/Footer";
import Relacao_internacional from "../components/Relacao_internacional";
import AdsterraBanner from "../components/AdsterraBanner";
import { useAuth } from "../AuthContext";
import AdsTerra_style from "../styles/AdsTerra_style";

const Relacao_especifica = () => {
    const { argumento } = useParams();
    const navigate = useNavigate();
    const { token, isAuthenticated, logout, role } = useAuth();

    useEffect(() => {
        if (argumento != "discos-nacionais" && argumento != "discos-internacionais") {
            navigate(`/error-not-found`)
        }
    })

    return (
        <div className="Pag-relacao-especifica Pag-relacao-discos">
            <Tabelas_style />
            <AdsTerra_style />

            <Header />

            <main>
                {/* banner ads. */}
                <section className="ads-pag-banner">
                    <div >
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                </section>
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/home'}>HOME</Link>
                    </div>

                    <div></div>
                </nav>

                {argumento == "discos-nacionais" ? (
                    <Relacao_nacional />
                ) : (
                    <Relacao_internacional />
                )}

            </main>

            <Footer />
        </div>
    )
}

export default Relacao_especifica;
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useEffect } from "react";
import Tabelas_style from "../styles/Tabelas_style";
import Relacao_nacional from "../components/Relacao_nacional";
import Footer from "../components/Footer";
import Relacao_internacional from "../components/Relacao_internacional";

const Relacao_especifica = () => {
    const { argumento } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(argumento != "discos-nacionais" && argumento != "discos-internacionais") {
            navigate(`/error-not-found`)
        }
    })

    return (
        <div className="Pag-relacao-especifica Pag-relacao-discos">
            <Tabelas_style />

            <Header />

            <main>
                <nav className="nav-classificacoes">
                    <div>
                        <Link to={'/'}>HOME</Link>
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
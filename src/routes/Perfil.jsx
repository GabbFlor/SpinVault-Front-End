import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Perfil_logado from "../components/Perfil_logado";
import Perfil_style from "../styles/Perfil_style";
import Footer from "../components/Footer";
import { useAuth } from "../AuthContext";
import { useMediaQuery } from "react-responsive";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";
import AdsTerra_style from "../styles/AdsTerra_style";
import AdsterraBanner from "../components/AdsterraBanner";

const Perfil = () => {
    const { profile_id } = useParams();
    const { token, isAuthenticated, logout, role } = useAuth();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-perfil">
                <Perfil_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <Perfil_logado />
                    </main>
                </div>

                <Footer />
            </div>
        )
    } else {
        return (
            <div className="Pag-perfil">
                <Perfil_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <Perfil_logado />
                    </main>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Perfil;
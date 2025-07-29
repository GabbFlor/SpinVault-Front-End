import { useMediaQuery } from "react-responsive";
import Footer from "../components/Footer";
import Form_edit_perfil from "../components/Form_edit_perfil";
import Header from "../components/Header";
import Perfil_style from "../styles/Perfil_style";
import AdsTerra_style from "../styles/AdsTerra_style";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";
import AdsterraBanner from "../components/AdsterraBanner";
import { useAuth } from "../AuthContext";

const Editar_perfil = () => {
    const { token, isAuthenticated, logout, role } = useAuth();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-editar-perfil">
                <Perfil_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <Form_edit_perfil />
                    </main>
                </div>

                <Footer />
            </div>
        )
    } else {
        return (
            <div className="Pag-editar-perfil">
                <Perfil_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <Form_edit_perfil />
                    </main>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Editar_perfil;
import Form_informacoes_gerais from "../components/Form_informacoes_gerais";
import Header from "../components/Header";
import { BsCardList } from "react-icons/bs";
import Informacoes_gerais_style from "../styles/Informacoes_gerais_style";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import { useAuth } from "../AuthContext";
import { useMediaQuery } from "react-responsive";
import AdsTerra_style from "../styles/AdsTerra_style";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";
import AdsterraBanner from "../components/AdsterraBanner";

const Informacoes_gerais = () => {
    const { token, isAuthenticated, logout, role } = useAuth();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-informacoes-gerais">
                <Informacoes_gerais_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <section className="section-form-infos-gerais">
                            <div className="form-esquerda">
                                <h1>Informações<br /> Gerais <BsCardList /></h1>
                            </div>

                            <Form_informacoes_gerais />
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        )
    } else {
        return (
            <div className="Pag-informacoes-gerais">
                <Informacoes_gerais_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <section className="section-form-infos-gerais">
                            <div className="form-esquerda">
                                <h1>Informações<br /> Gerais <BsCardList /></h1>
                            </div>

                            <Form_informacoes_gerais />
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        )
    }
}

export default Informacoes_gerais;
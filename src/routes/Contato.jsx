import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_Contato from "../components/Form_Contato";
import Header from "../components/Header";
import Contato_style from "../styles/Contato_style";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsTerra_style from "../styles/AdsTerra_style";
import { useAuth } from "../AuthContext";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";
import { useMediaQuery } from "react-responsive";
import AdsterraBanner from "../components/AdsterraBanner";

const Contato = () => {
    const { token, isAuthenticated, logout, role } = useAuth();

    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-Contato">
                <Contato_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <section className="section-form-contato">
                            <div className="form-esquerda">
                                <h1>Adoraríamos <br />ouvir você</h1>
                                <p>Sua mensagem é muito importante para nós. Responderemos em breve!</p>
                            </div>

                            <Form_Contato />
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        )
    } else {
        return (
            <div className="Pag-Contato">
                <Contato_style />
                <AdsTerra_style />

                <Header />

                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <section className="section-form-contato">
                            <div className="form-esquerda">
                                <h1>Adoraríamos <br />ouvir você</h1>
                                <p>Sua mensagem é muito importante para nós. Responderemos em breve!</p>
                            </div>

                            <Form_Contato />
                        </section>
                    </main>
                </div>

                <Footer />
            </div>
        )
    }

}

export default Contato;
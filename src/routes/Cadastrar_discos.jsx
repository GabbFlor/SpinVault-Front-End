import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_add_discos from "../components/Form_add_discos";
import Header from "../components/Header";
import Cadastrar_discos_style from "../styles/Cadastrar_discos_style";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AdsterraColunas from "../components/AdsterraColunas";
import AdsTerra_style from "../styles/AdsTerra_style";
import { useMediaQuery } from "react-responsive";
import AdsterraBanner from "../components/AdsterraBanner";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";

const Cadastrar_discos = () => {
    const { role } = useAuth();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-cadastrar-discos">
                <Cadastrar_discos_style />
                <AdsTerra_style />
                <Header />
                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <section className="section-form-add-disks">
                            <div className="form-esquerda">
                                <div className="esquerda-cima">
                                    <h1>Cadastro de<br />discos do<br />Spin Vault</h1>
                                    <p>Faça o cadastro aqui<br />para adicionar os<br />seus discos!</p>
                                </div>
                                <div className="esquerda-baixo">
                                    <p>Já tem os dados em uma planilha? Agilize seu cadastro <Link to={`/cadastrar-discos/excel`}><span>clique aqui!</span></Link>  para importar seu arquivo Excel.</p>
                                </div>
                            </div>

                            <Form_add_discos />
                        </section>
                    </main>
                </div>


                <Footer />
            </div>
        )
    } else {
        return (
            <div className="Pag-cadastrar-discos">
                <Cadastrar_discos_style />
                <AdsTerra_style />
                <Header />
                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <section className="section-form-add-disks">
                            <div className="form-esquerda">
                                <div className="esquerda-cima">
                                    <h1>Cadastro de<br />discos do<br />Spin Vault</h1>
                                    <p>Faça o cadastro aqui<br />para adicionar os<br />seus discos!</p>
                                </div>
                                <div className="esquerda-baixo">
                                    <p>Já tem os dados em uma planilha? Agilize seu cadastro <Link to={`/cadastrar-discos/excel`}><span>clique aqui!</span></Link>  para importar seu arquivo Excel.</p>
                                </div>
                            </div>

                            <Form_add_discos />
                        </section>
                    </main>
                </div>


                <Footer />
            </div>
        )
    }
}

export default Cadastrar_discos;
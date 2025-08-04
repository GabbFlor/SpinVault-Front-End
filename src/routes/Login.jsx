import { useMediaQuery } from "react-responsive";
import { useAuth } from "../AuthContext";
import AdsterraColunas from "../components/AdsterraColunas";
import Form_login from "../components/Form_login";
import AdsTerra_style from "../styles/AdsTerra_style";
import Registro_login_style from "../styles/Registro_Login_style";
import AdsterraBanner from "../components/AdsterraBanner";
import AdsterraBannerColunas from "../components/AdsterraBannerColunas";

const Login = () => {
    const { token, isAuthenticated, logout, role } = useAuth();
    const isNormalScreen = useMediaQuery({ minWidth: 800 })

    if (isNormalScreen) {
        return (
            <div className="Pag-registro">
                <Registro_login_style />
                <AdsTerra_style />

                <div className="conteudo-pagina">
                    <div className="ads-pag">
                        {role === 'USER_FREE' && <AdsterraColunas />}
                        {role === 'USER_FREE' && <AdsterraBannerColunas />}
                    </div>
                    <main>
                        <section className="section-form-registro">
                            <Form_login />

                            <div className="form-esquerda">
                                <h1>Bem-vindo(a) de volta ao SpinVault!</h1>

                                <p>Acesse sua conta e continue aproveitando todos os nossos serviços.</p>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        )
    } else {
        return (
            <div className="Pag-registro">
                <Registro_login_style />
                <AdsTerra_style />

                <div className="conteudo-pagina">
                    <div className="ads-pag-banner">
                        {role === 'USER_FREE' && <AdsterraBanner />}
                    </div>
                    <main>
                        <section className="section-form-registro">
                            <Form_login />

                            <div className="form-esquerda">
                                <h1>Bem-vindo(a) de volta ao SpinVault!</h1>

                                <p>Acesse sua conta e continue aproveitando todos os nossos serviços.</p>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        )
    }
}

export default Login;
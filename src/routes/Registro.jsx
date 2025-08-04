import { useMediaQuery } from "react-responsive"
import { useAuth } from "../AuthContext"
import AdsterraColunas from "../components/AdsterraColunas"
import Form_registro from "../components/Form_registro"
import AdsTerra_style from "../styles/AdsTerra_style"
import Registro_login_style from "../styles/Registro_Login_style"
import AdsterraBanner from "../components/AdsterraBanner"
import AdsterraBannerColunas from "../components/AdsterraBannerColunas"

const Registro = () => {
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
                            <div className="form-esquerda">
                                <h1>Seja bem<br />vindo(a) ao SpinVault!</h1>

                                <p>Preencha o formulário e crie a sua conta para usar os nossos serviços.</p>
                            </div>

                            <Form_registro />
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
                            <div className="form-esquerda">
                                <h1>Seja bem<br />vindo(a) ao SpinVault!</h1>

                                <p>Preencha o formulário e crie a sua conta para usar os nossos serviços.</p>
                            </div>

                            <Form_registro />
                        </section>
                    </main>
                </div>
            </div>
        )
    }
}

export default Registro
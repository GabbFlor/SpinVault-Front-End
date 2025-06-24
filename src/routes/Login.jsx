import Form_login from "../components/Form_login";
import Registro_login_style from "../styles/Registro_Login_style";

const Login = () => {
    return (
        <div className="Pag-registro">
            <Registro_login_style />

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
    )
}

export default Login;
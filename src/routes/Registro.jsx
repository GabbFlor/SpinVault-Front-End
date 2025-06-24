import Form_registro from "../components/Form_registro"
import Registro_login_style from "../styles/Registro_Login_style"

const Registro = () => {
    return (
        <div className="Pag-registro">
            <Registro_login_style />

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
    )
}

export default Registro
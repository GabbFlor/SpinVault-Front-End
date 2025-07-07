import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_Contato from "../components/Form_Contato";
import Header from "../components/Header";
import Contato_style from "../styles/Contato_style";

const Contato = () => {
    return (
        <div className="Pag-Contato">
            <Contato_style />

            <Header />

            <main>
                <section className="section-form-contato">
                    <div className="form-esquerda">
                        <h1>Adoraríamos <br />ouvir você</h1>
                        <p>Sua mensagem é muito importante para nós. Responderemos em breve!</p>
                    </div>

                    <Form_Contato />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Contato;
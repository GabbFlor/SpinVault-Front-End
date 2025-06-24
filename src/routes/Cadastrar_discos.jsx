import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_add_discos from "../components/Form_add_discos";
import Header from "../components/Header";
import Cadastrar_discos_style from "../styles/Cadastrar_discos_style";

const Cadastrar_discos = () => {
    return (
        <div className="Pag-cadastrar-discos">
            <Cadastrar_discos_style />

            <Header />

            <main>
                <section className="section-form-add-disks">
                    <div className="form-esquerda">
                        <h1>Cadastro de<br />discos do<br />Spin Vault</h1>
                        <p>Faça o cadastro aqui<br />para adicionar os<br />seus discos!</p>
                    </div>

                    <Form_add_discos />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Cadastrar_discos;
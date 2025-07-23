import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_add_excel from "../components/Form_add_excel";
import Header from "../components/Header";
import Cadastrar_discos_style from "../styles/Cadastrar_discos_excel_style";

const Cadastrar_discos_excel = () => {
    return (
        <div className="Pag-cadastrar-discos">
            <Cadastrar_discos_style />

            <Header />

            <main>
                <section className="section-form-add-excel">
                    <div className="form-esquerda">
                        <h1>Cadastre com a sua tabela</h1>
                    </div>

                    <Form_add_excel/>
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Cadastrar_discos_excel;
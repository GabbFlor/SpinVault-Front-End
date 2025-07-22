import { Link, useParams } from "react-router-dom"
import Form_edit_discos from "../components/Form_edit_discos"
import Header from "../components/Header"
import Cadastrar_discos_style from "../styles/Cadastrar_discos_style"
import Footer from "../components/Footer"
import Swal from "sweetalert2"

const Editar_disco = () => {
    const { id } = useParams();

    return (
        <div className="Pag-editar-perfil Pag-cadastrar-discos">
            <Cadastrar_discos_style />

            <Header />

            <main>
            <section className="section-form-add-disks">
                    <div className="form-esquerda">
                        <h1>Edição ou <br /> descarte dos <br />discos da <br />sua coleção</h1>
                        <p>Preencha o formulário <br />e confirme as alterações <br />para editar.</p>

                        <Link  to={`/relacao/titulo-album`}> {`<`} Voltar para a tabela</Link>
                    </div>

                    <Form_edit_discos id_disco={id} />
                </section>
            </main>

            <Footer />
        </div>
    )
}
export default Editar_disco
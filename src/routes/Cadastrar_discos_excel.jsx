import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Form_add_excel from "../components/Form_add_excel";
import Header from "../components/Header";
import Cadastrar_discos_style from "../styles/Cadastrar_discos_excel_style";

const Cadastrar_discos_excel = () => {
    const fileUrl = '/documents/tutorial_migracao.pdf';
    const fileName = 'tutorial_migracao.pdf';
    return (
        <div className="Pag-cadastrar-discos">
            <Cadastrar_discos_style />

            <Header />
            {/* fds */}
            <main>
                <section className="section-form-add-excel">
                    <div className="form-esquerda">
                        <div className="esquerda-cima">
                            <h1>Cadastre com a sua tabela</h1>
                        </div>
                        <div className="esquerda-baixo">
                            <p>
                                Para facilitar você e nosso sistema siga esse tutotial.
                                <a
                                    href={fileUrl}
                                    download={fileName} // A propriedade 'download' força o download
                                    className="botao-bonito" // Adicione uma classe para estilizar se quiser
                                >
                                CLIQUE AQUI
                                </a>
                            </p>
                        </div>
                    </div>
                    <Form_add_excel />
                </section>
            </main>

            <Footer />
        </div>
    )
}

export default Cadastrar_discos_excel;
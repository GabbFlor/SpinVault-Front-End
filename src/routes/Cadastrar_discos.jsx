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

            <Footer />
        </div>
    )
}

export default Cadastrar_discos;
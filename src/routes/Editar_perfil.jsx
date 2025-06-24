import Footer from "../components/Footer";
import Form_edit_perfil from "../components/Form_edit_perfil";
import Header from "../components/Header";
import Perfil_style from "../styles/Perfil_style";

const Editar_perfil = () => {
    return (
        <div className="Pag-editar-perfil">
            <Perfil_style />

            <Header />

            <main>
                <Form_edit_perfil />
            </main>

            <Footer />
        </div>
    )
}

export default Editar_perfil;
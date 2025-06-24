import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Perfil_logado from "../components/Perfil_logado";
import Perfil_style from "../styles/Perfil_style";
import Footer from "../components/Footer";

const Perfil = () => {
    const { profile_id } = useParams();

    return (
        <div className="Pag-perfil">
            <Perfil_style />

            <Header />

            <main>
                <Perfil_logado />
            </main>

            <Footer />
        </div>
    )
}

export default Perfil;
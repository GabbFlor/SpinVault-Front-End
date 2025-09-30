import Swal from "sweetalert2";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tabelas_style from "../styles/Tabelas_style";
import Ver_tabela_excel from "../components/Ver_tabelas_excel";

const Pag_ver_tabelas = () => {

    return (
        <div className="Pag-relacao-discos">
            <Tabelas_style/>
            <Header />
            {/* fds */}
            <Ver_tabela_excel/>

            <Footer />
        </div>
    )
}

export default Pag_ver_tabelas;
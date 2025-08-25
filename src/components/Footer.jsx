import Logo from "../assets/logo_footer.webp"
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs"
import Footer_style from "../styles/Footer_style";
import { Link, } from 'react-router-dom'
import { useAuth } from "../AuthContext";

const Footer = () => {
    const { role } = useAuth();
    return (
        <footer>
            <Footer_style />

            <div className="div-img">
                <img src={Logo} alt="logo" />
            </div>

            <div className="grey-line">
                {/* linha cinza */}
            </div>
            <div className="div-text">
                <p>Todo o conteúdo deste site é protegido por direitos autorais e a reprodução não autorizada é proibida. <br />
                    Seus dados pessoais são coletados e protegidos de forma segura, em total conformidade com a Lei Geral de Proteção de Dados (LGPD). <br />
                    Ao utilizar nosso site, você concorda com nossa Política de Privacidade e com os Termos de Uso que regem nossa plataforma.</p>
            </div>
            <div className="contatos">
                <div className="pagina-contato">
                    <nav>
                        <Link to={"/contato"}>entre em contato</Link>
                        {role === 'ADMIN' && (<Link to={"/ver-contato"}>veja os contatos</Link>)}
                        
                    </nav>
                </div>
                <div className="div-redes-sociais">
                    <p>Siga:</p>

                    <nav>
                        <a href="https://www.instagram.com/spinvault_oficial/" target="blank_"><BsInstagram /></a>
                        <a href="https://www.facebook.com/profile.php?id=61577318084363" target="blank_"><BsFacebook /></a>
                    </nav>
                </div>
            </div>


        </footer>
    )
}

export default Footer;
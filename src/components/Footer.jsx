import Logo from "../assets/logo_footer.png"
import { BsInstagram, BsFacebook, BsTwitterX } from "react-icons/bs"
import Footer_style from "../styles/Footer_style";

const Footer = () => {
    return (
        <footer>
            <Footer_style />

            <div className="div-img">
                <img src={Logo} alt="logo" />
            </div>

            <div className="grey-line">
                {/* linha cinza */}
            </div>

            <div className="div-redes-sociais">
                <p>Siga:</p>

                <nav>
                    <a href="https://www.instagram.com/spinvault_oficial/" target="blank_"><BsInstagram /></a>
                    <a href="https://www.facebook.com/profile.php?id=61577318084363" target="blank_"><BsFacebook /></a>
                </nav>
            </div>
        </footer>
    )
}

export default Footer;
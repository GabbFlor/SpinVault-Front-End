import Header_Style from "../styles/Header_Style";
import logo_Site from '../assets/logo_escrita.webp';
import { BsPersonFill, BsHouseDoorFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Header_apresentacao = () => {
    return (
        <header>
            <Header_Style />

            <Link to={"/home"} className='header-logo' title='Início'><img src={logo_Site} alt="Logo" /></Link>

            <nav className="header-icons-div">
                <Link to={"/auth/login"} title='Perfil'><BsPersonFill className='icon-person' /></Link>

                <Link to={"/home"} title='Página inicial'><BsHouseDoorFill className='icon-house' /></Link>
            </nav>
        </header>
    )
}

export default Header_apresentacao;
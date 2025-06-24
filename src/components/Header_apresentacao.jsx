import Header_Style from "../styles/Header_Style";
import logo_Site from '../assets/logo_escrita.png';
import { BsPersonFill, BsSearch } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Header_apresentacao = () => {
    return (
        <header>
            <Header_Style />

            <Link to={"/home"} className='header-logo' title='Início'><img src={logo_Site} alt="Logo" /></Link>

            <Link to={"/auth/login"} title='Perfil'><BsPersonFill className='icon-person' /></Link>
        </header>
    )
}

export default Header_apresentacao;
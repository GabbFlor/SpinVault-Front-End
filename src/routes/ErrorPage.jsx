import { Link } from 'react-router-dom';
import Error_img from '../assets/favicon.png'
import Error_page_style from '../styles/Error_page_style';

const Error_page = () => {
    return (
        <div className="Pag-error">
            <Error_page_style />

            <img src={Error_img} alt="Logo" />

            <section>
                <h1>Página não encontrada!</h1>
                
                <div>
                    <p>Clique aqui para voltar para a <Link to={'/home'}>Página inicial</Link></p>
                    <p>Ou clique aqui para ir a <Link to={'/auth/login'}>Página de login</Link></p>
                </div>
            </section>
        </div>
    )
}

export default Error_page;
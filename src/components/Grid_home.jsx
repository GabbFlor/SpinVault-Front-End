import { Link } from 'react-router-dom'
import ImgGrid1 from '../assets/grid1.webp'
import ImgGrid2 from '../assets/grid2.webp'
import ImgGrid3 from '../assets/grid3.webp'
import ImgGrid4 from '../assets/grid4.webp'
import ImgGrid5 from '../assets/grid5.webp'
import ImgGrid6 from '../assets/grid6.webp'

const Grid_home = () => {
    return (
        <section className="container-grid">
            {/* cadastrar discos */}
            <div className="item-grid">
                <img src={ImgGrid1} alt="img1" />
                <Link to={`/cadastrar-discos`}>Clique aqui!</Link>
            </div>

            {/* relacao completa */}
            <div className="item-grid">
                <img src={ImgGrid2} alt="img2" />
                <Link to={`/relacao/titulo-album`}>Clique aqui!</Link>
            </div>

            {/* discos nacionais */}
            <div className="item-grid">
                <img src={ImgGrid3} alt="img3" />
                <Link to={`/relacao-especifica/discos-nacionais`}>Clique aqui!</Link>
            </div>

            {/* discos internacionais */}
            <div className="item-grid">
                <img src={ImgGrid4} alt="img4" />
                <Link to={`/relacao-especifica/discos-internacionais`}>Clique aqui!</Link>
            </div>

            {/* infos gerais */}
            <div className="item-grid">
                <img src={ImgGrid5} alt="img5" />
                <Link to={`/informacoes-gerais`}>Clique aqui!</Link>
            </div>

            {/* busca inteligente */}
            <div className="item-grid">
                <img src={ImgGrid6} alt="img6" />
                <Link to={`/busca-inteligente`}>Clique aqui!</Link>
            </div>
        </section>
    )
}

export default Grid_home;
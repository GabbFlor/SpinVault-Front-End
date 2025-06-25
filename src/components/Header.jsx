import Icon_disk_img from '../assets/icon_disk.webp'
import { BsPersonFill, BsSearch } from "react-icons/bs";
import Header_Style from '../styles/Header_Style';
import logo_Site from '../assets/logo_escrita.webp'
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import { apiUrl } from '../API';

const Header = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { token } = useAuth();

    // funcao que retorna a quantidade de discos que o usuario adicionou
    const contadorDeDiscos = async () => {
        try {
            let response = await axios.get(`${apiUrl}/discos/contar`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.status === 200) {
                let qtdDiscos = response.data.qtdDiscos;

                return qtdDiscos;
            }
        } catch(error) {
            if (error.response.status === 403) {
                return 0;
            } else {
                console.error(`Erro ao contar discos do usuário: ${error.message}`)
                return 0;
            }
        }
    }

    // adiciona a quantidade de discos ao cache
    const { data: countDisks, isLoading, error } = useQuery({
        // TROCAR OS VALORES "10" PELO ID DO USUÁRIO NO BANCO DE DADOS
        queryKey: ['countDisks', token],

        queryFn: () => contadorDeDiscos(),

        staleTime: 1000 * 60 * 5,
    });
    
    const handleSearch = (e) => {
        e.preventDefault();
        
        navigate(`/busca-inteligente?nomeArtista=${search}&anoDisco=&tamanhoDisco=&situacaoDisco=&situacaoCapa=&estilo=`)
    }

    return (
        <header>
            <Header_Style />

            <Link to={"/home"} className='header-logo' title='Início'><img src={logo_Site} alt="Logo" /></Link>

            <section className="section-search">
                <form onSubmit={handleSearch}>
                    <input 
                        type="text"
                        placeholder="Pesquisar artista..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    />
                    <button type="submit"><BsSearch/></button>
                </form>

                <div className="disk-counter">
                    <img src={Icon_disk_img} alt="" />

                    <div>
                        <p>{isLoading ? ("...") : (countDisks)}</p>
                    </div>
                </div>
            </section>

            <Link to={"/perfil"} title='Perfil'><BsPersonFill className='icon-person' /></Link>
        </header>
    )
}

export default Header;
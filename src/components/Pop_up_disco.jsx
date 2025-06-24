import { Link } from "react-router-dom";
import { BsX } from "react-icons/bs";
import Pop_up_Style from "../styles/Pop_up_style";

const Pop_up_disco = ({ dados, fechar }) => {
    return (
        <div className="tela-toda">
            <Pop_up_Style />

            <section className="Pop-up-disco">
                {/* header */}
                <div className="div-title">
                    <h1>Informações do disco</h1>

                    {/* btn de fechar o pop-up */}
                    <button type="button" onClick={fechar}><BsX/></button>
                </div>

                <form>
                    <div>
                        <label>Artista:</label>
                        <input type="text" value={dados.nome_artista} disabled />
                    </div>
                    
                    <div>
                        <label>Título:</label>
                        <input type="text" value={dados.titulo_album} disabled />
                    </div>
                    
                    <div>
                        <label>Tamanho:</label>
                        <input type="text" value={dados.tamanho} disabled />
                    </div>
                    
                    <div>
                        <label>Ano (p):</label>
                        <input type="text" value={dados.ano} disabled />
                    </div>

                    <div>
                        <label>Ano Tiragem (p):</label>
                        <input type="text" value={dados.ano_tiragem} disabled />
                    </div>
                    
                    <div>
                        <label>Origem artista:</label>
                        <input type="text" value={dados.origem_artista} disabled />
                    </div>
                    
                    <div>
                        <label>Origem disco:</label>
                        <input type="text" value={dados.origem_disco} disabled />
                    </div>
                    
                    <div>
                        <label>Situação disco:</label>
                        <input type="text" value={dados.situacao_disco} disabled />
                    </div>
                    
                    <div>
                        <label>Situação capa:</label>
                        <input type="text" value={dados.situacao_capa} disabled />
                    </div>
                    
                    <div>
                        <label>Estilo:</label>
                        <input type="text" value={dados.estilo} disabled />
                    </div>
                    
                    <div>
                        <label>Tipo:</label>
                        <input type="text" value={dados.tipo} disabled />
                    </div>
                    
                    <div>
                        <label>Encarte:</label>
                        <input type="text" value={dados.encarte == true ? "Sim" : "Não"} disabled />
                    </div>
                    
                    <div>
                        <label>Observação:</label>
                        <textarea rows={7} type="text" value={dados.observacoes} disabled />
                    </div>
                    
                    <div className="div-btn">
                        <Link className="btn-edit-pop-up" to={`/editar-disco/${dados.id}`}>Editar</Link>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Pop_up_disco;
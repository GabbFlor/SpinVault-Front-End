import { BsX } from "react-icons/bs";
import Pop_up_Style from "../styles/Pop_up_style"; // Reutilizando o mesmo estilo

const Pop_up_migracao = ({ dados, fechar }) => {
    return (
        <div className="tela-toda">
            <Pop_up_Style />

            <section className="Pop-up-disco"> {/* Você pode renomear esta classe no CSS se preferir */}
                {/* header */}
                <div className="div-title">
                    <h1>Detalhes da Migração</h1>

                    {/* Botão para fechar o pop-up */}
                    <button type="button" onClick={fechar}><BsX/></button>
                </div>

                <form>
                    <div>
                        <label>Data de Criação:</label>
                        {/* Formatando a data para melhor visualização */}
                        <input type="text" value={new Date(dados.criado_em).toLocaleString('pt-BR')} disabled />
                    </div>
                    
                    <div>
                        <label>Caminho do Arquivo:</label>
                        <input type="text" value={dados.arquivo_path} disabled />
                    </div>
                    
                    <div>
                        <label>Estado:</label>
                        <input type="text" value={dados.estado} disabled />
                    </div>
                    
                    <div>
                        <label>Mensagem da Migração:</label>
                        <textarea rows={5} type="text" value={dados.msg_migracao} disabled />
                    </div>

                    <div>
                        <label>Observações:</label>
                        <textarea rows={7} type="text" value={dados.observacoes} disabled />
                    </div>
                    
                    {/* Botão de editar foi removido, mas você pode adicioná-lo aqui se necessário */}
                </form>
            </section>
        </div>
    )
}

export default Pop_up_migracao;
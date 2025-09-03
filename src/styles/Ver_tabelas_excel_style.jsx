import { createGlobalStyle } from "styled-components";

const Ver_tabela_excel_style = createGlobalStyle`
    .Pag-Ver-tabelas-excel {
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, #c47d69 0%, #000000 60%);
        width: 100%;
    }

    .Pag-Ver-tabelas-excel main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: 100vh; /* dá fallback para todos os navegadores */
        height: auto;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
export default Ver_tabela_excel_style;
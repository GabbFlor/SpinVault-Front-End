import { createGlobalStyle } from "styled-components";

const Ver_contato_style = createGlobalStyle`

    .Pag-ver-contato {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }
    .Pag-ver-contato main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .container-contato {
        display: inline-flex;
        flex-direction: column;
        padding: 25px;
        align-items: center;
        width: 80%;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 1px solid #e0e0e0;
        border-radius: 8px;
    }

    .linha-contato {
        margin: 10px;
        width: 90%;
        height: 5px;
        border-radius: 50px;
        background-color: #c47d69;
    }

    .caixa-mensagem {
        display: inline-flex;
        justify-content: center;
        width: 90%;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 15px;
        background-color: #fff;
    }



`

export default Ver_contato_style;
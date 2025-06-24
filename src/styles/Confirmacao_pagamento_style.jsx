import { createGlobalStyle } from "styled-components";

const Confirmacao_pagamento_style = createGlobalStyle `
    .Pag-confirmacao-pagamento {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: white;
        width: 100%;
    }

    .Pag-confirmacao-pagamento main {
        width: 75%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .Pag-confirmacao-pagamento main h1 {
        font-size: 3vw;
        text-align: center;
    }

    .Pag-confirmacao-pagamento main h2 {
        font-size: 2.5vw;
    }

    .Pag-confirmacao-pagamento main p {
        font-size: 2vw;
        text-align: center;
    }

    .Pag-confirmacao-pagamento main img {
        width: 125px;
    }

    @media (max-width: 800px) {
        .Pag-confirmacao-pagamento main {
            width: 85%;
            /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
            min-height: fit-content;
            height: calc(85vh - 60px);
            padding: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 100px;
        }

        .Pag-confirmacao-pagamento main h1 {
            font-size: 4.25vw;
        }

        .Pag-confirmacao-pagamento main h2 {
            font-size: 3.75vw;
        }

        .Pag-confirmacao-pagamento main p {
            font-size: 2.5vw;
        }

        .Pag-confirmacao-pagamento main img {
            width: 125px;
        }
    }

    @media (max-width: 500px) {
        .Pag-confirmacao-pagamento main {
            width: 90%;
            /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
            min-height: fit-content;
            height: calc(85vh - 60px);
            padding: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 125px;
        }

        .Pag-confirmacao-pagamento main h1 {
            font-size: 5vw;
        }

        .Pag-confirmacao-pagamento main h2 {
            font-size: 4.25vw;
        }

        .Pag-confirmacao-pagamento main p {
            font-size: 3.25vw;
        }

        .Pag-confirmacao-pagamento main img {
            width: 100px;
        }
    }
`

export default Confirmacao_pagamento_style;
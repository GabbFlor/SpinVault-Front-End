import { createGlobalStyle } from "styled-components";

const Footer_style = createGlobalStyle`
    footer {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
    }

    .grey-line {
        background-color: grey;
        width: 95vw;
        height: 5px;
    }

    footer div {
        width: 95vw;
    }

    .div-img {
        display: inline-flex;
        justify-content: flex-start;
    }

    .div-img img {
        width: 200px;
        margin: 15px;
    }
    .div-text {
        display: inline-flex;
        justify-content: center;
    }
    .div-text p {
        text-align: center;
        font-size: 1vw;
    }
    .contatos {
        display: flex;
        flex-direction: row;

    }
    .pagina-contato {
        display: inline-flex;
        align-items: center;
        justify-content: flex-start;
        gap: 5px;
        padding: 5px 0;
    }
    .pagina-contato a {
        display: inline-flex;
        align-items: center;
        font-size: 1.25vw;
        color: black;
    }
    .pagina-contato nav {
        display: inline-flex;
        align-items: center;
        font-size: 1.45vw;
        gap: 5px;
        cursor: pointer;
    }
    .div-redes-sociais {
        display: inline-flex;
        align-items: center;
        justify-content: flex-end;
        gap: 5px;
        padding: 5px 0;
    }

    .div-redes-sociais a {
        display: inline-flex;
        align-items: center;
        font-size: 1.25vw;
        color: black;
    }

    .div-redes-sociais nav {
        display: inline-flex;
        align-items: center;
        font-size: 1.45vw;
        gap: 5px;
        cursor: pointer;
    }

    @media (max-width: 800px) {
        .div-redes-sociais a {
            font-size: 2.25vw;
        }
        .pagina-contato a {
            font-size: 2.25vw;
        }
        .div-text p {
        text-align: center;
        font-size: 1.50vw;
    }
    }

    @media (max-width: 500px) {
        .div-redes-sociais a {
            font-size: 4vw;
        }
        .pagina-contato a {
            font-size: 4vw;
        }
        .div-text p {
        text-align: center;
        font-size: 1.9vw;
        }
    }
`

export default Footer_style;
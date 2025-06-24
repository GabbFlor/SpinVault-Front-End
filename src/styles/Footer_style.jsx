import { createGlobalStyle } from "styled-components";

const Footer_style = createGlobalStyle `
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
    }

    @media (max-width: 500px) {
        .div-redes-sociais a {
            font-size: 4vw;
        }
    }
`

export default Footer_style;
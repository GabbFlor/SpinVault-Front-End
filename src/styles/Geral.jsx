import { createGlobalStyle } from "styled-components";

const Geral = createGlobalStyle `
    * {
        padding: 0;
        margin: 0;
        text-decoration: none;
        box-sizing: border-box;

        font-family: "Jockey One", sans-serif;
        font-style: normal;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    #root {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
    }

    .carregamento {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .carregamento-perfil-page {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export default Geral;
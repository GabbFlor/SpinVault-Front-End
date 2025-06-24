import { createGlobalStyle } from "styled-components";
import Background_image from "../assets/background_infos_gerais.jpeg"

const Informacoes_gerais_style = createGlobalStyle `
    .Pag-informacoes-gerais {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }

    .Pag-informacoes-gerais main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-form-infos-gerais {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 65vw;
        max-height: 82.5vh;
        background-color: white;
        border-radius: 20px;
        overflow: hidden;
    }

    .form-esquerda {
        position: relative;
        width: 50%;
        height: 100%;
        color: white;
        z-index: 1;
        padding: 5.75%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .form-esquerda::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${Background_image});
        background-size: cover;
        background-position: bottom;
        filter: brightness(0.40);
        z-index: 0;
    }

    .form-esquerda h1, .title-mobile {
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        position: relative;
    }

    .form-esquerda h1 {
        font-size: 3vw;
    }

    .form-direita {
        background-color: white;
        width: 50%;
        height: 100%;
        padding: 25px;
        box-sizing: border-box;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 15px;
    }

    form div {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    form div label {
        cursor: text;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
    }

    form div input {
        outline: none;
        padding: 2.5px 0 2.5px 10px;
        border-radius: 2.5px;
        border: 1px solid #ccc;
        height: 38px;
        width: 100%;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
        color: rgb(105, 105, 105);
    }

    form div input:hover {
        border: 1px solid #C47D69;
    }

    form div input::placeholder {
        color: #888;
    }

    .btn-refetch {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #c47d69;
        border: 2px solid #c47d69;
        font-size: 1.35vw;
        min-width: 6vw;
        height: 50px;
        text-align: center;
        padding: 0 15px;
        border-radius: 15px;
        transition: border, 0.3s;
        // width: fit-content;
        cursor: pointer;
    }

    .btn-refetch:hover {
        border: 2px solid white;
        transition: border, 0.3s;
        background-color: #aa6b5a;
    }

    .btn-refetch:disabled {
        background-color:rgb(182, 148, 139);
        border: 2px solid rgb(182, 148, 139);
        cursor: not-allowed;
    }

    .carregamento2 {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title-mobile {
        display: none;
    }

    @media (min-width: 1500px) {
        .form-esquerda h1 {
            font-size: 2.5vw;
        }

        form div label {
            font-size:0.75vw;
        }

        form div input {
            font-size: 0.75vw;
        }

        .btn-refetch {
            font-size: 1vw;
        }
    }


    @media (max-width: 500px) {
        .form-esquerda {
            display: none;
        }

        .form-direita {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        form div label {
            font-size: 3vw;
        }

        .section-form-infos-gerais {
            border-radius: 15px;
            width: 80vw;
        }

        form div input {
            font-size: 3vw;
        }

        .btn-refetch {
            font-size: 3.5vw;
        }

        .title-mobile {
            display: block;
            font-size: 3.5vw;
            font-weight: 600;
            margin-bottom: 10px;
            text-align: center;
        }
    }

    @media (max-width: 800px) {
        .form-esquerda {
            display: none;
        }

        .form-direita {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        form div label {
            font-size: 2.5vw;
        }

        .section-form-infos-gerais {
            border-radius: 15px;
            width: 80vw;
        }

        form div input {
            font-size: 2.5vw;
        }

        .btn-refetch {
            font-size: 3vw;
        }

        .title-mobile {
            display: block;
            font-size: 3vw;
            font-weight: 600;
            margin-bottom: 10px;
            text-align: center;
        }
    }
`

export default Informacoes_gerais_style;
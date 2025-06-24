import { createGlobalStyle } from "styled-components";
import Background_image from '../assets/background-registro-login.jpeg'

const Registro_login_style = createGlobalStyle `
    .Pag-registro {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }

    .Pag-registro main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: 100vh;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .section-form-registro {
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        width: 65vw;
        height: fit-content;
        max-height: 80vh;
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

    .form-esquerda h1, .form-esquerda p, .title-mobile {
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        position: relative;
    }

    .form-esquerda h1 {
        font-size: 3vw;
    }

    .form-esquerda p {
        font-size: 1.05vw;
    }

    .form-direita {
        background-color: white;
        width: 50%;
        height: 100%;
        height: fit-content;
        max-height: 80vh;
        padding: 25px;
        box-sizing: border-box;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-start;
        gap: 15px;
    }

    .form-alinhado {
        justify-content: center !important;
        height: 80vh;
    }

    .form-direita div:not(.div-select div) {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .form-direita div:not(.div-select div) {
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
    }

    .form-direita label, .form-direita a, .form-direita span {
        cursor: text;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
    }

    .form-direita a, .form-direita span {
        cursor: pointer;
        color: #a66958;
    }

    .form-direita a:hover, .form-direita span:hover {
        text-decoration: underline;
    }

    .form-direita input:not(.div-select input) {
        outline: none;
        padding: 2.5px 0 2.5px 10px;
        border-radius: 2.5px;
        border: 1px solid #ccc;
        height: 38px;
        width: 100%;
        font-size: 12.5px;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
        color: rgb(105, 105, 105);
    }

    .form-direita input:hover {
        border: 1px solid #C47D69;
    }

    .form-direita input::placeholder {
        color: #888;
    }

    .form-direita input:focus {
        box-shadow: 0 0 0 1px #C47D69;
        border: 1px solid #C47D69;
    }

    .btn-submit-registro {
        background-color: #C47D69;
        color: black;
        border: none;
        outline: none;
        width: fit-content;
        padding: 10px 5px 10px 5px;
        font-family: "Michroma", sans-serif;
        font-weight: 400;
        font-size: 1vw;
        border-radius: 3px;
        transition: 0.3s ease background-color;
    }

    .btn-submit-registro:hover {
        cursor: pointer;
        background-color: #da8c77;
        transition: 0.23 ease background-color;
    }

    .btn-submit-registro:disabled {
        background-color: #bfa69f;
    }

    .input-senha {
        position: relative;
    }

    .btn-show-passw {
        background-color: transparent;
        width: fit-content;
        border: none;
        outline: none;
        font-size: 17px;
        cursor: pointer;
        position: absolute;
        right: 1%;
        bottom: 8%;
    }

    .title-mobile {
        display: none;
    }

    .title-mudar-senha {
        display: block;
        font-size: 2vw;
        font-weight: 600;
        text-align: center;
    }

    .Pag-mudar-senha main form {
        align-items: center;
        justify-content: flex-start;
        border-radius: 7.5px;
        width: 25vw;
    }

    @media (min-width: 1500px) {
        .form-esquerda h1 {
            font-size: 2.5vw;
        }

        .form-esquerda p {
            font-size: 0.85vw;
        }

        .form-direita label, .form-direita span {
            font-size: 0.75vw;
        }

        .form-direita a {
            font-size: 0.75vw;
        }

        .form-direita input {
            font-size: 0.75vw !important;
        }

        .btn-submit-registro {
            font-size: 0.75vw;
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

        .form-direita label, .form-direita a, .form-direita span {
            font-size: 2.5vw;
        }

        .form-direita input:not(.div-select input) {
            font-size: 2.5vw;
        }

        .btn-submit-registro {
            font-size: 2vw;
        }

        .title-mobile {
            display: block;
            font-size: 3.5vw;
            font-weight: 600;
            text-align: center;
        }

        .section-form-registro {
            display: inline-flex;
            align-items: center;
            justify-content: space-between;
            width: 65vw;
            height: fit-content;
            background-color: white;
            border-radius: 20px;
            overflow: hidden;
        }

        .Pag-mudar-senha main form {
            width: 50vw;
        }
    }

    @media (max-width: 500px) {
        .section-form-registro {
            width: 90vw !important;
        }

        .form-direita label, .form-direita a, .form-direita span {
            font-size: 3vw;
        }

        .form-direita input {
            font-size: 3vw !important;
        }

        .btn-submit-registro {
            font-size: 3vw;
        }

        .title-mobile {
            font-size: 3.5vw;
        }

        .Pag-mudar-senha main form {
            width: 75vw;
        }
    }
    
`

export default Registro_login_style;
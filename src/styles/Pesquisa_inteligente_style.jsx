import { createGlobalStyle } from "styled-components";


const Pesquisa_inteligente_style = createGlobalStyle `
    .Pag-relacao-discos {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #784d40, #000000);
        width: 100%;
        align-items: center;
    }

    .Pag-relacao-discos main {
        width: 95%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: 100vh; /* dá fallback para todos os navegadores */
        height: auto;
        padding: 25px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        gap: 25px;
    }

    .title {
        font-family: "Michroma", serif;
        font-weight: 500;
        color: white;
        font-size: 2.5vw;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 50px;
    }

    .section-geral {
        display: inline-flex;
    }

    .nav-classificacoes:not(.div-select-pesquisa-inteligente) {
        display: inline-flex;
        width: 30vw;
        justify-content: space-between;
    }

    .section-table {
        display: flex;
        /* position: relative; */
        flex-direction: column;
        gap: 5px;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 100%;
    }

    .nav-classificacoes div:not(.div-select-pesquisa-inteligente div) {
        display: inline-flex;
        align-items: center;
        gap: 15px;
    }

    .nav-classificacoes div a, .btn-carregar {
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
        padding: 0 25px;
        border-radius: 15px;
        transition: border, 0.3s;
    }

    .nav-classificacoes div a:hover {
        border: 2px solid white;
        transition: border, 0.3s;
        background-color: #aa6b5a;
    }

    /* estilizacao da tabela */
    .Pag-relacao-discos table {
        border-collapse: collapse;
        width: 100%;
        /* border: 1px solid white; */
        border-radius: 15px;
    }

    .div-da-table {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .cell-title th {
        background-color: #c47d69;
        padding: 10px;
        color: white;
        font-size: 1.65vw;
        font-weight: 700;
        border: 1px solid black;
    }

    .cabecalho {
        border: 1px solid black;
        background-color: white;
    }

    .cabecalho th {
        border: 1px solid black;
        color: black;
        font-weight: 500;
        padding: 5px;
        font-size: 1.15vw;
    }

    tbody tr td {
        border: 1px solid black;
        background-color: white;
        text-align: center;
    }

    tbody tr td {
        font-size: 1.05vw;
        padding: 5px
    }

    tbody tr td span {
        font-weight: 600;
        font-weight: 1.15vw;
    }

    .carregamento {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
    }

    .form-pesquisar-artista {
        display: flex;
        position: relative;
        flex-direction: column;
        gap: 5px;
        background-color: white;
        padding: 20px;
        border-radius: 10px;
    }

    .form-pesquisar-artista .div-select {
        display: flex;
        flex-direction: column;
    }

    .form-pesquisar-artista input:not(.div-select-pesquisa-inteligente input) {
        outline: none;
        padding: 5px;
        width: 100%;
        border-radius: 5px;
        border: 1px solid rgb(51, 51, 51);
        /* border: 1px solid hsl(0, 0%, 80%); */
        font-family: "Michroma", sans-serif;
        font-size: 1vw;
        height: 40px;
    }

    .form-pesquisar-artista input:disabled:not(.div-select-pesquisa-inteligente input) {
        background-color: hsl(0, 0%, 95%);
        color: rgb(134, 134, 134);
    }

    .form-pesquisar-artista input:disabled:hover:not(.div-select-pesquisa-inteligente input) {
        border: 1px solid rgb(51, 51, 51);
        cursor: not-allowed;
    }

    .div-select-pesquisa-inteligente {
        cursor: not-allowed;
    }

    .title-section {
        text-align: center;
        margin-bottom: 15px;
    }

    .form-pesquisar-artista input:focus {
        border: 2px solid #c47d69;
    }

    .btn-buscar {
        margin: 5px;
        background-color: #C47D69;
        color: black;
        border: 2px solid #C47D69;
        padding: 2.5px;
        border-radius: 2.5px;
        font-size: 1.05vw;
        height: 38px;
        width: 100%;
        margin: auto;
        margin-top: 2.5px;
        color: white;
        font-size: 1.5vw;
        cursor: pointer;
        transition: border, 0.3s;
        outline: none;
    }

    .btn-buscar:disabled, .btn-buscar:disabled:hover {
        background-color:rgb(182, 148, 139);
        border: 1px solid rgb(182, 148, 139);
        cursor: not-allowed;
    }

    .btn-buscar:hover {
        border: 2px solid white;
        transition: border, 0.3s;
        background-color: #aa6b5a;
    }

    .btn-table {
        background-color: #C47D69;
        color: white;
        padding: 5px;
        border-radius: 2.5px;
        border: solid 1.5px #C47D69;
    }

    .btn-table:hover {
        background-color: #aa6b5a;
        border: solid 1.5px white;
        cursor: pointer;
    }

    @media (min-width: 1500px) {
        .nav-classificacoes div a, .btn-carregar {
            font-size: 1vw;
        }

        .btn-buscar {
            font-size: 1vw;
        }

        .cell-title th {
            font-size: 1.65vw;
        }

        .cabecalho {
            font-size: 1vw;
        }

        tbody tr td {
            font-size: 0.85vw;
        }

        tbody tr td span {
            font-weight: 600;
            font-size: 0.90vw;
        }

        .form-pesquisar-artista input:not(.div-select-pesquisa-inteligente input) {
            font-size: 0.75vw;
        }
    }

    /* Responsividade tablet */
        @media (max-width: 800px) {
            .Pag-relacao-discos main {
                width: 100%;
            }

            .nav-classificacoes div {
                gap: 0px;
            }

            .title {
                font-size: 3.5vw;
            }

            .nav-classificacoes div a, .btn-carregar {
                font-size: 2vw;
                width: 15vw;
                height: 40px;
            }

            .btn-buscar {
                font-size: 2.5vw;
            }

            .cell-title th {
                padding: 10px;
                font-size: 3vw;
                font-weight: 500;
            }

            .cabecalho th, tbody tr td {
                font-size: 2vw;
            }

            tbody tr td span {
                font-weight: 600;
                font-size: 2.15vw;
            }

            .carregamento {
                align-items: flex-end;
            }

            .btn-table {
                font-size: 2vw;
            }

            .form-pesquisar-artista input:not(.div-select-pesquisa-inteligente input) {
                font-size: 2.5vw;
            }

            .section-geral {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .nav-classificacoes:not(.div-select-pesquisa-inteligente) {
                display: inline-flex;
                width: 80vw;
                justify-content: center;
            }
        }

        /* Responsividade Mobile */
        @media (max-width: 500px) {
            .Pag-relacao-discos main {
                width: 100%;
            }

            .nav-classificacoes div {
                gap: 0px;
            }

            .title {
                font-size: 4.5vw;
            }

            .nav-classificacoes div a, .btn-carregar {
                font-size: 3vw;
                width: 15vw;
                height: 40px;
            }

            .btn-buscar {
                font-size: 3.5vw;
            }

            .cell-title th {
                padding: 10px;
                font-size: 3.5vw;
                font-weight: 500;
            }

            .cabecalho th, tbody tr td {
                font-size: 2.75vw;
            }

            tbody tr td span {
                font-weight: 600;
                font-size: 2.85vw;
            }

            .carregamento {
                align-items: flex-end;
            }

            .btn-table {
                font-size: 2.75vw;
            }

            .form-pesquisar-artista input:not(.div-select-pesquisa-inteligente input) {
                font-size: 3vw;
            }

            .section-geral {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }

            .nav-classificacoes:not(.div-select-pesquisa-inteligente) {
                display: inline-flex;
                width: 80vw;
                justify-content: center;
            }
        }
`

export default Pesquisa_inteligente_style;
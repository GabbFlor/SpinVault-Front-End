import { createGlobalStyle } from "styled-components";

const Tabelas_style = createGlobalStyle `
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
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
    }

    .nav-classificacoes:not(.div-select-pesquisa-inteligente) {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
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

    .btn-carregar {
        width: fit-content;
        margin-top: 25px;
        cursor: pointer;
    }

    .div-btns {
        display: inline-flex;
        gap: 15px
    }

    .nav-classificacoes div a:hover, .btn-carregar:hover {
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
        font-weight: 500;
        border: 1px solid black;
    }

    .cabecalho {
        border: 1px solid black;
        background-color: #c47d69;
    }

    .cabecalho th {
        border: 1px solid black;
        color: white;
        font-weight: 300;
        padding: 5px;
    }

    tbody tr td {
        border: 1px solid black;
        background-color: white;
        text-align: center;
    }

    .cabecalho th, tbody tr td {
        font-size: 1.05vw;
        padding: 5px
    }

    .carregamento {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        // background-color: red;
        width: 100%;
        height: 50px;
    }

    .btn-ver-mais {
        margin: 5px;
        background-color: #C47D69;
        color: black;
        border: none;
        padding: 2.5px;
        border-radius: 2.5px;
        font-size: 1.05vw;
    }

    .btn-ver-mais:active {
        background-color:rgb(218, 179, 169);
    }

    @media (min-width: 1500px) {
        .nav-classificacoes div a, .btn-carregar {
            font-size: 1vw;
        }

        .cell-title th {
            font-size: 1.65vw;
        }

        .cabecalho th, tbody tr td {
            font-size: 0.85vw;
        }
    }

    // Responsividade tablet
    @media (max-width: 800px) {
        .Pag-relacao-discos main {
            width: 100%;
        }

        .nav-classificacoes div {
            gap: 0px;
        }

        .nav-classificacoes div a, .btn-carregar {
            font-size: 2vw;
            width: 15vw;
            height: 40px;
        }

        .cell-title th {
            padding: 10px;
            font-size: 3vw;
            font-weight: 500;
        }

        .cabecalho th, tbody tr td {
            font-size: 2vw;
        }

        .carregamento {
            align-items: flex-end;
        }

        .btn-ver-mais {
            font-size: 2vw;
        }
    }

    // Responsividade Mobile
    @media (max-width: 500px) {
        .Pag-relacao-discos main {
            width: 100%;
        }

        .nav-classificacoes div {
            gap: 0px;
        }

        .nav-classificacoes div a, .btn-carregar {
            font-size: 3vw;
            width: 15vw;
            height: 40px;
        }

        .cell-title th {
            padding: 10px;
            font-size: 3.5vw;
            font-weight: 500;
        }

        .cabecalho th, tbody tr td {
            font-size: 2.75vw;
        }

        .carregamento {
            align-items: flex-end;
        }

        .btn-ver-mais {
            font-size: 2.75vw;
        }
    }
`

export default Tabelas_style;
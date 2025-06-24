import { createGlobalStyle } from "styled-components";


const Planos_style = createGlobalStyle `
    .Pag-Planos {
        display: flex;
        flex-direction: column;
        background-color: black;
        
        width: 100%;
    }

    .Pag-Planos main{
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        padding-top: 70px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: white;
        /* background-color: red; */
    }

    .title {
        text-align: center;
    }

    .title h1 {
        font-size: 2.10vw;
    }

    .title h2 {
        font-size: 1.5vw;
    }

    .cards-section {
        display: inline-flex;
        margin-bottom: 15vh;
        gap: 5vw;
    }

    .card {
        border: 0.5px solid rgb(185, 185, 185);
        padding: 25px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    .card h2 {
        text-align: center;
        font-size: 2vw;
    }

    .card ul {
        list-style-type: none;
        line-height: 1.75;
        font-size: 1.25vw;
    }

    .icon-card {
        font-size: 1.5vw;
    }

    .card button {
        padding: 2.5px 0 2.5px 0;
        font-size: 1.3vw;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .card button:hover {
        text-decoration: underline;
    }

    @media (max-width: 800px) {
        .Pag-Planos main {
            padding-top: 25px;
        }

        .title h1 {
            font-size: 4.40vw;
        }

        .title h2 {
            font-size: 4.25vw;
        }

        .cards-section {
            display: flex;
            flex-direction: column;
            margin-bottom: 0;
            gap: 30px;
            padding: 25px;
        }

        .card h2 {
            font-size: 4.25vw;
        }

        .card ul {
            font-size: 2.5vw;
        }

        .icon-card {
            font-size: 2.5vw;
        }

        .card button {
            font-size: 2.5vw;
        }
    }

    @media (max-width: 500px) {
        .Pag-Planos main {
            padding-top: 25px;
        }

        .title h1 {
            font-size: 5.5vw;
        }

        .title h2 {
            font-size: 5vw;
        }

        .cards-section {
            display: flex;
            flex-direction: column;
            margin-bottom: 0;
            gap: 20px;
            padding: 25px;
        }

        .card h2 {
            font-size: 5.25vw;
        }

        .card ul {
            font-size: 3.5vw;
        }

        .icon-card {
            font-size: 3.5vw;
        }

        .card button {
            font-size: 3.5vw;
        }
    }
`

export default Planos_style;
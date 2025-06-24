import { createGlobalStyle } from "styled-components";

const Home_Style = createGlobalStyle `
    .Pag-Home {
        display: flex;
        flex-direction: column;
        background: linear-gradient(180deg, #c47d69 0%, #000000 60%);
        width: 100%;
    }

    .Pag-Home main {
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: fit-content;
        height: calc(100vh - 60px);
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .Pag-Home main h1 {
        font-family: "Michroma", serif;
        font-weight: 400;
        color: white;
        font-size: 2.95vw;
        text-align: center;
        padding-top: 25px;
        padding-bottom: 50px;
    }

    .container-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 25px;
        justify-items: center;
        width: 65%;
    }

    .item-grid {
        background-color: white;
        width: 13vw;
        height: 16vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px;
        gap: 5%;
    }

    .item-grid img {
        width: 11vw;
    }

    .item-grid a {
        background-color: black;
        color: white;
        font-size: 1.25vw;
        padding: 1.5px 25px;
        border-radius: 25px;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }

    .item-grid a:hover {
        background-color: #555;
    }

    @media (max-width: 500px) {
        .Pag-Home main {
            padding: 15px 0 25px 0;
        }

        .Pag-Home main h1 {
            font-size: 4vw;
        }

        .container-grid {
            grid-template-columns: repeat(1, 1fr);
            grid-gap: 25px;
        }

        .item-grid {
            width: 50vw;
            height: 65.5vw;
        }

        .item-grid img {
            width: 90%;
        }

        .item-grid a {
            font-size: 4vw;
            padding: 15px 25px 15px 25px;
        }
    }

    @media (min-width: 500px) and (max-width: 800px) {
        .Pag-Home main {
            padding: 15px 0 25px 0;
        }

        .Pag-Home main h1 {
            font-size: 4vw;
        }

        .container-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 35px;
        }

        .item-grid {
            width: 26vw;
            height: 36vw;
        }

        .item-grid img {
            width: 90%;
        }

        .item-grid a {
            font-size: 2.27vw;
            padding: 15px 25px 15px 25px;
        }
    }
`

export default Home_Style;
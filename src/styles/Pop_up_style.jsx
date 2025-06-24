import { createGlobalStyle } from "styled-components";


const Pop_up_Style = createGlobalStyle `
    .tela-toda {
        background-color: rgba(0, 0, 0, 0.342);
        position: absolute;
        width: 100vw;
        height: 100vh;
        left: 0;
        bottom: 0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        z-index: 0;
    }

    .Pop-up-disco {
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        width: fit-content;
        gap: 15px;
        border-radius: 10px;
        width: 80vw;
        max-height: 60vh;
        overflow-y: auto;
        overflow-x: hidden;
        z-index: -1;
    }

    .div-title {
        background-color: #C47D69;
        border-radius: 10px 10px 0 0;
        color: black;
        position: relative;
    }

    .div-title h1 {
        text-align: center; 
        font-size: 6.5vw;
    }

    .div-title button {
        padding: 0;
        font-size: 8vw;
        color: white;
        background-color: transparent;
        border: none;
        outline: none;
        position: absolute;
        top: 0;
        right: 0;
    }

    .div-title button:active {
        color: red;
    }

    .Pop-up-disco form {
        padding: 5px 20px 20px 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 10px;
    }

    .Pop-up-disco form div:not(.div-btn) {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .Pop-up-disco form div label {
        font-size: 4vw;
    }

    .Pop-up-disco form div input, .Pop-up-disco form div textarea {
        font-size: 3.85vw;
        background-color: rgb(239, 239, 239);
        outline: none;
        padding: 5px;
        border: 1px solid rgb(165, 165, 165);
        border-radius: 5px;
    }

    .btn-edit-pop-up {
        background-color: #C47D69;
        color: black;
        padding: 5px;
        font-size: 3.85vw;
        border-radius: 5px;
    }

    /* tablet */
    @media (min-width: 500px) and (max-width: 800px) {
        .Pop-up-disco form {
            padding: 5px 40px 40px 40px;
        }
    }

    @media (min-width: 800px) {
        .Pop-up-disco {
            gap: 15px;
            border-radius: 10px;
            width: 35vw;
            max-height: 80vh;
        }

        .div-title h1 {
            font-size: 2.5vw;
        }

        .div-title button {
            padding: 0;
            font-size: 3vw;
            transition: color 0.3s ease;
            color: white;
        }

        .div-title button:hover {
            color: red;
            transition: color 0.3s ease;
            cursor: pointer;
        }

        .Pop-up-disco form {
            padding: 5px 20px 20px 20px;
            gap: 10px;
        }

        .Pop-up-disco form div label {
            font-size: 2vw;
        }

        .Pop-up-disco form div input, .Pop-up-disco form div textarea {
            font-size: 1.75vw;
            padding: 5px;
            border-radius: 5px;
            cursor: text;
        }

        .btn-edit-pop-up {
            padding: 5px;
            font-size: 1.75vw;
            border-radius: 5px;
        }

        .btn-edit-pop-up:hover {
            background-color: #aa6b5a;
            color: white;
        }
    }
`

export default Pop_up_Style;
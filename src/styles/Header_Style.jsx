import { createGlobalStyle } from "styled-components";

const Header_Style = createGlobalStyle `
    header {
        display: inline-flex;
        width: 100%;
        height: 60px;
        justify-content: space-around;
        align-items: center;
        padding: 5px;
        background-color: white
    } 

    .section-search {
        display: inline-flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        width: 40%;
    }

    .section-search form {
        width: 100%;
        position: relative;
    }

    .section-search form input {
        outline: none;
        height: 30px;
        width: 100%;
        border: 1.75px solid #a3a3a3;
        padding: 2.5px !important; 
        border-radius: 2.5px;
        font-size: 15px;
    }

    .section-search form input::placeholder {
        font-weight: 100;
    }

    .section-search form button {
        border: none;
        outline: none;
        background-color: transparent;
        position: absolute;
        right: 1%;
        top: 25%;
        cursor: pointer;
    }

    .disk-counter {
        display: inline-flex;
        align-items: center;
    }

    .disk-counter img {
        height: 50px;
        margin-right: -15%;
        z-index: 1;
        background-color: white;
        border-radius: 100%;
        padding-right: 2.5px;
    }

    .disk-counter div {
        display: inline-flex;
        background-color: #C47D69;
        height: 50px;
        width: fit-content;
        padding: 0 25px 0 35px;
        justify-content: center;
        align-items: center;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }

    .header-icons-div {
        display: inline-flex;
        align-items: center;
        gap: 2.5px;
    }

    .icon-person {
        font-size: 2rem;
        cursor: pointer;
        color: black;
    }

    .icon-house {
        font-size: 1.75rem;
        cursor: pointer;
        color: black;
    }

    .header-logo img {
        height: 200px;
    }

    @media (max-width: 800px) {
        .section-search form input, .section-search form button {
            display: none;
        }

        .header-logo img {
            height: 150px;
        }
    }

    @media (max-width: 500px) {
        .header-logo img {
            height: 100px;
        }
    }
`

export default Header_Style;
import { createGlobalStyle } from "styled-components";

const Perfil_style = createGlobalStyle `
    .Pag-perfil, .Pag-editar-perfil, .Pag-mudar-senha {
        display: flex;
        flex-direction: column;
        background: linear-gradient(to right, #000000, #c47d69, #000000);
        width: 100%;
    }

    .Pag-perfil main, .Pag-editar-perfil main, .Pag-mudar-senha main{
        width: 100%;
        /* essa bomba aqui para n ficar branco quando o conteúdo não chegar até o fim da página */
        min-height: 100vh; /* dá fallback para todos os navegadores */
        height: auto;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .section-perfil, .section-mudar-senha {
        display: flex;
        flex-direction: column;
        gap: 35px;
        align-items: center;
    }

    .perfil-infos, .section-mudar-senha {
        background-color: #232323;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50vw;
        gap: 25px;
        padding: 100px 25px 25px 25px;
        border-radius: 10px;

        margin-top: 100px;
        position: relative;
    }

    .perfil-info-planos {
        background-color: #232323;
        padding: 25px 25px 25px 25px;
        border-radius: 10px;
        margin-top: 25px;
        margin-bottom: 50px;
        width: 50vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .perfil-info-planos label {
        color: white;
    }

    .perfil-infos h1, 
    .perfil-infos p, 
    .perfil-infos span, 
    .perfil-add-disks h1, 
    .btn-card,
    .form-edit-perfil div label,
    .form-edit-perfil div input,
    .form-mudar-senha div label,
    .form-mudar-senha div input,
    .div-btns-form-edit button,
    .div-btns-form-edit a,
    .div-buttons-edit-perfil a,
    .div-buttons-edit-perfil button,
    .perfil-info-planos h1 {
        font-family: "Michroma", serif;
        font-weight: 400;
    }

    .perfil-infos h1 {
        font-size: 1.75vw;
        text-align: center;
    }

    .destaque {
        font-size: 1.70vw;
        color: #C47D69;
        text-align: center;
    }

    .perfil-infos p:not(.destaque) {
        font-size: 1vw;
    }

    .perfil-infos span {
        font-size: 3vw;
    }

    .sub-perfil-info {
        display: inline-flex;
        width: 100%;
        justify-content: space-evenly;
    }

    .sub-perfil-info div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img-temporario {
        background-color: grey;
        color: grey;

        width: 150px;
        height: 150px;

        border-radius: 100%;
        margin-top: -180px;
        text-align: center;

        position: absolute;
    }

    .perfil-add-disks {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .perfil-add-disks h1, .perfil-info-planos h1 {
        color: white;
        font-size: 1.75vw;
        font-weight: 600;
    }

    .card {
        background-color: #232323;
        max-width: 20vw;
        min-width: 20vw;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 7.5px;
    }

    .card div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card img {
        width: 15vw;
    }

    .card-title {
        font-weight: 400 !important;
        text-align: center;
        margin-bottom: 20px;
    }

    .btn-card {
        background-color: white;
        border: none;
        outline: none;
        font-size: 1.30vw;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        color: black;
    }

    .btn-card:hover {
        text-decoration: underline;
    }

    .cards-disks {
        display: inline-flex;
        gap: 5vw;
        padding-bottom: 50px;
    }

    .infos-up {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .btn-logout {
        outline: none;
        border: 1px solid #C47D69;
        color: #C47D69;
        background-color: transparent;
        font-size: 1.30vw;
        padding: 5px;
        border-radius: 5px;
        width: fit-content;
        margin-top: 10px;
        cursor: pointer;
        transition: color 0.3s, background-color 0.3s;
        width: 8vw;
        text-align: center;
        font-weight: 400;
    }

    .btn-logout:hover {
        background-color: #C47D69;
        color: black;
        transition: color 0.3s, background-color 0.3s;
    }

    .div-infos-btns {
        display: inline-flex;
        gap: 10px
    }

    .form-edit-perfil, .form-mudar-senha {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 60%;
    }

    .form-edit-perfil div:not(.div-btns-form-edit, .div-select div),
    .form-mudar-senha div:not(.div-buttons-edit-perfil) {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .form-edit-perfil div label,
    .form-mudar-senha div label {
        font-size: 1.25vw;
    }

    .form-edit-perfil div input:not(.div-select input),
    .form-mudar-senha div input {
        padding: 7.5px;
        outline: none;
        border: none;
        border-radius: 5px;
        font-size: 1vw;
        height: 38px;
    }

    .form-mudar-senha div input:disabled, .form-edit-perfil input {
        background-color: white;
        cursor: not-allowed;
    }

    .form-edit-perfil div input:not(.div-select input):focus,
    .form-mudar-senha div input:focus {
        box-shadow: 0 0 0 1.5px #C47D69;
    }

    .div-btns-form-edit,
    .div-buttons-edit-perfil {
        display: inline-flex;
        justify-content: space-between;
        margin-top: 15px;
    }

    .div-btns-form-edit button, .div-btns-form-edit a,
    .div-buttons-edit-perfil button, .div-buttons-edit-perfil a {
        background-color: black;
        color: white;
        border: none;
        outline: none;
        padding: 5px 10px;
        border-radius: 5px;
        font-size: 1.05vw;
        cursor: pointer;
        border: 1px solid black;
        transition: border, 0.3s;
    }

    .div-btns-form-edit button:hover,
    .div-btns-form-edit a:hover,
    .div-buttons-edit-perfil button:hover,
    .div-buttons-edit-perfil a:hover {
        border: 1px solid white;
    }

    .div-password {
        position: relative;
    }

    .btn-show-passw {
        position: absolute;
        padding: 0;
        border: none;
        outline: none;
        background-color: transparent;
        bottom: 7%;
        right: 1%;
        font-size: 17.5px;
        cursor: pointer;
    }

    .btn-confirm-nova-senha:disabled {
        cursor: not-allowed;
    }

    .alert-perfil {
        background-color:rgba(255, 0, 0, 0.32);
        border: 1.5px solid rgb(255, 0, 0);
        padding: 20px;
        border-radius: 5px;
    }

    .alert-perfil h2 {
        color: black;
        font-weight: 500;
        font-size: 1.5vw;
        text-align: center;
    }

    .alert-perfil a {
        color:rgb(109, 35, 14);
    }

    .alert-perfil a:hover {
        text-decoration: underline;
    }

    .btn-info-plano {
        margin-left: auto;
        margin-right: auto;
    }

    @media (min-width: 1500px) {
        .perfil-infos h1, .perfil-add-disks h1 {
            font-size: 1.40vw;
        }

        .destaque {
            font-size: 1.55vw;
        }

        .perfil-infos p:not(.destaque) {
            font-size: 0.75vw;
        }

        .perfil-infos span {
            font-size: 2.75vw;
        }

        .card-title {
            font-size: 1.30vw !important;
        }

        .btn-card {
            font-size: 1.20vw ;
        }
        
        .form-edit-perfil,
        .form-mudar-senha {
            width: 50%;
        }

        .form-edit-perfil div label,
        .form-mudar-senha div label {
            font-size: 1vw;
        }

        .form-edit-perfil div input,
        .form-mudar-senha div input {
            font-size: 0.75vw !important;
        }

        .div-btns-form-edit button,
        .div-btns-form-edit a {
            font-size: 0.80vw;
        }
    }

    @media (max-width: 800px) {
        .img-temporario {
            width: 100px;
            height: 100px;
            margin-top: -110px;
            position: absolute
        }

        .section-perfil, .section-mudar-senha {
            gap: 35px;
        }

        .perfil-infos, .section-mudar-senha {
            height: fit-content;
            width: 70vw;
            gap: 25px;
            padding: 50px 25px 25px 25px;
            border-radius: 10px;
            margin-top: 100px;
        }

        .perfil-info-planos {
            height: fit-content;
            width: 70vw;
            gap: 25px;
            padding: 25px 25px 25px 25px;
            border-radius: 10px;
            margin-top: 25px;
        }

        .perfil-info-planos h1 {
            font-size: 2.5vw;
        }

        .perfil-infos h1 {
            font-size: 2.5vw;
            text-align: center;
        }

        .destaque {
            font-size: 2.4vw;
        }

        .perfil-infos p:not(.destaque) {
            font-size: 1.75vw;
        }

        .perfil-infos span {
            font-size: 3vw;
        }

        .perfil-add-disks h1 {
            font-size: 2.5vw;
        }

        .cards-disks {
            gap: 2.5vw;
        }

        .card {
            padding: 15px;
            border-radius: 7.5px;
            max-width: 25.66vw;
            min-width: 25.66vw;
        }

        .card img {
            width: 15vw;
        }

        .card-title {
            margin-bottom: 20px;
        }

        .btn-card {
            font-size: 1.5vw;
            padding: 5px;
            border-radius: 5px;
        }

        .btn-logout {
            font-size: 2.5vw;
            padding: 5px;
            border-radius: 5px;
            margin-top: 10px;
            width: 17.5vw;
        }

        .form-edit-perfil div label,
        .form-mudar-senha div label {
            font-size: 1.25vw;
        }

        .form-edit-perfil div input:not(.div-select input),
        .form-mudar-senha div input {
            padding: 7.5px;
            border-radius: 5px;
            font-size: 2.5vw !important;
        }

        .div-btns-form-edit button, .div-btns-form-edit a,
        .div-buttons-edit-perfil button, .div-buttons-edit-perfil a {
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 1.05vw;
        }

        // forms !!!!!!!!!
        .form-edit-perfil {
            width: 90%;
        }

        .form-mudar-senha {
            width: 90%;
        }

        .form-edit-perfil div label,
        .form-mudar-senha div label {
            font-size: 2.5vw;
        }

        .form-edit-perfil div input:not(.div-select input),
        .form-mudar-senha div input {
            font-size: 2.35vw;
            width: 100%;
        }

        .div-btns-form-edit button, .div-btns-form-edit a,
        .div-buttons-edit-perfil button, .div-buttons-edit-perfil a {
            font-size: 2vw;
        }

        .btn-show-passw {
            bottom: 15%;
            right: 3%;
            font-size: 12.5px;
        }

        .alert-perfil h2 {
            font-size: 2.5vw;
        }
    }

    @media (max-width: 500px) {
        .img-temporario {
            width: 100px;
            height: 100px;
            margin-top: -110px;
            position: absolute
        }

        .section-perfil, .section-mudar-senha {
            gap: 30px;
        }

        .perfil-infos, .section-mudar-senha {
            height: fit-content;
            width: 90vw;
            gap: 20px;
            padding: 40px 20px 20px 20px;
            border-radius: 10px;
            margin-top: 80px;
        }

        .perfil-info-planos {
            height: fit-content;
            width: 90vw;
            gap: 25px;
            padding: 25px 25px 25px 25px;
            border-radius: 10px;
            margin-top: 25px;
        }

        .perfil-info-planos h1 {
            font-size: 4.5vw;
        }

        .perfil-infos h1 {
            font-size: 5vw;
            text-align: center;
        }

        .destaque {
            font-size: 4.5vw;
        }

        .perfil-infos p:not(.destaque) {
            font-size: 3.5vw;
        }

        .perfil-infos span {
            font-size: 5vw;
        }

        .perfil-add-disks h1 {
            font-size: 4vw;
        }

        .cards-disks {
            gap: 4vw;
            flex-direction: column;
            align-items: center;
        }

        .card {
            padding: 15px;
            border-radius: 10px;
            width: 70vw;
            max-width: 70vw;
            min-width: 70vw;
        }

        .card img {
            width: 40vw;
        }

        .card-title {
            margin-bottom: 15px;
        }

        .btn-card {
            font-size: 3.5vw;
            padding: 7px;
            border-radius: 5px;
        }

        .btn-logout {
            font-size: 4vw;
            padding: 7px;
            border-radius: 5px;
            margin-top: 10px;
            width: 25vw;
        }

        .form-edit-perfil, .form-mudar-senha {
            width: 95%;
        }

        .form-edit-perfil div label,
        .form-mudar-senha div label {
            font-size: 4.5vw;
        }

        .form-edit-perfil div input:not(.div-select input),
        .form-mudar-senha div input {
            padding: 10px;
            border-radius: 5px;
            font-size: 3vw;
            width: 100%;
        }

        .div-btns-form-edit button, .div-btns-form-edit a,
        .div-buttons-edit-perfil button, .div-buttons-edit-perfil a {
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 3.8vw;
        }

        .btn-show-passw {
            bottom: 15%;
            right: 3%;
            font-size: 14px;
        }

        .alert-perfil h2 {
            font-size: 4.5vw;
        }
    }

`

export default Perfil_style;

import { createGlobalStyle } from "styled-components";

const AdsTerra_style = createGlobalStyle`
    .conteudo-pagina main a {
    z-index: 10;
    }
    .conteudo-pagina main form {
    z-index: 10;
    }
    .conteudo-pagina main button {
    z-index: 10;
    }

    .Ads-colunas{
        width: 12vw;
    }
    .Ads-Banner-vertical {
        
    }
    .Ads-Banner{
    
    }
    .ads-pag {
        display: flex;
        width: 100%;
        min-height: fit-content;
        height: calc(100vh - 60px);
        flex-direction: row;
        position: absolute;
        justify-content: space-between;
    }
    .ads-pag-banner {
        justify-items: center;
        width: 100%;
    }
    .ads-pag-banner-Landing-page {
        justify-items: center;
        width: 100%;
        height: 90px;
        background-color: black;
    }
    .conteudo-pagina{
        display: flex;
        flex-direction: row;
        position: relative;
    }
    @media (max-width: 800px){
        .conteudo-pagina{
            display: flex;
            flex-direction: column;
            position: relative;
            justify-items: center;

        }
    }

`
export default AdsTerra_style;
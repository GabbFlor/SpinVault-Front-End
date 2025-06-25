import Footer from "../components/Footer";
import Header from "../components/Header";
import certinho from "../assets/certinho.webp"
import Confirmacao_pagamento_style from "../styles/Confirmacao_pagamento_style";

const Payment_confirm = () => {


    return(
        <div className="Pag-confirmacao-pagamento">
            <Confirmacao_pagamento_style />

            <Header />

            <main>
                <img src={certinho} alt="Certinho" />

                <h1>Muito obrigado por assinar o nosso plano!</h1>

                <h2>Sua assinatura está em processo.</h2>

                <p>
                    Em poucos minutos, você receberá um e-mail com a confirmação do pagamento 
                    da sua assinatura. Assim que o pagamento for aprovado, seu acesso aos nossos 
                    serviços será liberado automaticamente. Se tiver qualquer dúvida ou não receber 
                    a confirmação, entre em contato com a nossa equipe de suporte — estamos prontos para ajudar.
                </p>
            </main>

            <Footer />
        </div>
    )
}

export default Payment_confirm;
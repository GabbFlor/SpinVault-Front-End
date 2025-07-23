import React, { useEffect } from 'react';

const AdsterraColunas = () => {
  useEffect(() => {
    // 1. Cria o elemento <script> na memória
    const script = document.createElement('script');

    // 2. Configura os atributos do script exatamente como no código fornecido
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = "//pl27228587.profitableratecpm.com/60991bb8d7b9733e55219d88cdc5cfb8/invoke.js";

    // 3. Anexa o script ao corpo do documento.
    // O script vai carregar e procurar pelo div com o ID correspondente.
    document.body.appendChild(script);

    // 4. Função de "limpeza" (boa prática)
    // Isso remove o script da página se o componente for desmontado, evitando lixo de memória.
    return () => {
      // Tenta encontrar o script para removê-lo
      const allScripts = document.getElementsByTagName('script');
      for (let i = 0; i < allScripts.length; i++) {
        if (allScripts[i].src === script.src) {
          allScripts[i].parentNode.removeChild(allScripts[i]);
          break;
        }
      }
    };
  }, []); // O array vazio [] garante que este código rode apenas uma vez, depois que o componente montar.

  // O JSX que será renderizado na tela.
  // Este é o "espaço reservado" que o script vai usar.
  return (
    <div className="Ads-colunas">
      <div id="container-60991bb8d7b9733e55219d88cdc5cfb8"></div>
    </div>
  );
};

export default AdsterraColunas;
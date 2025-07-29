import React, { useEffect, useRef } from 'react';

const AdsterraBannerColunas = () => {
  const adContainerRef = useRef(null);

  useEffect(() => {
    // Garante que o container de anúncio esteja vazio antes de adicionar os scripts.
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = '';
    }

    // 1. Cria o primeiro script (de configuração)
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    
    // Adiciona o conteúdo das opções de configuração ao script.
    // Isso define a variável global 'atOptions' que o próximo script irá usar.
    configScript.innerHTML = `
      atOptions = {
        'key' : 'f494e052fe3e9263a1d0194ba712f9b2',
        'format' : 'iframe',
        'height' : 600,
        'width' : 160,
        'params' : {}
      };
    `;

    // 2. Cria o segundo script (de execução)
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = "//www.highperformanceformat.com/f494e052fe3e9263a1d0194ba712f9b2/invoke.js";

    // 3. Anexa os dois scripts ao elemento div do nosso componente.
    // É uma prática mais segura anexar ao container do componente em vez de 'document.body'.
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(configScript);
      adContainerRef.current.appendChild(invokeScript);
    }

    // Não é necessária uma função de limpeza complexa, pois o React irá remover
    // o 'div' e seus scripts filhos quando o componente for desmontado.

  }, []); // O array vazio [] garante que o código rode apenas uma vez.

  // O JSX renderizado. O 'ref' nos dá um ponto de referência para adicionar os scripts.
  return <div className="Ads-Banner-vertical" ref={adContainerRef}></div>;
};

export default AdsterraBannerColunas;
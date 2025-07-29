import React, { useEffect, useRef } from 'react';

const AdsterraBanner = () => { // Sugestão de novo nome para refletir o banner horizontal
  const adContainerRef = useRef(null);

  useEffect(() => {
    // Garante que o container de anúncio esteja vazio antes de adicionar os scripts.
    if (adContainerRef.current) {
      adContainerRef.current.innerHTML = '';
    }

    // 1. Cria o script de configuração com a NOVA KEY.
    const configScript = document.createElement('script');
    configScript.type = 'text/javascript';
    
    configScript.innerHTML = `
      atOptions = {
        'key' : 'c1cadeb68b62a69c8f1d115d07eb90b7',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // 2. Cria o script de execução com o NOVO SRC.
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = "//www.highperformanceformat.com/c1cadeb68b62a69c8f1d115d07eb90b7/invoke.js";

    // 3. Anexa os dois scripts ao container do componente.
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(configScript);
      adContainerRef.current.appendChild(invokeScript);
    }

  }, []); // O array vazio [] garante que o código rode apenas uma vez.

  // O container onde o anúncio será renderizado.
  return <div className="Ads-Banner" ref={adContainerRef}></div>; // Sugestão de novo className
};

export default AdsterraBanner;
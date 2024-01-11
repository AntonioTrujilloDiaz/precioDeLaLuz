'use strict'

const ecoConsejos = [
    "Apaga las luces cuando no las necesites.",
    "Utiliza bombillas LED de bajo consumo.",
    "Desenchufa los electrodomésticos cuando no los uses.",
    "Usa la lavadora y el lavavajillas solo cuando estén llenos.",
    "Aprovecha la luz natural tanto como sea posible.",
    "Mantén el termostato a una temperatura razonable.",
    "Usa cortinas y persianas para mantener la casa fresca en verano y cálida en invierno.",
    "Cambia los filtros de aire regularmente.",
    "Usa electrodomésticos eficientes.",
    "Instala paneles solares para generar tu propia energía."
    ];
      
    //Al parrafo del aside le inyectamos el contenido de la const ecoConsejos
    let index = 0;
    const ecoTips = document.getElementById("tipCentrado");
    ecoTips.textContent = ecoConsejos[index];
      
    //Cada 2 min se muestra un consejo diferente
    setInterval(() => {
        index = (index + 1) % ecoConsejos.length;
        ecoTips.textContent = ecoConsejos[index];
    }, 10000);
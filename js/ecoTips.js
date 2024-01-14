'use strict'

document.addEventListener('DOMContentLoaded', function () {
      
    const tipCentrado = document.getElementById('tipCentrado');
      
        const mostrarConsejoAleatorio = () => {
      
            try {
                const consejoAleatorio = Math.floor(Math.random() * Object.keys(textosEcoTips).length) + 1;
      
                const textoConsejo = textosEcoTips[consejoAleatorio];
      
                if (textoConsejo === undefined) {
                    throw new Error("Texto del consejo sin definir en el array");
                }
      
                tipCentrado.textContent = textoConsejo;
      
            } catch (error) {
                console.error("Se ha producido un error al mostrar el consejo", error.message);
            }
        };
      
    mostrarConsejoAleatorio();
      
    setInterval(mostrarConsejoAleatorio, 15000);
      
});
      
// Estructura de datos para los ecotips
const textosEcoTips = {
    1: "... las bombillas LED son una excelente opción. Te ayudan a ahorrar hasta un 80% en la factura.",
    2: "... aprovechar la luz natural que entra en casa es una forma efectiva de ahorrar energía.",
    3: "... el modo 'stand by' continúa consumiendo energía. Utiliza regletas con interruptor.",
    4: "... programando tus electrodomésticos para determinadas horas del día podrás ahorrar en tu factura.",
    5: "... apagar las luces cuando no las utilizas supone un ahorro para tu bolsillo.",
    // Para añadir más textos aquí manteniendo el formato.
};
      

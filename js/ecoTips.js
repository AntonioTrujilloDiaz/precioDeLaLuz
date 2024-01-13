'use strict'

document.addEventListener('DOMContentLoaded', function () {
        
    const tipCentrado = document.getElementById('tipCentrado');
    // ARRAY con los índices correspondientes a los consejos
    const consejosConsecutivos = [ 1, 2, 3, 4, 5 ];
      
        
    const mostrarConsejoAleatorio = () => {
         
        try{
      
          const consejoAleatorio = consejosConsecutivos[Math.floor(Math.random() * consejosConsecutivos.length)];

          const textoConsejo = textosEcoTips[consejoAleatorio];
      
    if (textoConsejo === undefined){

        throw new Error ("Texto del consejo sin definir en el array")
        }

            tipCentrado.textContent = textoConsejo;
    
        } catch (error){

            console.error("Se ha producido un error al mostrar el consejo", error.message)
        }
    };
      
    mostrarConsejoAleatorio();
      
    setInterval(mostrarConsejoAleatorio, 30000);
      
});
      


       // Estructura de datos para los ecotips
       const textosEcoTips = {
        1: "...las bombillas LED son una excelente opción para reemplazar las bombillas halógenas. Aunque son un poco más caras que las bombillas convencionales, pueden ayudarte a ahorrar hasta un 80% en la factura de la luz.",
        
        2: "...aprovechar la luz natural abriendo cortinas y persianas, durante las horas del día de más luz, es una forma efectiva de ahorrar energía, reduciendo el uso de luces artificiales y ahorrando electricidad.",

        3:"...el modo 'stand by' continúa consumiendo energía, que por poco que sea, se suma al de otros aparatos eléctricos. Puedes evitarlos desenchufándolos o utilizando regletas con interruptor.",

        4:"...que puedes hacer un uso eficiente de la energía programando tus electrodomésticos para determinadas horas del día aprovechando la información que te brindamos aquí.",

        5:"...el consejo más sencillo para ahorrar energía es un uso sensato de las luces y demás aparatos eléctricos de tu hogar. Apagar las luces cuando no las utilizas supondrá un ahorro para tu bolsillo.",

        // Podemos añadir más textos aquí manteniendo el formato.
      };
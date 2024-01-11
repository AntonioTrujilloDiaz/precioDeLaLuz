'use strict';

let precioActual;
let electrodomesticosSeleccionados = {};

const electrodomesticos = {
    cleaner: {potencia: 1500, encendido: false},
    computer:  {potencia: 750, encendido: false},
    dishwasher: {potencia: 1200, encendido: false},
    fridge: {potencia: 500, encendido: false},
    game_console: {potencia: 650, encendido: false},
    iron: {potencia: 1500, encendido: false},
    oven: {potencia: 2500, encendido: false},
    tv: {potencia: 700, encendido: false},
    washing_machine: {potencia: 900, encendido: false}
};

function obtenerTramoHorario(hora) {
    const tramoInicio = Math.floor(hora);
    const tramoFin = (tramoInicio + 1) % 24;

    const formatoInicio = tramoInicio.toString().padStart(2, '0');
    const formatoFin = (tramoFin === 0 ? '24' : tramoFin.toString()).padStart(2, '0');

    return `${formatoInicio}-${formatoFin}`;
}

// Función para verificar si han pasado 5 minutos desde un tiempo dado
const hanPasado5Minutos = (tiempoPrevio) => {
    const tiempoActual = Date.now();
    const diferenciaEnMilisegundos = tiempoActual - tiempoPrevio;
    const minutosTranscurridos = diferenciaEnMilisegundos / (1000 * 60);

    return minutosTranscurridos >= 5;
};

let datos = { data: {} }; // Inicializar datos con una estructura válida // Declarar datos fuera del bloque try

const obtenerDatos = async () => {
    try {
        const horaActual = new Date();
        const horaActualEnHoras = horaActual.getHours() + horaActual.getMinutes() / 60;
        const tramoHorario = obtenerTramoHorario(horaActualEnHoras);

        // Obtener datos del LocalStorage
        const datosLocalStorage = JSON.parse(localStorage.getItem('datosPrecioLuz'));

        if (datosLocalStorage && datosLocalStorage.ultimaSolicitud && !hanPasado5Minutos(datosLocalStorage.ultimaSolicitud)) {
            // Usar datos almacenados en el LocalStorage
            precioActual = datosLocalStorage.datos[tramoHorario];
            console.log("Usando datos del LocalStorage:", precioActual);
            calcularCosteElectrodomesticos();
        } else {

            // Realizar nueva solicitud a la API
            const response = await fetch('https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB');
            const datos = await response.json();

            // Actualizar datos en el LocalStorage
            const nuevosDatosLocalStorage = {
                ultimaSolicitud: Date.now(),
                datos: datos.data
            };
            localStorage.setItem('datosPrecioLuz', JSON.stringify(nuevosDatosLocalStorage));

            precioActual = datos.data[tramoHorario];
            console.log("Obteniendo nuevos datos de la API:", precioActual);
            calcularCosteElectrodomesticos();
        }
        if (precioActual) {
            console.log(`Precio actual para el tramo horario ${tramoHorario}: ${precioActual.price} €/MWh`);
            calcularCosteElectrodomesticos();

            // Obtener precios más bajo 
            const preciosDelDia = Object.values(datosLocalStorage.datos).map(info => info.price);

            const precioMasBajoDelDia = Math.min(...preciosDelDia);
            const precioMasAltoDelDia = Math.max(...preciosDelDia);
            const sumaDePrecios = preciosDelDia.reduce((acc, precio) => acc + precio, 0);
            const precioMedioDelDia = sumaDePrecios / preciosDelDia.length;
            

            console.log(`Precio más bajo del día: ${precioMasBajoDelDia} €/MWh`);
            console.log(`Precio más alto del día: ${precioMasAltoDelDia} €/MWh`);
            console.log(`El Precio medio del día es: ${precioMedioDelDia} €/MWh`);
        } else {
            console.log(`No hay datos disponibles para el tramo horario ${tramoHorario}`);
        }
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
};
// eliminamos setInterval porque ya no estamos haciendo la petición automáticamente
/* setInterval(obtenerDatos, 5 * 60 * 1000); */ 
obtenerDatos();

function toggleElectrodomestico(nombre) {
    electrodomesticosSeleccionados[nombre] = !electrodomesticosSeleccionados[nombre];
    cambiarImagenElectrodomestico(nombre, electrodomesticosSeleccionados[nombre]);
    calcularCosteElectrodomesticos();
}

function cambiarImagenElectrodomestico(nombre, seleccionado) {
    const imgElement = document.getElementById(`${nombre}-img`);
    const ruta = "./IMAGES/ICONS/";

    if (seleccionado) {
        imgElement.src = `${ruta}${nombre}_color_solid_icon.png`;

    } else {
        imgElement.src = `${ruta}${nombre}_bn_light_icon.png`;
    }
}

function calcularCosteElectrodomesticos() {
    let costeTotal = 0;

    for (const nombre in electrodomesticosSeleccionados) {
        if (electrodomesticosSeleccionados[nombre]) {
            const potencia = electrodomesticos[nombre].potencia;
            const costePorHora = (potencia / 1000) * (precioActual.price / 1000);
            costeTotal += costePorHora;
        }
    }
    document.getElementById('consumoTotal').textContent = `${costeTotal.toFixed(2)} €`;
}
/*      
  //Funcion ecoConsejos

  //Array con consejos. Lo suyo es enlazar un JSON con todos los EcoConsejos.
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
  const aside = document.querySelector("aside>p");
  aside.textContent = ecoConsejos[index];
  
  //Cada 2 min se muestra un consejo diferente
  setInterval(() => {
    index = (index + 1) % ecoConsejos.length;
    aside.textContent = ecoConsejos[index];
  }, 2 * 60 * 1000);
  */
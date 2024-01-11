'use strict';

let precioActual;

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
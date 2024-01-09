'use strict';

let precioActual; // Declaro la variable fuera de la función para usarla después en el calculo *potenciaDeElectrodoméstico

const obtenerDatos = async () => {
    try {
        const horaActual = new Date();
        const horaActualEnHoras = horaActual.getHours() + horaActual.getMinutes() / 60;

        // Con este ajuste aquí y la función de la línea 29 he conseguido que no de error al pasar al tramo horario 00:00-01:00, antes me saltaba el else con tramo horario 0-1
        const tramoHorario = obtenerTramoHorario(horaActualEnHoras);

        const response = await fetch('https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB');
        const datos = await response.json();

        precioActual = datos.data[tramoHorario];
        // Tanto el if como el else son innecesarios, los dejo ahora mientras voy probando, para que me salte uno u otro, está siendo muy útil ahora, cuando todo vaya bien los eliminamos, dejando el log del if
        if (precioActual) {
            console.log(`Precio actual para el tramo horario ${tramoHorario}: ${precioActual.price} €/MWh`);
        } else {
            console.log(`No hay datos disponibles para el tramo horario ${tramoHorario}`);
        }
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
};

// Función para obtener el tramo horario con manejo de medianoche
function obtenerTramoHorario(hora) {
    const tramo = Math.floor(hora);
    return tramo < 10 ? `0${tramo}-0${(tramo + 1) % 24}` : `${tramo}-${(tramo + 1) % 24}`;
}

setInterval(obtenerDatos, 5 * 60 * 1000);
obtenerDatos();
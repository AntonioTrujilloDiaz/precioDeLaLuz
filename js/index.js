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

//IMPLEMENTACIÓN DE MI CÓDIGO, PARA QUE LO VEÁIS Y FUSIONÉIS O SAQUÉIS DE AQUÍ LO NECESARIO 
function obtenerDatosHoraActual() {
    const horaActual = new Date();
    console.log(horaActual);
  
    const horaActualAPI = horaActual.getHours();
  
    fetch("https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB")
      .then(response => response.json())
      .then(data => {
        const claveApiTramoHoraActual = (`${horaActualAPI}-${horaActualAPI + 1}`);
        const tramoHoraActual = data.data[claveApiTramoHoraActual];
  
        if (tramoHoraActual) {
          console.log(`Tramo de hora actual según la API: ${tramoHoraActual.hour}`);
          console.log(`Precio: ${tramoHoraActual.price} ${tramoHoraActual.units}`);
          console.log(`¿Barata?: ${tramoHoraActual["is-cheap"]}`);
  
          // PRECIO MÁS BAJO DEL DÍA
          const preciosDelDia = Object.values(data.data).map(info => info.price);
          const precioMasBajoDelDia = Math.min(...preciosDelDia);
  
          console.log(`Precio más bajo del día: ${precioMasBajoDelDia} €/MWh`);
  
          // TRAMO CORRESPONDIENTE AL PRECIO MÁS BAJO DEL DÍA
          const tramoPrecioMasBajo = Object.keys(data.data).find(key => data.data[key].price === precioMasBajoDelDia);

          console.log(`Tramo horario del precio más bajo: ${tramoPrecioMasBajo}`);

          //PRECIO MÁS ALTO DEL DÍA
          const precioMasAltoDelDia = Math.max(...preciosDelDia);

          console.log(`Precio más alto del día: ${precioMasAltoDelDia} €/MWh`);

          //TRAMO HORARIO DEL PRECIO MÁS ALTO DEL DÍA
          const tramoPrecioMasAlto = Object.keys(data.data).find(key => data.data[key].price === precioMasAltoDelDia);

          console.log(`Tramo horario del precio alto: ${tramoPrecioMasAlto}`);  
          
          //PRECIO MEDIO DEL DÍA

          const sumaDePrecios = preciosDelDia.reduce((acc, precio) => acc + precio, 0);
          const precioMedioDelDia = sumaDePrecios / preciosDelDia.length;

          console.log(`El Precio medio del día es: ${precioMedioDelDia} €/MWh`);
  
        } else {
          console.log("No hay datos disponibles para el tramo de hora actual.");
        }
      })
      .catch(error => console.error("Error al obtener datos:", error));
  }
  
  obtenerDatosHoraActual();


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
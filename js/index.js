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


const obtenerDatos = async () => {
    try {
        const horaActual = new Date();
        const horaActualEnHoras = horaActual.getHours() + horaActual.getMinutes() / 60;

        // Con este ajuste aquí y la función de la línea 29 he conseguido que no de error al pasar al tramo horario 00:00-01:00, antes me saltaba el else con tramo horario 0-1
        const tramoHorario = obtenerTramoHorario(horaActualEnHoras);

        const response = await fetch('https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB');
        const datos = await response.json();

        precioActual = datos.data[tramoHorario];
        
        if (precioActual) {
            console.log(`Precio actual para el tramo horario ${tramoHorario}: ${precioActual.price} €/MWh`);
            calcularCosteElectrodomesticos();
        } else {
            console.log(`No hay datos disponibles para el tramo horario ${tramoHorario}`);
        }
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
    }
};

setInterval(obtenerDatos, 5 * 60 * 1000);
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

/*        if (tramoHoraActual) {
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

/*        if (tramoHoraActual) {
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
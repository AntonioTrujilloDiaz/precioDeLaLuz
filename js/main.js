'use strict'

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

/* 
Función principal que se activa con el Evento "onclick", al ejecutar la funcion principal, ella ejecuta a las otras funciones que se desarrollan debajo para cada funcionalidad
*/
function toggleElectrodomestico(nombre) {
    electrodomesticosSeleccionados[nombre] = !electrodomesticosSeleccionados[nombre];
    cambiarImagenElectrodomestico(nombre, electrodomesticosSeleccionados[nombre]);
    calcularCosteElectrodomesticos();
    cambiarBackgroundElectrodomestico(nombre, electrodomesticosSeleccionados[nombre]);
    quitarBoxshadow(nombre, electrodomesticosSeleccionados[nombre]);
}

function cambiarImagenElectrodomestico(nombre, seleccionado) {
    const imgElement = document.getElementById(`${nombre}-img`);

    if (seleccionado) {
        imgElement.src = `./IMAGES/ICONS/${nombre}_color_solid_icon.png`;

    } else {
        imgElement.src = `./IMAGES/ICONS/${nombre}_bn_light_icon.png`;
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

function cambiarBackgroundElectrodomestico(nombre, seleccionado) {
    const imgElement = document.getElementById(`${nombre}-img`);

    if (seleccionado) {
        imgElement.style.backgroundColor = "rgba(0, 255, 255, 0.2)";

    } else {
        imgElement.style.backgroundColor = "#e0d5d5";
    }
}

function quitarBoxshadow(nombre, seleccionado) {
    const imgElement = document.getElementById(`${nombre}-li`);
    
    if (seleccionado) {
        imgElement.style.boxShadow = 'none';

    } else {
        imgElement.style.boxShadow = "10px 10px 10px #603913c8";
    }
}

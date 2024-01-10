'use strict'

// OBTENGO LOS DATOS DE LA API
function obtenerDatosAPI() {
    return fetch("https://bypass-cors-beta.vercel.app/?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB")
      .then(response => response.json())
      .then(data => data.data);
  }
  
 // PROCESO LOS DATOS OBTENIDOS DE LA API 
  function procesarDatosParaChart(datosAPI) {
    const tramosHorarios = Object.keys(datosAPI);
    const precios = tramosHorarios.map(hora => datosAPI[hora].price);
    /* console.log(tramosHorarios); */
  
    return { tramosHorarios, precios };
  }
  // AQUÍ CREAMOS LA GRÁFICA Y LA CONFIGURAMOS
  function crearGrafica(tramosHorarios, precios) {
    const ctx = document.getElementById('miGrafica').getContext('2d');
  
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: tramosHorarios,
        datasets: [{
          label: 'Precio por tramo horario',
          /* tension: .5, */
          data: precios,
          borderColor: 'orange',
          borderWidth: 2,
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          fill: true,
          pointBorderWidth: 5
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Tramos Horarios',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Precio (€/MWh)',
            },
          },
        },
        plugins: {
            legend: {
              display: true,
            },
        },
      },
    });
  }
  
//FUNCIÓN PRINCIPAL QUE ACTÚA COMO MAIN DE TODO EL PROCESO PARA COORDINARLO TODO
  function inicializarGrafica() {
    obtenerDatosAPI()
      .then(datosAPI => {
        const { tramosHorarios, precios } = procesarDatosParaChart(datosAPI);
        crearGrafica(tramosHorarios, precios);
      })
      .catch(error => console.error("Error al obtener datos de la API:", error));
  }
  
  inicializarGrafica();
  
  

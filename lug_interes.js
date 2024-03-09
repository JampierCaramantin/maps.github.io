//marcadores de luhares de interes

// ejemplos de punto geográficos
datos = [
  { 'latitud': -12.216534, 'longitud': -76.947519 },
  /* { 'latitud': 19.29, 'longitud': -72.10 },
  { 'latitud': 19.05, 'longitud': -71.48 },
  { 'latitud': 19.15, 'longitud': -71.89 },
  { 'latitud': 19.00, 'longitud': -72.11 }, */

  // adicionar mas puntos geográficos aqui
];
function colorAleatorio () {
    var numeroAleatorio = Math.round(Math.random()*10);
    console.log(numeroAleatorio);
    return numeroAleatorio<3? 'red': 
            numeroAleatorio<6? 'yellow':
            numeroAleatorio<9? 'blue': 'orange';
};
for (var j=0; j<datos.length; j++) {
    L.marker([datos[j].latitud, datos[j].longitud], { // creando un marcador
        icon: L.AwesomeMarkers.icon({ // ---> SOLUCION !!!
            prefix: 'fa',       // 'fa' es por usar los iconos de FONTAWESOME
            icon: 'home',       // el nombre de los iconos de FontAwesome
            iconColor: 'white', 
            // se llama a la función para conseguir un color
            markerColor: colorAleatorio(), // simplemente puedes usar 'blue', 'white', 'red', ...
        }),
    }).addTo(map);  
};

  /* var marker = L.marker([-12.0798517,-77.004545]).addTo(map); */
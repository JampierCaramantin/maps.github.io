var map = L.map('map').setView([-12.0798517,-77.004545], 13);

/** Aqui agrego todos los mapas que cargare */
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

mapLink = '<a href="http://www.esri.com/">Esri</a>';
var satelite = L.tileLayer(
    'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; ' + mapLink,
        /*maxZoom: 17,*/
    });
if (location.protocol !== "http:") {
  location.protocol = "http:";
}
var calles = L.tileLayer('http://www.guiacalles.co/calles/{z}/{x}/{y}.jpg', {
        /*maxZoom: 17,*/
    attribution: '<a>👻CodeGhost</a> ' +
    '&nbsp;&nbsp;&nbsp;&nbsp;',
    id: 'mapbox.streets'});
    
var CartoDB_VoyagerLabelsUnder = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
    });
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

var Geodir = L.tileLayer("https://tiles.geodir.co/osm_tiles/{z}/{x}/{y}.png", {
    minZoom: 1,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.Geodir.com/" target="_blank">Geodir</a> contributors'
    });
    /** no ca */

/** capas mapas */
var baseMaps = {
    'Open Street Map': osm,
    'calles': calles,
    'Geodir': Geodir,
    'satelite': satelite,
    'Map numeracion': CartoDB_VoyagerLabelsUnder,
    'calles con numero': OpenTopoMap,
};

L.control.layers(baseMaps).addTo(map)

/*L.marker = L.marker([50,20]).addTo(map)
    .bindPopup('<a href="http://maps.google.com/maps?q=&layer=c&cbll=-12.0798517,-77.004545cbp=11,0,0,0,0"target="_blank"> <b> Google Street Viev</b></a>').openPopup();
 ------- probando -------- 
 map.on('click', function(e) {
    let lat = e.latlng.lat.toPrecision(8);
    let lon = e.latlng.lat.toPrecision(8);
    const point = L.marker([lat,lon]).addTo(map)
        .bindPopup('<a href="http://maps.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lon + '$cbp=11,0,0,0,0" target="_blank"> <b> Google Street Viev</b></a>').openPopup();
 })
 */

//marcador 
// var marker <-- creamos variable en la cual le daremos el valor de la clase marker
/*var marker = L.marker([-12.0798517,-77.004545]).addTo(map);*/


 /** manejo de distritos mediante select */
document.getElementById('select-location').addEventListener('change', function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,14);
})

/** buqeuda por coordenadas */

//var map = L.map('map').setView([0, 0], 2);  // Inicializa el mapa en el centro del mundo

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    }).addTo(map);

function buscarUbicacion() {
    var input = document.getElementById('coordenadas').value;
    var coordenadas = input.split(',');
    var lat = parseFloat(coordenadas[0]);
    var lon = parseFloat(coordenadas[1]);

    if (!isNaN(lat) && !isNaN(lon)) {
        map.setView([lat, lon], 17);
        L.marker([lat, lon]).addTo(map);
    } else {
        alert('Por favor, ingresa coordenadas válidas en el formato "latitud, longitud".');
    }
}
/** funcion buscsr dando enter */
document.getElementById('coordenadas').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarUbicacion();
    }
  });





// evento para obtener coordenadas dando click sobre el mapa 
map.on('click', function(ev) {
    alert(ev.latlng); // ev is an event object (MouseEvent in this case)
    });
function openStreetView(lat, lng) {
    var streetViewURL = 'https://www.google.com/maps?q=&layer=c&cbll=' + lat + ',' + lng;
    window.open(streetViewURL, '_blank');
}

// Evento para obtener coordenadas al hacer clic sobre el mapa
map.on('click', function(ev) {
    var lat = ev.latlng.lat; // Obtener la latitud
    var lng = ev.latlng.lng; // Obtener la longitud

    // Crear un marcador en el mapa
    var marker = L.marker([lat, lng]).addTo(map);
    
    // Agregar un mensaje al marcador
    marker.bindPopup('Google Street View <br> Click en 📍').openPopup();

    // Evento para abrir Street View al hacer clic en el marcador
    marker.on('click', function() {
        openStreetView(lat, lng);
    });

    // Evento para cerrar el marcador si se hace clic en cualquier lugar del mapa
    map.on('click', function() {
        map.closePopup();
        map.off('click');
    });
});
 



// ------------------ Función para realizar la geocodificación y centrar el mapa en la dirección ---------------------------

function geocodeAndCenter(address) {
    // Construir la URL para la geocodificación usando Nominatim
    var geocodingURL = 'https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(address);

    // Realizar la solicitud de geocodificación
    fetch(geocodingURL)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                var result = data[0];
                var lat = parseFloat(result.lat);
                var lon = parseFloat(result.lon);

                // Centrar el mapa en las coordenadas obtenidas
                map.setView([lat, lon], 15);

                // Añadir un marcador en la ubicación
                L.marker([lat, lon]).addTo(map);
            } else {
                alert('Dirección no encontrada');
            }
        })
        .catch(error => console.error('Error en la solicitud de geocodificación:', error));
}

// Manejar la búsqueda por direcciones al enviar el formulario
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var addressInput = document.getElementById('address-input').value;
    geocodeAndCenter(addressInput);
});

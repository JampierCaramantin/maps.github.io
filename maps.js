var map = L.map("map").setView([-12.0798517, -77.004545], 13);

// Agregar capa de tiles (necesario para mostrar el mapa)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Función mejorada para abrir Street View
function openStreetView(lat, lng) {
    // URL correcta para Google Maps Street View
    var streetViewURL = 'https://www.google.com/maps/@' + lat + ',' + lng + ',0a,60y,90t/data=!3m4!1e1!3m2!1s' + lat + ',' + lng + '!2e0';
    
    // Alternativa más simple y confiable
    // var streetViewURL = 'https://www.google.com/maps?q=' + lat + ',' + lng + '&layer=c&cbll=' + lat + ',' + lng;
    
    window.open(streetViewURL, '_blank');
}

// Función para buscar por coordenadas (corregida)
function buscarCoordenadas() {
    var input = document.getElementById('coordenadas'); // Corregido: getElementById en lugar de getElement
    
    if (!input) {
        console.error('Elemento con ID "coordenadas" no encontrado');
        return;
    }
    
    var coordenadas = input.value.trim();
    
    if (!coordenadas) {
        alert('Por favor ingresa las coordenadas');
        return;
    }
    
    // Parsear coordenadas (formato esperado: "lat,lng" o "lat lng")
    var coords = coordenadas.split(/[,\s]+/);
    
    if (coords.length !== 2) {
        alert('Formato incorrecto. Usa: latitud,longitud (ejemplo: -12.0798517,-77.004545)');
        return;
    }
    
    var lat = parseFloat(coords[0]);
    var lng = parseFloat(coords[1]);
    
    if (isNaN(lat) || isNaN(lng)) {
        alert('Las coordenadas deben ser números válidos');
        return;
    }
    
    // Centrar el mapa en las coordenadas
    map.setView([lat, lng], 16);
    
    // Agregar marcador con popup que incluye enlace a Street View
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`
        <b>Ubicación encontrada</b><br>
        Lat: ${lat}<br>
        Lng: ${lng}<br>
        <button onclick="openStreetView(${lat}, ${lng})" style="margin-top:5px; padding:5px 10px; background-color:#4285f4; color:white; border:none; border-radius:3px; cursor:pointer;">
            Ver en Street View
        </button>
    `).openPopup();
}

/** funcion buscar dando enter */
document.getElementById('coordenadas').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      buscarCoordenadas();
    }
  });



// Función para agregar marcadores con Street View al hacer click en el mapa
map.on('click', function(e) {
    var lat = e.latlng.lat;
    var lng = e.latlng.lng;
    
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`
        <b>Ubicación seleccionada</b><br>
        Lat: ${lat.toFixed(6)}<br>
        Lng: ${lng.toFixed(6)}<br>
        <button onclick="openStreetView(${lat}, ${lng})" style="margin-top:5px; padding:5px 10px; background-color:#4285f4; color:white; border:none; border-radius:3px; cursor:pointer;">
            Ver en Street View
        </button>
    `).openPopup();
});




///funcion de buscar por direcciones.
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

                // Remover marcador existente si hay uno
                if (map.marker) {
                    map.removeLayer(map.marker);
                }

                // Añadir un marcador en la ubicación
                var marker = L.marker([lat, lon]).addTo(map);
                map.marker = marker;
                
                // Contenido del popup con el mismo estilo que la búsqueda por coordenadas
                var popupContent = `
                    <b>Dirección encontrada</b><br>
                    ${result.display_name || address}<br>
                    Lat: ${lat.toFixed(6)}<br>
                    Lng: ${lon.toFixed(6)}<br>
                    <button onclick="openStreetView(${lat}, ${lon})" style="margin-top:5px; padding:5px 10px; background-color:#4285f4; color:white; border:none; border-radius:3px; cursor:pointer;">
                        Ver en Street View
                    </button>
                `;
                
                // Vincular el popup al marcador y abrirlo
                marker.bindPopup(popupContent).openPopup();
                
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
    if (addressInput.trim()) {
        geocodeAndCenter(addressInput);
    } else {
        alert('Por favor ingresa una dirección');
    }
});

// Selecciona el combo box en el DOM
const comboBox = document.getElementById("comboDistritos");

// Recorre las características (features) del objeto distrit
distrit.features.forEach((feature) => {
    const option = document.createElement("option");
    option.value = feature.properties.DISTRITO; // Asigna el nombre del distrito al valor
    option.textContent = feature.properties.DISTRITO; // Texto visible en el combo
    comboBox.appendChild(option);
});
   
// Llenar el combo box con los nombres de distritos
distrit.features.forEach((feature) => {
    const option = document.createElement("option");
    option.value = feature.properties.DISTRITO; // Valor del distrito
    option.textContent = feature.properties.DISTRITO; // Texto del distrito
    comboBox.appendChild(option);
});

// Variable para almacenar el polígono actualmente dibujado
let currentPolygon = null;

// Función para dibujar un polígono basado en el nombre del distrito
function drawPolygon(districtName) {
    // Buscar el distrito correspondiente en los datos
    const selectedDistrict = distrit.features.find(
        (feature) => feature.properties.DISTRITO === districtName
    );

    // Si existe un polígono actualmente dibujado, eliminarlo
   /*  if (currentPolygon) {
        map.removeLayer(currentPolygon);
    } */

    // Dibujar el nuevo polígono si se encuentra el distrito
    if (selectedDistrict) {
        const coordinates = selectedDistrict.geometry.coordinates[0].map(coord => [coord[1], coord[0]]); // Leaflet usa [lat, lng]
        currentPolygon = L.polygon(coordinates, { color: 'blue' }).addTo(map);
        map.fitBounds(currentPolygon.getBounds()); // Ajustar el mapa al polígono
    }
}

// Escuchar cambios en el combo box y dibujar el polígono seleccionado
comboBox.addEventListener("change", (e) => {
    const selectedDistrict = e.target.value;
    drawPolygon(selectedDistrict);
});


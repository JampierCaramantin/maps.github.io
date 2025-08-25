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
var calles = L.tileLayer('http://www.guiacalles.co/calles/{z}/{x}/{y}.jpg', {
    // maxZoom: 17, // Comentado para desactivar temporalmente
    attribution: '<a>👻CodeGhost</a> &nbsp;&nbsp;&nbsp;&nbsp;',
    id: 'mapbox.streets'
});
    
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
var kmlLayer = new L.KML("KML/LIMA.kml");
map.addLayer(kmlLayer);

/* fetch('archivo.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data).addTo(map);
  }); */
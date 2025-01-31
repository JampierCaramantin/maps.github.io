const markers = [];
    let rows = [];
    const zonasSet = new Set();

    // Modal logic
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    document.getElementById('openModal').addEventListener('click', () => {
      modal.classList.add('open');
      overlay.classList.add('open');
    });
    overlay.addEventListener('click', () => {
      modal.classList.remove('open');
      overlay.classList.remove('open');
    });

    // Leer el archivo Excel
    document.getElementById('fileInput').addEventListener('change', async function (event) {
      const file = event.target.files[0];
      if (!file) return;

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      rows = XLSX.utils.sheet_to_json(sheet);

      rows.forEach(row => {
        const cliente = row['CLIENTE'];
        const direccion = row['DIRECCION'];
        const distrito = row['DISTRITO'];
        const zona = row['ZONA'];
        const estado = row['ESTADO'];
        const lat = parseFloat(row['EJEX']);
        const lng = parseFloat(row['EJEY']);

        if (estado === 'ACTIVO' && !isNaN(lat) && !isNaN(lng)) {
          // Crear marcador y agregar al mapa
          const marker = L.marker([lat, lng]).addTo(map);
          marker.bindPopup(`
            <strong>${cliente}</strong><br>
            Dirección: ${direccion}<br>
            Distrito: ${distrito}<br>
            Zona: ${zona}
          `);
          markers.push({ marker, row });

          // Agregar zona al Set
          zonasSet.add(zona);
        }
      });

      // Llenar el select de zonas
      const zonaSelect = document.getElementById('zonaSelect');
      zonasSet.forEach(zona => {
        const option = document.createElement('option');
        option.value = zona;
        option.textContent = zona;
        zonaSelect.appendChild(option);
      });
    });

    // Aplicar filtros


    document.getElementById('applyFilters').addEventListener('click', () => {
      const zonaFilter = document.getElementById('zonaSelect').value;
      const clienteFilter = document.getElementById('clienteInput').value.toLowerCase();

      markers.forEach(({ marker, row }) => {
        const matchesZona = !zonaFilter || row['ZONA'] === zonaFilter;
        const matchesCliente = !clienteFilter || row['CLIENTE'].toLowerCase().includes(clienteFilter);
        if (matchesZona && matchesCliente) {
          marker.addTo(map);
        } else {
          map.removeLayer(marker);
        }
      });

      modal.classList.remove('open');
      overlay.classList.remove('open');
    });

    // Autocompletar clientes
    const clienteInput = document.getElementById('clienteInput');
    const suggestions = document.getElementById('suggestions');

    clienteInput.addEventListener('input', () => {
      const search = clienteInput.value.toLowerCase();
      suggestions.innerHTML = '';

      if (search) {
        const filteredClients = rows
          .filter(row => row['CLIENTE'].toLowerCase().includes(search))
          .map(row => row['CLIENTE'])
          .slice(0, 5);

        filteredClients.forEach(cliente => {
          const li = document.createElement('li');
          li.textContent = cliente;
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => {
            clienteInput.value = cliente;
            suggestions.innerHTML = '';
          });
          suggestions.appendChild(li);
        });
      }
    });




/* document.getElementById('fileInput').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Leer el archivo Excel
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0]; // Primera hoja
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    // Procesar cada fila del Excel
    rows.forEach(row => {
      const cliente = row['CLIENTE'];
      const direccion = row['DIRECCION'];
      const distrito = row['DISTRITO'];
      const zona = row['ZONA'];
      const giroNegocio = row['GIRONEGOCIO'];
      const estado = row['ESTADO'];
      const lat = parseFloat(row['EJEX']); // Coordenadas
      const lng = parseFloat(row['EJEY']);

      // Verificar si el cliente está activo y las coordenadas son válidas
      if (estado === 'ACTIVO' && !isNaN(lat) && !isNaN(lng)) {
        // Crear un marcador y agregar un popup
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`
          <strong>${cliente}</strong><br>
          Dirección: ${direccion}<br>
          Distrito: ${distrito}<br>
          Zona: ${zona}<br>
          Giro: ${giroNegocio}
        `);
      }
    });
  }); */
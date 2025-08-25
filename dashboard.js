// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const openModalBtn = document.getElementById('openModal');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.querySelector('.modal-close');

    // Open modal
    openModalBtn.addEventListener('click', function() {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Close modal when clicking close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking overlay
    overlay.addEventListener('click', closeModal);

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Make closeModal function globally available
    window.closeModal = closeModal;

    // File input styling
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const fileName = e.target.files[0]?.name;
            if (fileName) {
                // You can add custom file handling here
                console.log('Archivo seleccionado:', fileName);
            }
        });
    }

    // Form submission handling
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const address = document.getElementById('address-input').value;
            if (address.trim()) {
                // Handle address search
                console.log('Buscando dirección:', address);
                // You can integrate this with your existing search functionality
            }
        });
    }

    // Coordinate search handling
    const coordenadasInput = document.getElementById('coordenadas');
    if (coordenadasInput) {
        coordenadasInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const coords = this.value.trim();
                if (coords) {
                    // Handle coordinate search
                    console.log('Buscando coordenadas:', coords);
                    // You can integrate this with your existing buscarUbicacion function
                }
            }
        });
    }

    // District selector handling
    const distritoSelect = document.getElementById('comboDistritos');
    if (distritoSelect) {
        distritoSelect.addEventListener('change', function(e) {
            const selectedDistrito = e.target.value;
            if (selectedDistrito) {
                // Handle district selection
                console.log('Distrito seleccionado:', selectedDistrito);
                // You can integrate this with your existing district functionality
            }
        });
    }

    // Filter functionality
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const zona = document.getElementById('zonaSelect').value;
            const cliente = document.getElementById('clienteInput').value;
            
            // Apply filters
            console.log('Aplicando filtros:', { zona, cliente });
            // You can integrate this with your existing filter functionality
            
            // Close modal after applying filters
            closeModal();
        });
    }

    // Clear filters function
    window.clearFilters = function() {
        document.getElementById('zonaSelect').value = '';
        document.getElementById('clienteInput').value = '';
        document.getElementById('suggestions').innerHTML = '';
        console.log('Filtros limpiados');
    };

    // Quick action functions
    window.resetMap = function() {
        console.log('Centrando mapa...');
        // You can integrate this with your existing map centering functionality
    };

    window.toggleLayers = function() {
        console.log('Alternando capas...');
        // You can integrate this with your existing layer toggle functionality
    };

    // Client search suggestions
    const clienteInput = document.getElementById('clienteInput');
    const suggestionsList = document.getElementById('suggestions');
    
    if (clienteInput && suggestionsList) {
        clienteInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length > 2) {
                // Simulate client search suggestions
                // You can replace this with actual API calls
                const suggestions = [
                    'Cliente A - Zona Norte',
                    'Cliente B - Zona Sur',
                    'Cliente C - Zona Este',
                    'Cliente D - Zona Oeste'
                ].filter(client => 
                    client.toLowerCase().includes(query.toLowerCase())
                );
                
                displaySuggestions(suggestions);
            } else {
                suggestionsList.innerHTML = '';
            }
        });

        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!clienteInput.contains(e.target) && !suggestionsList.contains(e.target)) {
                suggestionsList.innerHTML = '';
            }
        });
    }

    function displaySuggestions(suggestions) {
        suggestionsList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', function() {
                clienteInput.value = suggestion;
                suggestionsList.innerHTML = '';
            });
            suggestionsList.appendChild(li);
        });
    }

    // Initialize dashboard with some sample data
    initializeDashboard();
});

function initializeDashboard() {
    // You can add initialization logic here
    console.log('Dashboard inicializado');
    
    // Example: Populate zone selector
    const zonaSelect = document.getElementById('zonaSelect');
    if (zonaSelect) {
        const zonas = [
            'Zona Norte',
            'Zona Sur', 
            'Zona Este',
            'Zona Oeste',
            'Zona Centro'
        ];
        
        zonas.forEach(zona => {
            const option = document.createElement('option');
            option.value = zona;
            option.textContent = zona;
            zonaSelect.appendChild(option);
        });
    }
}

// Export functions for use in other scripts
window.dashboardUtils = {
    closeModal: window.closeModal,
    clearFilters: window.clearFilters,
    resetMap: window.resetMap,
    toggleLayers: window.toggleLayers
};

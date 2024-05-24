// Número de personajes por página
const personajesPorPagina = 20;

// Página actual
let paginaActual = 1;

// Función asincrónica para obtener los personajes de la API
async function obtenerPersonajes(pagina) {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${pagina}`);
    const datos = await respuesta.json();
    return datos.results;
}

// Función asincrónica para mostrar los personajes en la página
async function mostrarPersonajes(pagina) {
    // Obtener los personajes de la página especificada
    const personajes = await obtenerPersonajes(pagina);
    
    // Seleccionar el contenedor principal
    const contenedorPrincipal = document.querySelector('main');
    
    // Limpiar contenido existente
    contenedorPrincipal.innerHTML = '';

    // Iterar sobre cada personaje y mostrarlo en la página
    personajes.forEach((personaje) => {
        const articulo = document.createElement('article');
        articulo.innerHTML = `
            <div class="imagen-container">
                <img src="${personaje.image}" alt="${personaje.name}">
            </div>
            <div class="article-content">
                <h2>${personaje.name}</h2>
                <p><strong>Status:</strong> ${personaje.status}</p>
                <p><strong>Especie:</strong> ${personaje.species}</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
                <p><strong>Origen:</strong> ${personaje.origin.name}</p>

            </div>
        `;
        contenedorPrincipal.appendChild(articulo);
    });

    // Mostrar la paginación después de cargar los personajes
    mostrarPaginacion();
}

// Función para mostrar la paginación
function mostrarPaginacion() {
    const paginacion = document.querySelector('.pagination');
    paginacion.innerHTML = '';

    // Calcular el total de páginas (671 es el total de personajes)
    const totalPaginas = Math.ceil(671 / personajesPorPagina);

    // Crear enlaces para cada página
    for (let i = 1; i <= totalPaginas; i++) {
        const enlacePagina = document.createElement('a');
        enlacePagina.href = '#';
        enlacePagina.textContent = i;
        // Agregar un event listener para cargar los personajes de la página seleccionada
        enlacePagina.addEventListener('click', () => {
            paginaActual = i;
            mostrarPersonajes(paginaActual);
        });
        paginacion.appendChild(enlacePagina);
    }
}

// Mostrar la primera página de personajes al cargar la página
mostrarPersonajes(paginaActual);

// Función asincrónica para buscar un personaje por nombre
async function buscarPersonaje() {
    // Obtener el término de búsqueda del campo de entrada
    const terminoBusqueda = document.getElementById('searchInput').value.trim().toLowerCase();
    
    // Si el campo de búsqueda está vacío, mostrar todos los personajes en la página actual
    if (terminoBusqueda === '') {
        mostrarPersonajes(paginaActual);
        return;
    }

    // Realizar una solicitud a la API para buscar personajes por nombre
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character/?name=${terminoBusqueda}`);
    const datos = await respuesta.json();
    
    // Manejar el caso en que no se encuentren resultados
    if (datos.error || datos.results.length === 0) {
        alert('No se encontraron resultados para la búsqueda.');
        return;
    }
    
    // Mostrar los resultados de la búsqueda
    const contenedorPrincipal = document.querySelector('main');
    contenedorPrincipal.innerHTML = '';
    datos.results.forEach((personaje) => {
        const articulo = document.createElement('article');
        articulo.innerHTML = `
            <div class="imagen-container">
                <img src="${personaje.image}" alt="${personaje.name}">
            </div>
            <div class="article-content">
                <h2>${personaje.name}</h2>
                <p><strong>Status:</strong> ${personaje.status}</p>
                <p><strong>Especie:</strong> ${personaje.species}</p>
                <p><strong>Género:</strong> ${personaje.gender}</p>
            </div>
        `;
        contenedorPrincipal.appendChild(articulo);
    });
}

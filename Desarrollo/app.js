const contenedor = document.getElementById("contenedorPaletas");
const btnGenerar = document.getElementById("btnGenerar");
const selectorCantidad = document.getElementById("cantidadColores");

function generarPaleta() {
    const cantidadColores = Number(selectorCantidad.value);

    // Limpiar las secciones anteriores
    contenedor.innerHTML = "";

    // Crear las secciones según la opción seleccionada
    for (let i = 0; i < cantidadColores; i++) {
        const seccion = document.createElement("section");
        contenedor.appendChild(seccion);
    }
}

// Generar automáticamente al cargar la página
generarPaleta();

// Al hacer clic, genera la cantidad seleccionada
btnGenerar.addEventListener("click", generarPaleta);
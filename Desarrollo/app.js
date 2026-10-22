const contenedor = document.getElementById("contenedorPaletas");
const btnGenerar = document.getElementById("btnGenerar");
const selectorCantidad = document.getElementById("cantidadColores");
const selectorFormato = document.getElementById("formatoColores");


//Funcion para generar colores en formato HSL
function generarColorHSL(){
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);

    return `hsl(${h}, ${s}%, ${l}%)`;
}


//Funcion para generar colores en formato HEX
function generarColorHEX() {

    const caracteres = [
    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "A", "B", "C", "D", "E", "F"];

    let color = "#";

    for (let i = 0; i < 6; i++) {
        const indice = Math.floor(Math.random() * caracteres.length);
        color += caracteres[indice];
    }

    return color;
}


//Funcion para generar paleta de colores dependiendo el formato elegido
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
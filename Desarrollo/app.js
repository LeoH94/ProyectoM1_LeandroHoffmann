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
    const formato = selectorFormato.value;

    // Limpiar los articulos anteriores
    contenedor.innerHTML = "";

    // Crear los articulos según la opción seleccionada
    for (let i = 0; i < cantidadColores; i++) {
        const articulo = document.createElement("article");
        const divColor = document.createElement("div");
        const codeColor = document.createElement("code");

        let color;

        if (formato === "HSL"){
            color = generarColorHSL();
        } else {
            color = generarColorHEX();
        }

        divColor.style.backgroundColor = color;
        codeColor.textContent = color;

        contenedor.appendChild(articulo);
        articulo.appendChild(divColor);
        articulo.appendChild(codeColor);
    }
}

// Generar automáticamente al cargar la página
generarPaleta();

// Al hacer clic, genera la cantidad seleccionada
btnGenerar.addEventListener("click", generarPaleta);

// Al cambiar el select cantidad de colores, genera la cantidad seleccionada automaticamente
selectorCantidad.addEventListener("change", generarPaleta);

// Al cambiar el select de formato, genera la cantidad seleccionada en ese formato automaticamente
selectorFormato.addEventListener("change", generarPaleta);
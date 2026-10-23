const contenedor = document.getElementById("contenedorPaletas");
const btnGenerar = document.getElementById("btnGenerar");
const selectorCantidad = document.getElementById("cantidadColores");
const selectorFormato = document.getElementById("formatoColores");
const coloresBloqueados = new Map();



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

//Funcion para transformar formato HSL a HEX
function hslAHex(h, s, l) {
    s /= 100;
    l /= 100;

    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);

    const f = n => {
        const valor = l - a * Math.max(
            -1,
            Math.min(k(n) - 3, Math.min(9 - k(n), 1))
        );

        return Math.round(255 * valor)
            .toString(16)
            .padStart(2, "0");
    };

    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}


//Funcion para generar paleta de colores dependiendo el formato elegido
function generarPaleta() {
    const cantidadColores = Number(selectorCantidad.value);
    const formato = selectorFormato.value;

    contenedor.innerHTML = "";

    // Eliminar bloqueos que excedan la cantidad seleccionada
    for (const indice of coloresBloqueados.keys()) {
        if (indice >= cantidadColores) {
            coloresBloqueados.delete(indice);
        }
    }

    for (let i = 0; i < cantidadColores; i++) {
        const articulo = document.createElement("article");
        const divColor = document.createElement("div");
        const codeColor = document.createElement("code");
        const btnBloquear = document.createElement("button");

        let color;

        if (coloresBloqueados.has(i)) {
            color = coloresBloqueados.get(i);
        } else if (formato === "HSL") {
            color = generarColorHSL();
        } else {
            color = generarColorHEX();
        }

        divColor.style.backgroundColor = color;
        codeColor.textContent = color;

        btnBloquear.type = "button";
        btnBloquear.textContent = coloresBloqueados.has(i)
            ? "🔒 Bloqueado"
            : "🔓 Bloquear";

        btnBloquear.addEventListener("click", () => {
            if (coloresBloqueados.has(i)) {
                coloresBloqueados.delete(i);
            } else {
                coloresBloqueados.set(i, color);
            }
            btnBloquear.textContent = coloresBloqueados.has(i)
            ? "🔒 Bloqueado"
            : "🔓 Bloquear";
        });

         articulo.addEventListener("click", async (event) => {
        // Evitar copiar cuando se pulsa el botón de bloqueo
        if (event.target.closest("button")) {
            return;
        }

        let hex = color;

        // Si el color está en HSL, convertirlo a HEX
        if (formato === "HSL") {
            const valores = color.match(/[\d.]+/g).map(Number);

            hex = hslAHex(
                valores[0],
                valores[1],
                valores[2]
            );
        }

        try {
            await navigator.clipboard.writeText(hex);

            // Mostrar confirmación temporal
            codeColor.textContent = `${hex} ¡Copiado!`;

            setTimeout(() => {
                codeColor.textContent = color;
            }, 1200);

        } catch (error) {
        console.error("No se pudo copiar el color:", error);
        }
        });

        articulo.appendChild(divColor);
        articulo.appendChild(codeColor);
        articulo.appendChild(btnBloquear);
        contenedor.appendChild(articulo);

    }
}

// Generar automáticamente al cargar la página
generarPaleta();

// Al hacer clic, genera la cantidad seleccionada
btnGenerar.addEventListener("click", generarPaleta);

// Al cambiar el select cantidad de colores, genera la cantidad seleccionada automaticamente
//selectorCantidad.addEventListener("change", generarPaleta);

// Al cambiar el select de formato, genera la cantidad seleccionada en ese formato automaticamente
//selectorFormato.addEventListener("change", generarPaleta);
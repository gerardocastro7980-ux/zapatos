// =========================================
// GALERÍA PRINCIPAL
// =========================================

const fotos = [
    "fotos/persona1.jpg",
    "fotos/persona2.jpg",
    "fotos/persona3.jpg",
    "fotos/persona4.jpg",
    "fotos/persona5.jpg"
];

let fotoActual = 0;

const fotoPrincipal =
    document.getElementById("fotoPrincipal");

const contador =
    document.getElementById("contador");

const anterior =
    document.getElementById("anterior");

const siguiente =
    document.getElementById("siguiente");

const puntos =
    document.getElementById("puntos");



// =========================================
// CREAR PUNTOS
// =========================================

fotos.forEach((foto, indice) => {

    const punto =
        document.createElement("button");

    punto.classList.add("punto");

    punto.type = "button";

    punto.addEventListener(
        "click",
        () => {

            mostrarFoto(indice);

            reiniciarTemporizador();

        }
    );

    puntos.appendChild(punto);

});



// =========================================
// MOSTRAR FOTO
// =========================================

function mostrarFoto(indice) {

    fotoActual = indice;

    fotoPrincipal.style.opacity = "0";

    fotoPrincipal.style.transform =
        "scale(1.03)";


    setTimeout(() => {

        fotoPrincipal.src =
            fotos[fotoActual];

        fotoPrincipal.style.opacity = "1";

        fotoPrincipal.style.transform =
            "scale(1)";

    }, 250);


    contador.textContent =
        String(fotoActual + 1).padStart(2, "0")
        + " / "
        + String(fotos.length).padStart(2, "0");


    const todosLosPuntos =
        document.querySelectorAll(".punto");


    todosLosPuntos.forEach(
        (punto, indicePunto) => {

            punto.classList.toggle(
                "activo",
                indicePunto === fotoActual
            );

        }
    );

}



// =========================================
// SIGUIENTE
// =========================================

function fotoSiguiente() {

    fotoActual++;

    if (fotoActual >= fotos.length) {

        fotoActual = 0;

    }

    mostrarFoto(fotoActual);

}



// =========================================
// ANTERIOR
// =========================================

function fotoAnterior() {

    fotoActual--;

    if (fotoActual < 0) {

        fotoActual =
            fotos.length - 1;

    }

    mostrarFoto(fotoActual);

}



// =========================================
// BOTÓN SIGUIENTE
// =========================================

siguiente.addEventListener(
    "click",
    () => {

        fotoSiguiente();

        reiniciarTemporizador();

    }
);



// =========================================
// BOTÓN ANTERIOR
// =========================================

anterior.addEventListener(
    "click",
    () => {

        fotoAnterior();

        reiniciarTemporizador();

    }
);



// =========================================
// CAMBIO AUTOMÁTICO
// =========================================

let temporizador;


function iniciarTemporizador() {

    temporizador =
        setInterval(
            () => {

                fotoSiguiente();

            },
            5000
        );

}


function reiniciarTemporizador() {

    clearInterval(temporizador);

    iniciarTemporizador();

}



// =========================================
// INICIAR GALERÍA
// =========================================

mostrarFoto(0);

iniciarTemporizador();



// =========================================
// ZAPATOS
// =========================================

const zapatos =
    document.querySelectorAll(".zapato");

const zapatoSeleccionado =
    document.getElementById(
        "zapatoSeleccionado"
    );

const imagenZapato =
    document.getElementById(
        "imagenZapato"
    );

const nombreZapato =
    document.getElementById(
        "nombreZapato"
    );

const cerrarZapato =
    document.getElementById(
        "cerrarZapato"
    );



// =========================================
// ABRIR ZAPATO
// =========================================

zapatos.forEach((zapato) => {

    zapato.addEventListener(
        "click",
        () => {

            const imagen =
                zapato.dataset.imagen;


            imagenZapato.src =
                imagen;


            const modelo =
                zapato
                    .querySelector("strong")
                    .textContent
                    .trim();


            const color =
                zapato
                    .querySelector("span")
                    .textContent
                    .trim();


            nombreZapato.textContent =
                modelo + " / " + color;


            zapatoSeleccionado.classList.add(
                "visible"
            );


            document.body.classList.add(
                "modal-abierto"
            );

        }
    );

});



// =========================================
// CERRAR MODAL
// =========================================

function cerrarModal() {

    zapatoSeleccionado.classList.remove(
        "visible"
    );

    document.body.classList.remove(
        "modal-abierto"
    );

}



// =========================================
// BOTÓN X
// =========================================

cerrarZapato.addEventListener(
    "click",
    cerrarModal
);



// =========================================
// CLIC FUERA
// =========================================

zapatoSeleccionado.addEventListener(
    "click",
    (evento) => {

        if (
            evento.target ===
            zapatoSeleccionado
        ) {

            cerrarModal();

        }

    }
);



// =========================================
// ESC
// =========================================

document.addEventListener(
    "keydown",
    (evento) => {

        if (evento.key === "Escape") {

            cerrarModal();

        }

    }
);



// =========================================
// ANIMACIÓN AL HACER SCROLL
// =========================================

const zapatosAnimados =
    document.querySelectorAll(
        ".zapato"
    );


const observador =
    new IntersectionObserver(
        (entradas) => {

            entradas.forEach(
                (entrada) => {

                    if (
                        entrada.isIntersecting
                    ) {

                        entrada.target.classList.add(
                            "mostrar"
                        );

                        observador.unobserve(
                            entrada.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


zapatosAnimados.forEach(
    (zapato) => {

        observador.observe(zapato);

    }
);
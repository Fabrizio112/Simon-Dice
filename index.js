const $botonEmpezar = document.querySelector("#boton-empezar");
const $tituloDelTurno = document.querySelector("#titulo-ronda");
const $numeroDelTurno = document.querySelector("#numero-ronda");
let contadorDelTurno = 0;
let jugadaDeLaMaquina = [];
let jugadaDelUsuario = [];

$botonEmpezar.onclick = function () {
    ocultarContenedorErrores();
    resetearJugadasYContador();
    cicloDeJuego();

}
function cicloDeJuego() {
    contadorDelTurno++;
    deshabilitarLaInteraccionConLosInputs();
    cambiarElNumeroDeRonda(contadorDelTurno);
    cambiarElTitulo(`Turno de la Maquina`);
    juegaLaMaquina();
}

////Funciones Basicas para los textos e inputs
function resetearJugadasYContador() {
    jugadaDeLaMaquina = [];
    jugadaDelUsuario = [];
    contadorDelTurno = 0;
}
function cambiarElTitulo(estado) {
    $tituloDelTurno.textContent = estado;
}
function cambiarElNumeroDeRonda(a) {
    $numeroDelTurno.textContent = `Ronda #${a}`
    $numeroDelTurno.value = `${a}`
}
function deshabilitarLaInteraccionConLosInputs() {
    document.querySelectorAll(`[id*="input"]`).forEach(function (input) {
        input.disabled = true;
    })
}
function habilitarLaInteraccionConLosInputs() {
    document.querySelectorAll(`[id*="input"]`).forEach(function (input) {
        input.disabled = false;
    })
}

////////////////////////////


////Funciones de la Maquina

function juegaLaMaquina() {
    const inputAleatorio = seleccionarAlgunInputAleatorio();
    jugadaDeLaMaquina.push(inputAleatorio);
    jugadaDeLaMaquina.forEach(function (valorDelInputDeLaJugada, indice) {
        let retrasoDeColoreo = (indice + 1) * 1000;
        setTimeout(function () {
            colorearElInput(valorDelInputDeLaJugada);
            console.log(retrasoDeColoreo);
        }, retrasoDeColoreo);

    })
    let retrasoJugadaDelJugador = (jugadaDeLaMaquina.length + 1) * 1000;
    setTimeout(function () {
        cambiarElTitulo(`Turno del Usuario`);
        habilitarLaInteraccionConLosInputs();
        reseteaJugadaDelUsuario();
    }, retrasoJugadaDelJugador)
}

function seleccionarAlgunInputAleatorio() {
    let valorInputs = document.querySelectorAll(`[id*="input"]`)
    let indice = Math.floor(Math.random() * valorInputs.length);
    return valorInputs[indice];
}
function colorearElInput(input) {
    input.style.opacity = 1;
    setTimeout(function () {
        input.style.opacity = 0.35;
    }, 500);
}




document.querySelectorAll(`[id*="input"]`).forEach((input) => {
    input.onclick = function (e) {
        let inputClickeado = e.target;
        jugadaDelUsuario.push(inputClickeado);
        if (jugadaDelUsuario.length === jugadaDeLaMaquina.length) {
            for (let i = 0; i < jugadaDeLaMaquina.length; i++) {
                if (jugadaDelUsuario[i] === jugadaDeLaMaquina[i]) {
                } else {
                    return partidaFinalizada()
                }
            }
            return cicloDeJuego();
        }

    }
});

function partidaFinalizada() {
    aparecerContenedorErrores();
    mensajeFinal();
}
function aparecerContenedorErrores() {
    document.querySelector("#contenedor-errores").classList.remove("oculto");
}
function ocultarContenedorErrores() {
    document.querySelector("#contenedor-errores").classList.add("oculto");
}

function reseteaJugadaDelUsuario() {
    jugadaDelUsuario = [];
}
function mensajeFinal() {
    document.querySelector("#mensaje-final").textContent = `!!!!Enhorabuena has conseguido llegar hasta la Ronda ${contadorDelTurno}`
}
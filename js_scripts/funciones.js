// Actualizar hora
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" +seconds;
}

// Asignar tema
function cambiarTema(opc= undefined) {
    const temaActual = localStorage.getItem("tema");
    console.log("Tema Almacenado: ", temaActual);
    let body= document.getElementsByTagName("body")[0];
    let nuevoTema = temaActual === 'light' ? 'dark' : 'light';
    
    if (opc !== undefined) {
        nuevoTema = opc;
    }

    body.classList.remove(`${temaActual}-mode`);
    body.classList.add(`${nuevoTema}-mode`);
    localStorage.setItem("tema", nuevoTema);
    body.offsetHeight;
    console.log("Cambiado  de " + temaActual + " a " + nuevoTema);
}
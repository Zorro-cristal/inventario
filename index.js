//Funcion para mostrar Dialog para modificar el cliente
function modificarClienteDialog() {
    var dialog= document.getElementById('modificarClienteDialog');
    var dialogBoton= document.getElementById('modificarClienteBoton');
    dialogBoton.addEventListener('click', (e) => {
        dialog.showModal();
        e.preventDefault();
    });

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
        dialog.close();
        }
    });
}

//Funcion para mostrar Dialog para modificar el proveedor
function modificarProveedorDialog() {
    var dialog= document.getElementById('modificarProveedorDialog');
    var dialogBoton= document.getElementById('modificarProveedorBoton');
    dialogBoton.addEventListener('click', (e) => {
        dialog.showModal();
        e.preventDefault();
    });

    dialog.addEventListener("click", (e) => {
        if (e.target === dialog) {
        dialog.close();
        }
    });
}
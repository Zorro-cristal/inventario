//Validamos el rol
if (validarRol("administrador")) {
    console.log("Acceso autorizado");
  } else {
    window.location.replace("../index?usuario=" + userName + ".html");
  }  

function paginaCargada() {
    var dialog= document.getElementById('modificarProveedorDialog');
    document.getElementById('buscarBoton').addEventListener('click', () => {
        document.getElementById('buscarBoton').value= document.getElementById('proveedor').value;
    });
    dialog.addEventListener('close', () => {
        obtenerProveedor(dialog.returnValue);
    });
}

//Funcion que retorna datos del proveedor
async function obtenerProveedor(nombre_prov) {
    proveedor= await obtenerBdd("Proveedores", "nombre = '" + nombre_prov + "'");
    proveedor= proveedor[0];
    if (proveedor != undefined) {
        document.getElementById('nombre').value= proveedor.nombre;
        document.getElementById('telefono').value= proveedor.telefono;
        document.getElementById('id_proveedor').value= proveedor.id;
    } else {
        var mensaje= document.getElementById('mensaje');
        mensaje.innerText= "Proveedor no encontrado";
        document.getElementById('modificarProveedorDialog').showModal();
    }
}
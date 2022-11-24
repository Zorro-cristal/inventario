//Validamos el rol
if (validarRol("administrador") || validarRol("empleado")) {
    console.log("Acceso autorizado");
} else {
    window.location.replace("../principal?usuario=" + userName + ".html");
}  

//Funcion que retorna datos del proveedor
function obtenerCliente() {
    var cedula= document.getElementById('cedula').value;
    document.getElementById('buscarClienteDialog').close();
    cliente= obtenerBdd("clientes", "cedula = " + cedula);
    cliente= cliente[0];
    if (cliente == undefined) {
        var mensaje= document.getElementById('mensaje');
        mensaje.innerText= "Cliente no encontrado";
        document.getElementById('buscarClienteDialog').showModal();
    } else {
        document.getElementById('ced').value= divisorMiles(cliente.cedula);
        document.getElementById('nombre').value= cliente.nombre;
        document.getElementById('apellido').value= cliente.apellido;
        document.getElementById('ruc').value= cliente.ruc;
        document.getElementById('telefono').value= cliente.telefono;
        document.getElementById('direccion').value= cliente.direccion;
        //document.getElementById('fech_nac').value= cliente.fecha_nacimiento;
        document.getElementById('fech_nac').value= conversorFecha(cliente.fecha_nacimiento);
    }
}
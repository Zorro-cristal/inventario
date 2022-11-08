function paginaCargada() {
    var dialog= document.getElementById('buscarClienteDialog');
}

//Funcion que retorna datos del proveedor
function obtenerCliente() {
    var cedula= document.getElementById('cedula').value;
    document.getElementById('buscarClienteDialog').close()
    $.ajax({
        data: {
            "cedula": cedula
        },
        url: "../php/obtenerDatosCliente.php",//archivo que recibirá el/los datos
        type: "post",
        error: function (jqXHR, textstatus, errorThrowm) {
            //parametros que reciben los erroes si hubiera alguno
            console.log(jqXHR);
            console.warn(textstatus);
            console.log(errorThrowm);
            alert("Error al obtener el cliente de la base de datos");
            return
        },
        success: function (datos) {
            cliente= JSON.parse(datos)[0];
            document.getElementById('ced').value= cliente.cedula;
            document.getElementById('nombre').value= cliente.nombre;
            document.getElementById('apellido').value= cliente.apellido;
            document.getElementById('ruc').value= cliente.ruc;
            document.getElementById('telefono').value= cliente.telefono;
            document.getElementById('direccion').value= cliente.direccion;
            document.getElementById('fech_nac').value= cliente.fecha_nacimiento;
        }
    });
}
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
function obtenerProveedor(nombre_prov) {
    $.ajax({
        data: {
            "nombre": nombre_prov
        },
        url: "../php/obtenerDatosProveedor.php",//archivo que recibirá el/los datos
        type: "post",
        error: function (jqXHR, textstatus, errorThrowm) {
            //parametros que reciben los erroes si hubiera alguno
            console.log(jqXHR);
            console.warn(textstatus);
            console.log(errorThrowm);
            alert("Error al obtener el proveedor de la base de datos");
            return
        },
        success: function (datos) {
            proveedor= JSON.parse(datos)[0];
            console.log(proveedor);
            if (proveedor != undefined) {
                document.getElementById('nombre').value= proveedor.nombre;
                document.getElementById('telefono').value= proveedor.telefono;
                document.getElementById('id_proveedor').value= proveedor.id;
            } else {
                var mensaje= document.getElementById('mensaje');
                mensaje.value= "Proveedor no encontrado";
                document.getElementById('modificarClienteDialog').showModal();
            }
        }
    });
}
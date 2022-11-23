var id;

// Funcion que busca los datos de la venta
function obtenerVenta() {
    id= document.getElementById('id').value;
    document.getElementById('buscarVentaDialog').close();
    var sql= "SELECT * FROM ventas WHERE id= " + id;
    $.ajax({
        data: {
            "comando": sql
        },
        url: "../php/obtenerbdd.php",//archivo que recibirá el/los datos
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
            var dato= JSON.parse(datos)[0];
            if (dato == undefined) {
                var mensaje= document.getElementById('mensaje');
                mensaje.innerText= "Venta no encontrada";
                document.getElementById('buscarVentaDialog').showModal();
            } else {
                datosVenta(dato);
                datosDetalleVentas();
            }
        }
    });
}

// Funcion que asigna los datos de la venta
function datosVenta(datos) {
    console.log(datos);
    var cedula= "";
    for (var i, f= datos.cliente_fk.length; f >= 0; f= f - 3) {
        i= f - 3;
        if (i < 0) {
            i= 0;
        }
        if (cedula != "") {
            cedula= "." + cedula;
        }
        cedula= datos.cliente_fk.substring(i, f) + cedula;
    }
    document.getElementById('cedula').value= cedula;
    document.getElementById('fecha').value= datos.fecha.substring(8) + "/" + datos.fecha.substring(5, 7) + "/" + datos.fecha.substring(0, 4);
    document.getElementById('nro_fact').value= datos.numero_factura;
}

// Funcion que asigna los registros de detalle_ventas
function datosDetalleVentas() {
    var sql= "SELECT * FROM detalle_ventas WHERE venta_fk= " + id;
    $.ajax({
        data: {
            "comando": sql
        },
        url: "../php/obtenerbdd.php",//archivo que recibirá el/los datos
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
            var dato= JSON.parse(datos);
            console.log(dato);
        }
    });
}
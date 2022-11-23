var id;
var productos;

//Obtenemos la lista de productos
$.ajax({
    data: {
        "comando": "SELECT id, nombre FROM productos;"
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
        productos= JSON.parse(datos);
    }
});


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
    document.getElementById('cedula').value= divisorMiles(datos.cliente_fk);
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
        success: function (dato) {
            var datos= JSON.parse(dato);
            console.log(datos);
            //Creamos los nuevos elementos para reemplazarlos
            var new_tbody= document.createElement('tbody');
            var new_tfoot= document.createElement('tfoot');
            //Agregamos las filas y obtenemos los datos del resumen
            var content= "<tbody>";
            cant_total= 0; prec_total= 0; desc_total= 0; subtotal_total= 0;
            for (i= 0; i < datos.length; i++) {
                content= content + agregarFila(datos[i]);
                cant_total += parseInt(datos[i].cantidad);
                prec_total += parseFloat(datos[i].precio_venta);
                desc_total += parseFloat(datos[i].descuento);
                subtotal_total += (parseFloat(datos[i].precio_venta) - parseFloat(datos[i].descuento)) * parseInt(datos[i].cantidad);
                console.log("desc_total= " + desc_total);
            }
            content= content + "</tbody>";
            new_tbody.innerHTML= content;
            document.querySelector('tbody').parentNode.replaceChild(new_tbody, document.querySelector('tbody'));
            //Agregamos los datos del pie
            content= "<tfoot>";
            content= content + '<th style="width: 15%;">' + divisorMiles(cant_total) + '</th>'
            content= content + '<th style="width: 40%;"></th>'
            content= content + '<th style="width: 15%;">' + divisorMiles(prec_total)+ '</th>'
            content= content + '<th style="width: 15%;">' + divisorMiles(desc_total) + '</th>'
            content= content + '<th style="width: 15%;">' + divisorMiles(subtotal_total) + '</th>';
            content= content + "</tfoot>";
            new_tfoot.innerHTML= content;
            document.querySelector('tfoot').parentNode.replaceChild(new_tfoot, document.querySelector('tfoot'));
        }
    });
}

// Funcion para agregar fila
function agregarFila(dato) {
    var aux;
    fila= "<tr>";
    // Agregamos la cantidad
    fila= fila + '<td style="width: 15%;">' + divisorMiles(dato.cantidad) + '</td>';
    // Agregamos el nombre del producto
    aux= productos.filter(
        p => p.id == dato.producto_fk
    )[0];
    fila= fila + '<td style="width: 40%;">' + aux.nombre + '</td>';
    // Agregamos el precio
    aux= divisorMiles(dato.precio_venta);
    fila= fila + '<td style="width: 15%;">' + aux + '</td>';
    // Agregamos el descuento
    aux= divisorMiles(dato.descuento);
    fila= fila + '<td style="width: 15%;">' + aux + '</td>';
    // Agregamos el subtotal
    aux= (parseFloat(dato.precio_venta) - parseFloat(dato.descuento)) * parseInt(dato.cantidad);
    aux= aux.toString();
    aux= divisorMiles(aux);
    fila= fila + '<td style="width: 15%;">' + aux + '</td>';
    fila= fila + "</tr>";
    return fila;
}

// Funcion para dividir los numeros con miles
function divisorMiles(texto) {
    texto= texto.toString();
    decimal= texto.split('.')[1];
    texto= texto.split('.')[0];
    resultado= "";
    for (var i, f= texto.length; f >= 0; f= f - 3) {
        i= f - 3;
        if (i < 0) {
            i= 0;
        }
        if (resultado != "" && f != 0) {
            resultado= "." + resultado;
        }
        resultado= texto.substring(i, f) + resultado;
    }
    //Comprobamos si el numero tiene punto decimal
    if (decimal != undefined) {
        console.log(texto)
        resultado= resultado + "," + decimal;
    }
    return resultado
}
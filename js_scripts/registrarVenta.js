//Lista de los productos en la canasta
var canasta= new Array();
var productos;
var clientes;
var cliente;

//Funcion para limpiar datos del cliente nuevo
function limpiarDatosCliente() {
    document.getElementById('nombre_client').value= "";
    document.getElementById('apellido').value= "";
    document.getElementById('ruc').value= "";
    document.getElementById('direccion').value= "";
    document.getElementById('fecha_nac').value= "";
}

//Funcion para cuando cargue la pagina
function cargarPagina() {
    //Indicamos la fecha actual
    var fecha= new Date();
    fecha.setDate(fecha.getDate() - 1);
    document.getElementById("fecha").value= fecha.toISOString().substring(0, 10);

    var dialog, dialogBoton;
    //Obtenemos los datos de la base de datos
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/registrarVenta.php",
      type: "post",
      error: function (jqXHR, textstatus, errorThrowm) {
        //parametros que reciben los erroes si hubiera alguno
        console.log(jqXHR);
        console.warn(textstatus);
        console.log(errorThrowm);
        alert("Error al obtener los datos de la base de datos");
        return
      },
      success: function (datos) {
        //Se transforma los datos obtenidos al JSON
        var aux= JSON.parse(datos);
        productos= aux['1'];
        console.log(productos);
        clientes= aux['2'];
        console.log(clientes);
      }
    });
    $.ajaxSetup({async: true});
}

//Funcion para obtener Cliente
function obtenerCliente() {
    const cedula= document.getElementById('cedula').value;
    //Buscamos el cliente
    cliente= clientes.find(
        element => element['cedula'] == cedula
    ) || null;
    if (cliente == null) {
        dialog= document.getElementById('clienteDialog');
        //Mostramos el dialg
        dialog.showDialog();
        // showDialog.addEventListener('click', (e) => {
        //     dialog.showModal();
        //     e.preventDefault();
        // });
        cerrarDialog(dialog);
    }
    document.getElementById('nombre').textContent(cliente['nombre']);
    if (cliente['ruc'] == "" || cliente['ruc'] == null) {
        document.getElementById('ruc').textContent(cliente['cedula']);
    } else {
        document.getElementById('ruc').textContent(cliente['cedula'].toString() + '-' + cliente['ruc'].toString());
    }
}

//Funcion para actualizar tabla
function actualizarTabla() {
    const tbody= document.getElementById('canasta_body');
    var new_tbody= document.createElement('tbody');
    new_tbody.id= "canasta_body";
    populate_with_new_rows(new_tbody);
    //Agregamos los productos a la tabla
    for (i= canasta.length - 1; i >= 0; i--) {
        //Obtenemos mas informacion del producto
        var productPos;
        productPos= productos.findIndex(
            element => element['id'] == canasta[i]['id']
        );

        var tr= document.createElement('tr');
        //Creamos las columnas
        var cantidad= document.createElement('td');
        var nombre= document.createElement('td');
        var precio= document.createElement('td');
        var subTotal= document.createElement('td');
        var boton= document.createElement('button');
        var tdboton= document.createElement('td');
        //Les asignamos sus propiedades
        cantidad.textContent(canasta[i]['cantidad']);
        cantidad.style.width= "15%";
        nombre.textContent(productos[productPos]['nombre']);
        nombre.style.width= "40%";
        precio.textContent(productos[productPos]['precio']);
        precio.style.width= "15%";
        var sub= parseFloat(productos[productPos]['precio']);
        sub= sub * parseInt(canasta[i]['cantidad']);
        subTotal.textContent(sub.toString());
        boton.textContent("Eliminar de la lista");
        boton.className("btn btn-primary");
        boton.onclick("eliminarProductoLista(this)");
        tdboton.style.width= "15%";
        //Le agregamos los hijos al tr
        tr.appendChild(cantidad);
        tr.appendChild(nombre);
        tr.appendChild(precio);
        tr.appendChild(subTotal);
        //Agregamos el hijo al tbody
        tbody.appendChild(tr);
    }
    tbody.parentNode.replaceChild(new_tbody, tbody);
    //Actualizamos tambien el input canasta
    const canastaJson= JSON.stringify(canasta);
    document.getElementById('canasta').value= canastaJson;
    console.log(canastaJson);
}

//Funcion para eliminar producto de la lista
function eliminarProducto(boton) {
    var pos= boton.parentNode.rowIndex;
    const element= canasta[pos];
    canasta.splice(element['id'], element['id'] + 1);
    actualizarTabla();
}

//Funcion para agregar producto al canasto
function anhadirProducto() {
    const id= document.getElementById('lista_producto').value;
    const cant= document.getElementById('cant').value;
    const descuento= document.getElementById('descuento').value;
    const element= {
        id: id,
        cantidad: cant,
        descuento: descuento,
    };
    canasta.push(element);

    actualizarTabla();
}

//Funcion que registra un cliente
function registrarCliente() {
    //Obtenemos los valores
    const ced= document.getElementById('cedula').value;
    const nombre= document.getElementById('nombre_client').value;
    const apellido= document.getElementById('apellido').value;
    const direccion= document.getElementById('direccion').value;
    const ruc= document.getElementById('ruc').value;
    const fecha_nac= document.getElementById('fech_nac').value;

    //Generamos el comando sql
    const comando= "INSERT INTO clientes(cedula, nombre, apellido, direccion, ruc, fecha_nac) VALUES (" + ced + ", " + nombre + ", " + apellido + ", " + direccion + ", " + ruc + ", " + fecha_nac + ")";

    //Enviamos el comando al php
    $.ajax({
        data: {
            comando: comando
        },
        url: "../php/modificarBdd.php",//archivo que recibirá el/los datos
        type: "post",
        error: function (jqXHR, textstatus, errorThrowm) {
            //parametros que reciben los erroes si hubiera alguno
            console.log(jqXHR);
            console.warn(textstatus);
            console.log(errorThrowm);
            alert("Error al insertar los datos del nuevo cliente");
            return
        },
        success: function (responseText) {
            console.log(responseText)
        }
    });
    //Guardamos los datos del nuevo cliente
    cliente= {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        ruc: ruc,
        direccion: direccion,
        fecha_nacimiento: fech_nac,
        deuda: 0,
    };
}

//Funcio para agregar eventos a un dialog
function cerrarDialog(dialog) {
    dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
    });
}
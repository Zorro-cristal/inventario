//Validamos el rol
if (validarRol("administrador") || validarRol("empleado")) {
    console.log("Acceso autorizado");
  } else {
    window.location.replace("../index?usuario=" + userName + ".html");
  }
  

//Lista de los productos en la canasta
var canasta= [];
var productosAux;
var productos;
var clientes= [];
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
async function cargarPagina() {
    document.getElementById("alias").value= localStorage.getItem("alias");
    //Indicamos la fecha actual
    var fecha= new Date();
    fecha.setDate(fecha.getDate());
    document.getElementById("fecha").value= fecha.toISOString().substring(0, 10);

    var dialog, dialogBoton;
    //Obtenemos los datos de la base de datos
    //productosAux= await obtenerBdd("Productos");
    productosAux= await obtenerBdd("Productos", "stock > 0");
    productos= productosAux;
    clientes= await obtenerBdd("Clientes");

    //Agregamos el nombre del usuario
    const usuario= localStorage.getItem("alias");
    document.getElementById('usuario').value= usuario;
    canasta= [];
}

//Funcion para obtener Cliente
function obtenerCliente() {
    var cliente;
    const cedula= document.getElementById('cedula').value;
    var dialog= document.getElementById('clienteDialog');
    //Evaluamos si se ingreso la cedula
    if (cedula == "" || cedula <= 0) {
        alert("Ingrese la cedula del cliente");
        return;
    }
    //Buscamos el cliente
    cliente= clientes.filter(
        element => element['cedula'] == cedula
    )[0] || null;
    if (cliente == null) {
        //Mostramos el dialg
        dialog.showModal();
        //evento.preventDefault();
        // showDialog.addEventListener('click', (e) => {
        //     dialog.showModal();
        //     e.preventDefault();
        // });
        //cerrarDialog(dialog);
    } else {
        if (cliente['deuda'] > 0) {
            document.getElementById('deudaDialog').showModal();
        }
        //Asignamos los datos del cliente
        tabla_cliente= document.getElementById('clienteInfo').cells;
        tabla_cliente[0].innerHTML= cliente['nombre'][0].toUpperCase() + cliente['nombre'].substring(1) + " " + cliente['apellido'][0].toUpperCase() + cliente['apellido'].substring(1);
        if (cliente['ruc'] == "" || cliente['ruc'] == null) {
            tabla_cliente[1].innerHTML= divisorMiles(cliente['cedula']);
        } else {
            tabla_cliente[1].innerHTML= divisorMiles(cliente['cedula']) + '-' + cliente['ruc'];
        }
    }
}

//Funcion para actualizar tabla
function actualizarTabla() {
    const tbody= document.getElementById('canasta_body');
    var new_tbody= document.createElement('tbody');
    new_tbody.id= "canasta_body";
    var cantidad_total= 0;
    var subTotal_total= 0;
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
        cantidad_total= cantidad_total + parseInt(canasta[i]['cantidad']);
        cantidad.innerHTML= divisorMiles(canasta[i]['cantidad']);
        cantidad.style.width= "15%";
        nombre.innerHTML= productos[productPos]['nombre'];
        nombre.style.width= "35%";
        precio.innerHTML= divisorMiles(canasta[i]['precio']);
        precio.style.width= "20%";
        var sub= parseFloat(canasta[i]['precio']);
        sub= sub - parseFloat(canasta[i]['descuento']);
        sub= sub * parseInt(canasta[i]['cantidad']);
        subTotal.innerHTML= divisorMiles(sub);
        subTotal_total= subTotal_total + sub;
        boton.innerHTML= "Eliminar de la lista";
        boton.className= "btn btn-primary";
        boton.onclick= (e) => {eliminarProductoLista(this)};;
        tdboton.style.width= "15%";
        //Le agregamos los hijos al tr
        tr.appendChild(cantidad);
        tr.appendChild(nombre);
        tr.appendChild(precio);
        tr.appendChild(subTotal);
        tr.appendChild(tdboton);
        //Agregamos el hijo al tbody
        new_tbody.appendChild(tr);
    }
    tbody.parentNode.replaceChild(new_tbody, tbody);

    //Actualizamos el pie de la tabla
    document.getElementById('cant_total').innerHTML= divisorMiles(cantidad_total);
    document.getElementById('total').innerHTML= divisorMiles(subTotal_total);

    document.getElementById('productoDialog').close();
}

//Funcion para eliminar producto de la lista
function eliminarProducto(boton) {
    var pos= boton.parentNode.rowIndex;
    const element= canasta[pos];
    canasta.splice(element['id'], element['id'] + 1);
    actualizarTabla();
}

//Funcion para mostrar el producto Dialog
function cargarProducto() {
    //Limpiamos los campos
    document.getElementById("nombre_product").value= "";
    document.getElementById("cant").value= "";
    document.getElementById("descuento").value= "";
    document.getElementById("total_desc").value= 0;
    document.getElementById("total_prec").value= 0;
    document.getElementById("sub_total").value= 0;
    actualizarSelect();
    //Mostramos el dialog
    document.getElementById('productoDialog').showModal();
}

//Funcion actualizar productos select
function actualizarSelect() {
    //Filtramos el input
    var filtro= document.getElementById('nombre_product').value;
    productos= productosAux.filter(
        prod => prod.nombre.includes(filtro.toLowerCase())
    );
    console.log(productos);
    //Creamos el select
    var lista_productos= document.createElement('select');
    lista_productos.id= 'lista_producto';
    lista_productos.size= 5;
    lista_productos.className= "form-select mt-3 mb-3";
    lista_productos.required= true;
    for (i= 0; i < productos.length; i++) {
        lista_productos[i]= new Option(productos[i]['nombre'], productos[i]['id']);
    }
    lista_productos.addEventListener("change", function() {
        var prod= productos.filter(
            p => p.id == this.value
        )[0];
        console.log(prod);
        document.getElementById('disponible').value= divisorMiles(prod.stock);
    });
    //Reemplazamos el select del html por el creado
    document.getElementById('lista_producto').parentNode.replaceChild(lista_productos, document.getElementById('lista_producto'));
}

//Funcion para calcular el costo total
function calcularCosto() {
    var cant= parseInt(document.getElementById('cant').value);
    var id_product= parseInt(document.getElementById('lista_producto').value);
    var prod= productos.filter(
        p => p['id'] == id_product
    )[0];
    if (id_product != undefined && id_product != "" && id_product != "undefined") {
        var precio= parseFloat(prod['precio_venta']);
        document.getElementById('total_prec').value= cant * precio;
    } else {
        alert("Seleccione primero el producto");
        cant.value= "";
    }
}

//Funcion para calcular el descuento
function calcularDescuento() {
    console.log("Calculando descuento");
    cant= parseInt(document.getElementById('cant').value);
    descuent= parseFloat(document.getElementById('descuento').value) || 0;
    if (cant != 0) {
        document.getElementById('total_desc').value= cant * descuent;
    }
}

//Funcion para calcular el subtotal
function calcularSubtotal() {
    console.log("Calculando subtotal");
    var costo= parseFloat(document.getElementById('total_prec').value);
    var descuent= parseFloat(document.getElementById('total_desc').value) || 0;
    console.log(costo);
    console.log(descuent);
    if (costo != 0) {
        console.log(costo-descuent);
        document.getElementById('sub_total').value= costo - descuent;
    }
}

//Funcion para agregar producto al canasto
function anhadirProducto() {
    const id= document.getElementById('lista_producto').value;
    const cant= document.getElementById('cant').value;
    var descuento= document.getElementById('descuento').value;
    if (descuento == "" || descuento == undefined) {
        descuento= 0;
    }
    const precio_vent= productos.filter(
        element => element['id'] == id
    )[0]['precio_venta'];
    const element= {
        id: id,
        cantidad: cant,
        descuento: descuento,
        precio: precio_vent
    };
    canasta.push(element);
    actualizarTabla();

    //Actualizamos tambien el input canasta
    const canastaJson= JSON.stringify(canasta);
    document.getElementById('canasta').value= canastaJson;
    console.log(canasta);
}

//Funcion que registra un cliente
function registrarCliente() {
    //Obtenemos los valores
    const ced= document.getElementById('cedula').value.toLowerCase();
    const nombre= document.getElementById('nombre_client').value.toLowerCase();
    const apellido= document.getElementById('apellido').value.toLowerCase();
    const direccion= document.getElementById('direccion').value.toLowerCase();
    const ruc= document.getElementById('ruc').value.toLowerCase();
    const fecha_nac= document.getElementById('fech_nac').value.toLowerCase();
    var comando;

    //Generamos el comando sql
    if (direccion == undefined || direccion == ""){
        if (ruc == undefined || ruc == ""){
            if (fecha_nac == undefined || fecha_nac == ""){
                comando= "INSERT INTO Clientes(cedula, nombre, apellido) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "');";
            } else {
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, fecha_nacimiento) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', '" + "STR_TO_DATE(" + fecha_nac + ", %d/%m/%Y)" + "');";
            }
        } else {
            if (fecha_nac == undefined || fecha_nac == ""){
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, ruc) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', " + ruc + ");";
            } else {
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, ruc, fecha_nacimiento) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', " + ruc + ", '" + "STR_TO_DATE(" + fecha_nac + ", %d/%m/%Y)" + "');";
            }
        }
    } else {
        if (ruc == undefined || ruc == ""){
            if (fecha_nac == undefined || fecha_nac == ""){
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, direccion) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', '" + direccion + "');";
            } else {
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, direccion, fecha_nacimiento) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', '" + direccion + "', '" + "STR_TO_DATE(" + fecha_nac + ", %d/%m/%Y)" + "');";
            }
        } else {
            if (fecha_nac == undefined || fecha_nac == ""){
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, direccion, ruc) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', '" + direccion + "', " + ruc + ");";
            } else {
                comando= "INSERT INTO Clientes(cedula, nombre, apellido, direccion, ruc, fecha_nacimiento) VALUES (" + ced + ", '" + nombre + "', '" + apellido + "', '" + direccion + "', " + ruc + ", '" + "STR_TO_DATE(" + fecha_nac + ", %Y-%m-%d)" + "');";
            }
        }
    }
    console.log(comando);

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
        success: function () {            
            //Guardamos los datos del nuevo cliente
            cliente= {
                cedula: ced,
                nombre: nombre,
                apellido: apellido,
                ruc: ruc,
                direccion: direccion,
                fecha_nacimiento: fecha_nac,
                deuda: 0,
            };
            clientes.push(cliente);
            document.getElementById('clienteDialog').close();
            obtenerCliente();
        }
    });
}

//Funcio para agregar eventos a un dialog
function cerrarDialog(dialog) {
    dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
        dialog.close();
    }
    });
}

//Funcion para enviar los datos del formulario principal
function enviarDatos() {
    if (canasta.length > 0) {
        document.getElementById("form_principal").action= "../php/registrarNuevaVenta.php";
    } else {
        alert("No existe ningun producto cargado en el carro");
    }
}
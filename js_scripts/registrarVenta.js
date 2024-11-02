//Lista de los productos en la canasta
var canasta= [];
var cliente;

//Funcion para cuando cargue la pagina
async function cargarPagina() {
    cambiarTema(undefined, true);
    //Indicamos la fecha actual
    var fecha= new Date();
    fecha.setDate(fecha.getDate());
    document.getElementById("fecha_venta").value= fecha.toISOString().substring(0, 10);

    //Obtenemos los datos de la base de datos
    const categorias= await obtenerBdd("categorias");

    let categorias_opciones= "";
    // Asignar las categorias
    categorias_opciones += "<option value='' selected>Todos</option>";
    categorias.forEach(cat => {
        categorias_opciones += "<option value='" + cat['id'] + "'>" + cat['nombre'] + "</option>";
    });
    document.getElementById("inptCategoriaProductoVenta").innerHTML= categorias_opciones;

    canasta= [];
}

//Funcion para obtener Cliente
async function obtenerCliente() {
    const cedula= document.getElementById('cedula_venta').value;
    //Evaluamos si se ingreso la cedula
    if (cedula == "" || cedula <= 0) {
        alert("Ingrese la cedula del cliente");
        return;
    }
    //Buscamos el cliente
    let filtro= "cedula = " + cedula.split("-")[0];
    if (cedula.split("-").length > 1) {
        filtro += " AND ruc = " + cedula.split("-")[1];
    }
    cliente= await obtenerBdd("clientes", filtro) || null;
    if (cliente == null || cliente.length == 0) {
        alert("El cliente no existe");
        return;
    } else {
        cliente= cliente[0];
        //Asignamos los datos del cliente
        ruc= (cliente['ruc'] != null && cliente['ruc'] != "") ? "-" + cliente['ruc'] : "";
        document.getElementById('cedula_venta').value= divisorMiles(cliente['cedula']) + ruc;
        document.getElementById('cliente_nombre_venta').value= cliente['nombre_cliente'] + " " +cliente['apellido_cliente'];
    }
}

// Funcion para obtener los productos
async function obtenerProductos() {
    // Obtenemos los filtros
    const cod_filtro= document.getElementById('inptCodigoProductoVenta').value;
    const nombre_filtro= document.getElementById('inptNombreProductoVenta').value;
    const categoria_filtro= document.getElementById('inptCategoriaProductoVenta').value;
    
    // Construir el filtro
    let filtro= "cantidad_disponible > 0";
    if (cod_filtro != "") {
        filtro += "AND id_producto = " + cod_filtro;
    }
    if (nombre_filtro != "") {
        filtro += "AND nombre_producto LIKE '%" + nombre_filtro + "%'";
    }
    if (categoria_filtro != "" && categoria_filtro != "Cargando...") {
        filtro += "AND categoria_fk = " + categoria_filtro;
    }

    // Obtenemos los productos
    const productos= await obtenerBdd("productos", filtro);
    console.log("Productos obtenidos: ",productos, filtro);
    
    // Actualizamos la tabla
    var productos_opciones_tbody= document.createElement("tbody");
    productos_opciones_tbody.id= 'lista_productos_venta';
    productos.forEach(async prod => {
        const categoriaBdd= await obtenerBdd("Categorias", "id_categoria = " + prod['categoria_fk']);
        var tr= document.createElement('tr');
        tr.onclick= function () {agregarQuitarCanasta(prod['id_producto'], prod['precio']);};
        
        //Creamos las columnas
        var cod= document.createElement('td');
        var nombre= document.createElement('td');
        var categoria= document.createElement('td');
        var precio= document.createElement('td');
        var stock= document.createElement('td');

        //Asignamos sus propiedades
        cod.innerHTML= prod['id_producto'];
        cod.style.width= "10%";
        nombre.innerHTML= prod['nombre_producto'];
        nombre.style.width= "45%";
        categoria.innerHTML= categoriaBdd[0]['nombre_categoria'];
        categoria.style.width= "20%";
        precio.innerHTML= divisorMiles(prod['precio'] || 0);
        precio.style.width= "25%";
        stock.innerHTML= prod['cantidad_disponible'];
        stock.style.width= "5%";

        tr.appendChild(cod);
        tr.appendChild(nombre);
        tr.appendChild(categoria);
        tr.appendChild(stock);
        tr.appendChild(precio);

        productos_opciones_tbody.appendChild(tr);
    });
    
    // Reemplaza la tabla existente
    document.getElementById('lista_productos_venta').replaceWith(productos_opciones_tbody);
}

// Agregar o quitar de la canasta
function agregarQuitarCanasta(id,precio_venta) {
    pos= canasta.findIndex(element => element['id'] == id);
    if (pos == -1) {
        canasta.push({
            'id': id,
            'cantidad': 1,
            'descuento': 0,
            'precio': precio_venta
        });
    } else {
        canasta[pos]['cantidad']++;
    }
    //Actualizamos la tabla
    actualizarTabla();
}

//Funcion para actualizar tabla
async function actualizarTabla() {
    const tbody= document.getElementById('canasta_body');
    var new_tbody= document.createElement('tbody');
    new_tbody.id= "canasta_body";
    var cantidad_total= 0;
    var subTotal_total= 0;
    //Agregamos los productos a la tabla si existen
    for (let i= canasta.length - 1; i >= 0; i--) {
        //Obtenemos mas informacion del producto
        const productPos= await obtenerBdd("productos", "id_producto = " + canasta[i]['id']);

        var tr= document.createElement('tr');
        //Creamos las columnas
        var cantidad= document.createElement('td');
        var nombre= document.createElement('td');
        var precio= document.createElement('td');
        var descuento= document.createElement('td');
        var coliva0= document.createElement('td');
        var coliva5= document.createElement('td');
        var coliva10= document.createElement('td');
        var boton= document.createElement('button');
        var tdboton= document.createElement('td');
        //Les asignamos sus propiedades
        cantidad_total= cantidad_total + parseInt(canasta[i]['cantidad']);
        let input = document.createElement('input');
        input.type = 'number';
        input.value = canasta[i]['cantidad'];
        input.min = '0';
        input.style.width = '100%';
        input.onchange = function() {
            canasta[i]['cantidad'] = this.value;
        };
        cantidad.appendChild(input);
        cantidad.style.width= "15%";
        nombre.innerHTML= productPos[0]['nombre_producto'];
        nombre.style.width= "35%";
        precio.innerHTML= divisorMiles(productPos[0]['precio']);
        precio.style.width= "20%";
        let input2 = document.createElement('input');
        input2.type = 'number';
        input2.value = canasta[i]['descuento'];
        input2.min = '0';
        input2.style.width = '100%';
        input2.onchange = function() {
            canasta[i]['descuento'] = this.value;
        };
        descuento.appendChild(input2);
        var sub= parseFloat(productPos[0]['precio']);
        sub= sub - parseFloat(canasta[i]['descuento']);
        sub= sub * parseInt(canasta[i]['cantidad']);
        iva= parseFloat(productPos[0]['impuesto']);
        iva0= 0;
        iva5= 0;
        iva10= 0;
        switch (iva) {
            case 0:
                iva0= sub;
                break;
            case 5:
                iva5= sub * 1.05;
                break;
            case 10:
                iva10= sub * 1.1;
            default:
                alert("El impuesto del producto no es valido")
                break;
        }
        subTotal_total= subTotal_total + iva0 + iva5 + iva10;
        coliva0.innerHTML= iva0 == 0 ? "" : divisorMiles(iva0);
        coliva5.innerHTML= iva5 == 0 ? "" : divisorMiles(iva5);
        coliva10.innerHTML= iva10 == 0 ? "" : divisorMiles(iva10);
        boton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="16" style="color:red;" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"><path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/></svg>';
        boton.classList.add("btn", "btn-outline-danger");
        boton.onclick = (function(canasta) {
            return function() {
                eliminarProducto(canasta[i]['id']);
            };
        })(canasta);
        console.log(boton);
        tdboton.appendChild(boton);
        tdboton.style.width= "15%";
        //Le agregamos los hijos al tr
        tr.appendChild(nombre);
        tr.appendChild(cantidad);
        tr.appendChild(descuento);
        tr.appendChild(precio);
        tr.appendChild(coliva0);
        tr.appendChild(coliva5);
        tr.appendChild(coliva10);
        tr.appendChild(tdboton);
        //Agregamos el hijo al tbody
        new_tbody.appendChild(tr);
    }
    tbody.parentNode.replaceChild(new_tbody, tbody);

    document.getElementById('productoDialog').close();
}

//Funcion para eliminar producto de la lista
function eliminarProducto(pos) {
    console.log(canasta, pos);
    canasta= canasta.filter(c => c.id != pos);
    console.log(canasta);
    actualizarTabla();
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

//Funcion para enviar los datos del formulario principal
function enviarDatos() {
    let datos;
    if (canasta.length > 0) {
        $.ajaxSetup({async: false});
        $.ajax({
            url: "../php/registrarNuevaVenta.php",
            type: "post",
            data: {
                "fecha": document.getElementById("fecha_venta").value,
                "cedula": divisorMiles(document.getElementById("cedula_venta").value, true),
                "num_factura": 132,
                "canasta": JSON.stringify(canasta),
                "deuda": 0
            },
            error: function (jqXHR, textstatus, errorThrowm) {
                //parametros que reciben los erroes si hubiera alguno
                console.log(jqXHR);
                console.log(jqXHR.responseText);
                console.warn(textstatus);
                console.log(errorThrowm);
                alert("Error al obtener los datos de la base de datos");
            },
            success: function (datos) {
                console.log(datos)
                datos = JSON.parse(datos);
                console.log(datos)
                if (datos[1] !== "exito") {
                    alert("Ningun dato obtenido de la base de datos");
                    datos= [];
                } else {
                    limpiarCamposVenta();
                    alert("Venta registrada con exito");
                }
            }
        });
        $.ajaxSetup({async: true});
    } else {
        alert("No existe ningun producto cargado en el carro");
    }
    return datos;
}

// Funcion para limpiar los campos
function limpiarCamposVenta() {
    document.getElementById('fecha_venta').value= new Date().toISOString();
    document.getElementById('cedula_venta').value= "";
    document.getElementById('cliente_nombre_venta').value= "";
    canasta= [];
    cliente= null;
    actualizarTabla();

    document.getElementById('inptCodigoProductoVenta').value= "";
    document.getElementById('inptNombreProductoVenta').value= "";
    document.getElementById('inptCategoriaProductoVenta').value= "";
}
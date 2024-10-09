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
    const categorias= await obtenerBdd("categoria");

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
    cliente= await obtenerBdd("cliente", filtro) || null;
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
    let filtro= "";
    if (cod_filtro != "") {
        filtro += "id_producto = " + cod_filtro + " AND ";
    }
    if (nombre_filtro != "") {
        filtro += "nombre_producto LIKE '%" + nombre_filtro + "%'" + " AND ";
    }
    if (categoria_filtro != "" && categoria_filtro != "Cargando...") {
        filtro += "categoria_fk = " + categoria_filtro + " AND ";
    }
    if (filtro != "") {
        filtro = filtro.substring(0, filtro.length - 4);
    }

    // Obtenemos los productos
    productos= await obtenerBdd("Producto p join Categoria c on c.id_categoria=p.categoria_fk", filtro);
    console.log("Productos obtenidos: ",productos, filtro);
    
    // Actualizamos la tabla
    var productos_opciones_tbody= document.createElement("tbody");
    productos_opciones_tbody.id= 'lista_productos_venta';
    productos.forEach(prod => {
        var tr= document.createElement('tr');
        tr.onclick="agregarQuitarCanasta(" + prod['id_producto'] + ");";
        
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
        categoria.innerHTML= prod['nombre_categoria'];
        categoria.style.width= "20%";
        precio.innerHTML= divisorMiles(prod['precio'] || 0);
        precio.style.width= "25%";
        stock.innerHTML= prod['cantidad'];
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
function agregarQuitarCanasta(id) {
    if (canasta.findIndex(element => element['id'] == id) == -1) {
        canasta.push({
            'id': id,
            'cantidad': 1
        });
    } else {
        canasta.splice(canasta.findIndex(element => element['id'] == id), 1);
    }
    //Actualizamos la tabla
    actualizarTabla();
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
        cantidad.innerHTML= "<input type='number'  value= '" + canasta[i]['cantidad'] + "' min= '0' style='width: 100%;' onchange='canasta[id]['cantidad']= this.value;'/>";
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

//Funcion para enviar los datos del formulario principal
function enviarDatos() {
    if (canasta.length > 0) {
        document.getElementById("form_principal").action= "../php/registrarNuevaVenta.php";
    } else {
        alert("No existe ningun producto cargado en el carro");
    }
}

// Funcion para limpiar los campos
function limpiarCamposVenta() {
    document.getElementById('fecha_venta').value= new Date().toISOString();
    document.getElementById('cedula_venta').value= "";
    document.getElementById('cliente_nombre_venta').value= "";
    canasta= [];
    cliente= null;

    document.getElementById('inptCodigoProductoVenta').value= "";
    document.getElementById('inptNombreProductoVenta').value= "";
    document.getElementById('inptCategoriaProductoVenta').value= "";
}
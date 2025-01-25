//Validamos el rol
usuario= document.getElementById("alias");
if (validarRol("gerente") || validarRol("administrador")) {
  usuario.value= localStorage.getItem("alias");
  console.log('usuario valido');
} else {
  window.location.replace("../index?usuario=" + userName + ".html");
}

var productos;
var proveedor;


function guardarNuevoProducto() {
  const nombre= document.getElementById("nombre_prov").value;
  const cantidad= document.getElementById("sumar").value;

  const precio= document.getElementById("precio").value;
  if (precio <= 0) {
    mostrarMensaje("error", "Valor invalido", "El precio del producto debe ser mayor a 0.")
    return false;
  }

  const iva= document.getElementById("iva").value;
  if (iva == "") {
    mostrarMensaje("error", "Campo vacio", "Debe seleccionar el valor del IVA.");
    return false;
  }

  const categoria_id= document.getElementById("").value;
  if (categoria_id == "") {
    mostrarMensaje("error", "Campo vacio", "Debe seleccionar la categoria.");
    return false;
  }

  const datos= new FormData();
  datos.append("nombre", nombre);
  datos.append("precio", precio);
  datos.append("iva", iva);
  datos.append("cantidad", cantidad);

  $.ajax({
    data: datos,
    url: "../php/agregarNuevoProduct.php",
    type: "POST",
    cache: false,
		contentType: false,
		processData: false,
    error: function (jqXHR, textstatus, errorThrowm) {
			console.error("Error: " + errorThrowm);
      mostrarMensaje("error", "Error interno", "Error desconocido al intentar procesar la informacion.")
			return false;
		},
    success: function (responseText) {

    }
  });
}

function productSeleccionado() {
  document.getElementById("stock").value= "0";
}

//Funcio para mostrar nuevo proveedor dialog
function mostrarNuevoProveedorDialog(evento) {
  const dialog= document.getElementById("nuevoProveedorDialog");
  dialog.showModal();
  evento.preventDefault();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}

//Funcion para mostrar nuevo producto dialog
function mostrarNuevoProductoDialog(evento) {
  const dialog= document.getElementById("nuevoProveedorDialog");
  dialog.showModal();
  evento.preventDefault();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}

//Funcion que se ejecuta cuando la pagina a sido carada totalmente
function paginaCargada() {  
  document.getElementById("alias").value= localStorage.getItem("alias");

  //Actualizamos la lista de productos y proveeodr obtenidos de la base de datos
  obtenerOpciones("categorias","categoria").then(function (response) {
    document.getElementById('categoria').innerHTML= response;
  });
  obtenerBdd("Proveedores").then(function(response) {
    proveedor= response;
    cargaProveedor();
  });  
}

//Funcion que carga la lista de proveedor en el select
function cargaProveedor() {
  //Definicion de elementos del html
  const seleccion= document.getElementById("lista_proveedor");
  //Creamos una nueva lista de seleccion
  var new_seleccion= document.createElement('select');
  new_seleccion.id= "lista_proveedor";
  new_seleccion.name= "lista_proveedor";
  new_seleccion.size= 2;
  new_seleccion.required= true;
  new_seleccion.className= "form-select mt-3 mb-3 form-select-lg";
  //Cargamos todos los productos al select
  agregarOpcion({id: '0', nombre: "Seleccione una opcion"}, new_seleccion);
  proveedor.forEach(prov => agregarOpcion({id: prov["id_proveedor"], nombre: prov['nombre_proveedor']}, new_seleccion));
  //Reemplazamos el viejo select por el nuevo
  seleccion.parentNode.replaceChild(new_seleccion, seleccion);
}

//Funcion que obtiene el valor del input del proveedor
function actualizacionProveedor(valor) {
  var filtro = valor.toLowerCase();
  cargaProveedor();
  const select= document.getElementById("lista_proveedor");
  const opciones= select.options;
  console.log(opciones);
  if (filtro != "") {
    for (i= 0; i <= opciones.length; i++) {
      if (!(opciones[i].text.toLowerCase().includes(filtro))) {
        select.remove(i);
      }
    }
  }
}

//Funcion que carga la lista de producto en el select
function cargaProductos() {
  //Definicion de elementos del html
  const seleccion= document.getElementById("lista_producto");
  //Creamos una nueva seleccion
  var new_seleccion= document.createElement('select');
  new_seleccion.id= "lista_producto";
  new_seleccion.name= "lista_producto";
  new_seleccion.size= 5;
  new_seleccion.required= true;
  new_seleccion.className= "form-select mt-3 mb-3 form-select-lg";
  //Funcion para obtener stock actual
  new_seleccion.addEventListener('change', (event) => {
    var stock= document.getElementById('stock');
    var prod= productos.filter(
      p => p.id == event.target.value
    )[0];
    stock.value= prod.stock;
  });
  agregarOpcion({id: '0', nombre: "Seleccione una opcion"}, new_seleccion);
  //Cargamos todos los productos al select
  productos.forEach(product => agregarOpcion({id: product['id_producto'], nombre: product['nombre_producto']}, new_seleccion));
  //Remplazamos la lista de seleccion
  seleccion.parentNode.replaceChild(new_seleccion, seleccion);
}

//Funcion que obtiene el valor del input de productos
function actualizacionProductos (valor) {
  cargaProductos();
  const select= document.getElementById("lista_producto");
  const opciones= select.options;
  if (valor != "") {
    for (i= 0; i < opciones.length; i++) {
      if (!(opciones[i].text.toLowerCase().includes(valor.toLowerCase()))) {
        console.log("eliminando " + opciones[i].text)
        select.remove(i);
      }
    }
  }
}

//Funcion que agrega opcion a <select>
function agregarOpcion(element, select) {
  var opcion= document.createElement('option');
  //opcion.innerHTML= texto;
  opcion.value= element['id'];
  opcion.text= element['nombre'].charAt(0).toUpperCase() + element['nombre'].slice(1);
  select.add(opcion);
}

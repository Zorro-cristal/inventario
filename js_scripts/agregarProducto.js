var productos;
var proveedor;

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
  const dialog= document.getElementById("nuevoProductoDialog");
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
  var fecha= new Date();
  fecha.setDate(fecha.getDate());
  document.getElementById("fecha").value= fecha.toISOString().substring(0, 10);

  //Actualizamos la lista de productos y proveeodr obtenidos de la base de datos
  obtenerPHP();
  cargaProductos();
  cargaProveedor();
}

//Funcion para obtener los datos del php
function obtenerPHP() {
  $.ajaxSetup({async: false});
  $.ajax({
    url: "../php/agregarProducto.php",
    type: "post",
    error: function (jqXHR, textstatus, errorThrowm) {
      //parametros que reciben los erroes si hubiera alguno
      console.log(jqXHR);
      console.warn(textstatus);
      console.log(errorThrowm);
      return
    },
    success: function (datosBase) {
        //Se transforma los datos obtenidos al JSON
        var aux= JSON.parse(datosBase);
        productos= aux['1'];
        console.log(productos);
        proveedor= aux['2'];
        console.log(proveedor);
    }
  });
  $.ajaxSetup({async: true});
}

//Funcion que carga la lista de proveedor en el select
function cargaProveedor() {
  //Definicion de elementos del html
  const seleccion= document.getElementById("lista_proveedor");
  //Creamos una nueva lista de seleccion
  var new_seleccion= document.createElement('select');
  new_seleccion.id= "lista_proveedor";
  //Cargamos todos los productos al select
  agregarOpcion({id: '0', nombre: "Seleccione una opcion"}, new_seleccion);
  proveedor.forEach(prov => agregarOpcion(prov, new_seleccion));
  //Reemplazamos el viejo select por el nuevo
  seleccion.parentNode.replaceChild(new_seleccion, seleccion);
}

//Funcion que obtiene el valor del input del proveedor
function actualizacionProveedor(valor) {
  var filtro = valor.toLowerCase();
  cargaProveedor();
  const select= document.getElementById("lista_proveedor");
  const opciones= select.options;
  if (filtro != "") {
    for (i= 0; i <= opciones.length; i++) {
      if (!(opciones[i].value.toLowerCase().includes(filtro))) {
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
  //Funcion para obtener stock actual
  new_seleccion.addEventListener('change', (event) => {
    var stock= document.getElementById('stock');
    stock.value= productos[event.target.value].stock;
  });
  agregarOpcion({id: '0', nombre: "Seleccione una opcion"}, new_seleccion);
  //Cargamos todos los productos al select
  productos.forEach(product => agregarOpcion(product, new_seleccion));
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

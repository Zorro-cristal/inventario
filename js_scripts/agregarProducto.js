var productos;
var proveedor;

function productSeleccionado() {
  document.getElementById("stock").value= "0";
}

//Funcion que se ejecuta cuando la pagina a sido carada totalmente
function paginaCargada() {
  const dialogBoton= document.getElementById("nuevoProducto");
  const dialog= document.getElementById("nuevoProductoDialog");
  
  var fecha= new Date();
  fecha.setDate(fecha.getDate() - 1);
  document.getElementById("fecha").value= fecha.toISOString().substring(0, 10);

  dialogBoton.addEventListener('click', (e) => {
    dialog.showModal();
    e.preventDefault();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });

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
  //Limpia la lista de seleccion
  for (var i= 0; i < seleccion.options.length; i++) {
    seleccion.remove(i);
  }
  //Cargamos todos los productos al select
  proveedor.forEach(prov => agregarOpcion(prov, seleccion));
}

//Funcion que obtiene el valor del input del proveedor
function actualizacionProveedor(valor) {
  const select= document.getElementById("lista_proveedor");
  const opciones= select.options;
  var filtro = valor.toUpperCase();
  cargaProveedor();
  for (i= 0; i < opciones.length; i++) {
    if (!(opciones[i].value.includes(filtro)) && filtro != "") {
      select.remove(i);
    }
  }
}

//Funcion que carga la lista de producto en el select
function cargaProductos() {
  //Definicion de elementos del html
  const seleccion= document.getElementById("lista_producto");
  //Limpia la lista de seleccion
  for (var i= 0; i < seleccion.options.length; i++) {
    seleccion.remove(i);
  }
  //Cargamos todos los productos al select
  console.log(typeof productos);
  console.log(productos);
  productos.forEach(product => agregarOpcion(product, seleccion));
}

//Funcion que obtiene el valor del input de productos
function actualizacionProductos (valor) {
  const select= document.getElementById("lista_producto");
  const opciones= select.options;
  var filtro = valor.toUpperCase();
  cargaProductos();
  for (i= 0; i < opciones.length; i++) {
    if (!(opciones[i].value.includes(filtro)) && filtro != "") {
      console.log("eliminando " + opciones[i].value)
      select.remove(i);
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

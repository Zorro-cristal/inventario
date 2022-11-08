var inventarios;
var inventarioAux;
var tbody;

//Funcion que se ejecuta cuando la pagina a sido carada totalmente
function paginaCargada() {
    tbody= document.querySelector('tbody');

    //Obtenemos la lista de inventario
    obtenerPHP();
    console.log(inventarioAux);
    inventarios= inventarioAux;    

    // dialogBoton.addEventListener('click', (e) => {
    //   dialog.showModal();
    //   e.preventDefault();
    // });
  
    // dialog.addEventListener("click", (e) => {
    //   if (e.target === dialog) {
    //     dialog.close();
    //   }
    // });

    cargarLista();
}

//Filtrar Inventario
function filtrar(valor) {
    var filtro = valor.toLowerCase();
    if (filtro != "") {
        inventarios= inventarios.filter(
            obj => obj['nombre'].includes(filtro)
        );
        cargarLista();
    } else {
        inventarios= inventarioAux;
        cargarLista();
    }
}

//Carga lista de inventario
function cargarLista() {
  var new_tbody= document.querySelector('tbody');
  //var new_tbody= document.createElement('tbody');
  var tbody_content= "<tbody>";
  //populate_with_new_rows(new_tbody);
  for (i= 0; i < inventarios.length; i++) {
      var nombre= inventarios[i].nombre;
      var descripcion= inventarios[i].descripcion;
      if (descripcion == null) {
        descripcion= "";
      }
      var stock= inventarios[i].stock;
      var precio= inventarios[i].precio_venta;
      var id= inventarios[i].id;
      var tr= '<tr onclick= "modificarDatos(event, this.attributes.id.nodeValue)" id="'+ id +'"><td style="width: 30%;">'+ nombre +'</td><td style="width: 45%;">'+ descripcion +'</td><td style="width: 10%;">'+ stock +'</td><td style="width: 15%;">'+ precio +'</td></tr>';
      tbody_content= tbody_content + tr;
  }
  tbody_content= tbody_content + "</tbody>";
  new_tbody.innerHTML= tbody_content;
  //Reemplazamos el cuerpo viejo con el nuevo
  document.querySelector('tbody').parentNode.replaceChild(new_tbody, tbody);
}


//Funcion para modificar datos
function modificarDatos(evento, id) {
  //Muestra el dialog saldarDeuda
  var dialog= document.getElementById('modificarProductoDialog');
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
  //Asigna los valores en el dialog
  document.getElementById('id').value= id;
  var inventario= inventarios.filter(element => element['id'] == id)[0];
  console.log(inventario);
  document.getElementById('nombre').value= inventario.nombre;
  document.getElementById('descripcion').value= inventario.descripcion;
  document.getElementById('precio_vent').value= inventario.precio_venta;
  dialog.showModal();
  evento.preventDefault();
}

//Funcion para obtener los datos del php
function obtenerPHP() {
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/listarInventario.php",
      type: "post",
    //   crossDomain: true,
    //   dataType: 'jsonp',
      error: function (jqXHR, textstatus, errorThrowm) {
        //parametros que reciben los erroes si hubiera alguno
        console.log(jqXHR);
        console.warn(textstatus);
        console.log(errorThrowm);
        alert("Error al obtener los datos de la base de datos");
        return
      },
      success: function (datos) {
        console.log(datos)
        inventarioAux= JSON.parse(datos);
        inventario= inventarioAux;
      }
    });
    $.ajaxSetup({async: true});
}

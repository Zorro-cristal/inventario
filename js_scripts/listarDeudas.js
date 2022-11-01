var clientes;
var clientesAux;

//Funcion para filtrar nombre
function actualizacionNombre(valor) {
  clientes= clientesAux;
  var filtro= valor.toUpperCase();
  //Aislamos las clientes con ruc
  clientes.filter(element => element['nombre'].includes(filtro) || element['apellido'].includes(filtro));
  //Reconstruimos la tabla
  actualizarTabla();
}

//Funcion para filtrar ruc
function actualizacionRuc(valor) {
  clientes= clientesAux;
  var filtro= valor.toUpperCase();
  //Aislamos las clientes con ruc
  clientes.filter(element => element['cedula'].includes(filtro));
  //Reconstruimos la tabla
  actualizarTabla();
}

//Funcion para reducir deuda
function reducirDeuda(event) {
  var columnas= event.currentTarget;
  var ced= columnas[1].textContent;
  //Obtiene la cedula si es que el cliente tiene ruc
  if (ced.includes('-')) {
    pos= ced.indexOf('-');
    ced= ced.substring(0, pos);
  }
  //Muestra el dialog saldarDeuda
  var dialog= document.getElementById('saldarDeudaDialog');
  var dialogBoton= document.getElementById('enviar');
  dialogBoton.addEventListener('click', (e) => {
    dialog.showModal();
    e.preventDefault();
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}

//Funcion cuando la pagina carga todo
function paginaCargada() {
    //Obtenemos la lista de clientes
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/listarDeudas.php",
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
        console.log(datos)
        clientes= JSON.parse(datos);
        clientesAux= clientes;
      }
    });
    $.ajaxSetup({async: true});
    //Agregamos la lista a la tabla
    actualizarTabla();
}

//Funcion actualizar tabla
function actualizarTabla() {
  const tbody= document.querySelector('tbody');
  var new_tbody= document.createElement('tbody');
  //populate_with_new_rows(new_tbody);
  for (i= 0; i < clientes.length; i++) {
      var tr= document.createElement('tr');
      var nombre= document.createElement('td');
      var ruc= document.createElement('td');
      var deuda= document.createElement('td');
      //nombre.textContent(clientes[i]['nombre'] + ' ' + clientes['apellido']);
      nombre.innerHTML= clientes[i]['nombre'] + ' ' + clientes['apellido'];
      nombre.style.width= "60%";
      if (clientes['ruc'] != null) {
          //ruc.textContent(clientes[i]['cedula'] + '-' + clientes['ruc']);
          ruc.innerHTML= clientes[i]['cedula'] + '-' + clientes['ruc'];
      } else {
          //ruc.textContent(clientes[i]['cedula']);
          ruc.innerHTML= clientes[i]['cedula'];
      }
      ruc.style.width= "20%";
      deuda.innerHTML= clientes[i]['deuda'];
      //deuda.textContent(clientes[i]['deuda']);
      deuda.style.width= "20%";
      tr.appendChild(nombre);
      tr.appendChild(ruc);
      tr.appendChild(deuda);
      new_tbody.appendChild(tr);
  }
  tbody.parentNode.replaceChild(new_tbody, tbody);
}
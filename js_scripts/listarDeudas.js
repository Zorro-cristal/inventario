import { divisorMiles, obtenerBdd } from "./funciones";

var clientes;
var clientesAux;

//Funcion para filtrar nombre
function actualizacionNombre(valor) {
  clientes= clientesAux;
  var filtro= valor.toLowerCase();
  //Aislamos las clientes con ruc
  clientes= clientes.filter(element => element['nombre'].includes(filtro) || element['apellido'].includes(filtro));
  //Reconstruimos la tabla
  actualizarTabla();
}

//Funcion para filtrar ruc
function actualizacionRuc(valor) {
  clientes= clientesAux;
  //Aislamos las clientes con ruc
  clientes= clientes.filter(element => element['cedula'].includes(valor));
  //Reconstruimos la tabla
  actualizarTabla();
}

//Funcion cuando la pagina carga todo
function paginaCargada() {
    clientes= obtenerBdd('clientes');
    //Agregamos la lista a la tabla
    actualizarTabla();
}

//Funcion actualizar tabla
function actualizarTabla() {
  var total= 0.00;
  var new_tbody= document.querySelector('tbody');
  //var new_tbody= document.createElement('tbody');
  var tbody_content= "<tbody>";
  //populate_with_new_rows(new_tbody);
  for (i= 0; i < clientes.length; i++) {
      total= total + parseFloat(clientes[i]['deuda']);
      var nombre= clientes[i]['nombre'] + ' ' + clientes[i]['apellido'];
      var ruc= clientes[i].cedula;
      var telefono= clientes[i].telefono;
      var deuda= divisorMiles(clientes[i].deuda);
      var id= clientes[i].cedula;
      if (clientes[i]['ruc'] != null) {
          //ruc.textContent(clientes[i]['cedula'] + '-' + clientes['ruc']);
          ruc= divisorMiles(clientes[i]['cedula']) + '-' + clientes[i]['ruc'];
      }
      //var tr= document.createElement('tr');
      var tr= '<tr onclick="reducirDeuda(event, this.attributes.id.nodeValue);" id="' + id + '"><td style="width: 60%;">'+ nombre +'</td><td style="width: 15%;">'+ ruc +'</td><td style="width: 15%;"></td><td style="width: 20%;">'+ deuda +'</td></tr>';
      // var nombre= document.createElement('td');
      // var ruc= document.createElement('td');
      // var telefono= document.createElement('td');
      // var deuda= document.createElement('td');
      // //nombre.textContent(clientes[i]['nombre'] + ' ' + clientes['apellido']);
      // nombre.innerHTML= clientes[i]['nombre'] + ' ' + clientes[i]['apellido'];
      // nombre.style.width= "60%";
      // if (clientes[i]['ruc'] != null) {
      //     //ruc.textContent(clientes[i]['cedula'] + '-' + clientes['ruc']);
      //     ruc.innerHTML= clientes[i]['cedula'] + '-' + clientes[i]['ruc'];
      // } else {
      //     //ruc.textContent(clientes[i]['cedula']);
      //     ruc.innerHTML= clientes[i]['cedula'];
      // }
      // ruc.style.width= "15%";
      // telefono.innerHTML= clientes[i]['telefono'];
      // telefono.style.width= "15%"
      // deuda.innerHTML= clientes[i]['deuda'];
      // //deuda.textContent(clientes[i]['deuda']);
      // deuda.style.width= "20%";
      // tr.appendChild(nombre);
      // tr.appendChild(ruc);
      // tr.appendChild(telefono);
      // tr.appendChild(deuda);
      // tr.id= clientes[i]['cedula'];
      // //Agregamos el evento del click
      // tr.addEventListener('click', (e) => {
      //   reducirDeuda(e);
      //   document.getElementById('saldarDeudaDialog').showModal();
      //   e.preventDefault();
      // });
      tbody_content= tbody_content + tr;
  }
  tbody_content= tbody_content + "</tbody>";
  new_tbody.innerHTML= tbody_content;
  document.querySelector('tbody').parentNode.replaceChild(new_tbody, document.querySelector('tbody'));
  document.getElementById('total').textContent= total.toString();
}

//Funcion para reducir deuda
function reducirDeuda(evento, ced) {
  //Muestra el dialog saldarDeuda
  var dialog= document.getElementById('saldarDeudaDialog');
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
  //Asigna los valores en el dialog
  document.getElementById('cedula').value= divisorMiles(ced);
  var cliente= clientes.filter(element => element['cedula'] == ced)[0];
  document.getElementById('deuda').value= divisorMiles(cliente['deuda']);
  console.log(evento);
  dialog.showModal();
  evento.preventDefault();
}
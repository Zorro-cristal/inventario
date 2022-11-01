var ventas;
var ventasAux;
var detalle_ventas;
var clientes;
var productos;

//Funcion que filtra por ruc
function filtraRuc(valor) {
  var filtro= valor.toUpperCase();
  if (filtro != "") {
    ventas.filter(
        obj => obj['cedula'].includes(filtro)
    );
    actualizarTabla();
  } else {
      inventario= inventarioAux;
      actualizarTabla();
  }
}

//Funcion que filtra por nombre o apellido
function filtraNombre(valor) {
  var filtro= valor.toUpperCase();´
  if (filtro != "") {
    for (j= 0; j < ventas.length; j++) {

    }
    ventas.filter(
        (obj) {
          //.includes(filtro);
          for (i= 0; i < clientes.length; i++) {
            if (clientes[i]['nombre'].includes(filtro) || clientes[i]['nombre'].includes(filtro)) {
              
            }
          }
        }
    );
    actualizarTabla();
  } else {
      inventario= inventarioAux;
      actualizarTabla();
  }
}

//Funcion que muestra el dialog detalle ventas
function dialogDetalles(event) {
  const columnas= event.currentTarget;
  //columnas tiene nro_factura, cliente, fecha, total, id_vent
  document.getElementById('nro_fact').value= columnas[1].textContent;
  document.getElementById('client').value= columnas[2].textContent;
  const id_vent= columnas[5].textContent;
  var cant_total= 0;
  var descuent_total= 0;
  for (i= 0; i < detalle_ventas.length; i++) {
    if(detalle_ventas[i]['id_venta'] == id_vent) {
      cant_total= cant_total + parseFloat(detalle_ventas[i]['cantidad']);
      descuent_total= descuent_total + parseFloat(detalle_ventas[i]['descuento']);
    }
  }
  document.getElementById('cantidad_total').innerHTML= cant_total;
  document.getElementById('descuento_total').innerHTML= descuent_total;
  document.getElementById('subTotal_total').innerHTML= columnas[4].textContent;
  //Muestra el dialog con los detalles de la venta
  var dialog= document.getElementById('detalle_ventaDialog');
  dialog.showModal();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}

//Funcion cuando cargue toda la pagina
function paginaCargada() {
    //Obtenemos los datos de la base de datos
    $.ajaxSetup({async: false});
    $.ajax({
      url: "../php/listarVentas.php",
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
        var aux= JSON.parse(datos);
        ventasAux= aux['1'];
        ventas= ventasAux;
        detalle_ventas= aux['2'];
        clientes= aux['3'];
        productos= aux['4'];
      }
    });
    $.ajaxSetup({async: true});
    //Actualizamos la tabla de Ventas
    actualizarTabla();
}

//Funcion que actualiza la tabla
function actualizarTabla() {
    const tbody= document.querySelector('tbody');
    var new_tbody= document.createElement('tbody');
      //populate_with_new_rows(new_tbody);
      for (i= ventas.length - 1; i >= 0; i++) {
          var tr= document.createElement('tr');
          var id_vent= document.createElement('tr');
          var nro_factura= document.createElement('td');
          var cliente= document.createElement('td');
          var fecha= document.createElement('td');
          var total= document.createElement('td');
          //nro_factura.textContent(ventas[i]['numero_factura']);
          nro_factura.innerHTML= ventas[i]['numero_factura'];
          nro_factura.style.width= "25%";
          for (j= 0; j < clientes.length; j++) {
            if (clientes[j]['cedula'] == ventas[i]['cedula']) {
                cliente.textContent(clientes[j]['nombre'] + ' ' + clientes[j]['apellido']);
                break;
            }
          }
          cliente.style.width= "45%";
          //fecha.textContent(ventas[i]['fecha']);
          fecha.innerHTML= ventas[i]['fecha'];
          fecha.style.width= "20%";
          var monto= 0;
          for (j= 0; j < detalle_ventas; j++) {
            if (detalle_ventas[j]['id_venta'] == ventas[i]['id']) {
                var descuento= parseFloat(detalle_ventas[j]['descuento']);
                var precio;
                for (k= 0; k < productos.length; k++) {
                    if (productos[k]['id'] == detalle_ventas[j]['id_producto']) {
                        precio= parseFloat(productos[k]['precio_venta']);
                        break;
                    }
                }
                precio= precio - descuento;
                precio= precio * parseFloat(detalle_ventas[j]['cantidad']);
            }
            monto= monto + precio;
          }
          //total.textContent(monto);
          total.innerHTML= monto;
          total.style.width= "20%";
          //id_vent.textContent(ventas[i]['id']);
          id_vent.innerHTML= ventas[i]['id'];
          id_vent.style.display= "none";
          tr.appendChild(nro_factura);
          tr.appendChild(cliente);
          tr.appendChild(fecha);
          tr.appendChild(total);
          tr.appendChild(id_vent);
      }
      tbody.parentNode.replaceChild(new_tbody, tbody);
  }
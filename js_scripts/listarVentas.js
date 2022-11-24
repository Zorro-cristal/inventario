var ventas;
var ventasAux;
var detalle_ventas;
var detalle_ventasAux;
var clientes;
var productos;

//Funcion que filtra por fecha
function filtraFech(valor) {
  if (valor != "") {
    ventas= ventasAux.filter(
      v => v['fecha'].includes(valor)
    );
    actualizarTabla();
  } else {
    ventas= ventasAux;
    actualizarTabla();
  }
}

//Funcion que filtra por cedula
function filtraCed(valor) {
  if (valor != "") {
    //Obtenemos las cedulas similares al valor
    var cliente_busc= clientes.filter(
      c => c['cedula'].includes(valor)
    );
    console.log(cliente_busc);
    //Obtenemos las ventas realizadas segun el cliente_busc
    console.log(ventas);
    ventas= [];
    for (i= 0; i < cliente_busc.length; i++) {
      ventas= ventas.concat(
        ventasAux.filter(
          v => v.cliente_fk.includes(cliente_busc[i].cedula)
        )
      );
    }
    console.log(ventas)
    //Actualizamos la tabla de ventas
    actualizarTabla();
  } else {
      ventas= ventasAux;
      actualizarTabla();
  }
}

//Funcion que filtra por nombre o apellido
function filtraNombre(valor) {
  var filtro= valor.toLowerCase();
  if (filtro != "") {
    //Obtenemos los nombres similares al valor
    var cliente_busc= clientes.filter(
      c => c.nombre.includes(filtro) || c.apellido.includes(filtro)
    );
    //Obtenemos las ventas realizadas segun el cliente_busc
    ventas= [];
    for (i= 0; i < cliente_busc.length; i++) {
      ventas= ventas.concat(
        ventasAux.filter(
          v => v.cliente_fk.includes(cliente_busc[i].cedula)
        )
      );
    }
    console.log(ventas)
    //Actualizamos la tabla de ventas
    actualizarTabla();
  } else {
    ventas= ventasAux;
    actualizarTabla();
  }
}

//Funcion que muestra el dialog detalle ventas
function dialogDetalles(event, element) {
  const id= element.id;
  var new_tbody= document.createElement('tbody');
  new_tbody.id= "detalle_ventas";
  venta= ventas.filter(
    element => element['id'] == id
  )[0];

  document.getElementById('nro_fact').value= ventas['numero_factura'];
  if (ventas['numero_factura'] == null) {
    document.getElementById('nro_fact').value= "";
  }
  
  const cliente= clientes.filter(
    element => element['cedula'] == venta['cliente_fk']
  )[0];
  document.getElementById('client').value= cliente['nombre'] + " " + cliente['apellido'];

  var cant_total= 0;
  var descuent_total= 0;
  detalle_ventas= detalle_ventas.filter(
    element => element['venta_fk'] == id
  );

  var tbody_content= '<tbody id="detalle_ventas">';
  for (i= 0; i < detalle_ventas.length; i++) {
    var product= productos.filter(
      element => element['id'] == detalle_ventas[i]['producto_fk']
    )[0];
    var tr= '<tr>';
    tr= tr + '<td>' + divisorMiles(detalle_ventas[i]['cantidad']) + '</td>';
    tr= tr + '<td>' + product['nombre'] + '</td>';
    tr= tr + '<td>' + divisorMiles(detalle_ventas[i]['descuento']) + '</td>';
    aux= parseInt(detalle_ventas[i]['cantidad']) * (parseFloat(detalle_ventas[i]['precio_venta']) - parseFloat(detalle_ventas[i]['descuento']));
    tr= tr + '<td>' + divisorMiles(aux) + '</td>';
    tr= tr + '</tr>';
    if(detalle_ventas[i]['id_venta'] == id) {
      cant_total= cant_total + parseFloat(detalle_ventas[i]['cantidad']);
      descuent_total= descuent_total + parseFloat(detalle_ventas[i]['descuento']);
    }
    tbody_content= tbody_content + tr;
  }
  tbody_content= tbody_content + '</tbody>';
  new_tbody.innerHTML= tbody_content;
  document.getElementById('detalle_ventas').parentNode.replaceChild(new_tbody, document.getElementById('detalle_ventas'));

  document.getElementById('id_venta').value= id;
  document.getElementById('cantidad_total').innerHTML= divisorMiles(cant_total);
  document.getElementById('descuento_total').innerHTML= divisorMiles(descuent_total);
  document.getElementById('subTotal_total').innerHTML= divisorMiles(element.cells[3].innerText);
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
async function paginaCargada() {
  ventasAux= await obtenerBdd("ventas");
  console.log(ventasAux);
  ventas= ventasAux;
  detalle_ventasAux= await obtenerBdd("detalle_ventas");
  detalle_ventas= detalle_ventasAux;
  clientes= await obtenerBdd("clientes");
  productos= await obtenerBdd("productos");
  //Actualizamos la tabla de Ventas
  actualizarTabla();
}

//Funcion que actualiza la tabla
function actualizarTabla() {
    var monto_total= 0;
    var tbody= document.getElementById('lista_ventas');
    var new_tbody= document.createElement('tbody');
    new_tbody.id= "lista_ventas";
    var tbody_content= '<tbody id="lista_ventas">';
      //populate_with_new_rows(new_tbody);
      for (i= ventas.length - 1; i >= 0; i--) {
          var id_vent= ventas[i]['id'];
          var nro_factura= ventas[i]['numero_factura'] || "";
          var fecha= ventas[i]['fecha'];
          var cliente;
          for (j= 0; j < clientes.length; j++) {
            if (clientes[j]['cedula'] == ventas[i]['cliente_fk']) {
                cliente= clientes[j]['nombre'] + ' ' + clientes[j]['apellido'];
                break;
            }
          }
          var monto= 0;
          for (j= 0; j < detalle_ventas.length; j++) {
            if (detalle_ventas[j]['venta_fk'] == ventas[i]['id']) {
                var descuento= parseFloat(detalle_ventas[j]['descuento']);
                var precio= parseFloat(detalle_ventas[j]['precio_venta']);;
                precio= precio - descuento;
                precio= precio * parseInt(detalle_ventas[j]['cantidad']);
                monto += precio;
            }
          }

          var tr= '<tr onclick="dialogDetalles(event, this)" id= "' + id_vent + '">';
          tr= tr + '<td style= "width: 25%">' + nro_factura + '</td>';
          tr= tr + '<td style= "width: 45%">' + cliente + '</td>';
          tr= tr + '<td style= "width: 20%">' + conversorFecha(fecha) + '</td>';
          tr= tr + '<td style= "width: 20%">' + divisorMiles(monto) + '</td>';
          tr= tr + "</tr>";
          tbody_content= tbody_content + tr;

          monto_total += monto;
          console.log(monto_total);
      }
      tbody_content= tbody_content + "</tbody>";
      new_tbody.innerHTML= tbody_content;
      tbody.parentNode.replaceChild(new_tbody, tbody);
      document.getElementById('monto_total').innerText= divisorMiles(monto_total);
  }

//Funcion para eliminar la venta
function eliminarVenta() {
  var id_vent= document.getElementById('id_venta').value;
  $.ajax({
    url: "../php/eliminarVenta.php",
    type: "post",
    data: {
      "id": id_vent
    },
    error: function (jqXHR, textstatus, errorThrowm) {
      //parametros que reciben los erroes si hubiera alguno
      console.log(jqXHR);
      console.warn(textstatus);
      console.log(errorThrowm);
      alert("Error al eliminar los datos de la base de datos");
      return
    },
    success: function () {
      window.location.replace("./listarVentas.html");
      //window.location.href("./listarVentas.html");
    }
  });
}
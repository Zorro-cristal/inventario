// Funcion para buscar las ventas
async function buscarVentas() {
  let filtro= "";
  // Obtener los filtros
  var cedula= document.getElementById('ced_busc_listado_venta').value || "";
  var nombre= document.getElementById('nombre_client_listado_venta').value || "";
  var fecha= document.getElementById('fech_listado_venta').value || "";
  filtro += (nombre != "") ? "nombre_cliente LIKE '%" + nombre + "%' AND apellido_cliente LIKE '%" + apellido + "%'" : "";
  filtro += (cedula != "") ? " AND cedula = " + cedula : "";
  filtro += (fecha != "") ? " AND fecha = '" + fecha + "'" : "";
  
  ventas= await obtenerBdd("Transacciones T join Cliente c on c.cedula=T.cliente_fk", filtro);
  if (ventas.length == 0) {
    alert("No se encontro ninguna venta");
    return;
  }

  actualizarTabla();
}

//Funcion que muestra el dialog detalle ventas
function dialogDetalles(event, element) {
  const id= element.id;
  var new_tbody= document.createElement('tbody');
  new_tbody.id= "detalle_ventas";
  ventas= ventasAux.filter(
    element => element['id'] == id
  )[0];

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
  cambiarTema(undefined, true);
}

//Funcion que actualiza la tabla
async function actualizarTabla() {
    const pie= document.getElementById("totales_tabla_listado_venta").cloneNode(true);
    var monto_total= 0;
    //ventas= ventasAux;
    var tbody= document.getElementById('lista_ventas');
    var new_tbody= document.createElement('tbody');
    new_tbody.id= "lista_ventas";
    var tbody_content= '<tbody id="lista_ventas">';
      //populate_with_new_rows(new_tbody);
      for (i= ventas.length - 1; i >= 0; i--) {
          var id_vent= ventas[i]['id_transacciones'];
          var nro_factura= ventas[i]['numero_factura'] || "";
          var fecha= ventas[i]['fecha'];
          var monto= 0;

          const detalle_ventas= await obtenerBdd("detalles_transacciones", "transacciones_fk = " + i);
          for (j= 0; j < detalle_ventas.length; j++) {
            if (detalle_ventas[j]['venta_fk'] == ventas[i]['id']) {
                var descuento= parseFloat(detalle_ventas[j]['descuento']);
                var precio= parseFloat(detalle_ventas[j]['precio_producto']);;
                precio= precio - descuento;
                precio= precio * parseInt(detalle_ventas[j]['cantidad']);
                monto += precio;
            }
          }

          var tr= '<tr onclick="dialogDetalles(event, this)" id= "' + id_vent + '">';
          tr= tr + '<td style= "width: 25%">' + nro_factura + '</td>';
          tr= tr + '<td style= "width: 45%">' + detalle_ventas[j]['nombre_cliente'] + detalle_ventas[j]['apellido_cliente'] + '</td>';
          tr= tr + '<td style= "width: 20%">' + conversorFecha(fecha) + '</td>';
          tr= tr + '<td style= "width: 20%">' + divisorMiles(monto) + '</td>';
          tr= tr + "</tr>";
          tbody_content= tbody_content + tr;

          monto_total += monto;
      }
      pie.children[1].innerHTML= divisorMiles(monto_total);
      tbody_content += "<tr>" + pie.innerHTML + "</tr>";
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
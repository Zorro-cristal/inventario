var ventas;
var venta_select;

// Funcion para buscar las ventas
async function buscarVentas(exportarCSV= false) {
  let filtro= "t.cliente_fk=c.cedula";
  // Obtener los filtros
  var cedula= document.getElementById('ced_busc_listado_venta').value || "";
  var nombre= document.getElementById('nombre_client_listado_venta').value || "";
  var fecha= document.getElementById('fech_listado_venta').value || "";
  filtro += (nombre != "") ? " AND c.nombre_cliente LIKE '%" + nombre + "%' AND c.apellido_cliente LIKE '%" + apellido + "%'" : "";
  filtro += (cedula != "") ? " AND c.cedula = " + cedula : "";
  filtro += (fecha != "") ? " AND t.fecha = '" + fecha + "'" : "";
  
  const campos= "id_transacciones,num_factura,fecha,nombre_cliente,apellido_cliente,c.ruc,c.cedula,(select sum(dt.cantidad*pr.precio*((pr.impuesto/100)+1)) from detalles_transacciones dt, productos pr where dt.transaccion_fk = t.id_transacciones and dt.producto_fk=pr.id_producto) as subtotal";
  ventas= await obtenerBdd("Transacciones t, Clientes c", filtro, campos);
  if (ventas.length == 0) {
    alert("No se encontro ninguna venta");
    return;
  }

  actualizarTabla();

  if (exportarCSV) {
    console.log("Generando csv");
    $.ajax({
      url: '../php/exportarCSV.php',
      type: 'post',
      data: {
        "tabla": "Transacciones t, Clientes c",
        "filtros": filtro,
        "campos": campos
      },
      success: function (response) {
        console.log("Respuesta: " + response);
        var downloadLink = document.createElement("a");
        var fileData = ['\ufeff'+response];

        var blobObject = new Blob(fileData,{
          type: "text/csv;charset=utf-8;"
        });

        var url = URL.createObjectURL(blobObject);
        downloadLink.href = url;
        downloadLink.download = "informeVentas.csv";

        /*
        * Actually download CSV
        */
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }
    })
  }
}

//Funcion que muestra el dialog detalle ventas
async function dialogDetalles(event, element) {
  venta_select= element.id;
  var new_tbody= document.createElement('tbody');
  new_tbody.id= "detalle_ventas";
  const ventasAux= ventas.filter(
    element => element['id_transacciones'] == venta_select
  )[0];

  document.getElementById('nro_fact_detalle').value= ventasAux['num_factura'] || "";
  document.getElementById('client_detalle').value= ventasAux['nombre_cliente'] + " " + ventasAux['apellido_cliente'];
  ruc= ventasAux['ruc'] == null ? "" : "-" + ventasAux['ruc'];
  document.getElementById('ruc_detalle').value= ventasAux['cedula'] + ruc;

  var cant_total= 0;
  var descuent_total= 0;
  var precio_total= 0;
  filtro= "dt.producto_fk= p.id_producto AND dt.transaccion_fk = " + venta_select;
  detalle_ventas= await obtenerBdd("detalles_transacciones dt, productos p", filtro, "dt.cantidad,p.nombre_producto,dt.descuento,dt.precio_venta");
console.log(detalle_ventas);
  var tbody_content= '<tbody id="detalle_ventas">';
  for (i= 0; i < detalle_ventas.length; i++) {
    var tr= '<tr>';
    tr= tr + '<td>' + divisorMiles(detalle_ventas[i]['cantidad']) + '</td>';
    tr= tr + '<td>' + detalle_ventas[i]['nombre_producto'] + '</td>';
    tr= tr + '<td>' + divisorMiles(detalle_ventas[i]['descuento'] || 0) + '</td>';
    subTotal= parseInt(detalle_ventas[i]['cantidad']) * (parseFloat(detalle_ventas[i]['precio_venta']) - parseFloat(detalle_ventas[i]['descuento']));
    tr= tr + '<td>' + divisorMiles(subTotal) + '</td>';
    tr= tr + '</tr>';
    cant_total += parseFloat(detalle_ventas[i]['cantidad']);
    descuent_total += parseFloat(detalle_ventas[i]['descuento']);
    precio_total += subTotal;
    tbody_content= tbody_content + tr;
  }
  tbody_content= tbody_content + "<tr><th>" + divisorMiles(cant_total) + "</th><th></th><th>" + divisorMiles(descuent_total) + "</th><th>" + divisorMiles(precio_total) + "</th></tr>";
  tbody_content= tbody_content + '</tbody>';
  new_tbody.innerHTML= tbody_content;
  document.getElementById('detalle_ventas').parentNode.replaceChild(new_tbody, document.getElementById('detalle_ventas'));
  document.getElementById('id_venta').value= venta_select;
  
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
          var nro_factura= ventas[i]['num_factura'] || "";
          var fecha= ventas[i]['fecha'];
          var monto= 0;

          const detalle_ventas= await obtenerBdd("detalles_transacciones d, Productos p", "p.id_producto = d.producto_fk AND d.transaccion_fk = " + i, "transaccion_fk,precio_venta,descuento,cantidad");
          console.log("detalle_ventas:", detalle_ventas);
          for (j= 0; j < detalle_ventas.length; j++) {
            if (detalle_ventas[j]['venta_fk'] == ventas[i]['id_transacciones']) {
                var descuento= parseFloat(detalle_ventas[j]['descuento']) || 0;
                var precio= parseFloat(detalle_ventas[j]['precio_venta']) || 0;
                precio= precio - descuento;
                precio= precio * parseFloat(detalle_ventas[j]['cantidad']);
                monto += precio;
            }
          }
          var tr= '<tr onclick="dialogDetalles(event, this)" id= "' + id_vent + '">';
          tr= tr + '<td style= "width: 25%">' + nro_factura + '</td>';
          tr= tr + '<td style= "width: 45%">' + ventas[i]['nombre_cliente'] + ' ' + ventas[i]['apellido_cliente'] + '</td>';
          tr= tr + '<td style= "width: 20%">' + fecha + '</td>';
          tr= tr + '<td style= "width: 20%">' + divisorMiles(ventas[i]['subtotal']) + '</td>';
          tr= tr + "</tr>";
          tbody_content= tbody_content + tr;

          monto_total += parseFloat(ventas[i]['subtotal']);
      }
      pie.children[1].innerHTML= divisorMiles(monto_total);
      tbody_content += "<tr>" + pie.innerHTML + "</tr>";
      tbody_content= tbody_content + "</tbody>";
      new_tbody.innerHTML= tbody_content;
      tbody.parentNode.replaceChild(new_tbody, tbody);
      document.getElementById('monto_total').innerText= divisorMiles(monto_total);
      document.getElementById("btnExportarCSV").disabled= false;
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

// Funcion para guardar las modificaciones de los detalles de la venta
function guardarDetalles() {
  const numero_factura= document.getElementById("nro_fact_detalle").value;
  $.ajax({
    url: "../php/actualizarVenta.php",
    type: "post",
    data: {
      "id": venta_select,
      "nro_factura": numero_factura
    },
    error: function (jqXHR, textstatus, errorThrowm) {
      //parametros que reciben los erroes si hubiera alguno
      console.log(jqXHR);
      console.warn(textstatus);
      console.log(errorThrowm);
      alert("Error al modificar los datos de la base de datos");
      return
    },
    success: function () {
      window.location.replace("./listarVentas.html");
      //window.location.href("./listarVentas.html");
    }
  });
}
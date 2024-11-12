# SISTEMA DE GESTIÓN ABM PARA VENTAS
Este sistema permite la administración de ventas a través de un modelo ABM (Alta, Baja y Modificación) de datos, almacenando la información en una base de datos y presentando funcionalidades para gestionar categorías de productos, proveedores, clientes, transacciones, y detalles de ventas.

# Descripcion
El sistema ABM permite gestionar y registrar las ventas realizadas en una base de datos estructurada, facilitando la búsqueda y el análisis de transacciones, productos, y clientes.

# Tecnologias utilizadas
- HTML
- PHP
- MYSQL
- JAVASCRIPT

# Base de datos
### Tabla `Categoria`
- **Descripción**: Almacena las categorías de los productos.
- **Atributos**:
  - `id_categoria` (INT, PK, AUTO_INCREMENT): Identificador único de la categoría.
  - `nombre_categoria` (VARCHAR(100)): Nombre de la categoría.

### Tabla `Proveedor`
- **Descripción**: Almacena la información de los proveedores.
- **Atributos**:
  - `id_proveedor` (INT, PK, AUTO_INCREMENT): Identificador único del proveedor.
  - `nombre_proveedor` (VARCHAR(100)): Nombre del proveedor.
  - `telefono_proveedor` (VARCHAR(15)): Teléfono del proveedor.
  - `direccion_proveedor` (VARCHAR(255)): Dirección del proveedor.

### Tabla `Producto`
- **Descripción**: Almacena la información de los productos.
- **Atributos**:
  - `id_producto` (INT, PK, AUTO_INCREMENT): Identificador único del proveedor.
  - `nombre_producto` (VARCHAR(100)): Nombre del producto.
  - `cantidad_producto` (INT): Cantidad disponible del producto o stock.
  - `precio` (DECIMAL(10, 2)): Precio unitario del producto.
  - `categoria_fk` (INT, FK): Código de la categoría del producto.
  - `proveedor_fk` (INT, FK): Código del proveedor del producto.

### Tabla `Cliente`
- **Descripción**: Almacena la información de los clientes.
- **Atributos**:
  - `id_cliente` (INT, PK, AUTO_INCREMENT): Identificador único del cliente.
  - `nombre_cliente` (VARCHAR(50)): Nombre del cliente.
  - `apellido_cliente` (VARCHAR(50)): Apellido del cliente.
  - `direccion_cliente` (VARCHAR(255)): Dirección del cliente.
  - `ruc` (VARCHAR(20)): RUC del cliente.

### Tabla `Tipo`
- **Descripción**: Define los tipos de transacciones que pueden realizarse.
  - `id_tipo` (INT, PK, AUTO_INCREMENT): Identificador único del tipo de transacción.
  - `nombre_tipo` (VARCHAR(100)): Nombre descriptivo del tipo de transacción (ej. Venta de producto, Servicio).

### Tabla `Transacciones`
- **Descripción**: Registra las transacciones de venta.
- **Atributos**:
  - `id_transacciones` (INT, PK, AUTO_INCREMENT): Código único de la transacción.
  - `tipo_fk` (INT, FK): Código del tipo de transacción.
  - `cliente_fk` (INT, FK): Código del cliente.
  - `fecha` (DATE): Fecha de la transacción.

### Tabla `Detalles_Transacciones`
- **Descripción**: Almacena los detalles de cada transacción (productos vendidos, cantidades, etc.).
- **Atributos**:
  - `id_detalles_transacciones` (INT, PK, AUTO_INCREMENT): Identificador único del detalle de transacción.
  - `transaccion_fk` (INT, FK): Código de la transacción.
  - `producto_fk` (INT, FK): Código del producto.
  - `cantidad` (INT): Cantidad del producto en la transacción.
  - `precio_venta` (DECIMAL(10, 2)): Precio del producto en la transacción.

## Relaciones entre Tablas
Las tablas están relacionadas mediante claves foráneas, permitiendo la integridad referencial. Por ejemplo:

`categoria_fk` en Productos hace referencia a `id_categoria` en `Categorias`.
`proveedor_fk` en Productos hace referencia a `id_proveedor` en `Proveedores`.
`cliente_fk` en Transacciones hace referencia a `cedula` en `Clientes`.
`tipo_fk` en Transacciones hace referencia a `id_tipo` en `Tipos`.
`transaccion_fk` en `Detalles_Transacciones` hace referencia a `id_transacciones` en `Transacciones`.
`producto_fk` en `Detalles_Transacciones` hace referencia a `id_producto` en `Productos`.

# Estructura del proyecto
## Pantalla principal
La página muestra un menú de navegación y un contenido central que varía dependiendo de la sección seleccionada.
Estructura del Documento HTML
Encabezado (<head>)
Metadatos y título:

Se define el tipo de documento como HTML5 (<!DOCTYPE html>), el idioma como español (<html lang="es">), y el título de la página como "Menu".
Se incluye el meta tag viewport para adaptar la visualización en dispositivos móviles.
Estilos y scripts externos:

Bootstrap CSS: Se utiliza la versión 5.1.3 de Bootstrap desde CDN para un diseño responsivo.
Estilos personalizados: main.css define estilos específicos para el sistema.
jQuery y scripts personalizados: jquery.js y funciones.js gestionan las funcionalidades interactivas.
Cuerpo (<body>)
El cuerpo de la página principal contiene un menú de navegación fijo y opciones adicionales, como un reloj digital y opciones de tema claro/oscuro.

Navegación (<nav>)
La barra de navegación contiene los enlaces a las funcionalidades principales:

Nueva Venta: Redirige a registrarVenta.html para registrar una venta nueva.
Productos/Servicios: Ofrece un submenú para listar productos y servicios, registrar un nuevo servicio o producto.
Compras: Acceso a registrar o listar compras realizadas.
Proveedores: Permite registrar un nuevo proveedor o actualizar la información de uno existente.
Generar Informes: Enlace para listar ventas (listarVentas.html) y generar informes.
Funciones Interactivas
Cambio de Tema:

Implementado mediante las funciones cambiarTema('light') y cambiarTema('dark'). Los íconos permiten al usuario alternar entre tema claro y oscuro.
Reloj en Vivo:

Se usa setInterval(updateClock, 1000) para actualizar el reloj cada segundo en el elemento clock.
Cerrar Sesión:

El ícono de salir (menu_salir) permite al usuario cerrar la sesión, aunque el evento asociado aún no está implementado en el HTML proporcionado.
Contenido Principal (<main>)
El contenido principal muestra el logo del sistema en el centro de la pantalla. Este logo es estático y actúa como un centro visual en la interfaz inicial de la aplicación.

Scripts JavaScript (<script>)
Bootstrap JS y Popper.js:
Incluyen la funcionalidad de Bootstrap (popovers, modales, etc.), aunque no todos se usan explícitamente en esta página.
Actualización del Reloj:
updateClock() es una función llamada cada segundo que muestra la hora actual en el elemento HTML identificado como clock.


### Registrar venta
La pagina permite a los usuarios ingresar los detalles de la venta, como la fecha, el cliente, los productos y el total.

### Listar venta
La pagina permite a los usuarios  ver el historial de ventas, filtrar por cliente, fecha, y ver detalles específicos de cada transacción
## Buscar Ventas `buscarVentas`: 
Realiza la búsqueda en base a filtros como cédula, nombre y fecha, recuperando las ventas que coincidan.
Mostrar Detalles de una Venta (dialogDetalles): Permite ver el detalle completo de una venta específica, incluyendo productos comprados y totales.
Actualizar la Tabla del Listado (actualizarTabla): Muestra todas las ventas encontradas en la búsqueda, incluyendo totales y montos de cada venta.
var ventas;
var venta_select;

/**
 * Busca las ventas aplicando los filtros establecidos y actualiza la tabla con los resultados. 
 * Opcionalmente exporta los datos filtrados a un archivo CSV.
 * 
 * @param {boolean} exportarCSV - Indica si se debe exportar los resultados a un archivo CSV.
 */
async function buscarVentas(exportarCSV = false) {
  let filtro = "t.cliente_fk = c.cedula";
  
  // Obtener los filtros
  var cedula = document.getElementById('ced_busc_listado_venta').value || "";
  var nombre = document.getElementById('nombre_client_listado_venta').value || "";
  var fecha = document.getElementById('fech_listado_venta').value || "";
  filtro += (nombre !== "") ? " AND c.nombre_cliente LIKE '%" + nombre + "%' AND c.apellido_cliente LIKE '%" + apellido + "%'" : "";
  filtro += (cedula !== "") ? " AND c.cedula = " + cedula : "";
  filtro += (fecha !== "") ? " AND t.fecha = '" + fecha + "'" : "";
  
  const campos = "id_transacciones, num_factura, fecha, nombre_cliente, apellido_cliente, c.ruc, c.cedula, " +
                 "(SELECT SUM(dt.cantidad * pr.precio * ((pr.impuesto / 100) + 1)) FROM detalles_transacciones dt, productos pr " +
                 "WHERE dt.transaccion_fk = t.id_transacciones AND dt.producto_fk = pr.id_producto) AS subtotal";
  ventas = await obtenerBdd("Transacciones t, Clientes c", filtro, campos);

  if (ventas.length === 0) {
    alert("No se encontró ninguna venta");
    return;
  }

  actualizarTabla();

  if (exportarCSV) {
    exportarDatosCSV(filtro, campos);
  }
}

/**
 * Exporta los datos a un archivo CSV.
 * @param {string} filtro - Los filtros aplicados a los datos.
 * @param {string} campos - Los campos a exportar.
 */
function exportarDatosCSV(filtro, campos) {
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
      var fileData = ['\ufeff' + response];
      var blobObject = new Blob(fileData, { type: "text/csv;charset=utf-8;" });
      var url = URL.createObjectURL(blobObject);
      downloadLink.href = url;
      downloadLink.download = "informeVentas.csv";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR, textStatus, errorThrown);
    }
  });
}

/**
 * Muestra el cuadro de diálogo con los detalles de la venta seleccionada.
 * 
 * @param {Event} event - El evento que activa la función.
 * @param {HTMLElement} element - El elemento que representa la venta seleccionada.
 */
async function dialogDetalles(event, element) {
  venta_select = element.id;
  const ventasAux = ventas.find(element => element['id_transacciones'] === venta_select);

  document.getElementById('nro_fact_detalle').value = ventasAux['num_factura'] || "";
  document.getElementById('client_detalle').value = ventasAux['nombre_cliente'] + " " + ventasAux['apellido_cliente'];
  var ruc = ventasAux['ruc'] == null ? "" : "-" + ventasAux['ruc'];
  document.getElementById('ruc_detalle').value = ventasAux['cedula'] + ruc;

  let cant_total = 0, descuent_total = 0, precio_total = 0;
  const filtro = "dt.producto_fk = p.id_producto AND dt.transaccion_fk = " + venta_select;
  const detalle_ventas = await obtenerBdd("detalles_transacciones dt, productos p", filtro, "dt.cantidad, p.nombre_producto, dt.descuento, dt.precio_venta");

  const new_tbody = crearDetalleVentas(detalle_ventas, cant_total, descuent_total, precio_total);
  document.getElementById('detalle_ventas').parentNode.replaceChild(new_tbody, document.getElementById('detalle_ventas'));
  document.getElementById('id_venta').value = venta_select;
  abrirDialogoDetalles();
}

/**
 * Abre el diálogo de detalles de ventas.
 */
function abrirDialogoDetalles() {
  var dialog = document.getElementById('detalle_ventaDialog');
  dialog.showModal();
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close();
    }
  });
}

/**
 * Crea el contenido del cuerpo de la tabla de detalles de ventas.
 * 
 * @param {Array} detalle_ventas - Lista de detalles de ventas.
 * @param {number} cant_total - Total de cantidad.
 * @param {number} descuent_total - Total de descuento.
 * @param {number} precio_total - Total del precio.
 * @returns {HTMLElement} - El nuevo elemento tbody.
 */
function crearDetalleVentas(detalle_ventas, cant_total, descuent_total, precio_total) {
  var tbody_content = '<tbody id="detalle_ventas">';
  detalle_ventas.forEach(detalle => {
    var tr = '<tr>';
    tr += '<td>' + divisorMiles(detalle['cantidad']) + '</td>';
    tr += '<td>' + detalle['nombre_producto'] + '</td>';
    tr += '<td>' + divisorMiles(detalle['descuento'] || 0) + '</td>';
    const subTotal = detalle['cantidad'] * (detalle['precio_venta'] - detalle['descuento']);
    tr += '<td>' + divisorMiles(subTotal) + '</td>';
    tr += '</tr>';
    tbody_content += tr;

    cant_total += parseFloat(detalle['cantidad']);
    descuent_total += parseFloat(detalle['descuento']);
    precio_total += subTotal;
  });
  tbody_content += `<tr><th>${divisorMiles(cant_total)}</th><th></th><th>${divisorMiles(descuent_total)}</th><th>${divisorMiles(precio_total)}</th></tr></tbody>`;
  
  const new_tbody = document.createElement('tbody');
  new_tbody.id = "detalle_ventas";
  new_tbody.innerHTML = tbody_content;
  return new_tbody;
}
# Descripcion
El sistema ABM permite gestionar y agregar las ventas realizadas en una base de datos.

# Tecnologias utilizadas
- HTML
- PHP
- MYSQL
- JAVASCRIPT

# Base de datos
### Tabla `Categoria`
- **Descripción**: Almacena las categorías de los productos.
- **Atributos**:
  - `id_categoria` (INT, PK, AUTO_INCREMENT): Código único de la categoría.
  - `nombre_categoria` (VARCHAR(100)): Nombre de la categoría.

### Tabla `Proveedor`
- **Descripción**: Almacena la información de los proveedores.
- **Atributos**:
  - `id_proveedor` (INT, PK, AUTO_INCREMENT): Código único del proveedor.
  - `nombre_proveedor` (VARCHAR(100)): Nombre del proveedor.
  - `telefono_proveedor` (VARCHAR(15)): Teléfono del proveedor.
  - `direccion_proveedor` (VARCHAR(255)): Dirección del proveedor.

### Tabla `Producto`
- **Descripción**: Almacena la información de los productos.
- **Atributos**:
  - `id_producto` (INT, PK, AUTO_INCREMENT): Código único del producto.
  - `nombre_producto` (VARCHAR(100)): Nombre del producto.
  - `cantidad_producto` (INT): Cantidad disponible del producto.
  - `precio` (DECIMAL(10, 2)): Precio del producto.
  - `categoria_fk` (INT, FK): Código de la categoría del producto.
  - `proveedor_fk` (INT, FK): Código del proveedor del producto.

### Tabla `Cliente`
- **Descripción**: Almacena la información de los clientes.
- **Atributos**:
  - `id_cliente` (INT, PK, AUTO_INCREMENT): Código único del cliente.
  - `nombre_cliente` (VARCHAR(50)): Nombre del cliente.
  - `apellido_cliente` (VARCHAR(50)): Apellido del cliente.
  - `direccion_cliente` (VARCHAR(255)): Dirección del cliente.
  - `ruc` (VARCHAR(20)): RUC del cliente.

### Tabla `Tipo`
- **Descripción**: Almacena los tipos de transacciones.
- **Atributos**:
  - `id_tipo` (INT, PK, AUTO_INCREMENT): Código único del tipo de transacción.
  - `nombre_tipo` (VARCHAR(100)): Nombre del tipo de transacción.

### Tabla `Transacciones`
- **Descripción**: Almacena la información de las transacciones.
- **Atributos**:
  - `id_transacciones` (INT, PK, AUTO_INCREMENT): Código único de la transacción.
  - `tipo_fk` (INT, FK): Código del tipo de transacción.
  - `cliente_fk` (INT, FK): Código del cliente.
  - `fecha` (DATE): Fecha de la transacción.

### Tabla `Detalles_Transacciones`
- **Descripción**: Almacena los detalles de cada transacción.
- **Atributos**:
  - `id_detalles_transacciones` (INT, PK, AUTO_INCREMENT): Código único del detalle de la transacción.
  - `transaccion_fk` (INT, FK): Código de la transacción.
  - `producto_fk` (INT, FK): Código del producto.
  - `cantidad` (INT): Cantidad del producto en la transacción.
  - `precio` (DECIMAL(10, 2)): Precio del producto en la transacción.

# Estructura del proyecto
## Pantalla principal
La página muestra un menú de navegación y un contenido central que varía dependiendo de la sección seleccionada.

### Registrar venta
La pagina permite a los usuarios ingresar los detalles de la venta, como la fecha, el cliente, los productos y el total.

### Listar venta
La pagina permite a los usuarios realizar varias acciones, como buscar ventas por fecha o cliente, ver detalles de cada venta, y eliminar ventas.
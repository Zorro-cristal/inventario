use inventario;
-- Crear tabla Categoria
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Categoria
INSERT INTO `categorias` (`id_categoria`,`nombre_categoria`) VALUES (1,'escolar');
INSERT INTO `categorias` (`id_categoria`,`nombre_categoria`) VALUES (2,'oficina');
INSERT INTO `categorias` (`id_categoria`,`nombre_categoria`) VALUES (3,'Juegos Didacticos');
INSERT INTO `categorias` (`id_categoria`,`nombre_categoria`) VALUES (4,'articulos varios');

-- Crear tabla Proveedor
CREATE TABLE Proveedores (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_proveedor VARCHAR(100) NOT NULL,
    telefono_proveedor VARCHAR(15),
    direccion_proveedor VARCHAR(255)
);

-- Insertar datos de prueba en Proveedor
INSERT INTO `proveedores` (`nombre_proveedor`, `direccion_proveedor`, `telefono_proveedor`) VALUES ('Provin', 'Mcal. López y Cerro Corá, Barrio Centro - Villarri', 2147483647);
INSERT INTO `proveedores` (`nombre_proveedor`, `direccion_proveedor`, `telefono_proveedor`) VALUES ('Matiplast', 'Maelo Gómez, Barrio Centro - Villarrica', 54144704);
INSERT INTO `proveedores` (`nombre_proveedor`, `direccion_proveedor`, `telefono_proveedor`) VALUES ('Fortis', 'Ruta PY 02 Mcal Estigarribia c/ Ayolas, Coronel Ov', 217289141);

-- Crear tabla Producto
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    cantidad_disponible INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_fk INT,
    impuesto INT NOT NULL,
    proveedor_fk INT,
    FOREIGN KEY (categoria_fk) REFERENCES Categorias(id_categoria),
    FOREIGN KEY (proveedor_fk) REFERENCES ProveedorEs(id_proveedor)
);

-- Insertar datos de prueba en Producto
INSERT INTO `productos` (`id_producto`,`nombre_producto`, `cantidad_disponible`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES (1,'hoja oficio', 100, 500.00, 4, 1);
INSERT INTO `productos` (`id_producto`,`nombre_producto`, `cantidad_disponible`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES (2,'Cuaderno de una raya', 50, 10000.00, 1, 2);
INSERT INTO `productos` (`id_producto`,`nombre_producto`, `cantidad_disponible`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES (3,'Abaco juego didáctico', 5, 35000.00, 3, 3);

-- Crear tabla Cliente
CREATE TABLE Clientes (
    cedula INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(50) NOT NULL,
    direccion_cliente VARCHAR(255),
    ruc VARCHAR(20)
);

-- Insertar datos de prueba en Cliente
INSERT INTO `clientes` (`cedula`, `nombre_cliente`, `apellido_cliente`, `ruc`, `direccion_cliente`) VALUES (456978, 'Eugenio', 'Benítez', NULL, NULL);
INSERT INTO `clientes` (`cedula`, `nombre_cliente`, `apellido_cliente`, `ruc`, `direccion_cliente`) VALUES (4869778, 'Laura', 'Vazquez', 1, NULL);
INSERT INTO `clientes` (`cedula`, `nombre_cliente`, `apellido_cliente`, `ruc`, `direccion_cliente`) VALUES (5412697, 'Diego', 'Santacruz', 2, 'Mariscal Estigarribia y Teniente Blas Arevalos , Barrio Santa Librada');
INSERT INTO `clientes` (`cedula`, `nombre_cliente`, `apellido_cliente`, `ruc`, `direccion_cliente`) VALUES (4360067, 'Alejandro', 'Alvarez', 0, 'Rubio Ñu, Barrio Ybaroty');

-- Crear tabla Tipo
CREATE TABLE Tipos (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Tipo
INSERT INTO `tipos` (`nombre_tipo`) VALUES ('venta de articulo');
INSERT INTO `tipos` (`nombre_tipo`) VALUES ('compra de producto');
INSERT INTO `tipos` (`nombre_tipo`) VALUES ('Servicio de fotocopia');
INSERT INTO `tipos` (`nombre_tipo`) VALUES ('Servicio varios');

-- Crear tabla Transacciones
CREATE TABLE Transacciones (
  `id_transacciones` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cliente_fk` int(9) NOT NULL,
  `tipo_fk` int(7) NOT NULL,
  `num_factura` INT UNSIGNED NOT NULL,
  `fecha` varchar(20) NOT NULL,
  FOREIGN KEY (cliente_fk) REFERENCES Clientes(cedula),
  FOREIGN KEY (tipo_fk) REFERENCES Tipos(id_tipo),
  FOREIGN KEY (categoria_fk) REFERENCES Categorias(id_categoria)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar datos de prueba en Transacciones
INSERT INTO Transacciones (id_transacciones, cliente_fk, fecha, tipo_fk, categoria_fk, num_factura) VALUES (1,4360067, '2024-09-22 09:00:00', 1, 1,125);

-- Crear tabla Detalles_Transacciones
CREATE TABLE Detalles_Transacciones (
    id_detalles_transacciones INT AUTO_INCREMENT PRIMARY KEY,
    transaccion_fk INT,
    producto_fk INT,
    cantidad INT NOT NULL,
    precio_venta DECIMAL(10, 2) NOT NULL,
    descuento DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (transaccion_fk) REFERENCES Transacciones(id_transacciones),
    FOREIGN KEY (producto_fk) REFERENCES Productos(id_producto)
);

-- Insertar datos de prueba en Detalles_Transacciones
INSERT INTO Detalles_Transacciones (transaccion_fk, producto_fk, cantidad, descuento) VALUES (1, 3, 2, 500);
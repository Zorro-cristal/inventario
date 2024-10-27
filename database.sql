-- Crear tabla Categoria
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Categoria
INSERT INTO `categoria` (`nombre_categoria`) VALUES
('escolar'),
('oficina'),
('Juegos Didacticos'),
('articulos varios');

-- Crear tabla Proveedor
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    nombre_proveedor VARCHAR(100) NOT NULL,
    telefono_proveedor VARCHAR(15),
    direccion_proveedor VARCHAR(255)
);

-- Insertar datos de prueba en Proveedor
INSERT INTO `proveedor` (`nombre_proveedor`, `direccion_proveedor`, `telefono_proveedor`) VALUES
('Provin', 'Mcal. López y Cerro Corá, Barrio Centro - Villarri', 2147483647),
('Matiplast', 'Maelo Gómez, Barrio Centro - Villarrica', 54144704),
('Fortis', 'Ruta PY 02 Mcal Estigarribia c/ Ayolas, Coronel Ov', 217289141);

-- Crear tabla Producto
CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_fk INT,
    impuesto INT NOT NULL,
    proveedor_fk INT,
    FOREIGN KEY (categoria_fk) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (proveedor_fk) REFERENCES Proveedor(id_proveedor)
);

-- Insertar datos de prueba en Producto
INSERT INTO `producto` (`nombre_producto`, `cantidad`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES
('hoja oficio', 100, 500.00, 4, 1),
('Cuaderno de una raya', 50, 10000.00, 1, 2),
('Abaco juego didáctico', 5, 35000.00, 3, 3);

-- Crear tabla Cliente
CREATE TABLE Cliente (
    cedula INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cliente VARCHAR(50) NOT NULL,
    apellido_cliente VARCHAR(50) NOT NULL,
    direccion_cliente VARCHAR(255),
    ruc VARCHAR(20)
);

-- Insertar datos de prueba en Cliente
INSERT INTO `cliente` (`cedula`, `nombre_cliente`, `apellido_cliente`, `ruc`, `direccion_cliente`) VALUES
(456978, 'Eugenio', 'Benítez', NULL, NULL),
(4869778, 'Laura', 'Vazquez', 486579, NULL),
(5412697, 'Diego', 'Santacruz', 5412697, 'Mariscal Estigarribia y Teniente Blas Arevalos , Barrio Santa Librada');

-- Crear tabla Tipo
CREATE TABLE Tipo (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Tipo
INSERT INTO `tipo` (`nombre_tipo`) VALUES
('venta de articulo'),
('compra de producto'),
('Servicio de fotocopia'),
('Servicio varios ');

-- Crear tabla Transacciones
CREATE TABLE Transacciones (
  `id_transacciones` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cliente_fk` int(9) NOT NULL,
  `tipo_fk` int(7) NOT NULL,
  `categoria_fk` int(8) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar datos de prueba en Transacciones
INSERT INTO Transacciones (cliente_fk, fecha, tipo_fk, categoria_fk) VALUES (4360067, '2024-09-22 09:00:00', 1, 1);

-- Crear tabla Detalles_Transacciones
CREATE TABLE Detalles_Transacciones (
    id_detalles_transacciones INT AUTO_INCREMENT PRIMARY KEY,
    transaccion_fk INT,
    num_factura INT UNSIGNED,
    producto_fk INT,
    cantidad INT NOT NULL,
    descuento DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (transaccion_fk) REFERENCES Transacciones(id_transacciones),
    FOREIGN KEY (producto_fk) REFERENCES Producto(id_producto)
);

-- Insertar datos de prueba en Detalles_Transacciones
INSERT INTO Detalles_Transacciones (transaccion_fk, producto_fk, cantidad, descuento) VALUES (1, 5, 2, 2500);
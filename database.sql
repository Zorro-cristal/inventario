-- Crear tabla Categoria
CREATE TABLE Categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Categoria
INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'escolar'),
(2, 'oficina'),
(3, 'Juegos Didacticos'),
(4, 'articulos varios');

-- Crear tabla Proveedor
CREATE TABLE Proveedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    direccion VARCHAR(255)
);

-- Insertar datos de prueba en Proveedor
INSERT INTO `proveedor` (`id`, `nombre`, `direccion`, `telefono`) VALUES
(1, 'Provin', 'Mcal. López y Cerro Corá, Barrio Centro - Villarri', 2147483647),
(2, 'Matiplast', 'Maelo Gómez, Barrio Centro - Villarrica', 54144704),
(3, 'Fortis', 'Ruta PY 02 Mcal Estigarribia c/ Ayolas, Coronel Ov', 217289141);

-- Crear tabla Producto
CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria_fk INT,
    proveedor_fk INT,
    FOREIGN KEY (categoria_fk) REFERENCES Categoria(id),
    FOREIGN KEY (proveedor_fk) REFERENCES Proveedor(id)
);

-- Insertar datos de prueba en Producto
INSERT INTO `producto` (`id`, `nombre`, `cantidad`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES
(150, 'hoja oficio', 100, 500.00, 4, 1),
(390, 'Cuaderno de una raya', 50, 10000.00, 1, 2),
(987, 'Abaco juego didáctico', 5, 35000.00, 3, 3);

-- Crear tabla Cliente
CREATE TABLE Cliente (
    cedula INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(255),
    ruc VARCHAR(20)
);

-- Insertar datos de prueba en Cliente
INSERT INTO `cliente` (`cedula`, `nombre`, `ruc`, `direccion`) VALUES
(456978, 'Eugenio', 'Benítez', NULL, NULL),
(4869778, 'Laura', 'Vazquez', 486579, NULL),
(5412697, 'Diego', 'Santacruz', 5412697, 'Mariscal Estigarribia y Teniente Blas Arevalos , Barrio Santa Librada');

-- Crear tabla Tipo
CREATE TABLE Tipo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar datos de prueba en Tipo
INSERT INTO `tipo` (`id`, `nombre`) VALUES
(1, 'venta de articulo'),
(2, 'compra de producto'),
(3, 'Servicio de fotocopia'),
(4, 'Servicio varios ');

-- Crear tabla Transacciones
CREATE TABLE Transacciones (
  `id` int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `cliente_fk` int(9) NOT NULL,
  `tipo_fk` int(7) NOT NULL,
  `categoria_fk` int(8) NOT NULL,
  `fecha` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar datos de prueba en Transacciones
INSERT INTO Transacciones (id, cliente_fk, fecha, tipo_fk, categoria_fk) VALUES (1, 1, '2024-09-22 09:00:00', 1, 1);

-- Crear tabla Detalles_Transacciones
CREATE TABLE Detalles_Transacciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    transaccion_fk INT,
    producto_fk INT,
    cantidad INT NOT NULL,
    descuento DECIMAL(10, 2) DEFAULT 0,
    FOREIGN KEY (transaccion_fk) REFERENCES Transacciones(id),
    FOREIGN KEY (producto_fk) REFERENCES Producto(id)
);

-- Insertar datos de prueba en Detalles_Transacciones
INSERT INTO Detalles_Transacciones (transaccion_fk, producto_fk, cantidad, descuento) VALUES (1, 150, 2, 99.99);
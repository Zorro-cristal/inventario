-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-10-2024 a las 02:38:16
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int(7) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id`, `nombre`) VALUES
(1, 'escolar'),
(2, 'oficina'),
(3, 'Juegos Didacticos'),
(4, 'articulos varios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cedula` int(9) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `ruc` int(10) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cedula`, `nombre`, `ruc`, `direccion`) VALUES
(456978, 'Eugenio Benítez', NULL, NULL),
(4869778, 'Laura Vazquez', 486579, NULL),
(5412697, 'Diego Santacruz', 5412697, 'Mariscal Estigarribia y Teniente Blas Arevalos , Barrio Santa Librada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_transacciones`
--

CREATE TABLE `detalle_transacciones` (
  `id` int(10) NOT NULL,
  `producto_fk` int(10) NOT NULL,
  `cantidad` int(7) NOT NULL,
  `descuento` decimal(17,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(10) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `cantidad` int(7) NOT NULL,
  `precio` decimal(17,2) DEFAULT NULL,
  `categoria_fk` int(7) NOT NULL,
  `proveedor_fk` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `nombre`, `cantidad`, `precio`, `categoria_fk`, `proveedor_fk`) VALUES
(150, 'hoja oficio', 100, 500.00, 4, 1),
(390, 'Cuaderno de una raya', 50, 10000.00, 1, 2),
(987, 'Abaco juego didáctico', 5, 35000.00, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id` int(10) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `direccion` varchar(50) NOT NULL,
  `telefono` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id`, `nombre`, `direccion`, `telefono`) VALUES
(1, 'Provin', 'Mcal. López y Cerro Corá, Barrio Centro - Villarri', 2147483647),
(2, 'Matiplast', 'Maelo Gómez, Barrio Centro - Villarrica', 54144704),
(3, 'Fortis', 'Ruta PY 02 Mcal Estigarribia c/ Ayolas, Coronel Ov', 217289141);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo`
--

CREATE TABLE `tipo` (
  `id` int(7) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo`
--

INSERT INTO `tipo` (`id`, `nombre`) VALUES
(1, 'venta de articulo'),
(2, 'compra de producto'),
(3, 'Servicio de fotocopia'),
(4, 'Servicio varios ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transacciones`
--

CREATE TABLE `transacciones` (
  `id` int(10) NOT NULL,
  `cliente_fk` int(9) NOT NULL,
  `tipo_fk` int(7) NOT NULL,
  `detalle_transaccion_fk` int(7) NOT NULL,
  `categoria_fk` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `detalle_transacciones`
--
ALTER TABLE `detalle_transacciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `producto_fk` (`producto_fk`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `proveedor_fk` (`proveedor_fk`),
  ADD KEY `categoria_fk` (`categoria_fk`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tipo`
--
ALTER TABLE `tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo_fk` (`tipo_fk`),
  ADD KEY `detalle_transaccion_fk` (`detalle_transaccion_fk`),
  ADD KEY `cliente_fk` (`cliente_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_transacciones`
--
ALTER TABLE `detalle_transacciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=988;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `transacciones`
--
ALTER TABLE `transacciones`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_transacciones`
--
ALTER TABLE `detalle_transacciones`
  ADD CONSTRAINT `detalle_transacciones_ibfk_1` FOREIGN KEY (`producto_fk`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`proveedor_fk`) REFERENCES `proveedor` (`id`),
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`categoria_fk`) REFERENCES `categoria` (`id`);

--
-- Filtros para la tabla `transacciones`
--
ALTER TABLE `transacciones`
  ADD CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`tipo_fk`) REFERENCES `tipo` (`id`),
  ADD CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`detalle_transaccion_fk`) REFERENCES `detalle_transacciones` (`id`),
  ADD CONSTRAINT `transacciones_ibfk_3` FOREIGN KEY (`cliente_fk`) REFERENCES `clientes` (`cedula`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

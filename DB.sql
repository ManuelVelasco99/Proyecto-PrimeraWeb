-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-01-2021 a las 22:37:53
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecommerce1`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf32_spanish2_ci NOT NULL,
  `eliminado` tinyint(1) NOT NULL DEFAULT 0,
  `tsCreate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tsUpdate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `descripcion`, `eliminado`, `tsCreate`, `tsUpdate`) VALUES
(19, 'Electrodomésticos', 0, '2021-01-03 21:19:11', NULL),
(20, 'Informática', 0, '2021-01-03 21:19:25', NULL),
(21, 'Camping', 0, '2021-01-03 21:19:51', NULL),
(22, 'Alimentos', 0, '2021-01-03 21:20:09', NULL),
(23, 'Deportes', 0, '2021-01-03 21:21:01', NULL),
(24, 'Juguetes', 0, '2021-01-03 21:21:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineapedido`
--

CREATE TABLE `lineapedido` (
  `idLineaPedido` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` timestamp NULL DEFAULT NULL,
  `fechaEnvio` date DEFAULT NULL,
  `direccionEnvio` varchar(50) COLLATE utf32_spanish2_ci DEFAULT NULL,
  `factura` varchar(50) COLLATE utf32_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`idPedido`, `idUsuario`, `fecha`, `fechaEnvio`, `direccionEnvio`, `factura`) VALUES
(4, 18, NULL, NULL, NULL, NULL),
(5, 19, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `idPersona` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf32_spanish2_ci NOT NULL,
  `apellido` varchar(45) COLLATE utf32_spanish2_ci NOT NULL,
  `sexo` varchar(6) COLLATE utf32_spanish2_ci NOT NULL,
  `fechaNacimiento` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`idPersona`, `nombre`, `apellido`, `sexo`, `fechaNacimiento`) VALUES
(48, 'Juan', 'Perez', 'Hombre', '1999-04-09'),
(49, 'Lucia', 'Perez', 'Mujer', '1998-08-06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preciosproducto`
--

CREATE TABLE `preciosproducto` (
  `idPrecio` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `valor` decimal(10,0) NOT NULL,
  `desde` timestamp NOT NULL DEFAULT current_timestamp(),
  `hasta` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `preciosproducto`
--

INSERT INTO `preciosproducto` (`idPrecio`, `idProducto`, `valor`, `desde`, `hasta`) VALUES
(17, 18, '4000', '2021-01-03 21:22:06', NULL),
(18, 19, '10000', '2021-01-03 21:23:01', NULL),
(19, 20, '100000', '2021-01-03 21:24:04', NULL),
(20, 21, '75000', '2021-01-03 21:25:54', NULL),
(21, 22, '50000', '2021-01-03 21:26:44', NULL),
(22, 23, '25000', '2021-01-03 21:27:43', NULL),
(23, 24, '7000', '2021-01-03 21:28:44', NULL),
(24, 25, '8000', '2021-01-03 21:29:40', NULL),
(25, 26, '200', '2021-01-03 21:30:54', NULL),
(26, 27, '100', '2021-01-03 21:31:36', NULL),
(27, 28, '5000', '2021-01-03 21:32:29', NULL),
(28, 29, '2500', '2021-01-03 21:33:44', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `descripcion` varchar(50) COLLATE utf32_spanish2_ci NOT NULL,
  `imagen` varchar(60) COLLATE utf32_spanish2_ci NOT NULL,
  `stock` int(11) NOT NULL,
  `eliminado` tinyint(1) NOT NULL DEFAULT 0,
  `tsCreate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tsUpdate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProducto`, `idCategoria`, `descripcion`, `imagen`, `stock`, `eliminado`, `tsCreate`, `tsUpdate`) VALUES
(18, 21, 'Heladera Helatodo', 'ffa5ee1e-758b-4f45-bbae-15fa85871644.jpeg', 10, 0, '2021-01-03 21:22:06', NULL),
(19, 21, 'Carpa', '4a39e97a-70d8-44e1-84af-7aa36baa769e.jpeg', 5, 0, '2021-01-03 21:23:01', NULL),
(20, 20, 'Iphone 8 Plus', '8e5c3be0-38c9-4de3-a09a-2bf4543e079d.jpeg', 15, 0, '2021-01-03 21:24:04', NULL),
(21, 20, 'Xiaomi Mi 9T', '33ae57f0-0588-4f39-ad63-c3f6431f31de.jpeg', 20, 0, '2021-01-03 21:25:54', NULL),
(22, 19, 'Heladera Patrick', '12d61004-c396-4f39-87cc-732f8f06bbac.jpeg', 7, 0, '2021-01-03 21:26:44', NULL),
(23, 19, 'Microondas Atma', '92cabd99-2c08-48cc-986a-5b29797606fc.jpeg', 10, 0, '2021-01-03 21:27:43', NULL),
(24, 24, 'Barbie multicolor', 'b84fbe06-e489-48bb-bba4-dfa54af20937.jpeg', 9, 0, '2021-01-03 21:28:44', NULL),
(25, 24, 'Max Steel', 'fcd7b3eb-6628-4bfc-a8ca-0b6c65f3a023.jpeg', 11, 0, '2021-01-03 21:29:40', NULL),
(26, 22, 'Cindor', '9fbbdffd-79c8-4c96-89d6-123bc327a949.jpeg', 11, 0, '2021-01-03 21:30:54', NULL),
(27, 22, 'Galletitas Oreo', '848a9b04-1284-4843-8482-a94d2826431e.jpeg', 11, 0, '2021-01-03 21:31:36', NULL),
(28, 23, 'Pelota de fútbol', 'df5d1b96-1966-4c2e-a514-5bb3bd4faec1.jpeg', 20, 0, '2021-01-03 21:32:29', NULL),
(29, 23, 'Pelota de vóley', '8f2e9995-e3cc-4bcc-a052-5a9b57665cd7.jpeg', 25, 0, '2021-01-03 21:33:44', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL,
  `idPersona` int(11) NOT NULL,
  `nombreUsuario` varchar(15) COLLATE utf32_spanish2_ci NOT NULL,
  `mail` varchar(45) COLLATE utf32_spanish2_ci NOT NULL,
  `password` varchar(45) COLLATE utf32_spanish2_ci NOT NULL,
  `telefono` int(45) NOT NULL,
  `habilitado` tinyint(1) NOT NULL DEFAULT 0,
  `eliminado` tinyint(1) NOT NULL DEFAULT 0,
  `admin` tinyint(1) NOT NULL DEFAULT 0,
  `confirmacionCorreo` varchar(50) COLLATE utf32_spanish2_ci NOT NULL,
  `tsCreate` timestamp NOT NULL DEFAULT current_timestamp(),
  `tsUpdate` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_spanish2_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `idPersona`, `nombreUsuario`, `mail`, `password`, `telefono`, `habilitado`, `eliminado`, `admin`, `confirmacionCorreo`, `tsCreate`, `tsUpdate`) VALUES
(18, 48, 'admin', 'juanpe@hotmail.com', '99800b85d3383e3a2fb45eb7d0066a4879a9dad0', 964564564, 1, 0, 1, '6311df24-921e-4ebf-b1a4-446b5952c2e8', '2020-12-26 04:08:18', '2021-01-03 21:16:56'),
(19, 49, 'user', 'luliperez@hotmail.com', '99800b85d3383e3a2fb45eb7d0066a4879a9dad0', 54, 1, 0, 0, 'd6d725ed-cb4a-45e1-9087-72038e55dcbe', '2020-12-29 23:13:43', '2021-01-03 21:16:59');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD PRIMARY KEY (`idLineaPedido`),
  ADD KEY `idProducto` (`idProducto`),
  ADD KEY `idPedido` (`idPedido`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idPedido`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`idPersona`);

--
-- Indices de la tabla `preciosproducto`
--
ALTER TABLE `preciosproducto`
  ADD PRIMARY KEY (`idPrecio`),
  ADD KEY `idProducto` (`idProducto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  ADD KEY `idPersona` (`idPersona`),
  ADD KEY `mail` (`mail`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  MODIFY `idLineaPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idPedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `idPersona` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de la tabla `preciosproducto`
--
ALTER TABLE `preciosproducto`
  MODIFY `idPrecio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProducto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lineapedido`
--
ALTER TABLE `lineapedido`
  ADD CONSTRAINT `lineapedido_ibfk_2` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`),
  ADD CONSTRAINT `lineapedido_ibfk_3` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`);

--
-- Filtros para la tabla `preciosproducto`
--
ALTER TABLE `preciosproducto`
  ADD CONSTRAINT `preciosproducto_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idPersona`) REFERENCES `personas` (`idPersona`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

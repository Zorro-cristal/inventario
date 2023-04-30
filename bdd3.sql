ALTER TABLE Usuarios ADD nro_venta INT(7) DEFAULT 0;
ALTER TABLE Usuarios ADD establecimiento INT(3);
ALTER TABLE Usuarios ADD punto_expedicion INT(3);
ALTER TABLE Productos ADD iva VARCHAR(4);

-- Extrae el ultimo valor de venta registrado antteriormente, le suma 1 y actualiza
/* CREATE OR REPLACE TRIGGER autoincrement_nroVenta AFTER INSERT ON ventas BEGIN
	SET nro= (SELECT COUNT(id) FROM ventas) + 1;
	SET ult_id= (SELECT MAX(id) FROM ventas) + 0;
	UPDATE ventas SET nro_venta= nro WHERE id= ult_id;
END; */

CREATE TABLE Timbrados (
	id INT(9) AUTO_INCREMENT,
	cod INT(8) NOT NULL,
	fech_autorizacion DATE NOT NULL,
	fech_vencimiento DATE NOT NULL,
	PRIMARY KEY (id)
);

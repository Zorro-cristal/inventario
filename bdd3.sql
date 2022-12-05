ALTER TABLE usuarios ADD nro_venta INT(7) DEFAULT 0;
ALTER TABLE usuarios ADD establecimiento INT(3);
ALTER TABLE usuarios ADD punto_expedicion INT(3);
ALTER TABLE productos ADD iva VARCHAR(4);

CREATE TRIGGER autoincrement_nroVenta AFTER INSERT ON ventas BEGIN
	SET nro= (SELECT COUNT(id) FROM ventas) + 1;
	SET ult_id= (SELECT MAX(id) FROM ventas) + 0;
	UPDATE ventas SET nro_venta= nro WHERE id= ult_id;
END;

CREATE TABLE timbrados (
	id INT(9) AUTO_INCREMENT,
	cod INT(8) NOT NULL,
	fech_autorizacion DATE NOT NULL,
	fech_vencimiento DATE NOT NULL,
	PRIMARY KEY (id)
);

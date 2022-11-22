CREATE TABLE usuarios (
	alias VARCHAR(50) NOT NULL,
	contra BLOB,
	rol_id INT (9) NOT NULL,
	PRIMARY KEY (alias)
);

CREATE TABLE roles (
	id INT(9) AUTO_INCREMENT,
	nombre VARCHAR(20),
	PRIMARY KEY (id)
);

ALTER TABLE usuarios ADD FOREIGN KEY (rol_id) REFERENCES roles(id);

INSERT INTO roles(nombre) VALUES ("administrador");

INSERT INTO usuarios(alias, contra, rol_id) VALUES ("zorro-cristal", AES_ENCRYPT("zorro-cristal", "inventario"), 1);

INSERT INTO roles(nombre) VALUES ("empleado");

INSERT INTO usuarios(alias, contra, rol_id) VALUES ("empleado", AES_ENCRYPT("empleado", "inventario"), 2);`usuarios`
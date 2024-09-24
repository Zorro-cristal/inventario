CREATE TABLE Usuarios (
	alias VARCHAR(25) NOT NULL,
	nombre VARCHAR(25) NOT NULL,
	apellido VARCHAR(25) NOT NULL,
	contra BLOB,
	rol_id INT (9) NOT NULL,
	PRIMARY KEY (alias)
);

CREATE TABLE Roles (
	id INT(9) AUTO_INCREMENT,
	nombre VARCHAR(20),
	PRIMARY KEY (id)
);

ALTER TABLE usuarios 
	ADD FOREIGN KEY (rol_id) REFERENCES Roles(id);

-- Vinculamos los usuarios con la salida y entrada de productos
ALTER TABLE Ventas
	add column responsable varchar(25);

ALTER TABLE Ventas 
	add foreign key (responsable) references Usuarios(alias);

ALTER TABLE Ingresos_productos
	add column responsable varchar(25);

ALTER TABLE Ingresos_productos 
	add foreign key (responsable) references Usuarios(alias);

-- Usuarios de prueba
INSERT INTO roles(nombre) VALUES ("administrador");

INSERT INTO usuarios(alias, nombre, apellido, contra, rol_id) VALUES ("admin", "Admin", "Istrador", AES_ENCRYPT("admin", "inventario"), 1);

INSERT INTO roles(nombre) VALUES ("empleado");

INSERT INTO usuarios(alias, nombre, apellido, contra, rol_id) VALUES ("empleado", "empleado", "empleado", AES_ENCRYPT("empleado", "inventario"), 2);

INSERT INTO roles(nombre) VALUES ("gerente");

INSERT INTO usuarios(alias, nombre, apellido, contra, rol_id) VALUES ("gerente", "gerente", "gerente", AES_ENCRYPT("gerente", "inventario"), 2);
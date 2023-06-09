create database inventario;
use inventario;

--Creamos las tablas
create table Proveedores (
    id          int(10)     NOT NULL AUTO_INCREMENT ,
    nombre      varchar(25) NOT NULL                ,
    telefono    int(10)                             ,
    PRIMARY KEY (id)
);

create table Ingresos_productos (
    id              int(10)         NOT NULL AUTO_INCREMENT ,
    proveedor_fk    int(10)         NOT NULL                ,
    producto_fk     int(10)         NOT NULL                ,
    fecha_ingreso   date            DEFAULT(CURRENT_DATE)   ,
    cantidad        int(7)          NOT NULL                ,
    precio_unitario decimal(17,2)   NOT NULL                ,
    PRIMARY KEY (id)
);

create table Productos (
    id              int(10)         NOT NULL AUTO_INCREMENT ,
    nombre          varchar(25)     NOT NULL                ,
    descripcion     varchar(100)                            ,
    stock           int(7)          NOT NULL                ,
    precio_venta    decimal(17,2)                           ,
    PRIMARY KEY (id)
);

create table Detalle_ventas (
    id          int(10)         NOT NULL AUTO_INCREMENT     ,
    producto_fk int(10)         NOT NULL                    ,
    venta_fk    int(10)         NOT NULL                    ,
    cantidad    int(7)          NOT NULL                    ,
    descuento   decimal(17,2)   DEFAULT 0                   ,
    precio_venta   decimal(17,2)   DEFAULT 0                   ,
    PRIMARY KEY (id)
);

create table Ventas (
    id              int(10)     NOT NULL AUTO_INCREMENT ,
    cliente_fk      int(9)      NOT NULL                ,
    numero_factura  varchar(16)                         ,
    fecha           date        DEFAULT(CURRENT_DATE)   ,
    PRIMARY KEY (id)
);

create table Clientes (
    cedula              int(9)          NOT NULL    ,
    nombre              varchar(25)     NOT NULL    ,
    apellido            varchar(25)     NOT NULL    ,
    ruc                 int(2)                      ,
    telefono            int(12)                     ,
    direccion           varchar(100)                ,
    fecha_nacimiento    date                        ,
    deuda               decimal(17,2)   DEFAULT 0   ,
    PRIMARY KEY (cedula)
);

--Relacionamos las tablas
alter table Ingresos_productos
    add foreign key (proveedor_fk) references Proveedores(id);

alter table Ingresos_productos
    add foreign key (producto_fk) references Productos(id);

alter table Detalle_ventas
    add foreign key (producto_fk) references Productos(id);

alter table Detalle_ventas
    add foreign key (venta_fk) references Ventas(id);

alter table Ventas
    add foreign key (cliente_fk) references Clientes(cedula);

--Sentencia para el segundo parcial
SELECT P.nombre, Aux.inversion, Aux.recuperado, 
	CASE 
		WHEN (Aux.inversion - Aux.recuperado) > 0 THEN Aux.inversion - Aux.recuperado
		ELSE 0
	END AS ganancia
	, P.precio_venta, P.stock
	FROM productos AS P NATURAL JOIN (
		SELECT Pr.id AS id, SUM(IP.cantidad * IP.precio_unitario) AS inversion, SUM((DV.cantidad * DV.precio_venta) - DV.descuento) AS recuperado, SUM(IP.cantidad * IP.precio_unitario) - SUM((DV.cantidad * DV.precio_venta) - DV.descuento) AS ganancia
			FROM ingresos_productos AS IP 
				JOIN productos AS Pr ON Pr.id = IP.producto_fk 
				JOIN detalle_ventas AS DV ON DV.producto_fk= Pr.id
	) AS Aux;
	
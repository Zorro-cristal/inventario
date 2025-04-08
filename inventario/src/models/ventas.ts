export interface ventas {
    id_ventas: number;
    cedula: number;
    nro_factura: number;
    fecha_venta : Date | null;
}

export interface detalles_venta {
    id_detallesVentas : number;
    id_productoFK : number;
    id_ventaFK : number;
    cantidad : number;
    descuento : number;
}
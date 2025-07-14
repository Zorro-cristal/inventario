import { Producto } from "./productos";

export interface Transacciones {
    id_ventas: number;
    estado : bigint
    cedula: number;
    tipo: bigint;
    nro_factura: number;
    fecha_venta : Date | null;
    detalles_ventas : Detalles_transacciones[]
}

export interface Detalles_transacciones {
    id_detallesVentas : number;
    producto : Producto;
    transaccion : Transacciones;
    cantidad : number;
    precio: number;
    descuento : number;
}
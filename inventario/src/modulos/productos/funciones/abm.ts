import { ChangeEvent } from "react";
import { Producto } from "../../../models/productos";

export function guardarproducto(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando producto", evento);
    return false;
}

export async function obtener_producto(id: number): Promise<Producto> {
    return {
        id_producto : id,
        nombre_producto : "",
        descripcion_producto : "",
        cantidad_disponible : 0,
        precio_venta : 0
    };
}

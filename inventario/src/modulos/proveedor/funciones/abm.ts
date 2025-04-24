import { ChangeEvent } from "react";
import { Proveedor } from "../../../models/proveedor";

export function guardarProveedor(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando proveedor", evento);
    return false;
}

export async function obtenerProveedor(id: number): Promise<Proveedor> {
    return {
        id_proveedor: id,
        nombre: "",
        telefono: "",
        direccion: "",
        ruc: ""
    };
}
import { ChangeEvent } from "react";

export function guardarProveedor(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando proveedor", evento);
    return false;
}
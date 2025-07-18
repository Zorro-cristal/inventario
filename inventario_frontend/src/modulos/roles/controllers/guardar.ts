import { ChangeEvent } from "react";

export function guardarRol(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando cliente", evento);
    return false;
}
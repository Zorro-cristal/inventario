import { ChangeEvent } from "react";

export function guardarUsuario(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando usuario", evento);
    return false;
}
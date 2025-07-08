import { ChangeEvent } from "react";

export default function guardarPermiso(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando permiso", evento);
    return false;
}
import { ChangeEvent } from "react";

export default function guardarCliente(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando cliente", evento);
    return false;
}
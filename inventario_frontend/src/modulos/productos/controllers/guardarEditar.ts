import { ChangeEvent } from "react";

export function guardarproducto(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando producto", evento);
    return false;
}

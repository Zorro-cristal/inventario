import { ChangeEvent } from "react";
import { Usuario } from "../../../models/usuarios";

export function guardarUsuario(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando usuario", evento);
    return false;
}

export async function obtenerUsuario(id: string): Promise<Usuario> {
    return {
        alias: id,
        id_roleFK: 1,
        contra: ""
    };
}
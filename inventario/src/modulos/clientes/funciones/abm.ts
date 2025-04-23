import { ChangeEvent } from "react";
import { cliente } from "../../../models/clientes";

export function buscarCliente(cedula= 0): Promise<cliente> {
    let cliente: cliente;
    if (cedula != 0) {
        cliente= {
            cedula : 360067,
            isEmpresa : false,
            nombres : 'Luis Alejandro',
            apellidos : 'Alvarez',
            ruc : 0,
            deuda : 0
        }
    }
    return new Promise((resolve) => {
        resolve(cliente);
    });
}

export function guardarCliente(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando cliente", evento);
    return false;
}
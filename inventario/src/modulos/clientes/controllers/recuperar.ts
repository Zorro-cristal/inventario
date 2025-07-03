import { Cliente } from "../../../models/clientes";

export function recuperarClientes(filtros: {clave: string, valor: string | number}[] | undefined= undefined): Cliente[] {
    let clientes: Cliente[] = [];
    const resultados= [
        {
            cedula: 12345678,
            nombres: 'Juan',
            apellidos: 'Pérez',
            isEmpresa: false,
            razon_social: null,
            nombre_empresa: null,
            ruc: 1234567890,
            deuda: 0,
        },
        {
            cedula: 87654321,
            nombres: 'María',
            apellidos: 'Gómez',
            isEmpresa: false,
            razon_social: null,
            nombre_empresa: null,
            ruc: 9876543210,
            deuda: 1000,
        }
    ];

    resultados.forEach((p) => {
        const client: Cliente= p;
        clientes.push(client);
    });

    return clientes;
}
import { Cliente } from "../../../models/clientes";

export default function recuperarClientes(filtros: [string, string | number][] | undefined= undefined): Promise<Cliente[]> {
    let clientes: Cliente[] = [];
    const resultados: Cliente[]= [
        {
            id: 1,
            isEmpresa: false,
            deuda: 0,
            direccion: "Calle1",
            telefono: "59598310916",
            ciudad: "Villarrica",
            pais: "PY",
            estado: "activo",
            persona: {
                nombres: "Alejandro",
                apellidos: "Alvarez",
                ci: 4360067,
                ruc: 0
            },
            empresa: {
                id: 1,
                nombre: "empresa",
                razon_social: "empresa S.A.",
                ruc: "43600067-1"
            }
        },
        {
            id: 2,
            isEmpresa: false,
            deuda: 0,
            direccion: "Calle1",
            telefono: "59598310916",
            ciudad: "Villarrica",
            pais: "PY",
            estado: "activo",
            persona: {
                nombres: "Alejandro",
                apellidos: "Alvarez",
                ci: 4360067,
                ruc: 0
            },
            empresa: {
                id: 1,
                nombre: "empresa",
                razon_social: "empresa S.A.",
                ruc: "43600067-1"
            }
        },
    ];

    resultados.forEach((p) => {
        const client: Cliente= p;
        clientes.push(client);
    });

    return new Promise((resolve) => {
        resolve(clientes);
    });
}
import { Proveedor } from "../../../models/proveedor";

export function recuperarProveedores(filtros: {clave: string, valor: string | number}[] | undefined= undefined): Proveedor[] {
    let proveedores: Proveedor[] = [];
    const resultados= [
        {
            id_proveedor: 1,
            nombre: 'Proveedor 1',
            telefono: '123456789',
            direccion: 'Dirección del proveedor 1',
            ruc: '1234567890',
        },
        {
            id_proveedor: 2,
            nombre: 'Proveedor 2',
            telefono: '987654321',
            direccion: 'Dirección del proveedor 2',
            ruc: '0987654321',
        }
    ];

    resultados.forEach((p) => {
        const prov: Proveedor= p;
        proveedores.push(prov);
    });

    return proveedores;
}
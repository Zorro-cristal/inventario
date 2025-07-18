import { Permiso } from "../../../models/usuarios";

export function recuperarPermiso(filtros: [string, string | number][] | undefined= undefined): Promise<Permiso[]> {
    let permisos: Permiso[] = [];
    const resultados: Permiso[]= [
        {
            id_permiso: 1,
            nombre: 'administrador',
            estado: 'Activo',
            id_roleFK : 1
        },
        {
            id_permiso: 2,
            nombre: 'gerente',
            estado: 'Activo',
            id_roleFK : 1
        },
        {
            id_permiso: 3,
            nombre: 'vendedor',
            estado: 'Activo',
            id_roleFK : 2
        },
    ];

    resultados.forEach((p) => {
        const per: Permiso= p;
        permisos.push(per);
    });
    
    return new Promise((resolve) => {
        resolve(permisos);
    });
}
import { Permiso } from "../../../models/usuarios";

export function recuperarPermiso(filtros: [string, string | number][] | undefined= undefined): Promise<Permiso[]> {
    let permisos: Permiso[] = [];
    const resultados= [
        {
            id_permiso: 1,
            nombre: 'administrador',
            id_roleFK : 0
        },
        {
            id_permiso: 1,
            nombre: 'gerente',
            id_roleFK : 0
        },
        {
            id_permiso: 1,
            nombre: 'vendedor',
            id_roleFK : 0
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
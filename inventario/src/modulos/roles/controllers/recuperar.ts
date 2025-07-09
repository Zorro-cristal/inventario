import { Rol } from "../../../models/usuarios";

export function recuperarRoles(filtros: [string, string | number][] | undefined= undefined): Promise<Rol[]> {
    let roles: Rol[] = [];
    const resultados= [
        {
            id_role: 1,
            nombre: 'administrador'
        },
        {
            id_role: 1,
            nombre: 'gerente'
        },
        {
            id_role: 1,
            nombre: 'vendedor'
        },
    ];

    resultados.forEach((r) => {
        const rol: Rol= r;
        roles.push(rol);
    });
    
    return new Promise((resolve) => {
        resolve(roles);
    });
}
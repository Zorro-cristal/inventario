import { Rol } from "../../../models/usuarios";

export function recuperarRoles(filtros: [string, string | number][] | undefined= undefined): Promise<Rol[]> {
    let roles: Rol[] = [];
    const resultados= [
        {
            id_role: 1,
            nombre: 'administrador',
            estado: 'activo',
            permisos: [
                {
                    id_permiso: 1,
                    nombre: "editarCliente",
                    estado: 'Activo'
                },
                {
                    id_permiso: 2,
                    nombre: "listarCliente",
                    estado: 'Activo'
                }
            ]
        },
        {
            id_role: 2,
            nombre: 'gerente',
            estado: 'activo',
            descripcion: 'Gerente de la empresa',
        },
        {
            id_role: 3,
            nombre: 'vendedor',
            estado: 'activo',
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
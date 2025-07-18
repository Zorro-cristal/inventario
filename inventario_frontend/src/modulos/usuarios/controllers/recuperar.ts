import { Usuario } from "../../../models/usuarios";

export function recuperarUsuarios(filtros: [string, string | number][] | undefined= undefined): Promise<Usuario[]> {
    let usuarios: Usuario[] = [];
    const resultados= [
        {
            alias: 'Zorro-cristal',
            rol: {
                id: 1,
                nombre: "Administrador",
                estado: 'Activo'
            },
            contra: ""
        },
        {
            alias: 'Otro-cristal',
            rol: {
                id: 1,
                nombre: "Administrador",
                estado: 'Activo'
            },
            contra: ""
        },
    ];

    resultados.forEach((u) => {
        const usu: Usuario= u;
        usuarios.push(usu);
    });

    return new Promise((resolve) => {
        resolve(usuarios);
    });
}
import { Usuario } from "../../../models/usuarios";

export function recuperarUsuarios(filtros: [string, string | number][] | undefined= undefined): Promise<Usuario[]> {
    let usuarios: Usuario[] = [];
    const resultados= [
        {
            alias: 'Zorro-cristal',
            id_roleFK: 1,
            contra: ""
        },
        {
            alias: 'Otro-cristal',
            id_roleFK: 2,
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
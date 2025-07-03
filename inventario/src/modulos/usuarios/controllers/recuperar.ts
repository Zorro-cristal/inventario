import { Usuario } from "../../../models/usuarios";

export function recuperarUsuarios(filtros: {clave: string, valor: string | number}[] | undefined= undefined): Usuario[] {
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

    return usuarios;
}
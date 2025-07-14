import { camposForm } from "../views/Formulario";

export interface Usuario {
    alias : string;
    id_roleFK : number;
    estado : bigint
    contra : string;
    rol?: Rol
};

export const camposUsuario: Array<camposForm>= [
    {id: "alias", requerido: true, ayuda: "nombre de usuario que debe ser unico", tipo: "text", abrirDialog: null},
    {id: "id_roleFK", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
    {id: "contra", requerido: true, ayuda: "", tipo: "password", abrirDialog: null},
    {id: "contra2", requerido: true, ayuda: "", tipo: "password", abrirDialog: null}
];

export interface Rol {
    id_role : number;
    nombre : string;
    estado : bigint
    permisos: Permiso[];
};

export const camposRol: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
];

export interface Permiso {
    id_permiso : number;
    nombre : string;
    estado : bigint
    id_roleFK : number;
};

export const camposPermiso: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "id_roleFK", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
];

export interface Modulo {
    id: number;
    nombre: string;
}
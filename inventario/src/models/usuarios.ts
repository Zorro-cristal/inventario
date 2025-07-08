import { camposForm } from "../views/Formulario";

export interface Usuario {
    alias : string;
    id_roleFK : number;
    contra : string;
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
};

export const camposRol: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
];

export interface Permiso {
    id_permiso : number;
    nombre : string;
    id_roleFK : number;
};

export const camposPermiso: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "id_roleFK", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
];
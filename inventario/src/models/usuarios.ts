import { camposForm } from "../views/Formulario";

export interface Usuario {
    alias : string;
    contra : string;
    estado : 'Activo' | 'Inactivo';
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
    descricion?: string;
    estado : 'Activo' | 'Inactivo';
    permisos?: Permiso[];
};

export const camposRol: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "descripcion", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "estado", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
];

export interface Permiso {
    id_permiso : number;
    nombre : string;
    estado : 'Activo' | 'Inactivo';
    descricion?: string;
    id_roleFK? : number;
};

export const camposPermiso: Array<camposForm>= [
    {id: "id_role", requerido: true, ayuda: "", tipo:"number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "id_roleFK", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
    {id: "descripcion", requerido: true, ayuda: "", tipo:"text", abrirDialog: null},
    {id: "estado", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
];

export interface Modulo {
    id: number;
    nombre: string;
}
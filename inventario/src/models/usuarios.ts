import { camposForm } from "../views/Formulario";

export interface Usuario {
    alias : string;
    id_roleFK : number;
    contra : string;
}

export interface Roles {
    id_role : number;
    descripcion : Roles;
}

export const camposUsuario: Array<camposForm>= [
    {id: "alias", requerido: true, ayuda: "nombre de usuario que debe ser unico", tipo: "text", abrirDialog: null},
    {id: "id_roleFK", requerido: true, ayuda: "", tipo:"select", abrirDialog: null},
    {id: "contra", requerido: true, ayuda: "", tipo: "password", abrirDialog: null},
    {id: "contra2", requerido: true, ayuda: "", tipo: "password", abrirDialog: null}
];
export interface Usuario {
    alias : string;
    id_roleFK : number;
    contra : string;
}

export interface Roles {
    id_role : number;
    descripcion : Roles;
}
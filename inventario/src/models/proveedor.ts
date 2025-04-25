import { camposForm } from "../views/Formulario";

export interface Proveedor{
    id_proveedor : number;
    nombre : string;
    telefono? : string;
    direccion? : string;
    ruc : string;
}

export const camposProveedor: Array<camposForm>= [
    {id: "id_proveedor", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "telefono", requerido: false, ayuda: "", tipo: "tel", abrirDialog: null},
    {id: "direccion", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "ruc", requerido: true, ayuda: "", tipo: "text", abrirDialog: null}
];
import { camposForm } from "../views/Formulario";

export interface Cliente {
    cedula : number;
    isEmpresa : boolean;
    nombres? : string | null;
    apellidos? : string | null;
    razon_social? : string | null;
    nombre_empresa? : string | null;
    ruc : number;
    direccion?: string | null;
    fecha_nacimiento? : Date | string | null;
    deuda : number;
}

export const camposCliente: Array<camposForm>= [
    {id: "cedula", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "isEmpresa", requerido: true, ayuda: "", tipo: "checkbox", abrirDialog: null},
    {id: "nombres", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "apellidos", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "razon_social", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "nombre_empresa", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "ruc", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "direccion", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "fecha_nacimiento", requerido: false, ayuda: "", tipo: "date", abrirDialog: null},
    {id: "deuda", requerido: true, ayuda: "", tipo: "number", abrirDialog: null}
];
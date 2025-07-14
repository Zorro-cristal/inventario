import { camposForm } from "../views/Formulario";

export interface Persona {
    nombres : string;
    apellidos : string;
    ci: number;
    ruc: number;
    fecha_nacimiento? : Date | string;
}

export interface Empresa {
  id: number;
  nombre: string;
  razon_social: string;
  ruc: string;
}

export interface Cliente {
  id: number;
  deuda: number;
  isEmpresa: boolean;
  empresa?: Empresa;
  persona?: Persona;
  direccion: string;
  telefono: string;
  ciudad: string;
  pais: string;
  estado: 'activo' | 'inactivo';
}

export const camposCliente: Array<camposForm>= [
    {id: "cedula/ruc", requerido: true, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "isEmpresa", requerido: true, ayuda: "", tipo: "checkbox", abrirDialog: null},
    {id: "nombres", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "apellidos", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "razon_social", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "nombre_empresa", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "ruc", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "ciudad", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "direccion", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "telefono", requerido: false, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "fecha_nacimiento", requerido: false, ayuda: "", tipo: "date", abrirDialog: null},
    {id: "deuda", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "estado", requerido: true, ayuda: "", tipo: "select", abrirDialog: null}
];
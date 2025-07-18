import { camposForm } from "../views/Formulario";

export interface Categoria {
    id : number;
    nombre : string;
}

export interface Producto {
    id_producto : number;
    nombre_producto : string;
    descripcion_producto : string | null;
    cantidad_disponible : number;
    categoria? : Categoria;
    estado : 'activo' | 'inactivo' | 'dañado';
    iva: number;
}

export interface Precios {
    id: number;
    precio: number;
    cant_pagos: number;
    id_productoFK: number;
}

export interface ingresos_productos {
    id_ingresosProductos: number;
    id_proveedorFK: number;
    id_productoFK: number;
    fecha_ingreso: Date | string;
    cantidad : number;
    precio_unitario_compra: number;
}

export const camposProducto: Array<camposForm>= [
    {id: "id", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "nombre", requerido: true, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "descripcion", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "cantidad_disponible", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "iva", requerido: true, ayuda: "", tipo: "select", abrirDialog: null},
    {id: "estado", requerido: true, ayuda: "", tipo: "select", abrirDialog: null},
    {id: "categoria", requerido: true, ayuda: "", tipo: "tabla", abrirDialog: null}
]

export const camposPrecios: Array<camposForm>= [
    {id: "id", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "id_productoFK", requerido: true, ayuda: "", tipo: "hidden", abrirDialog: null},
    {id: "cantidad_pagos", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "precio", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
]
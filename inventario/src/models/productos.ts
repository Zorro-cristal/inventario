import { camposForm } from "../views/Formulario";

export interface Producto {
    id_producto : number;
    nombre_producto : string;
    descripcion_producto : string | null;
    cantidad_disponible : number;
    precio_venta : number;
    iva: number;
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
    {id: "id_producto", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "nombre_producto", requerido: true, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "descripcion_producto", requerido: false, ayuda: "", tipo: "text", abrirDialog: null},
    {id: "cantidad_disponible", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "precio_venta", requerido: true, ayuda: "", tipo: "number", abrirDialog: null},
    {id: "iva", requerido: true, ayuda: "", tipo: "select", abrirDialog: null}
]
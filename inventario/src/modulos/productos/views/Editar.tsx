import { Paper } from "@mui/material";
import { camposProducto, Producto } from "../../../models/productos";
import { Formulario } from "../../../views/Formulario";
import { ChangeEvent } from "react";

function guardarproducto(evento: ChangeEvent<HTMLInputElement>): boolean {
    evento.preventDefault();
    console.log("Guardando producto", evento);
    return false;
}

export default function EditarProducto({id_producto}: {id_producto: number}) {
    let producto: Producto= {
        id_producto : 0,
        nombre_producto : "",
        descripcion_producto : "",
        cantidad_disponible : 0,
        precio_venta : 0
    };
    let titulo= "";

    if (id_producto != 0) {
        producto = {
            id_producto : 0,
            nombre_producto : "",
            descripcion_producto : "",
            cantidad_disponible : 0,
            precio_venta : 0
        };
        titulo= "Agregar nuevo producto"
    } else {
        titulo= "Modificar el producto"
    }

    return (<Paper elevation={3}>
        <h1>{titulo}</h1>
        <Formulario valores={producto} campos={camposProducto} funcionSubmit= {guardarproducto}/>
    </Paper>);
}
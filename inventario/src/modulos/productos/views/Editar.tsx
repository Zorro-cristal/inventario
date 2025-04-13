import { Paper } from "@mui/material";
import { camposProducto, Producto } from "../../../models/productos";
import { Formulario } from "../../../views/Formulario";
import { useParams } from "react-router";
import { guardarproducto, obtener_producto } from "../funciones/abm";

export default function EditarProducto() {
    const parametros = useParams();
    let producto: Producto= {
        id_producto : 0,
        nombre_producto : "",
        descripcion_producto : "",
        cantidad_disponible : 0,
        precio_venta : 0
    };
    let titulo= "";

    if (parametros.id != undefined && parseInt(parametros.id) != 0) {
        titulo= "Modificar el producto";
        producto= obtener_producto(parseInt(parametros.id));
    } else {
        producto = {
            id_producto : 0,
            nombre_producto : "",
            descripcion_producto : "",
            cantidad_disponible : 0,
            precio_venta : 0
        };
        titulo= "Agregar nuevo producto";
    }

    return (<Paper elevation={3}>
        <h1>{titulo}</h1>
        <Formulario valores={producto} campos={camposProducto} funcionSubmit= {guardarproducto}/>
    </Paper>);
}
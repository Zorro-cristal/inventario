import { Paper } from "@mui/material";
import { camposProducto, Producto } from "../../../models/productos";
import { Formulario } from "../../../views/Formulario";
import { useParams } from "react-router";
import { guardarproducto, obtener_producto } from "../funciones/abm";
import { useEffect, useState } from "react";
import Cargando from "../../../views/Cargando";

export default function EditarProducto() {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [producto, setProducto]= useState<Producto>({
        id_producto : 0,
        nombre_producto : "",
        descripcion_producto : "",
        cantidad_disponible : 0,
        precio_venta : 0
    });
    const [titulo, setTitulo]= useState("Agregar nuevo producto");

    useEffect(() => {
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            setTitulo("Modificar el producto");
            obtener_producto(parseInt(parametros.id)).then((data: Producto) => {
                setProducto(data);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{titulo}</h1>
            <Formulario valores={producto} campos={camposProducto} funcionSubmit={guardarproducto}/>
        </Paper>);
    } else {
        return (<Cargando />);
    }
}
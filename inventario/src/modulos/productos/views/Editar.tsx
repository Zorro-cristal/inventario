import { Paper } from "@mui/material";
import { camposProducto, Producto } from "../../../models/productos";
import { Formulario } from "../../../views/Formulario";
import { useParams } from "react-router";
import { guardarproducto, obtener_producto } from "../funciones/abm";
import { useEffect, useState } from "react";
import Cargando from "../../../views/Cargando";

export default function EditarProducto({setVista, id}: {setVista?: (value: boolean) => void, id?: number}) {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [producto, setProducto]= useState<Producto>({
        id_producto : 0,
        nombre_producto : "",
        descripcion_producto : "",
        cantidad_disponible : 0,
        precio_venta : 0,
        iva: 0
    });
    const [titulo, setTitulo]= useState("Agregar nuevo producto");

    useEffect(() => {
        let idProducto: number | undefined = undefined;
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idProducto= parseInt(parametros.id);
        } else if (id && id != 0) {
            idProducto= id;
        }

        if (idProducto) {
            setTitulo("Modificar el producto");
            obtener_producto(idProducto).then((data: Producto) => {
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
            <Formulario valores={producto} campos={camposProducto} funcionSubmit={guardarproducto} funcionVolver={() => {
                if (setVista) {
                    setVista(false);
                } else {
                    window.history.back();
                }
                }}/>
        </Paper>);
    } else {
        return (<Cargando />);
    }
}
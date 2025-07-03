import { useEffect, useState } from "react";
import { camposProveedor, Proveedor } from "../../../models/proveedor";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { guardarProveedor, obtenerProveedor } from "../funciones/abm";
import { useParams } from "react-router";

export default function EditarProveedor({setVista= undefined}: {setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado] = useState(true);
    const [proveedor, setProveedor] = useState<Proveedor>({
        id_proveedor: 0,
        nombre: "",
        telefono: "",
        direccion: "",
        ruc: ""
    });
    const [titulo, setTitulo] = useState("Agregar nuevo proveedor");

    useEffect(() => {
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            setTitulo("Modificar el proveedor");
            obtenerProveedor(parseInt(parametros.id)).then((data: Proveedor) => {
                setProveedor(data);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    }, []);

    if (cargado) {
        return (
            <div>
                <h1>{titulo}</h1>
                <Formulario valores={proveedor} campos={camposProveedor} funcionSubmit={guardarProveedor} funcionVolver={() => {
                    if (setVista) {
                        setVista(false);
                    } else {
                        window.history.back();
                    }
                    }}/>
            </div>
        );
    } else {
        return (<Cargando />);
    }
}
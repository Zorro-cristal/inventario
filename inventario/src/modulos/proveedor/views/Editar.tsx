import { useEffect, useState } from "react";
import { camposProveedor, Proveedor } from "../../../models/proveedor";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { guardarProveedor, obtenerProveedor } from "../funciones/abm";
import { useParams } from "react-router";

export default function EditarProveedor({setVista, id}: {setVista?: (value: boolean) => void, id?: number}) {
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
        let idProveedor: number | undefined= undefined;
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idProveedor= parseInt(parametros.id);
        } else if (id && id != 0) {
            idProveedor= id;
        }

        if (idProveedor) {
            setTitulo("Modificar el proveedor");
            obtenerProveedor(idProveedor).then((data: Proveedor[]) => {
                setProveedor(data[0]);
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
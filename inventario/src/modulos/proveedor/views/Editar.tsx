import { useEffect, useState } from "react";
import { camposProveedor, Proveedor } from "../../../models/proveedor";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { guardarProveedor, obtenerProveedor } from "../funciones/abm";

export default function EditarProveedor({id_proveedor}: {id_proveedor: number}) {
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
        if (id_proveedor != undefined && id_proveedor != 0) {
            setTitulo("Modificar el proveedor");
            obtenerProveedor(id_proveedor).then((data: Proveedor) => {
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
                <Formulario valores={proveedor} campos={camposProveedor} funcionSubmit={guardarProveedor} />
            </div>
        );
    } else {
        return (<Cargando />);
    }
}
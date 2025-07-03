import { useEffect, useState } from "react";
import { guardarUsuario, obtenerUsuario } from "../funciones/abm";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { camposUsuario, Usuario } from "../../../models/usuarios";
import { useParams } from "react-router";

export default function EditarUsuario({setVista= undefined}: {setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>({
        alias: "",
        id_roleFK: 0,
        contra: ""
    });
    const [titulo, setTitulo] = useState("Agregar nuevo usuario");

    useEffect(() => {
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            setTitulo("Modificar el usuario");
            obtenerUsuario(parametros.id).then((data: Usuario) => {
                setUsuario(data);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    });

    if (cargado) {
        return (<div>
            <h1>{titulo}</h1>
            <Formulario valores={usuario} campos={camposUsuario} funcionSubmit={guardarUsuario} funcionVolver={() => {
                if (setVista) {
                    setVista(false);
                } else {
                    window.history.back();
                }
                }}/>
        </div>);
    } else {
        return (<Cargando />)
    }
}
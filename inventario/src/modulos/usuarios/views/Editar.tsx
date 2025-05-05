import { useEffect, useState } from "react";
import { guardarUsuario, obtenerUsuario } from "../funciones/abm";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { camposUsuario, Usuario } from "../../../models/usuarios";

export default function EditarUsuario({id_usuario} : {id_usuario: string}) {
    const [cargado, setCargado] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>({
        alias: "",
        id_roleFK: 0,
        contra: ""
    });
    const [titulo, setTitulo] = useState("Agregar nuevo usuario");

    useEffect(() => {
        if (id_usuario != undefined && id_usuario.trim().length == 0) {
            setTitulo("Modificar el usuario");
            obtenerUsuario(id_usuario).then((data: Usuario) => {
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
            <Formulario valores={usuario} campos={camposUsuario} funcionSubmit={guardarUsuario} />
        </div>);
    } else {
        return (<Cargando />)
    }
}
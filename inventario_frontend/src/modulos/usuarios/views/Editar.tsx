import { useEffect, useState } from "react";
import { guardarUsuario } from "../controllers/guardarEditar";
import Cargando from "../../../views/Cargando";
import { Formulario, opcionesEstado } from "../../../views/Formulario";
import { camposUsuario, Usuario } from "../../../models/usuarios";
import { useParams } from "react-router";
import { recuperarUsuarios } from "../controllers/recuperar";

export default function EditarUsuario({setVista, id}: {setVista?: (value: boolean) => void, id?: string}) {
    const parametros = useParams();
    const [cargado, setCargado] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>({
        alias: "",
        contra: "",
        estado: 'Activo',
    });

    useEffect(() => {
        let idUsuario: string | undefined= undefined;
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idUsuario= parametros.id;
        } else if (id && id != "") {
            idUsuario= id;
        }

        if (idUsuario) {
            recuperarUsuarios([['id', idUsuario]]).then((data: Usuario[]) => {
                setUsuario(data[0]);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    });

    if (cargado) {
        return (<div>
            <h1>{usuario.alias === "" ? "Agregar nuevo usuario." : "Modificar el usuario."}</h1>
            <Formulario valores={usuario} campos={camposUsuario} opciones={{estado: opcionesEstado}} funcionSubmit={guardarUsuario} funcionVolver={() => {
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
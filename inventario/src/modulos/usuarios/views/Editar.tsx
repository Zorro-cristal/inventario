import { useEffect, useState } from "react";
import { guardarUsuario, obtenerUsuario } from "../controllers/guardarEditar";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";
import { camposUsuario, Usuario } from "../../../models/usuarios";
import { useParams } from "react-router";

export default function EditarUsuario({setVista, id}: {setVista?: (value: boolean) => void, id?: string}) {
    const parametros = useParams();
    const [cargado, setCargado] = useState(true);
    const [usuario, setUsuario] = useState<Usuario>({
        alias: "",
        id_roleFK: 0,
        contra: ""
    });
    const [titulo, setTitulo] = useState("Agregar nuevo usuario");

    useEffect(() => {
        let idUsuario: string | undefined= undefined;
        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idUsuario= parametros.id;
        } else if (id && id != "") {
            idUsuario= id;
        }

        if (idUsuario) {
            setTitulo("Modificar el usuario");
            obtenerUsuario(idUsuario).then((data: Usuario[]) => {
                setUsuario(data[0]);
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
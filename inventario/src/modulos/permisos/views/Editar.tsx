import { useEffect, useState } from "react";
import { camposPermiso, Permiso } from "../../../models/usuarios";
import { recuperarPermiso } from "../controllers/recuperar";
import guardarPermiso from "../controllers/guardarEditar";
import { Paper } from "@mui/material";
import { useParams } from "react-router";
import Cargando from "../../../views/Cargando";
import { Formulario } from "../../../views/Formulario";

export default function EditarPermiso({id, setVista}: {id?: number, setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [permiso, setPermiso]= useState<Permiso>({
        id_permiso: 0,
        nombre: "",
        id_roleFK: 0
    });
    const [camposFormPermiso, setCamposPermiso]= useState(camposPermiso);

    useEffect(() => {
        let camposForm= [...camposFormPermiso];
        let idPermiso: number | undefined= undefined;

        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idPermiso= parseInt(parametros.id);
        } else if(id != undefined && id != 0) {
            idPermiso= id;
        }

        if (idPermiso) {
            recuperarPermiso().then((data) => {
                setPermiso(data[0]);
                setCargado(true);
            });
        } else {
            setCargado(false);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{permiso.id_permiso != 0 ? "Modificar el permiso." : "Agregar nuevo permiso."}</h1>
            <Formulario valores={permiso} campos={camposFormPermiso} funcionSubmit={guardarPermiso} funcionVolver={() => {
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
import { useEffect, useState } from "react";
import { camposRol, Rol } from "../../../models/usuarios";
import { recuperarRoles } from "../controllers/recuperar";
import { Formulario } from "../../../views/Formulario";
import Cargando from "../../../views/Cargando";
import { Paper } from "@mui/material";
import { useParams } from "react-router";
import { guardarRol } from "../controllers/guardar";

export default function EditarRol({id, setVista}: {id?: number, setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [rol, setRol]= useState<Rol>({
        id_role: 0,
        nombre: ""
    });
    const [camposFormRol, setCamposFormRol]= useState(camposRol);

    useEffect(() => {
        let camposForm= [...camposFormRol];
        let idRol: number | undefined = undefined;

        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idRol= parseInt(parametros.id);
        } else if(id != undefined && id != 0) {
            idRol= id;
        }

        if (idRol) {
            recuperarRoles().then((data: Rol[]) => {
                setRol(data[0]);
                setCargado(true);
            });
        } else {
            setCargado(false);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{rol.id_role != 0 ? "Modificar el rol." : "Agregar nuevo rol."}</h1>
            <Formulario valores={rol} campos={camposFormRol} funcionSubmit={guardarRol} funcionVolver={() => {
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
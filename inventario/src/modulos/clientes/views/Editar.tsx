import { useEffect, useState } from "react";
import { camposCliente, Cliente } from "../../../models/clientes";
import { buscarCliente, guardarCliente } from "../funciones/abm";
import { camposForm, Formulario } from "../../../views/Formulario";
import { Paper } from "@mui/material";
import Cargando from "../../../views/Cargando";
import { useParams } from "react-router";

export default function EditarCliente({id, setVista}: {id?: number, setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [cliente, setCliente]= useState<Cliente>({
        cedula: 0,
        isEmpresa: false,
        ruc: 0,
        deuda: 0,
    });
    const [titulo, setTitulo]= useState("Agregar nuevo cliente");
    const [camposFormCliente, setCamposFormCliente]= useState(camposCliente);

    useEffect(() => {
        let camposForm= [...camposFormCliente];
        let idCliente: number | undefined= undefined;

        if (parametros.id != undefined && parseInt(parametros.id) != 0) {
            idCliente= parseInt(parametros.id);
        } else if(id != undefined && id != 0) {
            idCliente= id;
        }

        if (idCliente != undefined) {
            setTitulo("Modificar el cliente");
            buscarCliente(idCliente).then((data: Cliente) => {
                setCliente(data);
                camposForm= camposForm.filter((c: camposForm) => {
                    if (data.isEmpresa) {
                        return !((c.id === "nombres") || (c.id === "apellidos"));
                    } else {
                        return !((c.id === "razon_social") || (c.id === "nombre_empresa"));
                    }
                });
                console.log(camposForm);
                setCamposFormCliente(camposForm);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{titulo}</h1>
            <Formulario valores={cliente} campos={camposFormCliente} funcionSubmit={guardarCliente} funcionVolver={() => {
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
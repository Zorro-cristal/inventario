import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { camposCliente, Cliente } from "../../../models/clientes";
import Cargando from "../../../views/Cargando";
import { camposForm, Formulario } from "../../../views/Formulario";
import recuperarClientes from "../controllers/recuperar";
import guardarCliente from "../controllers/guardarEditar";

export default function EditarCliente({id, setVista}: {id?: number, setVista?: (value: boolean) => void}) {
    const parametros = useParams();
    const [cargado, setCargado]= useState(false);
    const [cliente, setCliente]= useState<Cliente>({
        cedula: 0,
        isEmpresa: false,
        ruc: 0,
        deuda: 0,
    });
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
            recuperarClientes([['id', idCliente]]).then((data: Cliente[]) => {
                const cliente: Cliente= data[0];
                setCliente(cliente);
                camposForm= camposForm.filter((c: camposForm) => {
                    if (cliente.isEmpresa) {
                        return !((c.id === "nombres") || (c.id === "apellidos"));
                    } else {
                        return !((c.id === "razon_social") || (c.id === "nombre_empresa"));
                    }
                });
                
                setCamposFormCliente(camposForm);
                setCargado(true);
            });
        } else {
            setCargado(true);
        }
    }, []);

    if (cargado) {
        return (<Paper elevation={3}>
            <h1>{cliente.cedula != 0 ? "Modificar el cliente." : "Agregar nuevo cliente"}</h1>
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